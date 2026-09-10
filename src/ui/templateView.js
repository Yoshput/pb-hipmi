/**
 * HIPMI Telkom University - Screen 4: Template & Customization View
 * Real-time composite preview canvas with dynamic template switching and live typography customization.
 * Hardened with attribute escaping, timer cleanup, and async render protection.
 */

import { TEMPLATES } from '../config/templates.js';
import { canvasRenderer } from '../engine/canvasRenderer.js';
import { sessionManager } from '../engine/sessionManager.js';
import { escapeHtml } from '../utils/sanitize.js';

export class TemplateView {
  constructor({
    photos,
    selectedTemplateId = "signature",
    customization = {},
    eventConfig,
    onTemplateSelected,
    onCustomizationChanged,
    onContinue,
    onBack
  }) {
    this.photos = photos || [];
    this.selectedTemplateId = selectedTemplateId;
    this.customization = {
      name: customization.name || "",
      eventName: customization.eventName || eventConfig.eventName,
      message: customization.message || ""
    };
    this.eventConfig = eventConfig;
    this.onTemplateSelected = onTemplateSelected;
    this.onCustomizationChanged = onCustomizationChanged;
    this.onContinue = onContinue;
    this.onBack = onBack;

    this.container = null;
    this.previewCanvas = null;
    this.isRendering = false;
    this.renderDebounceTimer = null;
    this.isNavigating = false;
    this.isDestroyed = false;
  }

