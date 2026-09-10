/**
 * HIPMI Telkom University - Pure Client-side Offline QR Code Engine
 * Draws high-contrast, perfectly scannable QR codes onto canvas.
 */
import QRCode from 'qrcode';

export class QREngine {
  /**
   * Render QR Code directly into a target canvas element
   * @param {HTMLCanvasElement} canvas
   * @param {string} text
   * @param {object} options
   */
  static async renderToCanvas(canvas, text, options = {}) {
    const defaultOptions = {
      width: options.width || 320,
      margin: 2,
      color: {
        dark: '#111111',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'M'
    };

    try {
      await QRCode.toCanvas(canvas, text, defaultOptions);
      return canvas;
    } catch (err) {
      console.error("QR Code rendering failed:", err);
      throw err;
    }
  }

  /**
   * Generate Data URL for QR code
   */
  static async toDataURL(text, options = {}) {
    const defaultOptions = {
      width: options.width || 320,
      margin: 2,
      color: {
        dark: '#111111',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'M'
    };

    return QRCode.toDataURL(text, defaultOptions);
  }

  /**
   * Build scannable session URL for mobile retrieval.
   * Prioritizes public hostingUrl if configured, so guests scanning from phones
   * can view and download their photos from anywhere.
   * 
   * @param {string} sessionId
   * @param {string} [uploadedUrl]
   * @param {object} [eventConfig]
   * @returns {string}
   */
  static getSessionPhotoUrl(sessionId, uploadedUrl = '', eventConfig = {}) {
    // If operator chose direct photo download link and photo is uploaded to cloud
    if (uploadedUrl && eventConfig.qrTarget === 'direct') {
      return uploadedUrl;
    }

    let baseUrl = '';
    if (eventConfig.hostingUrl && typeof eventConfig.hostingUrl === 'string' && eventConfig.hostingUrl.trim()) {
      baseUrl = eventConfig.hostingUrl.trim().replace(/\/$/, '');
    } else if (typeof window !== 'undefined' && window.location) {
      baseUrl = `${window.location.origin}${window.location.pathname}`.replace(/\/$/, '');
    } else {
      baseUrl = 'https://photobooth.hipmitelku.com';
    }

    let url = `${baseUrl}?session=${encodeURIComponent(sessionId)}&action=view`;
    if (uploadedUrl && typeof uploadedUrl === 'string' && uploadedUrl.trim()) {
      url += `&photo=${encodeURIComponent(uploadedUrl.trim())}`;
    }

    return url;
  }
}
