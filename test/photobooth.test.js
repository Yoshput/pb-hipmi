import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// Setup minimal browser mocks for Node environment
if (typeof globalThis.localStorage === 'undefined') {
  const store = new Map();
  globalThis.localStorage = {
    getItem: (k) => store.get(k) || null,
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k),
    clear: () => store.clear()
  };
}

import { sessionManager } from '../src/engine/sessionManager.js';
import { canvasRenderer } from '../src/engine/canvasRenderer.js';
import { historyStorage } from '../src/engine/historyStorage.js';
import { CloudUploadEngine } from '../src/engine/cloudUploadEngine.js';
import { QREngine } from '../src/engine/qrEngine.js';
import { escapeHtml, sanitizeFilename, truncateText } from '../src/utils/sanitize.js';
import { loadEventConfig, saveEventConfig, defaultEventConfig } from '../src/config/eventConfig.js';
import { TEMPLATES, getTemplateById } from '../src/config/templates.js';

describe('HIPMI Photobooth - Session Lifecycle & Memory Isolation', () => {
  beforeEach(() => {
    sessionManager.cleanupCurrentSession();
  });

  it('initializes a fresh session with valid HIPMI sessionId format', () => {
    const config = { photoCount: 4, eventName: 'Test Summit 2026' };
    const session = sessionManager.startNewSession(config);

    assert.ok(session);
    assert.match(session.sessionId, /^HIPMI-\d{8}-[A-Z0-9]{5}$/);
    assert.equal(session.totalSlots, 4);
    assert.equal(session.photos.length, 0);
    assert.equal(session.isCompleted, false);
  });

  it('correctly adds photos and maintains ascending slot order', () => {
    sessionManager.startNewSession({ photoCount: 3 });

    const blob1 = new Blob(['photo1'], { type: 'image/jpeg' });
    const blob2 = new Blob(['photo2'], { type: 'image/jpeg' });
    const blob0 = new Blob(['photo0'], { type: 'image/jpeg' });

    // Add out of order: slot 1, slot 2, slot 0
    sessionManager.addPhoto(1, blob1, 'data:image/jpeg;base64,1');
    sessionManager.addPhoto(2, blob2, 'data:image/jpeg;base64,2');
    sessionManager.addPhoto(0, blob0, 'data:image/jpeg;base64,0');

    const photos = sessionManager.getSession().photos;
    assert.equal(photos.length, 3);
    assert.equal(photos[0].index, 0);
    assert.equal(photos[1].index, 1);
    assert.equal(photos[2].index, 2);
  });

  it('handles single-photo retake correctly without changing other slots or count', () => {
    sessionManager.startNewSession({ photoCount: 3 });

    const b0 = new Blob(['p0'], { type: 'image/jpeg' });
    const b1 = new Blob(['p1'], { type: 'image/jpeg' });
    const b2 = new Blob(['p2'], { type: 'image/jpeg' });

    sessionManager.addPhoto(0, b0, 'data:p0');
    sessionManager.addPhoto(1, b1, 'data:p1');
    sessionManager.addPhoto(2, b2, 'data:p2');

    const initialUrl1 = sessionManager.getSession().photos[1].objectUrl;

    // Retake photo 1
    const retakeBlob1 = new Blob(['p1-retake'], { type: 'image/jpeg' });
    sessionManager.addPhoto(1, retakeBlob1, 'data:p1-retake');

    const updatedPhotos = sessionManager.getSession().photos;
    assert.equal(updatedPhotos.length, 3, 'Photo count must remain 3');
    assert.equal(updatedPhotos[0].dataUrl, 'data:p0', 'Photo 0 must be unchanged');
    assert.equal(updatedPhotos[1].dataUrl, 'data:p1-retake', 'Photo 1 must be updated');
    assert.equal(updatedPhotos[2].dataUrl, 'data:p2', 'Photo 2 must be unchanged');
    assert.notEqual(updatedPhotos[1].objectUrl, initialUrl1, 'Old objectUrl must be replaced');
  });

  it('completely clears session and revokes all object URLs upon cleanup', () => {
    sessionManager.startNewSession({ photoCount: 2 });
    sessionManager.addPhoto(0, new Blob(['p0']), 'data:p0');
    sessionManager.addPhoto(1, new Blob(['p1']), 'data:p1');
    sessionManager.setFinalResult(new Blob(['final']), 'data:final');

    assert.ok(sessionManager.createdObjectUrls.size > 0);

    sessionManager.cleanupCurrentSession();

    assert.equal(sessionManager.getSession(), null);
    assert.equal(sessionManager.createdObjectUrls.size, 0, 'All Object URLs must be revoked and cleared');
    assert.equal(sessionManager.activeTimers.size, 0, 'Active timers must be cleared');
  });

  it('50 consecutive sessions run without leaking object URLs', () => {
    for (let s = 1; s <= 50; s++) {
      sessionManager.startNewSession({ photoCount: 3 });
      sessionManager.addPhoto(0, new Blob([`p0-${s}`]), `data:0-${s}`);
      sessionManager.addPhoto(1, new Blob([`p1-${s}`]), `data:1-${s}`);
      sessionManager.addPhoto(2, new Blob([`p2-${s}`]), `data:2-${s}`);

      // Retake photo 1
      sessionManager.addPhoto(1, new Blob([`p1-retake-${s}`]), `data:1-retake-${s}`);
      sessionManager.setFinalResult(new Blob([`final-${s}`]), `data:final-${s}`);

      sessionManager.cleanupCurrentSession();

      assert.equal(sessionManager.createdObjectUrls.size, 0, `Leak detected at session ${s}`);
    }
  });
});

