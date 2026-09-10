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
  drawFittedText(ctx, text, x, y, maxWidth, maxFontSize = 24, fontWeight = '700', align = 'left', color = '#111111') {
    if (text === null || text === undefined) return;
    const cleanText = String(text).trim();
    if (!cleanText) return;

    ctx.save();
    ctx.textAlign = align;
    ctx.fillStyle = color;

    let fontSize = maxFontSize;
    const minFontSize = 12;
    const fontFamily = '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif';

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

    // Preload captured photos
    const loadedPhotos = await Promise.all(
      photos.map(p => this.loadImage(p.objectUrl || p.dataUrl))
    );

    // 3. Draw Photo Slots
    const photoCount = photos.length || eventConfig.photoCount || 3;
    const slots = template.getSlots(photoCount);

    slots.forEach((slot, idx) => {
      const img = loadedPhotos[idx] || loadedPhotos[0];

      if (img) {
        this.drawImageCover(ctx, img, slot.x, slot.y, slot.width, slot.height, slot.borderRadius);

        // Draw slot border if defined
        if (slot.border) {
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

    // 4. Draw Header Branding & Typography
    this._renderHeader(ctx, template, eventConfig, customization, logoHipmiImg, logoTeluImg, width);

    // 5. Draw Footer Branding & Customization
    this._renderFooter(ctx, template, eventConfig, customization, logoHipmiImg, logoTeluImg, width, height);

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
      const logoH = 65;
      const logoW = this._calcLogoWidth(logoHipmi, logoH);
      ctx.drawImage(logoHipmi, 80, 65, logoW, logoH);

      const maxTextW = Math.max(50, width - 80 - (80 + logoW + 40));
      this.drawFittedText(
        ctx,
        eventConfig.organization.toUpperCase(),
        width - 80,
        90,
        maxTextW,
        24,
        '700',
        'right',
        textColor
      );

      this.drawFittedText(
        ctx,
        customization.eventName || eventConfig.eventName,
        width - 80,
        115,
        maxTextW,
        15,
        '500',
        'right',
        '#8E8E93'
      );
    } else if (template.id === 'bold') {
      const logoH = 75;
      const logoW = this._calcLogoWidth(logoHipmi, logoH);
      ctx.drawImage(logoHipmi, 60, 60, logoW, logoH);

      ctx.textAlign = 'left';
      ctx.fillStyle = textColor;
      ctx.font = '900 48px -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif';
      ctx.fillText("HIPMI", 60 + logoW + 20, 102);

      ctx.fillStyle = goldColor;
      ctx.font = '700 20px -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif';
      ctx.fillText("TELKOM UNIVERSITY", 60 + logoW + 24, 130);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif';
      ctx.fillText(eventConfig.year, width - 60, 95);
      ctx.fillStyle = '#888888';
      ctx.font = '500 13px -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif';
      ctx.fillText("OFFICIAL ARCHIVE", width - 60, 120);
    } else if (template.id === 'business') {
      const logoH = 60;
      const logoW = this._calcLogoWidth(logoHipmi, logoH);
      ctx.drawImage(logoHipmi, 90, 65, logoW, logoH);

      const maxTextW = Math.max(50, width - (90 + logoW + 40) - 90);
      this.drawFittedText(
        ctx,
        "EXECUTIVE FORUM & NETWORKING",
        90 + logoW + 25,
        90,
        maxTextW,
        18,
        '700',
        'left',
        goldColor
      );

      this.drawFittedText(
        ctx,
        "BPC HIPMI PT TELKOM UNIVERSITY",
        90 + logoW + 25,
        115,
        maxTextW,
        15,
        '500',
        'left',
        '#CCCCCC'
      );

      ctx.fillStyle = goldColor;
      ctx.fillRect(90, 145, width - 180, 1);
    } else if (template.id === 'youth') {
      const logoH = 58;
      const logoW = this._calcLogoWidth(logoHipmi, logoH);
      ctx.drawImage(logoHipmi, 70, 65, logoW, logoH);

      const maxTextW = Math.max(50, width - (70 + logoW + 40) - 70);
      this.drawFittedText(
        ctx,
        "FUTURE ENTREPRENEURS",
        70 + logoW + 20,
        95,
        maxTextW,
        28,
        '900',
        'left',
        '#111111'
      );

      this.drawFittedText(
        ctx,
        "HIPMI TELKOM UNIVERSITY • 2026",
        70 + logoW + 20,
        120,
        maxTextW,
        15,
        '700',
        'left',
        goldColor
      );
    } else if (template.id === 'strip') {
      const logoH = 50;
      const logoW = this._calcLogoWidth(logoHipmi, logoH);
      const startX = (width - logoW) / 2;
      ctx.drawImage(logoHipmi, startX, 45, logoW, logoH);

      this.drawFittedText(
        ctx,
        "HIPMI TELKOM UNIVERSITY",
        width / 2,
        115,
        width - 100,
        16,
        '800',
        'center',
        '#111111'
      );
    }
  }

  _renderFooter(ctx, template, eventConfig, customization, logoHipmi, logoTelu, width, height) {
    const isDark = template.background === '#0E0E10' || template.background === '#12141A';
    const textColor = template.textColor || (isDark ? '#FFFFFF' : '#111111');
    const subColor = isDark ? '#9E9E9E' : '#6E6E73';
    const goldColor = template.accentColor || '#C8A84B';

    if (template.id === 'signature') {
      const footerY = height - 100;
      const teluH = 42;
      const teluW = this._calcLogoWidth(logoTelu, teluH);
      ctx.drawImage(logoTelu, 80, footerY - 5, teluW, teluH);

      const maxTextW = Math.max(50, width - 80 - (80 + teluW + 40));
      const nameText = customization.name ? customization.name.toUpperCase() : "HIPMI TELKOM UNIVERSITY";
      const subText = customization.message || eventConfig.dateText;

      this.drawFittedText(ctx, nameText, width - 80, footerY + 5, maxTextW, 24, '700', 'right', textColor);
      this.drawFittedText(ctx, subText, width - 80, footerY + 30, maxTextW, 15, '500', 'right', subColor);
    } else if (template.id === 'bold') {
      const footerY = height - 100;
      const teluH = 40;
      const teluW = this._calcLogoWidth(logoTelu, teluH);
      ctx.drawImage(logoTelu, width - 60 - teluW, footerY - 5, teluW, teluH);

      const maxTextW = Math.max(50, (width - 60 - teluW - 40) - 60);
      const nameText = customization.name ? customization.name.toUpperCase() : "ENTREPRENEURIAL SPIRIT";
      const subText = customization.message || "MAKE A MOMENT. BUILD THE FUTURE.";

      this.drawFittedText(ctx, nameText, 60, footerY + 10, maxTextW, 22, '800', 'left', goldColor);
      this.drawFittedText(ctx, subText, 60, footerY + 35, maxTextW, 15, '500', 'left', '#777777');
    } else if (template.id === 'business') {
      const footerY = height - 105;
      ctx.fillStyle = goldColor;
      ctx.fillRect(90, footerY - 20, width - 180, 1);

      const teluH = 38;
      const teluW = this._calcLogoWidth(logoTelu, teluH);
      ctx.drawImage(logoTelu, width - 90 - teluW, footerY - 2, teluW, teluH);

      const maxTextW = Math.max(50, (width - 90 - teluW - 40) - 90);
      const nameText = customization.name ? customization.name.toUpperCase() : "PARTICIPANT OF EXCELLENCE";
      const subText = customization.eventName || eventConfig.eventName;

      this.drawFittedText(ctx, nameText, 90, footerY + 15, maxTextW, 20, '700', 'left', '#FFFFFF');
      this.drawFittedText(ctx, subText, 90, footerY + 38, maxTextW, 14, '500', 'left', goldColor);
    } else if (template.id === 'youth') {
      const footerY = height - 100;
      const teluH = 40;
      const teluW = this._calcLogoWidth(logoTelu, teluH);
      ctx.drawImage(logoTelu, width - 70 - teluW, footerY - 5, teluW, teluH);

      const maxTextW = Math.max(50, (width - 70 - teluW - 40) - 70);
      const nameText = customization.name ? customization.name : "YOUNG ENTREPRENEUR";
      const subText = customization.message || "#PENGUSAHAMUDA • TELKOM UNIVERSITY";

      this.drawFittedText(ctx, nameText, 70, footerY + 10, maxTextW, 24, '800', 'left', '#111111');
      this.drawFittedText(ctx, subText, 70, footerY + 35, maxTextW, 15, '600', 'left', goldColor);
    } else if (template.id === 'strip') {
      const footerY = height - 150;
      ctx.fillStyle = goldColor;
      ctx.fillRect((width - 80) / 2, footerY, 80, 3);

      const nameText = customization.name ? customization.name.toUpperCase() : "HIPMI TEL-U";
      const subText = customization.eventName || eventConfig.eventName;

      this.drawFittedText(ctx, nameText, width / 2, footerY + 35, width - 100, 22, '800', 'center', '#111111');
      this.drawFittedText(ctx, subText, width / 2, footerY + 60, width - 100, 14, '600', 'center', '#777777');

      const teluH = 32;
      const teluW = this._calcLogoWidth(logoTelu, teluH);
      ctx.drawImage(logoTelu, (width - teluW) / 2, footerY + 75, teluW, teluH);
    } else if (template.id === 'polaroid') {
      const footerY = height - 180;
      const logoH = 45;
      const logoW = this._calcLogoWidth(logoHipmi, logoH);
      ctx.drawImage(logoHipmi, width - 80 - logoW, footerY + 25, logoW, logoH);

      const maxTextW = Math.max(50, width - 80 - (80 + logoW + 40));
      const nameText = customization.name ? customization.name : "HIPMI Telkom University";
      const subText = customization.message || eventConfig.dateText;

      this.drawFittedText(ctx, nameText, 80, footerY + 40, maxTextW, 26, '700', 'left', '#111111');
      this.drawFittedText(ctx, subText, 80, footerY + 70, maxTextW, 16, '500', 'left', '#8E8E93');
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
