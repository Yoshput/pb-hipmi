/**
 * HIPMI Telkom University - Canvas Composition Engine
 * Renders high-resolution composite photos with accurate aspect-ratio crop,
 * official brand logos, auto-fitted editorial typography, and participant customizations.
 */

import { getTemplateById } from '../config/templates.js';

class CanvasRenderer {
  constructor() {
    this.imageCache = new Map();
  }

  /**
   * Evict cached images to prevent memory leaks across sessions
   * @param {boolean} keepBranding - If true, preserves static logos
   */
  clearCache(keepBranding = true) {
    if (!keepBranding) {
      this.imageCache.clear();
      return;
    }
    for (const key of this.imageCache.keys()) {
      if (key.startsWith('blob:') || key.startsWith('data:')) {
        this.imageCache.delete(key);
      }
    }
  }

  /**
   * Prewarm image cache for high-speed instant rendering
   * @param {string[]} urls
   */
  async prewarmCache(urls = []) {
    if (!Array.isArray(urls) || urls.length === 0) return;
    await Promise.allSettled(urls.filter(Boolean).map(u => this.loadImage(u)));
  }

  /**
   * Preload an image from URL or DataURL and cache it
   */
  async loadImage(src) {
    if (!src) {
      const fallback = new Image();
      fallback.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
      return fallback;
    }

    if (this.imageCache.has(src)) {
      return this.imageCache.get(src);
    }

    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        this.imageCache.set(src, img);
        resolve(img);
      };
      img.onerror = (err) => {
        console.warn(`Failed to load image: ${src}`, err);
        // Fallback 1x1 image to prevent crash
        const fallback = new Image();
        fallback.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        resolve(fallback);
      };
      img.src = src;
    });
  }

  /**
   * Helper to draw text that dynamically scales down to fit available maxWidth
   * Unicode-safe to prevent breaking emoji or surrogate pairs.
   */
  drawFittedText(ctx, text, x, y, maxWidth, maxFontSize = 32, fontWeight = '800', align = 'left', color = '#111111') {
    if (text === null || text === undefined) return;
    const cleanText = String(text).trim();
    if (!cleanText) return;

    ctx.save();
    ctx.textAlign = align;
    ctx.fillStyle = color;

    let fontSize = maxFontSize;
    const minFontSize = 16;
    const fontFamily = '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", "Arial", sans-serif';

    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    let textWidth = ctx.measureText(cleanText).width;

    // Reduce font size until it fits maxWidth
    while (textWidth > maxWidth && fontSize > minFontSize) {
      fontSize -= 1;
      ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
      textWidth = ctx.measureText(cleanText).width;
    }

    // If still too wide at minFontSize, truncate with ellipsis safely
    if (textWidth > maxWidth) {
      const chars = Array.from(cleanText);
      while (chars.length > 2 && ctx.measureText(chars.join('') + '…').width > maxWidth) {
        chars.pop();
      }
      ctx.fillText(chars.join('') + '…', x, y);
    } else {
      ctx.fillText(cleanText, x, y);
    }

    ctx.restore();
  }

  /**
   * Draw an image into a rectangular slot with 'cover' aspect ratio crop
   * Weighted towards upper third on vertical crop to preserve head and hair.
   */
  drawImageCover(ctx, img, x, y, width, height, borderRadius = 0) {
    ctx.save();

    // Rounded rectangle path if needed
    if (borderRadius > 0) {
      ctx.beginPath();
      ctx.moveTo(x + borderRadius, y);
      ctx.lineTo(x + width - borderRadius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + borderRadius);
      ctx.lineTo(x + width, y + height - borderRadius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - borderRadius, y + height);
      ctx.lineTo(x + borderRadius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - borderRadius);
      ctx.lineTo(x, y + borderRadius);
      ctx.quadraticCurveTo(x, y, x + borderRadius, y);
      ctx.closePath();
      ctx.clip();
    }

    const imgWidth = img.naturalWidth || img.width || 1;
    const imgHeight = img.naturalHeight || img.height || 1;

    const imgAspect = imgWidth / imgHeight;
    const slotAspect = width / height;

    let sx, sy, sw, sh;

    if (imgAspect > slotAspect) {
      // Image is wider than slot: crop horizontal sides (centered)
      sh = imgHeight;
      sw = imgHeight * slotAspect;
      sx = (imgWidth - sw) / 2;
      sy = 0;
    } else {
      // Image is taller than slot: crop vertical sides (weighted towards upper third for head framing)
      sw = imgWidth;
      sh = imgWidth / slotAspect;
      sx = 0;
      sy = Math.max(0, (imgHeight - sh) * 0.3);
    }

    ctx.drawImage(img, sx, sy, sw, sh, x, y, width, height);
    ctx.restore();
  }

  /**
   * Render complete composite photo
   * @param {object} params
   * @param {Array} params.photos - Array of { index, blob, objectUrl, dataUrl }
   * @param {string} params.templateId - Template identifier
   * @param {object} params.customization - { name, eventName, message }
   * @param {object} params.eventConfig - Event configuration
   * @param {HTMLCanvasElement} [params.targetCanvas] - Optional existing canvas to draw onto
   */
  async renderComposition({
    photos = [],
    templateId = "signature",
    customization = {},
    eventConfig = {},
    targetCanvas = null
  }) {
    // Wait for fonts to be ready so canvas text is crisp
    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      try {
        await document.fonts.ready;
      } catch (e) {
        // Fallback
      }
    }

    const template = getTemplateById(templateId);
    const width = template.width;
    const height = template.height;

    const canvas = targetCanvas || document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // 1. Draw Background
    ctx.fillStyle = template.background;
    ctx.fillRect(0, 0, width, height);

    // Subtle texture / border accents for specific templates
    if (template.id === 'bold') {
      ctx.fillStyle = 'rgba(200, 168, 75, 0.03)';
      ctx.fillRect(0, 0, width, height);
      // Gold accent line top & bottom
      ctx.fillStyle = '#C8A84B';
      ctx.fillRect(0, 0, width, 6);
      ctx.fillRect(0, height - 6, width, 6);
    } else if (template.id === 'business') {
      // Executive fine frame
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
      ctx.lineWidth = 1;
      ctx.strokeRect(30, 30, width - 60, height - 60);
    } else if (template.id === 'signature') {
      // Subtle minimal inner border
      ctx.strokeStyle = '#F0F0F0';
      ctx.lineWidth = 1;
      ctx.strokeRect(40, 40, width - 80, height - 80);
    }

    // 2. Preload photos and brand logos
    const logoHipmiImg = await this.loadImage(eventConfig.logoHipmi || '/assets/logo-hipmi.png');
    const logoTeluImg = await this.loadImage(eventConfig.logoTelu || '/assets/logo-telu.png');
    const frameOverlayImg = template.frameOverlay ? await this.loadImage(template.frameOverlay) : null;

    // Preload captured photos
    const loadedPhotos = await Promise.all(
      photos.map(p => this.loadImage(p.objectUrl || p.dataUrl))
    );

    // 3. Draw Photo Slots
    const photoCount = photos.length || eventConfig.photoCount || 3;
    const slots = template.getSlots(photoCount);

    slots.forEach((slot, idx) => {
      // Circular fallback mapping: allows 3-slot frame to use 4-photo sessions, and 4-slot frame to use 3-photo sessions
      const img = (loadedPhotos && loadedPhotos.length > 0)
        ? (loadedPhotos[idx] || loadedPhotos[idx % loadedPhotos.length] || loadedPhotos[0])
        : null;

      if (img) {
        // Bleed photos 4px behind frame overlay borders so no gap ever shows
        const bleed = frameOverlayImg ? 4 : 0;
        this.drawImageCover(
          ctx,
          img,
          slot.x - bleed,
          slot.y - bleed,
          slot.width + (bleed * 2),
          slot.height + (bleed * 2),
          slot.borderRadius || 0
        );

        // Draw slot border if defined (skip if frameOverlay already frames the slot)
        if (slot.border && !frameOverlayImg) {
          ctx.save();
          ctx.strokeStyle = slot.border.split(' ')[2] || template.accentColor;
          ctx.lineWidth = parseInt(slot.border.split(' ')[0], 10) || 1;
          if (slot.borderRadius > 0) {
            ctx.beginPath();
            const r = slot.borderRadius;
            const x = slot.x, y = slot.y, w = slot.width, h = slot.height;
            ctx.moveTo(x + r, y);
            ctx.lineTo(x + w - r, y);
            ctx.quadraticCurveTo(x + w, y, x + w, y + r);
            ctx.lineTo(x + w, y + h - r);
            ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
            ctx.lineTo(x + r, y + h);
            ctx.quadraticCurveTo(x, y + h, x, y + h - r);
            ctx.lineTo(x, y + r);
            ctx.quadraticCurveTo(x, y, x + r, y);
            ctx.closePath();
            ctx.stroke();
          } else {
            ctx.strokeRect(slot.x, slot.y, slot.width, slot.height);
          }
          ctx.restore();
        }
      } else {
        // Placeholder slot if photo not yet captured
        ctx.fillStyle = '#E5E5E5';
        ctx.fillRect(slot.x, slot.y, slot.width, slot.height);
      }
    });

    const hasValidOverlay = Boolean(frameOverlayImg && (frameOverlayImg.naturalWidth > 1 || frameOverlayImg.width > 1));

    // 3.5 Draw Frame Overlay on top of photos
    if (hasValidOverlay) {
      ctx.drawImage(frameOverlayImg, 0, 0, width, height);
    }

    // 4. Draw Header Branding & Typography (skip only when artistic frameOverlay exists and is valid)
    if (!hasValidOverlay) {
      this._renderHeader(ctx, template, eventConfig, customization, logoHipmiImg, logoTeluImg, width);
      this._renderFooter(ctx, template, eventConfig, customization, logoHipmiImg, logoTeluImg, width, height);
    }

    return canvas;
  }

  _calcLogoWidth(img, targetHeight) {
    const naturalH = (img && (img.naturalHeight || img.height)) || 1;
    const naturalW = (img && (img.naturalWidth || img.width)) || 1;
    return Math.max(1, Math.round((naturalW / naturalH) * targetHeight));
  }

  _renderHeader(ctx, template, eventConfig, customization, logoHipmi, logoTelu, width) {
    const isDark = template.background === '#0E0E10' || template.background === '#12141A';
    const textColor = template.textColor || (isDark ? '#FFFFFF' : '#111111');
    const goldColor = template.accentColor || '#C8A84B';

    if (template.id === 'signature') {
      const logoH = 80;
      const logoW = this._calcLogoWidth(logoHipmi, logoH);
      ctx.drawImage(logoHipmi, 80, 55, logoW, logoH);

      const maxTextW = Math.max(50, width - 80 - (80 + logoW + 40));
      const orgTitle = "HIPMI PT TELKOM PURWOKERTO";
      const eventTitle = (customization.eventName || eventConfig.eventName || "PKKMB 2026").toUpperCase();

      this.drawFittedText(
        ctx,
        orgTitle,
        width - 80,
        88,
        maxTextW,
        34,
        '900',
        'right',
        textColor
      );

      this.drawFittedText(
        ctx,
        eventTitle,
        width - 80,
        122,
        maxTextW,
        20,
        '800',
        'right',
        goldColor
      );
    } else if (template.id === 'bold') {
      const logoH = 85;
      const logoW = this._calcLogoWidth(logoHipmi, logoH);
      ctx.drawImage(logoHipmi, 60, 50, logoW, logoH);

      ctx.textAlign = 'left';
      ctx.fillStyle = textColor;
      ctx.font = '900 54px -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Arial, sans-serif';
      ctx.fillText("HIPMI", 60 + logoW + 20, 96);

      ctx.fillStyle = goldColor;
      ctx.font = '800 22px -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Arial, sans-serif';
      ctx.fillText("PT TELKOM PURWOKERTO", 60 + logoW + 24, 126);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '800 20px -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Arial, sans-serif';
      ctx.fillText(eventConfig.year, width - 60, 92);
      ctx.fillStyle = goldColor;
      ctx.font = '800 16px -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Arial, sans-serif';
      ctx.fillText("PURWOKERTO • 2026", width - 60, 122);
    } else if (template.id === 'business') {
      const logoH = 75;
      const logoW = this._calcLogoWidth(logoHipmi, logoH);
      ctx.drawImage(logoHipmi, 90, 55, logoW, logoH);

      const maxTextW = Math.max(50, width - (90 + logoW + 40) - 90);
      this.drawFittedText(
        ctx,
        "PKKMB & BUSINESS SUMMIT",
        90 + logoW + 25,
        86,
        maxTextW,
        28,
        '900',
        'left',
        goldColor
      );

      this.drawFittedText(
        ctx,
        "HIPMI PT TELKOM UNIVERSITY PURWOKERTO",
        90 + logoW + 25,
        118,
        maxTextW,
        20,
        '800',
        'left',
        '#FFFFFF'
      );

      ctx.fillStyle = goldColor;
      ctx.fillRect(90, 145, width - 180, 2);
    } else if (template.id === 'youth') {
      const logoH = 75;
      const logoW = this._calcLogoWidth(logoHipmi, logoH);
      ctx.drawImage(logoHipmi, 70, 55, logoW, logoH);

      const maxTextW = Math.max(50, width - (70 + logoW + 40) - 70);
      this.drawFittedText(
        ctx,
        "FUTURE ENTREPRENEURS",
        70 + logoW + 20,
        90,
        maxTextW,
        36,
        '900',
        'left',
        '#111111'
      );

      this.drawFittedText(
        ctx,
        "HIPMI TELKOM PURWOKERTO • 2026",
        70 + logoW + 20,
        122,
        maxTextW,
        20,
        '800',
        'left',
        goldColor
      );
    } else if (template.id === 'strip') {
      const logoH = 65;
      const logoW = this._calcLogoWidth(logoHipmi, logoH);
      const startX = (width - logoW) / 2;
      ctx.drawImage(logoHipmi, startX, 35, logoW, logoH);

      this.drawFittedText(
        ctx,
        "HIPMI PT TELKOM PURWOKERTO",
        width / 2,
        120,
        width - 80,
        24,
        '900',
        'center',
        '#111111'
      );
    }
  }

  _renderFooter(ctx, template, eventConfig, customization, logoHipmi, logoTelu, width, height) {
    const isDark = template.background === '#0E0E10' || template.background === '#12141A';
    const textColor = template.textColor || (isDark ? '#FFFFFF' : '#111111');
    const goldColor = template.accentColor || '#C8A84B';

    if (template.id === 'signature') {
      const footerY = height - 105;
      const teluH = 55;
      const teluW = this._calcLogoWidth(logoTelu, teluH);
      ctx.drawImage(logoTelu, 80, footerY - 10, teluW, teluH);

      const maxTextW = Math.max(50, width - 80 - (80 + teluW + 40));
      const nameText = customization.name ? customization.name.toUpperCase() : "HIPMI PT TELKOM PURWOKERTO";
      const subText = customization.message || "PURWOKERTO, 2026";

      this.drawFittedText(ctx, nameText, width - 80, footerY + 8, maxTextW, 36, '900', 'right', textColor);
      this.drawFittedText(ctx, subText, width - 80, footerY + 40, maxTextW, 22, '800', 'right', goldColor);
    } else if (template.id === 'bold') {
      const footerY = height - 105;
      const teluH = 52;
      const teluW = this._calcLogoWidth(logoTelu, teluH);
      ctx.drawImage(logoTelu, width - 60 - teluW, footerY - 10, teluW, teluH);

      const maxTextW = Math.max(50, (width - 60 - teluW - 40) - 60);
      const nameText = customization.name ? customization.name.toUpperCase() : "HIPMI PURWOKERTO";
      const subText = customization.message || "IGNITE PASSION • BUILD FUTURE • 2026";

      this.drawFittedText(ctx, nameText, 60, footerY + 8, maxTextW, 36, '900', 'left', goldColor);
      this.drawFittedText(ctx, subText, 60, footerY + 40, maxTextW, 20, '800', 'left', '#E0E0E0');
    } else if (template.id === 'business') {
      const footerY = height - 110;
      ctx.fillStyle = goldColor;
      ctx.fillRect(90, footerY - 20, width - 180, 2);

      const teluH = 48;
      const teluW = this._calcLogoWidth(logoTelu, teluH);
      ctx.drawImage(logoTelu, width - 90 - teluW, footerY - 8, teluW, teluH);

      const maxTextW = Math.max(50, (width - 90 - teluW - 40) - 90);
      const nameText = customization.name ? customization.name.toUpperCase() : "PKKMB 2026 PARTICIPANT";
      const subText = customization.eventName || "HIPMI PT TELKOM PURWOKERTO";

      this.drawFittedText(ctx, nameText, 90, footerY + 12, maxTextW, 32, '900', 'left', '#FFFFFF');
      this.drawFittedText(ctx, subText, 90, footerY + 42, maxTextW, 20, '800', 'left', goldColor);
    } else if (template.id === 'youth') {
      const footerY = height - 105;
      const teluH = 52;
      const teluW = this._calcLogoWidth(logoTelu, teluH);
      ctx.drawImage(logoTelu, width - 70 - teluW, footerY - 10, teluW, teluH);

      const maxTextW = Math.max(50, (width - 70 - teluW - 40) - 70);
      const nameText = customization.name ? customization.name.toUpperCase() : "YOUNG ENTREPRENEUR";
      const subText = customization.message || "#PENGUSAHAMUDA • TELKOM PURWOKERTO";

      this.drawFittedText(ctx, nameText, 70, footerY + 8, maxTextW, 36, '900', 'left', '#111111');
      this.drawFittedText(ctx, subText, 70, footerY + 40, maxTextW, 22, '800', 'left', goldColor);
    } else if (template.id === 'strip') {
      const footerY = height - 160;
      ctx.fillStyle = goldColor;
      ctx.fillRect((width - 120) / 2, footerY, 120, 4);

      const nameText = customization.name ? customization.name.toUpperCase() : "HIPMI TELKOM PURWOKERTO";
      const subText = customization.eventName || "PKKMB 2026 • PURWOKERTO";

      this.drawFittedText(ctx, nameText, width / 2, footerY + 38, width - 80, 28, '900', 'center', '#111111');
      this.drawFittedText(ctx, subText, width / 2, footerY + 70, width - 80, 20, '800', 'center', goldColor);

      const teluH = 45;
      const teluW = this._calcLogoWidth(logoTelu, teluH);
      ctx.drawImage(logoTelu, (width - teluW) / 2, footerY + 90, teluW, teluH);
    } else if (template.id === 'polaroid') {
      // Large, bold, high-contrast, crystal clear Polaroid footer
      const footerY = height - 180;
      const logoH = 80;
      const logoW = this._calcLogoWidth(logoHipmi, logoH);
      ctx.drawImage(logoHipmi, width - 80 - logoW, footerY + 15, logoW, logoH);

      const maxTextW = Math.max(50, width - 80 - (80 + logoW + 40));
      const nameText = customization.name ? customization.name : "HIPMI PT Telkom University Purwokerto";
      const subText = customization.message || "PURWOKERTO, 2026";

      this.drawFittedText(ctx, nameText, 80, footerY + 46, maxTextW, 40, '900', 'left', '#111111');
      this.drawFittedText(ctx, subText, 80, footerY + 84, maxTextW, 24, '800', 'left', goldColor);
    }
  }

  /**
   * Export canvas to high-res Blob
   */
  async exportBlob(canvas, mimeType = 'image/png', quality = 0.95) {
    return new Promise((resolve) => {
      canvas.toBlob(blob => resolve(blob), mimeType, quality);
    });
  }
}

export const canvasRenderer = new CanvasRenderer();
