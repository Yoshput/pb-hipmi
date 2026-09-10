/**
 * HIPMI Telkom University - Photo History & Gallery Modal
 * Allows operators and guests to browse, inspect, re-download,
 * and share past photos stored persistently in device IndexedDB storage.
 */

import { historyStorage } from '../engine/historyStorage.js';
import { QREngine } from '../engine/qrEngine.js';
import { escapeHtml, sanitizeFilename } from '../utils/sanitize.js';

export class HistoryModal {
  constructor({ eventConfig, onClose }) {
    this.eventConfig = eventConfig;
    this.onClose = onClose;
    this.container = null;
    this.items = [];
    this.stats = { count: 0, formattedSize: '0 KB' };
  }

  async render() {
    const div = document.createElement('div');
    div.className = 'modal-backdrop view-enter history-modal-backdrop';
    this.container = div;

    div.innerHTML = `
      <div class="modal-content history-modal-content">
        <!-- Modal Header -->
        <div class="modal-header history-modal-header">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <h2 class="modal-title" style="margin: 0;">Riwayat Foto Booth</h2>
              <span class="history-badge-count" id="history-total-badge">0 Foto</span>
            </div>
            <p style="font-size: 13px; color: #8E8E93; margin-top: 4px;" id="history-stats-subtitle">
              Penyimpanan lokal perangkat (IndexedDB)
            </p>
          </div>
          <button class="icon-btn" id="history-close-btn" aria-label="Close modal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Action Toolbar -->
        <div class="history-toolbar">
          <div class="history-toolbar-left">
            <span style="font-size: 13px; font-weight: 600; color: var(--color-secondary);" id="history-storage-size">
              Memori: 0 MB
            </span>
          </div>
          <div class="history-toolbar-right">
            <button class="btn-secondary history-tool-btn" id="btn-history-download-all" title="Unduh Semua Foto">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Unduh Semua
            </button>
            <button class="btn-secondary history-tool-btn history-danger-btn" id="btn-history-clear-all" title="Bersihkan Seluruh Riwayat">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              Hapus Semua
            </button>
          </div>
        </div>

        <!-- History Content Area -->
        <div class="history-content-scroll" id="history-items-container">
          <div class="history-loading-indicator">
            <svg class="pulse-indicator" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
            <span>Memuat riwayat foto...</span>
          </div>
        </div>
      </div>

      <!-- Fullscreen Lightbox & QR Preview Overlay -->
      <div class="history-lightbox-overlay" id="history-lightbox" style="display: none;">
        <div class="history-lightbox-card">
          <button class="icon-btn history-lightbox-close" id="history-lightbox-close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div id="history-lightbox-content"></div>
        </div>
      </div>
    `;

    // Bind Close
    const closeBtn = div.querySelector('#history-close-btn');
    closeBtn.addEventListener('click', () => this.close());

    // Bind Backdrop Click (outside modal)
    div.addEventListener('click', (e) => {
      if (e.target === div) this.close();
    });

    // Escape Key to close
    this._keyHandler = (e) => {
      if (e.key === 'Escape') this.close();
    };
    window.addEventListener('keydown', this._keyHandler);

    // Initial Load of Items
    this.refreshHistory();

    return div;
  }

