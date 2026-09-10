/**
 * HIPMI Telkom University - Layout & Photo Count Selector View
 * Allows participants to choose between 1 Photo (Solo VIP), 3 Photos (Trio Strip),
 * or 4 Photos (Classic Grid/Ticket) before launching the camera.
 */

import { escapeHtml } from '../utils/sanitize.js';
import { soundEngine } from '../engine/audioEffects.js';

export class LayoutSelectView {
  constructor({ eventConfig, onSelectLayout, onBack }) {
    this.eventConfig = eventConfig;
    this.onSelectLayout = onSelectLayout;
    this.onBack = onBack;
    this.container = null;
    this.keyHandler = null;
    this.isSelecting = false;
  }

  render() {
    const div = document.createElement('div');
    div.className = 'view-container view-enter layout-select-screen';
    this.container = div;

    const orgName = escapeHtml(this.eventConfig.organization || 'HIPMI Telkom University');
    const eventName = escapeHtml(this.eventConfig.eventName || 'Entrepreneur Summit 2026');

    div.innerHTML = `
      <!-- Top Navigation Header Bar -->
      <header class="booth-header">
        <div class="brand-badge">
          <img src="${this.eventConfig.logoHipmi}" alt="HIPMI" class="brand-logo-mini" />
          <div class="brand-text-mini">
            <span class="brand-org">${orgName}</span>
            <span class="brand-event-name">${eventName}</span>
          </div>
        </div>
        <div class="header-actions">
          <button class="icon-btn" id="btn-layout-back" title="Kembali ke Beranda" aria-label="Kembali ke Beranda">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
        </div>
      </header>

      <!-- Main Layout Selection Container -->
      <main class="layout-select-main">
        <div class="layout-select-header">
          <div class="welcome-tag" style="margin-bottom: 8px;">
            <span class="welcome-tag-dot"></span>
            FORMAT SELECTION
          </div>
          <h1 class="layout-select-title">Mau Foto Berapa Pose?</h1>
          <p class="layout-select-subtitle">Pilih format frame foto yang kamu inginkan sebelum kamera dimulai.</p>
        </div>

        <!-- 3 Interactive Layout Cards Grid -->
        <div class="layout-cards-grid">
          <!-- CARD 1: 1 FOTO -->
          <div class="layout-card" data-count="1" tabindex="0" role="button" aria-label="Pilih 1 Foto Solo VIP">
            <div class="layout-card-badge">1 SHOT • SOLO VIP</div>
            
            <div class="layout-preview-box preview-1">
              <div class="wireframe-slot slot-1-full">
                <div class="wireframe-slot-overlay">
                  <span class="slot-num">1</span>
                  <span class="slot-label">SOLO VIP</span>
                </div>
              </div>
            </div>

            <div class="layout-card-info">
              <h2 class="layout-card-heading">1 Foto (Solo)</h2>
              <p class="layout-card-desc">1 Pose fokus penuh. Pas untuk foto profil elegan, VIP Pass, dan potret formal tunggal.</p>
              <div class="layout-card-meta">
                <span class="meta-tag">⚡ 1x Jepret Cepat</span>
                <span class="meta-tag">👑 Frame VIP Pass</span>
              </div>
            </div>

            <button class="btn-select-layout btn-select-1" tabindex="-1">
              Pilih 1 Foto
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          <!-- CARD 2: 3 FOTO -->
          <div class="layout-card layout-card-featured" data-count="3" tabindex="0" role="button" aria-label="Pilih 3 Foto Trio Strip">
            <div class="layout-card-badge badge-featured">3 SHOTS • FAVORIT 🔥</div>
            
            <div class="layout-preview-box preview-3">
              <div class="wireframe-strip">
                <div class="wireframe-slot slot-3"><span class="slot-num">1</span></div>
                <div class="wireframe-slot slot-3"><span class="slot-num">2</span></div>
                <div class="wireframe-slot slot-3"><span class="slot-num">3</span></div>
              </div>
            </div>

            <div class="layout-card-info">
              <h2 class="layout-card-heading">3 Foto (Trio Strip)</h2>
              <p class="layout-card-desc">3 Pose ekspresif! Format strip vertikal favorit dengan gaya Street Grunge & Pop-Art.</p>
              <div class="layout-card-meta">
                <span class="meta-tag">📸 3x Jepret</span>
                <span class="meta-tag">🎨 Street Grunge</span>
              </div>
            </div>

            <button class="btn-select-layout btn-select-3 btn-accent-fill" tabindex="-1">
              Pilih 3 Foto
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          <!-- CARD 3: 4 FOTO -->
          <div class="layout-card" data-count="4" tabindex="0" role="button" aria-label="Pilih 4 Foto Classic Grid & Ticket">
            <div class="layout-card-badge">4 SHOTS • SIGNATURE ⭐</div>
            
            <div class="layout-preview-box preview-4">
              <div class="wireframe-grid-4">
                <div class="wireframe-slot slot-4"><span class="slot-num">1</span></div>
                <div class="wireframe-slot slot-4"><span class="slot-num">2</span></div>
                <div class="wireframe-slot slot-4"><span class="slot-num">3</span></div>
                <div class="wireframe-slot slot-4"><span class="slot-num">4</span></div>
              </div>
            </div>

            <div class="layout-card-info">
              <h2 class="layout-card-heading">4 Foto (Classic)</h2>
              <p class="layout-card-desc">4 Pose lengkap! Format photobooth klasik & tiket PKKMB emas untuk foto bareng teman.</p>
              <div class="layout-card-meta">
                <span class="meta-tag">🎞️ 4x Jepret Lengkap</span>
                <span class="meta-tag">🏆 Gold Ticket 4</span>
              </div>
            </div>

            <button class="btn-select-layout btn-select-4" tabindex="-1">
              Pilih 4 Foto
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <!-- Footer Helper -->
        <div class="layout-select-footer">
          <button class="btn-ghost" id="btn-back-bottom">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Kembali ke Beranda
          </button>
          <span class="layout-tip">
            💡 <em>Desain template frame & nama masih bisa kamu pilih setelah foto selesai.</em>
          </span>
        </div>
      </main>
    `;

    // Bind selection clicks
    const cards = div.querySelectorAll('.layout-card');
    cards.forEach(card => {
      const choose = (e) => {
        e.preventDefault();
        if (this.isSelecting) return;
        this.isSelecting = true;
        soundEngine.playBeep();
        const count = parseInt(card.getAttribute('data-count'), 10) || 4;
        card.classList.add('selected');
        setTimeout(() => {
          if (this.onSelectLayout) {
            this.onSelectLayout(count);
          }
        }, 150);
      };

      card.addEventListener('click', choose);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          choose(e);
        }
      });
    });

    // Back buttons
    const backBtn = div.querySelector('#btn-layout-back');
    const backBottom = div.querySelector('#btn-back-bottom');
    const handleBack = (e) => {
      e.preventDefault();
      if (this.isSelecting) return;
      this.isSelecting = true;
      if (this.onBack) this.onBack();
    };

    if (backBtn) backBtn.addEventListener('click', handleBack);
    if (backBottom) backBottom.addEventListener('click', handleBack);

    // Keyboard Shortcuts (1, 3, 4, Esc)
    this.keyHandler = (e) => {
      if (this.isSelecting) return;
      if (e.key === '1') {
        const card1 = div.querySelector('.layout-card[data-count="1"]');
        if (card1) card1.click();
      } else if (e.key === '3') {
        const card3 = div.querySelector('.layout-card[data-count="3"]');
        if (card3) card3.click();
      } else if (e.key === '4') {
        const card4 = div.querySelector('.layout-card[data-count="4"]');
        if (card4) card4.click();
      } else if (e.key === 'Escape') {
        handleBack(e);
      }
    };
    window.addEventListener('keydown', this.keyHandler);

    return div;
  }

  destroy() {
    if (this.keyHandler) {
      window.removeEventListener('keydown', this.keyHandler);
      this.keyHandler = null;
    }
  }
}