describe('HIPMI Photobooth - Input Sanitization & Safety', () => {
  it('escapes dangerous HTML characters to prevent XSS', () => {
    const malicious = '<script>alert("xss")</script>&<div onclick="evil()">\'"test"\'</div>';
    const escaped = escapeHtml(malicious);

    assert.ok(!escaped.includes('<script>'));
    assert.ok(!escaped.includes('</script>'));
    assert.ok(!escaped.includes('"'));
    assert.ok(!escaped.includes("'"));
    assert.ok(escaped.includes('&lt;script&gt;'));
  });

  it('sanitizes participant names into filesystem-safe filenames', () => {
    assert.equal(sanitizeFilename('Nadiv'), 'nadiv');
    assert.equal(sanitizeFilename('Muhammad Omar Nadiv'), 'muhammad_omar_nadiv');
    assert.equal(sanitizeFilename('../../etc/passwd'), 'etc_passwd');
    assert.equal(sanitizeFilename('!@#$%^&*()_+=~`'), '');
    assert.equal(sanitizeFilename('   leading and trailing   '), 'leading_and_trailing');
    assert.equal(sanitizeFilename('Very long participant name that exceeds the maximum length limit', 20), 'very_long_participan');
  });

  it('truncates text safely with ellipsis', () => {
    assert.equal(truncateText('Short', 10), 'Short');
    assert.equal(truncateText('Exact10chr', 10), 'Exact10chr');
    assert.equal(truncateText('This is a much longer string', 10), 'This is a…');
  });
});

describe('HIPMI Photobooth - Event Configuration Resilience', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns defaultEventConfig when localStorage is empty', () => {
    const config = loadEventConfig();
    assert.equal(config.organization, defaultEventConfig.organization);
    assert.equal(config.photoCount, defaultEventConfig.photoCount);
  });

  it('safely recovers from corrupted localStorage without throwing', () => {
    localStorage.setItem('hipmi_photobooth_v1_config', '{ corrupted json invalid :::');
    const config = loadEventConfig();
    assert.ok(config);
    assert.equal(config.organization, defaultEventConfig.organization);
  });

  it('enforces bounds on photoCount, countdownSeconds, and autoResetSeconds', () => {
    saveEventConfig({
      organization: 'Custom Org',
      photoCount: 999, // Out of bounds
      countdownSeconds: -5, // Out of bounds
      autoResetSeconds: 500 // Out of bounds
    });

    const loaded = loadEventConfig();
    assert.equal(loaded.organization, 'Custom Org');
    assert.equal(loaded.photoCount, defaultEventConfig.photoCount);
    assert.equal(loaded.countdownSeconds, defaultEventConfig.countdownSeconds);
    assert.equal(loaded.autoResetSeconds, defaultEventConfig.autoResetSeconds);
  });
});

