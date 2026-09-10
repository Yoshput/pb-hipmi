/**
 * HIPMI Telkom University - Device Photo History Engine (IndexedDB)
 * Persistently stores full-resolution composite photos and lightweight thumbnails
 * locally on the booth device without the strict 5MB quota limitations of localStorage.
 */

const DB_NAME = 'hipmi_photobooth_db';
const DB_VERSION = 1;
const STORE_NAME = 'photo_history';

class HistoryStorage {
  constructor() {
    this.db = null;
    this.initPromise = null;
    this.memoryFallback = new Map(); // In-memory fallback if IndexedDB is disabled/unavailable
  }

  /**
   * Initialize IndexedDB connection
   */
  async init() {
    if (this.db) return this.db;
    if (this.initPromise) return this.initPromise;

    this.initPromise = new Promise((resolve) => {
      if (typeof indexedDB === 'undefined') {
        console.warn('IndexedDB not supported in this environment, falling back to memory storage.');
        resolve(null);
        return;
      }

      try {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            store.createIndex('createdAt', 'createdAt', { unique: false });
          }
        };

        request.onsuccess = (event) => {
          this.db = event.target.result;
          resolve(this.db);
        };

        request.onerror = (event) => {
          console.warn('IndexedDB failed to open:', event.target.error);
          resolve(null);
        };
      } catch (err) {
        console.warn('IndexedDB initialization exception:', err);
        resolve(null);
      }
    });

    return this.initPromise;
  }

  /**
   * Generate lightweight JPEG thumbnail for snappy gallery loading
   */
  async createThumbnail(dataUrl, maxDim = 420, quality = 0.72) {
    if (typeof document === 'undefined') return dataUrl;

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let w = img.naturalWidth || img.width;
          let h = img.naturalHeight || img.height;

          if (w > h) {
            if (w > maxDim) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            }
          } else {
            if (h > maxDim) {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
          }

          canvas.width = Math.max(1, w);
          canvas.height = Math.max(1, h);
          const ctx = canvas.getContext('2d');
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'medium';
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', quality));
        } catch (e) {
          resolve(dataUrl);
        }
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });
  }

  /**
   * Format date for Indonesian locale
   */
  _formatDate(timestamp) {
    const d = new Date(timestamp);
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
      'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
    ];
    const day = String(d.getDate()).padStart(2, '0');
    const month = months[d.getMonth()] || '';
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    return `${day} ${month} ${year}, ${hours}:${mins}`;
  }

  /**
   * Save completed booth session photo to device storage
   */
  async saveSession({
    sessionId,
    finalDataUrl,
    finalBlob = null,
    rawPhotos = [],
    customization = {},
    templateId = 'signature',
    uploadedUrl = ''
  }) {
    if (!sessionId || !finalDataUrl) {
      console.warn('saveSession called with missing sessionId or finalDataUrl');
      return null;
    }

    await this.init();

    // Generate lightweight thumbnail
    const thumbnailDataUrl = await this.createThumbnail(finalDataUrl);

    const now = Date.now();
    const record = {
      id: sessionId,
      createdAt: now,
      dateFormatted: this._formatDate(now),
      participantName: (customization.name || '').trim() || 'Tamu HIPMI',
      eventName: (customization.eventName || '').trim() || 'HIPMI Telkom Event',
      templateId,
      finalDataUrl,
      thumbnailDataUrl,
      uploadedUrl: uploadedUrl || '',
      photoCount: Array.isArray(rawPhotos) ? rawPhotos.length : 0,
      approxBytes: Math.round(finalDataUrl.length * 0.75)
    };

    if (!this.db) {
      this.memoryFallback.set(sessionId, record);
      return record;
    }

    return new Promise((resolve) => {
      try {
        const tx = this.db.transaction([STORE_NAME], 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.put(record);

        req.onsuccess = () => resolve(record);
        req.onerror = (e) => {
          console.warn('Error writing to IndexedDB:', e.target.error);
          this.memoryFallback.set(sessionId, record);
          resolve(record);
        };
      } catch (err) {
        console.warn('Transaction error in IndexedDB:', err);
        this.memoryFallback.set(sessionId, record);
        resolve(record);
      }
    });
  }

  /**
   * Update uploadedUrl for an existing session record
   */
  async updateUploadedUrl(sessionId, uploadedUrl) {
    if (!sessionId || !uploadedUrl) return;
    await this.init();

    if (!this.db) {
      const item = this.memoryFallback.get(sessionId);
      if (item) {
        item.uploadedUrl = uploadedUrl;
      }
      return;
    }

    return new Promise((resolve) => {
      try {
        const tx = this.db.transaction([STORE_NAME], 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const getReq = store.get(sessionId);

        getReq.onsuccess = () => {
          const record = getReq.result;
          if (record) {
            record.uploadedUrl = uploadedUrl;
            store.put(record);
          }
          resolve();
        };
        getReq.onerror = () => resolve();
      } catch (err) {
        resolve();
      }
    });
  }

  /**
   * Retrieve all photo history items sorted descending by date
   */
  async getAll() {
    await this.init();

    if (!this.db) {
      const items = Array.from(this.memoryFallback.values());
      return items.sort((a, b) => b.createdAt - a.createdAt);
    }

    return new Promise((resolve) => {
      try {
        const tx = this.db.transaction([STORE_NAME], 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.getAll();

        req.onsuccess = () => {
          const items = req.result || [];
          items.sort((a, b) => b.createdAt - a.createdAt);
          resolve(items);
        };

        req.onerror = () => {
          const items = Array.from(this.memoryFallback.values());
          resolve(items.sort((a, b) => b.createdAt - a.createdAt));
        };
      } catch (err) {
        const items = Array.from(this.memoryFallback.values());
        resolve(items.sort((a, b) => b.createdAt - a.createdAt));
      }
    });
  }

  /**
   * Get single history item by ID
   */
  async getById(sessionId) {
    if (!sessionId) return null;
    await this.init();

    if (!this.db) {
      return this.memoryFallback.get(sessionId) || null;
    }

    return new Promise((resolve) => {
      try {
        const tx = this.db.transaction([STORE_NAME], 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(sessionId);

        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(this.memoryFallback.get(sessionId) || null);
      } catch (err) {
        resolve(this.memoryFallback.get(sessionId) || null);
      }
    });
  }

  /**
   * Delete item by session ID
   */
  async deleteById(sessionId) {
    if (!sessionId) return false;
    await this.init();

    this.memoryFallback.delete(sessionId);

    if (!this.db) return true;

    return new Promise((resolve) => {
      try {
        const tx = this.db.transaction([STORE_NAME], 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.delete(sessionId);

        req.onsuccess = () => resolve(true);
        req.onerror = () => resolve(false);
      } catch (err) {
        resolve(false);
      }
    });
  }

  /**
   * Clear all history records from device storage
   */
  async clearAll() {
    await this.init();
    this.memoryFallback.clear();

    if (!this.db) return true;

    return new Promise((resolve) => {
      try {
        const tx = this.db.transaction([STORE_NAME], 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.clear();

        req.onsuccess = () => resolve(true);
        req.onerror = () => resolve(false);
      } catch (err) {
        resolve(false);
      }
    });
  }

  /**
   * Get approximate storage statistics
   */
  async getStats() {
    const items = await this.getAll();
    const count = items.length;
    let totalBytes = 0;

    items.forEach((item) => {
      if (item.approxBytes) {
        totalBytes += item.approxBytes;
      } else if (item.finalDataUrl) {
        totalBytes += Math.round(item.finalDataUrl.length * 0.75);
      }
    });

    let formattedSize = '0 KB';
    if (totalBytes > 1024 * 1024) {
      formattedSize = `${(totalBytes / (1024 * 1024)).toFixed(1)} MB`;
    } else if (totalBytes > 0) {
      formattedSize = `${Math.round(totalBytes / 1024)} KB`;
    }

    return {
      count,
      totalBytes,
      formattedSize
    };
  }
}

export const historyStorage = new HistoryStorage();
