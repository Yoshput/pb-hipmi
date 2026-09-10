/**
 * HIPMI Telkom University - Cloud & Hosting Upload Engine
 * Enables automatic background uploading of final booth compositions so that guests
 * scanning QR codes from their mobile phones can immediately view, save, and share their photos.
 * 
 * Supports:
 * 1. ImgBB API (Free, zero-server image hosting with permanent URLs)
 * 2. Custom Hosting Endpoint (e.g. cPanel PHP script, Node.js, Vercel/Netlify Serverless, Supabase)
 * 3. Offline / Local fallback
 */

export class CloudUploadEngine {
  /**
   * Main upload entry point
   * @param {object} params
   * @param {Blob} [params.blob]
   * @param {string} params.dataUrl
   * @param {string} params.sessionId
   * @param {object} [params.customization]
   * @param {object} params.eventConfig
   * @returns {Promise<{success: boolean, url?: string, error?: string}>}
   */
  static async uploadPhoto({ blob, dataUrl, sessionId, customization = {}, eventConfig = {} }) {
    const provider = eventConfig.cloudProvider || 'none';

    if (provider === 'none') {
      return { success: false, reason: 'offline_mode' };
    }

    if (provider === 'imgbb') {
      return this.uploadToImgBB({ dataUrl, sessionId, apiKey: eventConfig.imgbbApiKey });
    }

    if (provider === 'custom') {
      return this.uploadToCustomEndpoint({
        blob,
        dataUrl,
        sessionId,
        customization,
        endpointUrl: eventConfig.customUploadEndpoint
      });
    }

    return { success: false, reason: 'unknown_provider' };
  }

  /**
   * Upload to ImgBB (Free Public Image Hosting)
   * API Docs: https://api.imgbb.com/
   */
  static async uploadToImgBB({ dataUrl, sessionId, apiKey }) {
    const key = (apiKey || '').trim();
    if (!key) {
      return {
        success: false,
        error: 'API Key ImgBB belum diatur di Operator Settings.'
      };
    }

    try {
      // Strip data:image/...;base64, prefix for ImgBB API
      const base64Data = dataUrl.includes(',') ? dataUrl.split(',')[1] : dataUrl;

      const formData = new FormData();
      formData.append('key', key);
      formData.append('image', base64Data);
      formData.append('name', `HIPMI_${sessionId}`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout

      const response = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorBody = await response.text();
        let errMsg = `HTTP ${response.status}`;
        try {
          const errJson = JSON.parse(errorBody);
          if (errJson.error && errJson.error.message) {
            errMsg = errJson.error.message;
          }
        } catch (e) {
          // Keep default errMsg
        }
        return { success: false, error: errMsg };
      }

      const json = await response.json();
      if (json.success && json.data) {
        // Use direct image display_url or url
        const directUrl = json.data.display_url || json.data.url;
        return {
          success: true,
          url: directUrl,
          deleteUrl: json.data.delete_url || ''
        };
      }

      return {
        success: false,
        error: json.error ? json.error.message : 'Respon upload tidak valid.'
      };
    } catch (err) {
      if (err.name === 'AbortError') {
        return { success: false, error: 'Waktu upload habis (timeout 20 detik).' };
      }
      return { success: false, error: err.message || 'Gagal menghubungi server upload.' };
    }
  }

  /**
   * Upload to Custom Hosting Endpoint (e.g. PHP/Node/Vercel/cPanel backend)
   */
  static async uploadToCustomEndpoint({ blob, dataUrl, sessionId, customization, endpointUrl }) {
    const endpoint = (endpointUrl || '').trim();
    if (!endpoint) {
      return {
        success: false,
        error: 'URL Endpoint Hosting belum diatur di Operator Settings.'
      };
    }

    try {
      const formData = new FormData();
      formData.append('sessionId', sessionId);
      formData.append('name', customization.name || '');
      formData.append('event', customization.eventName || '');
      formData.append('timestamp', String(Date.now()));

      if (blob) {
        formData.append('photo', blob, `hipmi_${sessionId}.png`);
      } else {
        formData.append('photoDataUrl', dataUrl);
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000);

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        return { success: false, error: `Server merespon dengan status ${response.status}` };
      }

      const result = await response.json();
      const directUrl = result.url || (result.data && result.data.url) || result.imageUrl;

      if (directUrl) {
        return { success: true, url: directUrl };
      }

      return {
        success: false,
        error: 'Respon server berhasil namun tidak mengembalikan URL foto (field "url").'
      };
    } catch (err) {
      if (err.name === 'AbortError') {
        return { success: false, error: 'Upload timeout (25 detik).' };
      }
      return { success: false, error: err.message || 'Gagal mengupload ke hosting.' };
    }
  }

  /**
   * Test connection & credentials for operator configuration
   */
  static async testConnection(eventConfig) {
    const provider = eventConfig.cloudProvider;
    if (provider === 'none') {
      return { success: true, message: 'Mode offline/lokal aktif (tanpa upload).' };
    }

    // Generate tiny 1x1 test PNG base64
    const test1x1Png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

    if (provider === 'imgbb') {
      const res = await this.uploadToImgBB({
        dataUrl: test1x1Png,
        sessionId: `TEST_${Date.now()}`,
        apiKey: eventConfig.imgbbApiKey
      });
      if (res.success) {
        return {
          success: true,
          url: res.url,
          message: 'Koneksi ImgBB Berhasil! Foto berhasil diunggah.'
        };
      }
      return { success: false, error: res.error };
    }

    if (provider === 'custom') {
      const res = await this.uploadToCustomEndpoint({
        dataUrl: test1x1Png,
        sessionId: `TEST_${Date.now()}`,
        customization: { name: 'Test Operator' },
        endpointUrl: eventConfig.customUploadEndpoint
      });
      if (res.success) {
        return {
          success: true,
          url: res.url,
          message: 'Koneksi Endpoint Hosting Berhasil!'
        };
      }
      return { success: false, error: res.error };
    }

    return { success: false, error: 'Provider cloud tidak dikenali.' };
  }
}