describe('HIPMI Photobooth - Template Layout Geometry & Bounds', () => {
  it('all 12 templates are defined with required properties', () => {
    assert.equal(TEMPLATES.length, 12);
    const expectedIds = [
      'signature', 'bold', 'business', 'youth', 'strip', 'polaroid',
      'pkkmb-gold', 'pkkmb-grunge', 'pkkmb-single', 'newspaper',
      'breaking-news', 'photoism-dark'
    ];
    expectedIds.forEach(id => {
      const t = getTemplateById(id);
      assert.ok(t, `Template ${id} must exist`);
      assert.ok(t.width > 0, `Template ${id} width must be > 0`);
      assert.ok(t.height > 0, `Template ${id} height must be > 0`);
      assert.equal(typeof t.getSlots, 'function', `Template ${id} getSlots must be a function`);
    });
  });

  it('all template slots fit inside canvas bounds without clipping across photo counts', () => {
    const photoCounts = [1, 2, 3, 4];

    TEMPLATES.forEach(template => {
      photoCounts.forEach(count => {
        const slots = template.getSlots(count);
        if (template.id === 'pkkmb-gold' || template.id === 'breaking-news' || template.id === 'photoism-dark') {
          assert.equal(slots.length, 4, `${template.id} must always return 4 physical slots`);
        } else if (template.id === 'pkkmb-grunge' || template.id === 'newspaper') {
          assert.equal(slots.length, 3, `${template.id} must always return 3 physical slots`);
        } else if (template.id === 'pkkmb-single') {
          assert.equal(slots.length, 1, 'pkkmb-single must always return 1 physical slot');
        } else {
          assert.equal(slots.length, count, `Template ${template.id} with photoCount=${count} must return exactly ${count} slots`);
        }

        slots.forEach((slot, idx) => {
          assert.ok(slot.width > 0, `Slot ${idx} width must be > 0`);
          assert.ok(slot.height > 0, `Slot ${idx} height must be > 0`);
          assert.ok(slot.x >= 0, `Slot ${idx} x (${slot.x}) must be >= 0 in ${template.id}`);
          assert.ok(slot.y >= 0, `Slot ${idx} y (${slot.y}) must be >= 0 in ${template.id}`);

          const right = slot.x + slot.width;
          const bottom = slot.y + slot.height;

          assert.ok(
            right <= template.width,
            `Slot ${idx} right (${right}) exceeds canvas width (${template.width}) in template ${template.id} (count=${count})`
          );

          assert.ok(
            bottom <= template.height,
            `Slot ${idx} bottom (${bottom}) exceeds canvas height (${template.height}) in template ${template.id} (count=${count})`
          );
        });
      });
    });
  });

  it('youth template 3-photo configuration spans full height cleanly without large empty gap', () => {
    const youth = getTemplateById('youth');
    const slots = youth.getSlots(3);
    const bottom0 = slots[0].y + slots[0].height;
    const bottom2 = slots[2].y + slots[2].height;

    // Must reach down to at least y=1350 within 1600 canvas height (leaving standard footer space)
    assert.ok(bottom0 >= 1350, `Slot 0 bottom (${bottom0}) should extend to lower canvas area`);
    assert.ok(bottom2 >= 1350, `Slot 2 bottom (${bottom2}) should extend to lower canvas area`);
  });
});

