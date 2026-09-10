/**
 * HIPMI Telkom University - Operator Settings Modal
 * Comprehensive administrative controls: camera device selection, session timers,
 * public hosting URL, cloud image hosting provider (ImgBB / custom endpoint), and local history.
 */

import { cameraManager } from '../engine/cameraManager.js';
import { saveEventConfig } from '../config/eventConfig.js';
import { CloudUploadEngine } from '../engine/cloudUploadEngine.js';
import { historyStorage } from '../engine/historyStorage.js';
import { escapeHtml } from '../utils/sanitize.js';

export class OperatorModal {
  constructor({ eventConfig, onConfigUpdated, onOpenHistory, onClose }) {
    this.eventConfig = eventConfig;
    this.onConfigUpdated = onConfigUpdated;
    this.onOpenHistory = onOpenHistory;
    this.onClose = onClose;
    this.container = null;
    this.isTesting = false;
  }

  async render() {
    const div = document.createElement('div');
    div.className = 'modal-backdrop view-enter';
    this.container = div;

    // Fetch camera devices
    const devices = await cameraManager.getDevices();
    let deviceOptionsHtml = `<option value="">Auto / Default Camera</option>`;
    devices.forEach((d, i) => {
      const isSelected = d.deviceId === this.eventConfig.selectedCameraId;
      deviceOptionsHtml += `<option value="${escapeHtml(d.deviceId)}" ${isSelected ? 'selected' : ''}>${escapeHtml(d.label || `Camera ${i + 1}`)}</option>`;
    });

    // Get current history count
    const stats = await historyStorage.getStats();

    const curProvider = this.eventConfig.cloudProvider || 'none';

    div.innerHTML = `
      <div class="modal-content" style="max-width: 580px; max-height: 90vh; overflow-y: auto;">
        <div class="modal-header">
          <div>
            <h2 class="modal-title">Booth Operator Settings</h2>
            <p style="font-size: 13px; color: #8E8E93; margin-top: 2px;">HIPMI PT Telkom University Event Controls</p>
          </div>
          <button class="icon-btn" id="modal-close-btn" aria-label="Close modal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Section: Riwayat Foto Lokal -->
        <div style="background: #F8F9FA; border: 1.5px solid var(--color-border); border-radius: 12px; padding: 16px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between;">
          <div>
            <div style="font-size: 14px; font-weight: 800; color: var(--color-primary); display: flex; align-items: center; gap: 6px;">
              <span>📁 Riwayat Foto Lokal</span>
              <span style="font-size: 11px; padding: 2px 8px; border-radius: 9999px; background: rgba(200,168,75,0.2); color: var(--color-accent-dark); font-weight: 700;">
                ${stats.count} Tersimpan
              </span>
            </div>
            <p style="font-size: 12px; color: var(--color-secondary); margin: 2px 0 0;">
              Total penyimpanan: ${stats.formattedSize} (IndexedDB perangkat)
            </p>
          </div>
          <button type="button" class="btn-primary btn-accent" id="btn-open-history-from-operator" style="min-height: 38px; padding: 0 16px; font-size: 13px;">
            Buka Galeri
          </button>
        </div>

        <form id="operator-form">
          <!-- General Booth Info -->
          <div class="form-group">
            <label class="form-label" for="cfg-event-name">Event Name</label>
            <input type="text" id="cfg-event-name" class="form-input" value="${escapeHtml(this.eventConfig.eventName)}" required />
          </div>

          <div class="form-group">
            <label class="form-label" for="cfg-event-year">Year</label>
            <input type="text" id="cfg-event-year" class="form-input" value="${escapeHtml(this.eventConfig.year)}" required />
          </div>

          <!-- Camera & Timing -->
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
            <div class="form-group">
              <label class="form-label" for="cfg-photo-count">Photos Per Session</label>
              <select id="cfg-photo-count" class="form-select">
                <option value="1" ${this.eventConfig.photoCount === 1 ? 'selected' : ''}>1 Photo</option>
                <option value="2" ${this.eventConfig.photoCount === 2 ? 'selected' : ''}>2 Photos</option>
                <option value="3" ${this.eventConfig.photoCount === 3 ? 'selected' : ''}>3 Photos</option>
                <option value="4" ${this.eventConfig.photoCount === 4 ? 'selected' : ''}>4 Photos (Default)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="cfg-countdown">Countdown Timer</label>
              <select id="cfg-countdown" class="form-select">
                <option value="3" ${this.eventConfig.countdownSeconds === 3 ? 'selected' : ''}>3 Seconds (Default)</option>
                <option value="5" ${this.eventConfig.countdownSeconds === 5 ? 'selected' : ''}>5 Seconds</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="cfg-auto-reset">Result Auto-Reset Duration</label>
            <select id="cfg-auto-reset" class="form-select">
              <option value="10" ${this.eventConfig.autoResetSeconds === 10 ? 'selected' : ''}>10 Seconds</option>
              <option value="15" ${this.eventConfig.autoResetSeconds === 15 ? 'selected' : ''}>15 Seconds (Default)</option>
              <option value="30" ${this.eventConfig.autoResetSeconds === 30 ? 'selected' : ''}>30 Seconds</option>
              <option value="0" ${this.eventConfig.autoResetSeconds === 0 ? 'selected' : ''}>Disabled (Manual Only)</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="cfg-camera-device">Camera Device</label>
            <select id="cfg-camera-device" class="form-select">
              ${deviceOptionsHtml}
            </select>
          </div>

          <div class="form-group" style="flex-direction: row; align-items: center; justify-content: space-between; padding: 8px 0;">
            <label class="form-label" style="margin: 0;" for="cfg-mirror">Mirror Camera Feed (Selfie Mode)</label>
            <input type="checkbox" id="cfg-mirror" ${this.eventConfig.mirrorCamera !== false ? 'checked' : ''} style="width: 20px; height: 20px; accent-color: var(--color-accent);" />
          </div>

          <!-- Section: Hosting & QR Scan Experience -->
          <div style="border-top: 1.5px solid var(--color-border); margin: 20px 0 16px; padding-top: 16px;">
            <div style="font-size: 13px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; color: var(--color-accent-dark); margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
              <span>🌐 Integrasi Hosting & Scan QR Code</span>
            </div>

            <div class="form-group">
              <label class="form-label" for="cfg-hosting-url">
                Public Hosting Domain (URL Website)
              </label>
              <input
                type="url"
                id="cfg-hosting-url"
                class="form-input"
                placeholder="https://photobooth.hipmitelku.com"
                value="${escapeHtml(this.eventConfig.hostingUrl || '')}"
              />
              <span style="font-size: 11px; color: var(--color-secondary); margin-top: 4px;">
                Jika diisi, QR Code di booth akan otomatis mengarah ke domain ini (bukan localhost) saat di-scan smartphone.
              </span>
            </div>

            <div class="form-group">
              <label class="form-label" for="cfg-cloud-provider">Layanan Cloud Upload Foto</label>
              <select id="cfg-cloud-provider" class="form-select">
                <option value="none" ${curProvider === 'none' ? 'selected' : ''}>Offline / Tanpa Upload (Hanya Simpan di Booth)</option>
                <option value="imgbb" ${curProvider === 'imgbb' ? 'selected' : ''}>ImgBB API (Gratis, Tanpa Backend Server)</option>
                <option value="custom" ${curProvider === 'custom' ? 'selected' : ''}>Custom Hosting Endpoint (API / PHP Sendiri)</option>
              </select>
            </div>

            <!-- ImgBB API Key Field -->
            <div class="form-group" id="group-imgbb" style="display: ${curProvider === 'imgbb' ? 'block' : 'none'};">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
                <label class="form-label" for="cfg-imgbb-key" style="margin: 0;">API Key ImgBB</label>
                <a href="https://api.imgbb.com/" target="_blank" rel="noopener noreferrer" style="color: var(--color-accent); font-size: 11px; font-weight: 700; text-decoration: underline;">
                  Dapatkan API Key Gratis di imgbb.com &rarr;
                </a>
              </div>
              <input
                type="text"
                id="cfg-imgbb-key"
                class="form-input"
                placeholder="e.g. 7c2f8a9e1b3d..."
                value="${escapeHtml(this.eventConfig.imgbbApiKey || '')}"
              />
              <span style="font-size: 11px; color: var(--color-secondary); margin-top: 4px;">
                Foto akan diupload ke ImgBB secara otomatis dan URL foto disematkan ke QR code.
              </span>
            </div>

            <!-- Custom Endpoint Field -->
            <div class="form-group" id="group-custom" style="display: ${curProvider === 'custom' ? 'block' : 'none'};">
              <label class="form-label" for="cfg-custom-endpoint">Custom Upload Endpoint URL</label>
              <input
                type="url"
                id="cfg-custom-endpoint"
                class="form-input"
                placeholder="https://your-hosting.com/api/upload"
                value="${escapeHtml(this.eventConfig.customUploadEndpoint || '')}"
              />
              <span style="font-size: 11px; color: var(--color-secondary); margin-top: 4px;">
                Menerima POST multipart/form-data dengan field: 'photo', 'sessionId', 'name'.
              </span>
            </div>

            <div class="form-group">
              <label class="form-label" for="cfg-qr-target">Aksi Saat QR Di-Scan di HP</label>
              <select id="cfg-qr-target" class="form-select">
                <option value="viewer" ${this.eventConfig.qrTarget !== 'direct' ? 'selected' : ''}>
                  Halaman Web Mobile Eksklusif HIPMI (Preview, Download HD, Share)
                </option>
                <option value="direct" ${this.eventConfig.qrTarget === 'direct' ? 'selected' : ''}>
                  Buka File Foto Langsung (Direct Image File)
                </option>
              </select>
            </div>

            <!-- Test Connection Button & Result -->
            <div style="margin-top: 10px;">
              <button type="button" class="btn-secondary" id="btn-test-upload" style="font-size: 13px; padding: 0 16px; min-height: 40px; display: inline-flex; align-items: center; gap: 8px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                Uji Koneksi Upload
              </button>
              <div id="test-upload-status" style="margin-top: 8px; font-size: 12px; font-weight: 600; display: none;"></div>
            </div>
          </div>

          <div style="display: flex; gap: var(--space-sm); margin-top: var(--space-lg);">
            <button type="submit" class="btn-primary btn-accent" style="flex: 1;" id="btn-save-operator-settings">
              Save Settings
            </button>
            <button type="button" class="btn-secondary" id="btn-cancel-operator">
              Cancel
            </button>
          </div>
        </form>
      </div>
    `;

    // Toggle Cloud Input Fields
    const providerSelect = div.querySelector('#cfg-cloud-provider');
    const groupImgbb = div.querySelector('#group-imgbb');
    const groupCustom = div.querySelector('#group-custom');

    providerSelect.addEventListener('change', () => {
      const val = providerSelect.value;
      groupImgbb.style.display = val === 'imgbb' ? 'block' : 'none';
      groupCustom.style.display = val === 'custom' ? 'block' : 'none';
    });

    // Test Connection Button
    const testBtn = div.querySelector('#btn-test-upload');
    const testStatus = div.querySelector('#test-upload-status');
    testBtn.addEventListener('click', async () => {
      if (this.isTesting) return;
      this.isTesting = true;
      testBtn.classList.add('btn-disabled');
      testStatus.style.display = 'block';
      testStatus.style.color = 'var(--color-secondary)';
      testStatus.textContent = 'Menguji koneksi upload...';

      const tempConfig = {
        cloudProvider: providerSelect.value,
        imgbbApiKey: div.querySelector('#cfg-imgbb-key').value.trim(),
        customUploadEndpoint: div.querySelector('#cfg-custom-endpoint').value.trim()
      };

      const res = await CloudUploadEngine.testConnection(tempConfig);
      this.isTesting = false;
      testBtn.classList.remove('btn-disabled');

      if (res.success) {
        testStatus.style.color = '#10B981';
        testStatus.textContent = `✅ ${res.message}`;
      } else {
        testStatus.style.color = '#EF4444';
        testStatus.textContent = `❌ ${res.error}`;
      }
    });

    // Open History Button
    const openHistoryBtn = div.querySelector('#btn-open-history-from-operator');
    if (openHistoryBtn) {
      openHistoryBtn.addEventListener('click', () => {
        this.close();
        if (this.onOpenHistory) this.onOpenHistory();
      });
    }

    // Form Submit Listener
    const form = div.querySelector('#operator-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const updatedConfig = {
        ...this.eventConfig,
        eventName: div.querySelector('#cfg-event-name').value.trim(),
        year: div.querySelector('#cfg-event-year').value.trim(),
        photoCount: parseInt(div.querySelector('#cfg-photo-count').value, 10),
        countdownSeconds: parseInt(div.querySelector('#cfg-countdown').value, 10),
        autoResetSeconds: parseInt(div.querySelector('#cfg-auto-reset').value, 10),
        selectedCameraId: div.querySelector('#cfg-camera-device').value,
        mirrorCamera: div.querySelector('#cfg-mirror').checked,
        hostingUrl: div.querySelector('#cfg-hosting-url').value.trim(),
        cloudProvider: providerSelect.value,
        imgbbApiKey: div.querySelector('#cfg-imgbb-key').value.trim(),
        customUploadEndpoint: div.querySelector('#cfg-custom-endpoint').value.trim(),
        qrTarget: div.querySelector('#cfg-qr-target').value
      };

      saveEventConfig(updatedConfig);
      if (this.onConfigUpdated) this.onConfigUpdated(updatedConfig);
      this.close();
    });

    const closeBtn = div.querySelector('#modal-close-btn');
    closeBtn.addEventListener('click', () => this.close());

    const cancelBtn = div.querySelector('#btn-cancel-operator');
    cancelBtn.addEventListener('click', () => this.close());

    return div;
  }

  close() {
    if (this.isClosed) return;
    this.isClosed = true;
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    if (this.onClose) this.onClose();
  }
}
