/**
 * HIPMI Telkom University Purwokerto - Cloud Upload API (Vercel Serverless Function)
 * Enables zero-config automatic image upload for instant mobile QR scanning and downloading.
 * 
 * Supports:
 * - High-speed Zero-Config CDN: uguu.se (preserves 100% full original resolution, no downscaling/cropping)
 * - Custom ImgBB API (if IMGBB_API_KEY env or apiKey in request is provided)
 * - FreeImage CDN fallback with full size resolution
 * - In-memory session cache & direct binary streaming proxy (GET &raw=1 or &download=1)
 */

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

  // GET: Poll or retrieve photo URL by sessionId, or proxy raw download
  if (req.method === 'GET') {
    const urlObj = new URL(req.url, 'http://localhost');
    const sessionId = req.query?.session || urlObj.searchParams.get('session');
    const raw = req.query?.raw || urlObj.searchParams.get('raw');
    const download = req.query?.download || urlObj.searchParams.get('download');
    const targetUrl = req.query?.url || urlObj.searchParams.get('url');

    // 1. Direct binary proxy download if targetUrl is provided
    if ((download || raw) && targetUrl) {
      try {
        const fetchRes = await fetch(targetUrl);
        if (fetchRes.ok) {
          const buf = Buffer.from(await fetchRes.arrayBuffer());
          res.setHeader('Content-Type', 'image/png');
          res.setHeader('Content-Length', buf.length);
          if (download) {
            res.setHeader('Content-Disposition', `attachment; filename="hipmi-telkom-purwokerto-${sessionId || 'photo'}.png"`);
          }
          res.setHeader('Cache-Control', 'public, max-age=86400, immutable');
          return res.status(200).send(buf);
        }
      } catch (proxyErr) {
        console.warn('Proxy download error:', proxyErr);
      }
    }

    if (!sessionId) {
      return res.status(400).json({ success: false, error: 'Session ID diperlukan.' });
    }

    let cached = globalThis._hipmiRecentUploads.get(sessionId);

    // If exact sessionId not found, and requested session is 'HIPMI' or 'latest', find most recent upload
    if (!cached && (sessionId === 'HIPMI' || sessionId === 'latest' || sessionId.startsWith('HIPMI-') || sessionId.startsWith('HIPMI'))) {
      if (globalThis._hipmiRecentUploads.size > 0) {
        const items = Array.from(globalThis._hipmiRecentUploads.values());
        items.sort((a, b) => b.time - a.time);
        cached = items[0];
      }
    }

    // 2. Direct binary streaming from cache
    if ((download || raw) && cached && cached.buffer) {
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Content-Length', cached.buffer.length);
      if (download) {
        res.setHeader('Content-Disposition', `attachment; filename="hipmi-telkom-purwokerto-${cached.sessionId || sessionId}.png"`);
      }
      res.setHeader('Cache-Control', 'public, max-age=86400, immutable');
      return res.status(200).send(cached.buffer);
    }

    if (cached && (cached.url || cached.buffer)) {
      return res.status(200).json({
        success: true,
        sessionId: cached.sessionId || sessionId,
        url: cached.url || `/api/upload?session=${encodeURIComponent(cached.sessionId || sessionId)}&raw=1`,
        dataUrl: cached.dataUrl || null,
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

    // Clean base64 data & extract binary buffer
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
          saveUploadCache(sessionId, directUrl, buffer, imageSource);
          return res.status(200).json({
            success: true,
            url: directUrl,
            provider: 'imgbb'
          });
        }
      } catch (imgbbErr) {
        console.warn('ImgBB upload failed, falling back to Zero-Config CDN:', imgbbErr);
      }
    }

    // 2. Primary Zero-Config High Resolution CDN: uguu.se (keeps full original dimensions, no 160x160 downscaling)
    try {
      const uguuForm = new FormData();
      uguuForm.append('files[]', blob, `hipmi_${sessionId}.png`);

      const uguuRes = await fetch('https://uguu.se/upload', {
        method: 'POST',
        body: uguuForm,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) HIPMI-Booth/1.0'
        }
      });

      if (uguuRes.ok) {
        const uguuJson = await uguuRes.json();
        if (uguuJson?.success && uguuJson?.files?.[0]?.url) {
          const directUrl = uguuJson.files[0].url;
          saveUploadCache(sessionId, directUrl, buffer, imageSource);
          return res.status(200).json({
            success: true,
            url: directUrl,
            provider: 'uguu'
          });
        }
      }
    } catch (uguuErr) {
      console.warn('Uguu upload failed, trying FreeImage fallback:', uguuErr);
    }

    // 3. Fallback: FreeImage CDN (https://iili.io/...)
    try {
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
        saveUploadCache(sessionId, directUrl, buffer, imageSource);
        return res.status(200).json({
          success: true,
          url: directUrl,
          provider: 'freeimage'
        });
      }
    } catch (fihErr) {
      console.warn('FreeImage upload error:', fihErr);
    }

    // 4. In-memory streaming fallback
    saveUploadCache(sessionId, '', buffer, imageSource);
    return res.status(200).json({
      success: true,
      url: `/api/upload?session=${encodeURIComponent(sessionId)}&raw=1`,
      provider: 'in-memory'
    });
  } catch (err) {
    console.error('API Upload error:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Terjadi kesalahan saat memproses upload foto.'
    });
  }
}

function saveUploadCache(sessionId, url, buffer = null, dataUrl = null) {
  if (!globalThis._hipmiRecentUploads) {
    globalThis._hipmiRecentUploads = new Map();
  }
  globalThis._hipmiRecentUploads.set(sessionId, {
    sessionId,
    url,
    buffer,
    dataUrl,
    time: Date.now()
  });

  // Keep cache bounded to 100 items or older than 2 hours
  if (globalThis._hipmiRecentUploads.size > 100) {
    const twoHoursAgo = Date.now() - 2 * 3600 * 1000;
    for (const [key, val] of globalThis._hipmiRecentUploads.entries()) {
      if (val.time < twoHoursAgo) {
        globalThis._hipmiRecentUploads.delete(key);
      }
    }
  }
}