describe('HIPMI Photobooth - Photo History & Device Storage', () => {
  beforeEach(async () => {
    await historyStorage.clearAll();
  });

  it('saves session to device history and retrieves it with formatted metadata', async () => {
    const saved = await historyStorage.saveSession({
      sessionId: 'HIPMI-20260910-TEST1',
      finalDataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      customization: { name: 'Nadiv', eventName: 'Summit 2026' },
      templateId: 'signature'
    });

    assert.ok(saved);
    assert.equal(saved.id, 'HIPMI-20260910-TEST1');
    assert.equal(saved.participantName, 'Nadiv');
    assert.equal(saved.templateId, 'signature');

    const items = await historyStorage.getAll();
    assert.equal(items.length, 1);
    assert.equal(items[0].id, 'HIPMI-20260910-TEST1');

    const stats = await historyStorage.getStats();
    assert.equal(stats.count, 1);
    assert.ok(stats.formattedSize.includes('KB') || stats.formattedSize.includes('MB'));
  });

  it('updates uploadedUrl and deletes individual history items', async () => {
    await historyStorage.saveSession({
      sessionId: 'HIPMI-20260910-TEST2',
      finalDataUrl: 'data:image/png;base64,test',
      customization: { name: 'Budi' }
    });

    await historyStorage.updateUploadedUrl('HIPMI-20260910-TEST2', 'https://i.ibb.co/test/photo.png');
    const item = await historyStorage.getById('HIPMI-20260910-TEST2');
    assert.equal(item.uploadedUrl, 'https://i.ibb.co/test/photo.png');

    const deleted = await historyStorage.deleteById('HIPMI-20260910-TEST2');
    assert.equal(deleted, true);

    const itemsAfter = await historyStorage.getAll();
    assert.equal(itemsAfter.length, 0);
  });
});

describe('HIPMI Photobooth - Cloud Upload & Hosting QR Integration', () => {
  it('generates public hosting QR URL when hostingUrl is configured in eventConfig', () => {
    const config = {
      hostingUrl: 'https://photobooth.hipmitelku.com',
      qrTarget: 'viewer'
    };

    const url = QREngine.getSessionPhotoUrl('HIPMI-20260910-12345', 'https://i.ibb.co/abc/photo.png', config);
    assert.ok(url.startsWith('https://photobooth.hipmitelku.com'));
    assert.ok(url.includes('session=HIPMI-20260910-12345'));
    assert.ok(url.includes('photo=https%3A%2F%2Fi.ibb.co%2Fabc%2Fphoto.png'));
  });

  it('supports direct photo URL mode when qrTarget is direct and photo is uploaded', () => {
    const config = {
      hostingUrl: 'https://photobooth.hipmitelku.com',
      qrTarget: 'direct'
    };

    const url = QREngine.getSessionPhotoUrl('HIPMI-20260910-12345', 'https://i.ibb.co/abc/photo.png', config);
    assert.equal(url, 'https://i.ibb.co/abc/photo.png');
  });

  it('cloudUploadEngine correctly handles offline mode without throwing', async () => {
    const res = await CloudUploadEngine.uploadPhoto({
      dataUrl: 'data:image/png;base64,test',
      sessionId: 'TEST_OFFLINE',
      eventConfig: { cloudProvider: 'none' }
    });

    assert.equal(res.success, false);
    assert.equal(res.reason, 'offline_mode');

    const testConn = await CloudUploadEngine.testConnection({ cloudProvider: 'none' });
    assert.equal(testConn.success, true);
  });

  it('defaults to auto cloudProvider and correctly migrates legacy none settings', () => {
    assert.equal(defaultEventConfig.cloudProvider, 'auto');

    // Test migration: previously saved empty or default config without custom endpoints
    localStorage.setItem('hipmi_photobooth_v1_config', JSON.stringify({ cloudProvider: 'none' }));
    const migrated = loadEventConfig();
    assert.equal(migrated.cloudProvider, 'auto', 'Legacy default none should migrate to auto');

    // Explicit custom endpoint should be preserved
    localStorage.setItem('hipmi_photobooth_v1_config', JSON.stringify({
      cloudProvider: 'custom',
      customUploadEndpoint: 'https://myserver.com/api'
    }));
    const preserved = loadEventConfig();
    assert.equal(preserved.cloudProvider, 'custom');
  });

  it('persists and recovers cloud and hosting configuration in localStorage', () => {
    const newCfg = {
      ...defaultEventConfig,
      hostingUrl: 'https://event-booth.hipmi.org',
      cloudProvider: 'imgbb',
      imgbbApiKey: 'fake_key_12345',
      qrTarget: 'viewer'
    };

    saveEventConfig(newCfg);
    const loaded = loadEventConfig();

    assert.equal(loaded.hostingUrl, 'https://event-booth.hipmi.org');
    assert.equal(loaded.cloudProvider, 'imgbb');
    assert.equal(loaded.imgbbApiKey, 'fake_key_12345');
    assert.equal(loaded.qrTarget, 'viewer');
  });
});