  /**
   * Fetch and render history items from IndexedDB
   */
  async refreshHistory() {
    if (!this.container) return;

    const container = this.container.querySelector('#history-items-container');
    const totalBadge = this.container.querySelector('#history-total-badge');
    const statsSubtitle = this.container.querySelector('#history-stats-subtitle');
    const storageSize = this.container.querySelector('#history-storage-size');
    const downloadAllBtn = this.container.querySelector('#btn-history-download-all');
    const clearAllBtn = this.container.querySelector('#btn-history-clear-all');

    this.items = await historyStorage.getAll();
    this.stats = await historyStorage.getStats();

    totalBadge.textContent = `${this.stats.count} Foto`;
    storageSize.textContent = `Memori: ${this.stats.formattedSize}`;
    statsSubtitle.textContent = `${this.stats.count} foto tersimpan secara lokal di perangkat ini`;

    if (this.items.length === 0) {
      downloadAllBtn.disabled = true;
      downloadAllBtn.style.opacity = '0.5';
      clearAllBtn.disabled = true;
      clearAllBtn.style.opacity = '0.5';

      container.innerHTML = `
        <div class="history-empty-state">
          <div class="history-empty-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
          <h3 style="font-size: 18px; font-weight: 800; color: var(--color-primary); margin-bottom: 6px;">
            Belum Ada Foto Tersimpan
          </h3>
          <p style="font-size: 14px; color: var(--color-secondary); max-width: 360px; line-height: 1.5;">
            Foto yang diambil di photobooth akan otomatis tersimpan di sini secara aman.
          </p>
        </div>
      `;
      return;
    }

    downloadAllBtn.disabled = false;
    downloadAllBtn.style.opacity = '1';
    clearAllBtn.disabled = false;
    clearAllBtn.style.opacity = '1';

    let gridHtml = '<div class="history-grid">';
    this.items.forEach((item) => {
      const safeId = escapeHtml(item.id);
      const safeName = escapeHtml(item.participantName);
      const safeDate = escapeHtml(item.dateFormatted);
      const safeTemplate = escapeHtml(item.templateId || 'signature');
      const thumbUrl = item.thumbnailDataUrl || item.finalDataUrl;
      const isUploaded = Boolean(item.uploadedUrl);

      gridHtml += `
        <div class="history-card" data-id="${safeId}">
          <div class="history-thumb-wrap" data-action="preview" data-id="${safeId}">
            <img src="${thumbUrl}" alt="${safeName}" class="history-thumb-img" loading="lazy" />
            <div class="history-thumb-overlay">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
              <span>Lihat Detail</span>
            </div>
            ${isUploaded ? `<span class="history-cloud-tag" title="Tersedia di Cloud">☁️ Cloud</span>` : ''}
          </div>

          <div class="history-card-body">
            <div class="history-card-header">
              <span class="history-card-name" title="${safeName}">${safeName}</span>
              <span class="history-card-template">${safeTemplate}</span>
            </div>
            <div class="history-card-meta">
              <span>${safeDate}</span>
              <span style="font-family: monospace; font-size: 11px;">#${safeId.slice(-6)}</span>
            </div>

            <div class="history-card-actions">
              <button class="history-mini-btn btn-primary" data-action="download" data-id="${safeId}" title="Unduh Foto">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Unduh
              </button>

              <button class="history-mini-btn btn-secondary" data-action="qr" data-id="${safeId}" title="Tampilkan QR Code HP">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                QR
              </button>

              <button class="history-mini-btn history-delete-btn" data-action="delete" data-id="${safeId}" title="Hapus Foto">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;
    });
    gridHtml += '</div>';

    container.innerHTML = gridHtml;

    // Attach Event Handlers
    this._attachItemListeners(container);

    // Bind Clear All
    clearAllBtn.onclick = async () => {
      if (confirm(`Yakin ingin menghapus seluruh ${this.items.length} riwayat foto dari perangkat ini? Tindakan ini tidak dapat dibatalkan.`)) {
        await historyStorage.clearAll();
        await this.refreshHistory();
      }
    };

    // Bind Download All
    downloadAllBtn.onclick = () => this._downloadAllPhotos();
  }

  /**
   * Event delegation for card actions
   */
  _attachItemListeners(container) {
    container.addEventListener('click', async (e) => {
      const actionEl = e.target.closest('[data-action]');
      if (!actionEl) return;

      e.preventDefault();
      e.stopPropagation();

      const action = actionEl.getAttribute('data-action');
      const id = actionEl.getAttribute('data-id');
      const item = this.items.find((i) => i.id === id);
      if (!item) return;

      if (action === 'preview') {
        this._showPreviewLightbox(item);
      } else if (action === 'download') {
        this._downloadSinglePhoto(item);
      } else if (action === 'qr') {
        this._showQrLightbox(item);
      } else if (action === 'delete') {
        if (confirm(`Hapus foto sesi ${item.participantName} (${item.id})?`)) {
          await historyStorage.deleteById(item.id);
          await this.refreshHistory();
        }
      }
    });
  }

  /**
   * Download single photo with sanitized filename
   */
  _downloadSinglePhoto(item) {
    const filename = sanitizeFilename(item.participantName || 'HIPMI', item.id);
    const link = document.createElement('a');
    link.href = item.finalDataUrl;
    link.download = `${filename}.png`;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      if (link.parentNode) link.parentNode.removeChild(link);
    }, 200);
  }

  /**
   * Sequential download of all photos with small delay
   */
  async _downloadAllPhotos() {
    if (this.items.length === 0) return;

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      this._downloadSinglePhoto(item);
      // Wait 300ms between downloads so browser doesn't block multi-download
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }

  /**
   * Show full high-resolution image lightbox
   */
  _showPreviewLightbox(item) {
    const overlay = this.container.querySelector('#history-lightbox');
    const content = this.container.querySelector('#history-lightbox-content');
    const closeBtn = this.container.querySelector('#history-lightbox-close');

    const safeName = escapeHtml(item.participantName);
    const safeDate = escapeHtml(item.dateFormatted);
    const safeId = escapeHtml(item.id);

    content.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; max-width: 90vw; max-height: 85vh;">
        <div style="max-height: 72vh; border-radius: 8px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.5); margin-bottom: 16px;">
          <img src="${item.finalDataUrl}" alt="${safeName}" style="max-height: 72vh; max-width: 100%; object-fit: contain; display: block;" />
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; max-width: 480px;">
          <div>
            <h4 style="font-size: 16px; font-weight: 800; color: #FFFFFF; margin: 0;">${safeName}</h4>
            <p style="font-size: 12px; color: #9E9EA7; margin: 2px 0 0;">${safeDate} • #${safeId}</p>
          </div>
          <button class="btn-primary btn-accent" id="lightbox-download-btn" style="min-height: 42px; padding: 0 20px; font-size: 13px;">
            Unduh PNG
          </button>
        </div>
      </div>
    `;

    overlay.style.display = 'flex';

    content.querySelector('#lightbox-download-btn').onclick = () => {
      this._downloadSinglePhoto(item);
    };

    closeBtn.onclick = () => {
      overlay.style.display = 'none';
      content.innerHTML = '';
    };

    overlay.onclick = (e) => {
      if (e.target === overlay) {
        overlay.style.display = 'none';
        content.innerHTML = '';
      }
    };
  }

  /**
   * Show QR Code for scanning on mobile phone
   */
  async _showQrLightbox(item) {
    const overlay = this.container.querySelector('#history-lightbox');
    const content = this.container.querySelector('#history-lightbox-content');
    const closeBtn = this.container.querySelector('#history-lightbox-close');

    const safeName = escapeHtml(item.participantName);
    const safeId = escapeHtml(item.id);

    // Generate scannable hosted/cloud session URL
    const qrUrl = QREngine.getSessionPhotoUrl(item.id, item.uploadedUrl, this.eventConfig);

    content.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; padding: 16px; text-align: center; max-width: 400px;">
        <div style="background: rgba(200,168,75,0.15); border: 1px solid rgba(200,168,75,0.4); color: var(--color-accent); font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 9999px; margin-bottom: 12px;">
          SCAN DENGAN SMARTPHONE
        </div>
        <h3 style="font-size: 20px; font-weight: 900; color: #FFFFFF; margin-bottom: 4px;">${safeName}</h3>
        <p style="font-size: 12px; color: #8E8E93; margin-bottom: 20px;">Sesi #${safeId}</p>

        <div style="background: #FFFFFF; padding: 16px; border-radius: 16px; box-shadow: 0 16px 40px rgba(0,0,0,0.5); margin-bottom: 16px;">
          <canvas id="history-qr-canvas" style="width: 220px; height: 220px; display: block;"></canvas>
        </div>

        <p style="font-size: 12px; color: #C5C5CA; margin-bottom: 16px; line-height: 1.4;">
          Arahkan kamera smartphone ke QR Code di atas untuk mengunduh foto ini ke HP.
        </p>

        <div style="display: flex; gap: 8px; width: 100%;">
          <a href="${qrUrl}" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="flex: 1; min-height: 42px; font-size: 13px; color: #FFFFFF; border-color: rgba(255,255,255,0.25);">
            Buka Tautan
          </a>
        </div>
      </div>
    `;

    overlay.style.display = 'flex';

    const canvas = content.querySelector('#history-qr-canvas');
    try {
      await QREngine.renderToCanvas(canvas, qrUrl, { width: 220 });
    } catch (err) {
      console.warn('QR render in history error:', err);
    }

    closeBtn.onclick = () => {
      overlay.style.display = 'none';
      content.innerHTML = '';
    };

    overlay.onclick = (e) => {
      if (e.target === overlay) {
        overlay.style.display = 'none';
        content.innerHTML = '';
      }
    };
  }

  close() {
    if (this._keyHandler) {
      window.removeEventListener('keydown', this._keyHandler);
    }
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    if (this.onClose) this.onClose();
  }
}