  render() {
    const div = document.createElement('div');
    div.className = 'view-container view-enter template-screen';
    this.container = div;

    const photoCount = this.photos.length || 4;

    // Auto-select best matching template for this layout if default signature
    if (!this.selectedTemplateId || this.selectedTemplateId === 'signature') {
      if (photoCount === 1) this.selectedTemplateId = 'pkkmb-single';
      else if (photoCount === 3) this.selectedTemplateId = 'pkkmb-grunge';
      else if (photoCount === 4) this.selectedTemplateId = 'pkkmb-gold';
    }

    // Smart ordering: put the most tailored templates for this photo count at the top
    const sortedTemplates = [...TEMPLATES].sort((a, b) => {
      const getPriority = (t) => {
        if (photoCount === 1) {
          if (t.id === 'pkkmb-single') return 10;
          if (t.id === 'polaroid' || t.id === 'signature') return 5;
        } else if (photoCount === 3) {
          if (t.id === 'newspaper') return 12;
          if (t.id === 'pkkmb-grunge') return 10;
          if (t.id === 'strip' || t.id === 'youth') return 5;
        } else if (photoCount === 4) {
          if (t.id === 'pkkmb-gold') return 10;
          if (t.id === 'signature' || t.id === 'bold') return 5;
        }
        return 0;
      };
      return getPriority(b) - getPriority(a);
    });

    let templatesHtml = '';
    sortedTemplates.forEach(t => {
      const isActive = t.id === this.selectedTemplateId;
      const isTopMatch = (photoCount === 1 && t.id === 'pkkmb-single') ||
                         (photoCount === 3 && (t.id === 'newspaper' || t.id === 'pkkmb-grunge')) ||
                         (photoCount === 4 && t.id === 'pkkmb-gold');
      const badgeText = isTopMatch ? `★ BEST FOR ${photoCount} FOTO` : (t.badge || t.category);

      templatesHtml += `
        <div class="template-card ${isActive ? 'active' : ''} ${isTopMatch ? 'highlight-match' : ''}" data-id="${escapeHtml(t.id)}" id="template-card-${escapeHtml(t.id)}">
          <div class="template-card-badge ${isTopMatch ? 'badge-match' : ''}">${escapeHtml(badgeText)}</div>
          <div class="template-card-name">${escapeHtml(t.name)}</div>
          <div class="template-card-desc">${escapeHtml(t.description)}</div>
        </div>
      `;
    });

    div.innerHTML = `
      <!-- Left Column: Live Canvas Preview -->
      <div class="template-preview-col">
        <div class="canvas-preview-wrapper" id="preview-wrapper">
          <canvas class="canvas-preview-element" id="preview-canvas"></canvas>
        </div>
      </div>

      <!-- Right Column: Template Selector & Customization Controls -->
      <div class="template-controls-col">
        <!-- Template Selection Section -->
        <div class="template-section-title">
          <span>Select Template</span>
          <span>${TEMPLATES.length} Styles</span>
        </div>
        <div class="template-list-grid">
          ${templatesHtml}
        </div>

        <!-- Realtime Customization Section -->
        <div class="customization-box">
          <div class="template-section-title">
            <span>Personalize</span>
            <span>Realtime</span>
          </div>

          <div class="form-group">
            <label class="form-label" for="input-name">Your Name</label>
            <input
              type="text"
              id="input-name"
              class="form-input"
              placeholder="e.g. Nadiv"
              value="${escapeHtml(this.customization.name)}"
              maxlength="30"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="input-event">Event Name</label>
            <input
              type="text"
              id="input-event"
              class="form-input"
              placeholder="e.g. Entrepreneur Summit 2026"
              value="${escapeHtml(this.customization.eventName)}"
              maxlength="40"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="input-message">Message / Quote (Optional)</label>
            <input
              type="text"
              id="input-message"
              class="form-input"
              placeholder="e.g. Make a moment. Build the future."
              value="${escapeHtml(this.customization.message)}"
              maxlength="50"
            />
          </div>
        </div>

        <!-- Bottom Action Buttons -->
        <div class="template-bottom-actions">
          <button class="btn-primary" id="btn-submit-template">
            Generate Final Photo
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>

          <button class="btn-secondary" id="btn-back-to-review">
            Back to Review
          </button>
        </div>
      </div>
    `;

    this.previewCanvas = div.querySelector('#preview-canvas');

    // Attach Template Selection Listeners
    const templateCards = div.querySelectorAll('.template-card');
    templateCards.forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const tid = card.getAttribute('data-id');
        if (tid === this.selectedTemplateId) return;

        templateCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        this.selectedTemplateId = tid;
        if (this.onTemplateSelected) this.onTemplateSelected(tid);
        this.scheduleRender();
      });
    });

    // Attach Customization Input Listeners
    const nameInput = div.querySelector('#input-name');
    const eventInput = div.querySelector('#input-event');
    const msgInput = div.querySelector('#input-message');

    const handleInput = () => {
      this.customization = {
        name: nameInput.value,
        eventName: eventInput.value || this.eventConfig.eventName,
        message: msgInput.value
      };
      if (this.onCustomizationChanged) {
        this.onCustomizationChanged(this.customization);
      }
      this.scheduleRender();
    };

    nameInput.addEventListener('input', handleInput);
    eventInput.addEventListener('input', handleInput);
    msgInput.addEventListener('input', handleInput);

    // Continue / Generate Final
    const submitBtn = div.querySelector('#btn-submit-template');
    submitBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      if (this.isNavigating || this.isDestroyed) return;
      this.isNavigating = true;
      submitBtn.classList.add('btn-disabled');
      submitBtn.innerHTML = `
        <svg class="pulse-indicator" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
        Preparing Photo...
      `;

      try {
        // High resolution final render
        const finalCanvas = await canvasRenderer.renderComposition({
          photos: this.photos,
          templateId: this.selectedTemplateId,
          customization: this.customization,
          eventConfig: this.eventConfig
        });

        if (this.isDestroyed) return;

        const blob = await canvasRenderer.exportBlob(finalCanvas, 'image/png', 0.96);
        const dataUrl = finalCanvas.toDataURL('image/png', 0.96);

        if (this.onContinue && !this.isDestroyed) {
          this.onContinue({ blob, dataUrl, finalCanvas });
        }
      } catch (err) {
        console.error("Error generating final canvas:", err);
        if (!this.isDestroyed) {
          submitBtn.classList.remove('btn-disabled');
          submitBtn.textContent = 'Generate Final Photo';
          this.isNavigating = false;
        }
      }
    });

    // Back to Review
    const backBtn = div.querySelector('#btn-back-to-review');
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.isNavigating || this.isDestroyed) return;
      this.isNavigating = true;
      backBtn.classList.add('btn-disabled');
      backBtn.disabled = true;
      this.destroy();
      if (this.onBack) this.onBack();
    });

    // Initial composition preview render
    this.scheduleRender(true);

    return div;
  }

  /**
   * Debounced render for preview canvas with cancellation token
   */
  scheduleRender(immediate = false) {
    if (this.renderDebounceTimer) {
      clearTimeout(this.renderDebounceTimer);
      sessionManager.unregisterTimer(this.renderDebounceTimer);
      this.renderDebounceTimer = null;
    }

    if (immediate) {
      this.renderPreview();
    } else {
      const timerId = setTimeout(() => {
        this.renderDebounceTimer = null;
        sessionManager.unregisterTimer(timerId);
        this.renderPreview();
      }, 100);
      this.renderDebounceTimer = timerId;
      sessionManager.registerTimer(timerId);
    }
  }

  async renderPreview() {
    if (!this.previewCanvas || this.isDestroyed) return;
    if (!this.renderSequenceId) this.renderSequenceId = 0;
    const currentSeq = ++this.renderSequenceId;
    this.isRendering = true;

    try {
      await canvasRenderer.renderComposition({
        photos: this.photos,
        templateId: this.selectedTemplateId,
        customization: this.customization,
        eventConfig: this.eventConfig,
        targetCanvas: this.previewCanvas
      });
    } catch (err) {
      console.warn("Preview render error:", err);
    } finally {
      if (currentSeq === this.renderSequenceId) {
        this.isRendering = false;
      }
    }
  }

  destroy() {
    this.isDestroyed = true;
    if (this.renderDebounceTimer) {
      clearTimeout(this.renderDebounceTimer);
      sessionManager.unregisterTimer(this.renderDebounceTimer);
      this.renderDebounceTimer = null;
    }
    this.isNavigating = false;
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
}
