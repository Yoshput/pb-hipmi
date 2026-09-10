/**
 * HIPMI Telkom University - Screen 5: Final Result & QR Code View
 * Wow-moment presentation, scannable offline QR code, sanitized PNG download,
 * and intelligent interaction-aware auto-reset countdown.
 * Hardened with centralized timer management, window interaction reset, and filename sanitization.
 */

import { QREngine } from '../engine/qrEngine.js';
import { soundEngine } from '../engine/audioEffects.js';
import { sessionManager } from '../engine/sessionManager.js';
import { sanitizeFilename } from '../utils/sanitize.js';
import { historyStorage } from '../engine/historyStorage.js';
import { CloudUploadEngine } from '../engine/cloudUploadEngine.js';

export class ResultView {
  constructor({
    finalBlob,
    finalDataUrl,
    sessionId,
    customization,
    eventConfig,
    onNewSession
  }) {
    this.finalBlob = finalBlob;
    this.finalDataUrl = finalDataUrl;
    this.sessionId = sessionId;
    this.customization = customization || {};
    this.eventConfig = eventConfig;
    this.onNewSession = onNewSession;
    this.uploadedUrl = '';

    this.container = null;
    this.autoResetDuration = Number.isInteger(eventConfig.autoResetSeconds) ? eventConfig.autoResetSeconds : 15;
    this.remainingSeconds = this.autoResetDuration;
    this.resetTimer = null;
    this.isResetting = false;
    this.isDownloading = false;
    this.isDestroyed = false;
    this.interactionHandler = null;
  }

