import { canvasRenderer } from './canvasRenderer.js';

class SessionManager {
  constructor() {
    this.currentSession = null;
    this.createdObjectUrls = new Set();
    this.activeTimers = new Set();
    this.listeners = new Set();
  }

  /**
   * Start a brand new, clean photobooth session
   */
  startNewSession(config, customPhotoCount = null) {
    this.cleanupCurrentSession();

    const timestamp = Date.now();
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    const sessionId = `HIPMI-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${randomHex}`;

    const totalSlots = (Number.isInteger(customPhotoCount) && customPhotoCount > 0)
      ? customPhotoCount
      : (config?.photoCount || 4);

    let defaultTemplateId = "signature";
    if (totalSlots === 1) defaultTemplateId = "pkkmb-single";
    else if (totalSlots === 3) defaultTemplateId = "pkkmb-grunge";
    else if (totalSlots === 4) defaultTemplateId = "pkkmb-gold";

    this.currentSession = {
      sessionId,
      startedAt: timestamp,
      totalSlots,
      currentCaptureIndex: 0,
      photos: [], // Array of { index, blob, objectUrl, dataUrl }
      selectedTemplateId: defaultTemplateId,
      customization: {
        name: "",
        eventName: config?.eventName || "Entrepreneur Summit 2026",
        message: ""
      },
      finalBlob: null,
      finalObjectUrl: null,
      finalDataUrl: null,
      isCompleted: false
    };

    this._notify();
    return this.currentSession;
  }

  getSession() {
    return this.currentSession;
  }

  /**
   * Store a captured photo for a specific index
   */
  addPhoto(index, blob, dataUrl) {
    if (!this.currentSession) return;

    // Create object URL and track for cleanup
    const objectUrl = URL.createObjectURL(blob);
    this.createdObjectUrls.add(objectUrl);

    // If a photo already exists at this index (e.g. retake), revoke old object URL
    const existingIndex = this.currentSession.photos.findIndex(p => p.index === index);
    if (existingIndex !== -1) {
      const oldPhoto = this.currentSession.photos[existingIndex];
      if (oldPhoto.objectUrl) {
        URL.revokeObjectURL(oldPhoto.objectUrl);
        this.createdObjectUrls.delete(oldPhoto.objectUrl);
      }
      this.currentSession.photos[existingIndex] = { index, blob, objectUrl, dataUrl };
    } else {
      this.currentSession.photos.push({ index, blob, objectUrl, dataUrl });
      // Sort by index
      this.currentSession.photos.sort((a, b) => a.index - b.index);
    }

    this._notify();
  }

  /**
   * Get photo by slot index
   */
  getPhoto(index) {
    if (!this.currentSession) return null;
    return this.currentSession.photos.find(p => p.index === index) || null;
  }

  /**
   * Set template selection
   */
  setTemplate(templateId) {
    if (!this.currentSession) return;
    this.currentSession.selectedTemplateId = templateId;
    this._notify();
  }

  /**
   * Update participant customization
   */
  setCustomization(data) {
    if (!this.currentSession) return;
    this.currentSession.customization = {
      ...this.currentSession.customization,
      ...data
    };
    this._notify();
  }

  /**
   * Store final rendered composition
   */
  setFinalResult(blob, dataUrl) {
    if (!this.currentSession) return;

    if (this.currentSession.finalObjectUrl) {
      URL.revokeObjectURL(this.currentSession.finalObjectUrl);
      this.createdObjectUrls.delete(this.currentSession.finalObjectUrl);
    }

    const objectUrl = URL.createObjectURL(blob);
    this.createdObjectUrls.add(objectUrl);

    this.currentSession.finalBlob = blob;
    this.currentSession.finalObjectUrl = objectUrl;
    this.currentSession.finalDataUrl = dataUrl;
    this.currentSession.isCompleted = true;
    this._notify();
  }

  /**
   * Register a timer for safe cleanup
   */
  registerTimer(timerId, isInterval = false) {
    this.activeTimers.add({ id: timerId, isInterval });
    return timerId;
  }

  /**
   * Unregister a single timer that finished naturally
   */
  unregisterTimer(timerId) {
    for (const item of this.activeTimers) {
      if (item.id === timerId) {
        this.activeTimers.delete(item);
        break;
      }
    }
  }

  /**
   * Clear all active timeouts and intervals
   */
  clearAllTimers() {
    this.activeTimers.forEach(item => {
      try {
        if (item.isInterval) {
          clearInterval(item.id);
        } else {
          clearTimeout(item.id);
        }
      } catch (err) {
        // Handled
      }
    });
    this.activeTimers.clear();
  }

  /**
   * Complete memory cleanup and reset
   */
  cleanupCurrentSession() {
    this.clearAllTimers();

    // Revoke all tracked Object URLs
    this.createdObjectUrls.forEach(url => {
      try {
        URL.revokeObjectURL(url);
      } catch (err) {
        // Ignored
      }
    });
    this.createdObjectUrls.clear();

    // Evict cached session photos from canvas renderer to release memory
    try {
      canvasRenderer.clearCache(true);
    } catch (err) {
      // Ignored
    }

    this.currentSession = null;
    this._notify();
  }

  /**
   * Centralized resetSession() method
   */
  resetSession() {
    this.cleanupCurrentSession();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  _notify() {
    this.listeners.forEach(fn => {
      try {
        fn(this.currentSession);
      } catch (e) {
        console.error("Session listener error:", e);
      }
    });
  }
}

export const sessionManager = new SessionManager();
