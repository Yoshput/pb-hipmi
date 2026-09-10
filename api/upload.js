/**
 * HIPMI Telkom University Purwokerto - Cloud Upload API (Vercel Serverless Function)
 * Enables zero-config automatic image upload for instant mobile QR scanning and downloading.
 * 
 * Supports:
 * - FreeImage CDN (https://iili.io/...) with 0 setup required
 * - ImgBB API (if IMGBB_API_KEY env or apiKey in request is provided)
 * - In-memory session cache for fast mobile polling if scanned early
 */

// In-memory cache for recent uploads (shared across warm invocations)
if (!globalThis._hipmiRecentUploads) {
  globalThis._hipmiRecentUploads = new Map();
}

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET: Poll or retrieve photo URL by sessionId
  if (req.method === 'GET') {
    const urlObj = new URL(req.url, 'http://localhost');
    const sessionId = req.query?.session || urlObj.searchParams.get('session');

    if (!sessionId) {
      return res.status(400).json({ success: false, error: 'Session ID diperlukan.' });
    }

    let cached = globalThis._hipmiRecentUploads.get(sessionId);

    // If exact sessionId not found, and requested session is 'HIPMI' or 'latest', find the most recent upload
    if (!cached && (sessionId === 'HIPMI' || sessionId === 'latest' || sessionId.startsWith('HIPMI-') || sessionId.startsWith('HIPMI'))) {
      if (globalThis._hipmiRecentUploads.size > 0) {
        const items = Array.from(globalThis._hipmiRecentUploads.values());
        items.sort((a, b) => b.time - a.time);
        cached = items[0];
      }
    }

    if (cached && cached.url) {
      return res.status(200).json({
        success: true,
        sessionId: cached.sessionId || sessionId,
        url: cached.url,
        uploadedAt: cached.time
      });
    }

    return res.status(404).json({
      success: false,
      error: 'Foto untuk sesi ini belum tersedia atau masih diproses.'
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        // keep as is
      }
    }

    // If stream not yet parsed into object
    if (!body || (!body.image && !body.dataUrl && !body.photoDataUrl)) {
      body = await new Promise((resolve) => {
        let raw = '';
        req.on('data', chunk => { raw += chunk; });
        req.on('end', () => {
          try {
            resolve(JSON.parse(raw));
          } catch (e) {
            resolve({});
          }
        });
      });
    }

    const imageSource = body?.image || body?.photoDataUrl || body?.dataUrl || body?.source;
    const sessionId = body?.sessionId || `HIPMI-${Date.now()}`;
    const apiKey = body?.apiKey || process.env.IMGBB_API_KEY || '';

    if (!imageSource) {
      return res.status(400).json({ success: false, error: 'Data gambar tidak ditemukan.' });
    }

    // Clean base64 data
    const base64Clean = imageSource.includes(',') ? imageSource.split(',')[1] : imageSource;
    const buffer = Buffer.from(base64Clean, 'base64');
    const blob = new Blob([buffer], { type: 'image/png' });

    // 1. If ImgBB API Key is provided, prioritize ImgBB
    if (apiKey && apiKey.trim()) {
      try {
        const imgbbForm = new FormData();
        imgbbForm.append('key', apiKey.trim());
        imgbbForm.append('image', base64Clean);
        imgbbForm.append('name', `HIPMI_${sessionId}`);

        const imgbbRes = await fetch('https://api.imgbb.com/1/upload', {
          method: 'POST',
          body: imgbbForm
        });

        const imgbbJson = await imgbbRes.json();
        if (imgbbJson?.success && imgbbJson?.data) {
          const directUrl = imgbbJson.data.display_url || imgbbJson.data.url;
          saveUploadCache(sessionId, directUrl);
          return res.status(200).json({
            success: true,
            url: directUrl,
            provider: 'imgbb'
          });
        }
      } catch (imgbbErr) {
        console.warn('ImgBB upload failed, falling back to FreeImage CDN:', imgbbErr);
      }
    }

    // 2. Default Zero-Config: FreeImage CDN (https://iili.io/...)
    const fihForm = new FormData();
    fihForm.append('key', '6d207e02198a847aa98d0a2a901485a5');
    fihForm.append('action', 'upload');
    fihForm.append('format', 'json');
    fihForm.append('source', blob, `hipmi_${sessionId}.png`);

    const fihRes = await fetch('https://freeimage.host/api/1/upload', {
      method: 'POST',
      body: fihForm,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) HIPMI-Booth/1.0'
      }
    });

    const fihJson = await fihRes.json();
    if (fihJson?.status_code === 200 && fihJson?.image?.url) {
      const directUrl = fihJson.image.url;
      saveUploadCache(sessionId, directUrl);
      return res.status(200).json({
        success: true,
        url: directUrl,
        provider: 'freeimage'
      });
    }

    return res.status(500).json({
      success: false,
      error: fihJson?.error?.message || 'Gagal mengunggah foto ke CDN cloud.'
    });
  } catch (err) {
    console.error('API Upload error:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Terjadi kesalahan saat memproses upload foto.'
    });
  }
}

function saveUploadCache(sessionId, url) {
  if (!globalThis._hipmiRecentUploads) {
    globalThis._hipmiRecentUploads = new Map();
  }
  globalThis._hipmiRecentUploads.set(sessionId, {
    sessionId,
    url,
    time: Date.now()
  });

  // Keep cache bounded to 150 items or older than 2 hours
  if (globalThis._hipmiRecentUploads.size > 150) {
    const twoHoursAgo = Date.now() - 2 * 3600 * 1000;
    for (const [key, val] of globalThis._hipmiRecentUploads.entries()) {
      if (val.time < twoHoursAgo) {
        globalThis._hipmiRecentUploads.delete(key);
      }
    }
  }
}