  async render() {
    const div = document.createElement('div');
    div.className = 'view-container view-enter result-screen';
    this.container = div;

    // Play celebratory sound
    soundEngine.playSuccess();

    const isAutoResetEnabled = this.autoResetDuration > 0;

    // Persist photo immediately into device IndexedDB storage
    historyStorage.saveSession({
      sessionId: this.sessionId,
      finalDataUrl: this.finalDataUrl,
      finalBlob: this.finalBlob,
      rawPhotos: sessionManager.getSession()?.photos || [],
      customization: this.customization,
      templateId: sessionManager.getSession()?.selectedTemplateId || 'signature'
    }).catch(err => console.warn('History storage save failed:', err));

    div.innerHTML = `
      <!-- Left Column: Large Hero Composite Photo -->
      <div class="result-photo-col">
        <div class="result-photo-frame">
          <img src="${this.finalDataUrl}" alt="HIPMI Photobooth Result" class="result-photo-img" id="result-final-img" />
        </div>
      </div>

      <!-- Right Column: QR Code & Session Actions -->
      <div class="result-action-col">
        <div class="result-header-text">
          <div class="result-badge">
            <span class="pulse-indicator" style="width: 6px; height: 6px; border-radius: 50%; background: var(--color-accent); display: inline-block;"></span>
            COMPOSITION READY
          </div>
          <h1 class="result-title">Your Photo is Ready</h1>
          <p class="result-desc">Scan the QR code below on your phone to save your memory, or tap download directly.</p>
        </div>

        <!-- High-Contrast Scannable QR Box -->
        <div class="qr-box-card">
          <div class="qr-cloud-badge" id="qr-cloud-badge" style="display: none;">
            <span class="pulse-indicator" id="qr-cloud-pulse" style="width: 6px; height: 6px; border-radius: 50%; background: var(--color-accent); display: inline-block;"></span>
            <span id="qr-cloud-label">Menghubungkan ke Cloud...</span>
          </div>
          <canvas class="qr-canvas-element" id="qr-canvas"></canvas>
          <span class="qr-label-instruction">Scan to save your photo</span>
          <span class="qr-sublabel" id="qr-sublabel">Open this photo on your mobile device</span>
        </div>

        <!-- Action Buttons -->
        <div class="result-buttons">
          <button class="btn-primary btn-accent" id="btn-download-photo" aria-label="Download Photo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download Photo
          </button>

          <button class="btn-secondary" id="btn-new-session" style="background: transparent; color: #FFFFFF; border-color: rgba(255,255,255,0.25);" aria-label="Start New Session">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="1 4 1 10 7 10"></polyline>
              <polyline points="23 20 23 14 17 14"></polyline>
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
            </svg>
            New Session
          </button>
        </div>

        <!-- Auto Reset Progress Bar -->
        ${isAutoResetEnabled ? `
        <div class="auto-reset-container">
          <div class="auto-reset-text">
            <span>Starting a new session in</span>
            <span id="reset-counter-text">${this.remainingSeconds}s</span>
          </div>
          <div class="auto-reset-bar-bg">
            <div class="auto-reset-bar-fill" id="reset-bar-fill"></div>
          </div>
        </div>
        ` : `
        <div class="auto-reset-container" style="opacity: 0.6;">
          <div class="auto-reset-text">
            <span>Session Reset</span>
            <span>Manual Only</span>
          </div>
        </div>
        `}
      </div>
    `;

    // Render Scannable QR Code & trigger cloud upload in background
    this._initQrAndCloudUpload(div);

    // Download Button Handler with Sanitized Filename
    const downloadBtn = div.querySelector('#btn-download-photo');
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.downloadPhoto();
    });

    // New Session Button Handler with Action Guard
    const newSessionBtn = div.querySelector('#btn-new-session');
    newSessionBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.isResetting || this.isDestroyed) return;
      newSessionBtn.classList.add('btn-disabled');
      newSessionBtn.disabled = true;
      this.triggerNewSession();
    });

    // Start Auto-Reset Lifecycle if enabled
    if (isAutoResetEnabled) {
      this.startAutoReset();

      // Reset timer on intentional user touch/key interaction
      this.interactionHandler = () => {
        this.resetAutoResetTimer();
      };

      window.addEventListener('pointerdown', this.interactionHandler, { passive: true });
      window.addEventListener('touchstart', this.interactionHandler, { passive: true });
      window.addEventListener('keydown', this.interactionHandler, { passive: true });
    }

    return div;
  }

  /**
   * Initialize QR Code and trigger background cloud upload if configured
   */
  async _initQrAndCloudUpload(div) {
    const qrCanvas = div.querySelector('#qr-canvas');
    const cloudBadge = div.querySelector('#qr-cloud-badge');
    const cloudLabel = div.querySelector('#qr-cloud-label');
    const qrSublabel = div.querySelector('#qr-sublabel');

    // 1. Initial Local/Session QR Code Render
    const initialSessionUrl = QREngine.getSessionPhotoUrl(this.sessionId, '', this.eventConfig);
    try {
      await QREngine.renderToCanvas(qrCanvas, initialSessionUrl, { width: 220 });
    } catch (err) {
      console.warn("Initial QR generation error:", err);
    }

    // 2. Background Cloud Upload for Hosted Real-World Experience
    const provider = this.eventConfig.cloudProvider || 'none';
    if (provider !== 'none') {
      cloudBadge.style.display = 'inline-flex';
      cloudLabel.textContent = 'Mengunggah ke cloud...';

      try {
        const uploadRes = await CloudUploadEngine.uploadPhoto({
          blob: this.finalBlob,
          dataUrl: this.finalDataUrl,
          sessionId: this.sessionId,
          customization: this.customization,
          eventConfig: this.eventConfig
        });

        if (this.isDestroyed) return;

        if (uploadRes.success && uploadRes.url) {
          this.uploadedUrl = uploadRes.url;
          cloudBadge.classList.add('status-success');
          cloudLabel.textContent = '✅ Siap di-scan di HP';
          if (qrSublabel) {
            qrSublabel.textContent = 'Buka & unduh langsung dari HP kamu';
          }

          // Update IndexedDB history with cloud URL
          await historyStorage.updateUploadedUrl(this.sessionId, uploadRes.url);

          // Re-render QR Code with live public hosting URL
          const hostedUrl = QREngine.getSessionPhotoUrl(this.sessionId, uploadRes.url, this.eventConfig);
          await QREngine.renderToCanvas(qrCanvas, hostedUrl, { width: 220 });
        } else {
          cloudBadge.classList.add('status-warning');
          cloudLabel.textContent = 'Offline (Simpan di booth)';
        }
      } catch (err) {
        console.warn('Background upload exception:', err);
        if (!this.isDestroyed && cloudLabel) {
          cloudBadge.classList.add('status-warning');
          cloudLabel.textContent = 'Offline (Simpan di booth)';
        }
      }
    }
  }

  /**
   * Sanitize filename and trigger browser download
   */
  downloadPhoto() {
    if (this.isDownloading || this.isDestroyed) return;
    this.isDownloading = true;

    try {
      const now = new Date();
      const pad = n => String(n).padStart(2, '0');
      const dateStr = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
      const timeStr = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

      const userClean = sanitizeFilename(this.customization.name, 25);
      const userPart = userClean ? `-${userClean}` : '';
      const filename = `hipmi-telkom-university-photobooth${userPart}-${dateStr}-${timeStr}.png`;

      const link = document.createElement('a');
      link.download = filename;
      link.href = this.finalDataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setTimeout(() => {
        this.isDownloading = false;
      }, 800);
    }
  }

  /**
   * Start auto-reset countdown
   */
  startAutoReset() {
    this.clearAutoReset();

    const counterText = this.container.querySelector('#reset-counter-text');
    const barFill = this.container.querySelector('#reset-bar-fill');

    this.resetTimer = setInterval(() => {
      if (this.isDestroyed) return;
      this.remainingSeconds--;
      if (counterText) {
        counterText.textContent = `${this.remainingSeconds}s`;
      }
      if (barFill) {
        const pct = (this.remainingSeconds / this.autoResetDuration) * 100;
        barFill.style.width = `${Math.max(0, pct)}%`;
      }

      if (this.remainingSeconds <= 0) {
        this.clearAutoReset();
        this.triggerNewSession();
      }
    }, 1000);

    sessionManager.registerTimer(this.resetTimer, true);
  }

  /**
   * Reset the auto-reset countdown back to full duration
   */
  resetAutoResetTimer() {
    if (this.isDestroyed || this.autoResetDuration <= 0) return;
    this.remainingSeconds = this.autoResetDuration;
    const counterText = this.container ? this.container.querySelector('#reset-counter-text') : null;
    const barFill = this.container ? this.container.querySelector('#reset-bar-fill') : null;
    if (counterText) counterText.textContent = `${this.remainingSeconds}s`;
    if (barFill) barFill.style.width = '100%';
  }

  clearAutoReset() {
    if (this.resetTimer) {
      clearInterval(this.resetTimer);
      sessionManager.unregisterTimer(this.resetTimer);
      this.resetTimer = null;
    }
  }

  /**
   * Trigger clean new session transition
   */
  triggerNewSession() {
    if (this.isResetting || this.isDestroyed) return;
    this.isResetting = true;
    this.clearAutoReset();

    if (this.onNewSession) {
      this.onNewSession();
    }
  }

  destroy() {
    this.isDestroyed = true;
    this.clearAutoReset();

    if (this.interactionHandler) {
      window.removeEventListener('pointerdown', this.interactionHandler);
      window.removeEventListener('touchstart', this.interactionHandler);
      window.removeEventListener('keydown', this.interactionHandler);
      this.interactionHandler = null;
    }

    this.isResetting = false;
    this.isDownloading = false;
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
}
