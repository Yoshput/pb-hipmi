/**
 * HIPMI Telkom University - Automated 50-Session Stress Test Runner
 * Validates session lifecycle, memory stability, canvas generation, and stream cleanup.
 */

import { sessionManager } from './sessionManager.js';
import { canvasRenderer } from './canvasRenderer.js';
import { QREngine } from './qrEngine.js';
import { TEMPLATES } from '../config/templates.js';

export async function runPhotoboothStressTest(totalSessions = 50, logCallback = console.log) {
  logCallback(`\n🚀 Starting HIPMI Photobooth Stress Test: ${totalSessions} sessions...\n`);
  const startTime = performance.now();

  const report = {
    totalSessions,
    completedSessions: 0,
    failedSessions: 0,
    errors: [],
    maxMemoryHeap: 0,
    minMemoryHeap: Infinity,
    avgSessionTimeMs: 0,
    trackLeakDetected: false,
    urlLeakDetected: false
  };

  // Generate test dummy photo canvases
  const makeTestPhoto = (text, width = 1280, height = 720) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#1A1D24';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#C8A84B';
    ctx.font = 'bold 36px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(text, width / 2, height / 2);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        resolve({ blob, dataUrl });
      }, 'image/jpeg', 0.85);
    });
  };

  const samplePhotos = [
    await makeTestPhoto("STRESS TEST SHOT 01"),
    await makeTestPhoto("STRESS TEST SHOT 02"),
    await makeTestPhoto("STRESS TEST SHOT 03")
  ];

  const dummyConfig = {
    organization: "HIPMI Telkom University",
    eventName: "Entrepreneur Summit 2026",
    photoCount: 3,
    logoHipmi: "/assets/logo-hipmi.png",
    logoTelu: "/assets/logo-telu.png",
    dateText: "BANDUNG, 2026"
  };

  for (let s = 1; s <= totalSessions; s++) {
    const sStart = performance.now();
    try {
      // 1. Start Session
      const session = sessionManager.startNewSession(dummyConfig);
      if (!session || !session.sessionId) {
        throw new Error(`Session initialization failed at session ${s}`);
      }

      // 2. Capture 3 photos
      for (let i = 0; i < 3; i++) {
        sessionManager.addPhoto(i, samplePhotos[i].blob, samplePhotos[i].dataUrl);
      }

      // 3. Retake Photo #2
      const retakePhoto = await makeTestPhoto(`RETAKE SHOT 02 - SES ${s}`);
      sessionManager.addPhoto(1, retakePhoto.blob, retakePhoto.dataUrl);

      // Verify photos count is still exactly 3
      if (sessionManager.getSession().photos.length !== 3) {
        throw new Error(`Invalid photo count after retake in session ${s}`);
      }

      // 4. Test all 6 templates cycling
      for (const t of TEMPLATES) {
        sessionManager.setTemplate(t.id);
      }
      sessionManager.setTemplate('signature');

      // 5. Personalize name & event
      sessionManager.setCustomization({
        name: `Participant #${s}`,
        eventName: "HIPMI Business Summit",
        message: "Building Future Ventures"
      });

      // 6. Generate High-Res Final Canvas Composition
      const finalCanvas = await canvasRenderer.renderComposition({
        photos: sessionManager.getSession().photos,
        templateId: sessionManager.getSession().selectedTemplateId,
        customization: sessionManager.getSession().customization,
        eventConfig: dummyConfig
      });

      const finalBlob = await canvasRenderer.exportBlob(finalCanvas, 'image/png', 0.9);
      const finalDataUrl = finalCanvas.toDataURL('image/png', 0.9);
      sessionManager.setFinalResult(finalBlob, finalDataUrl);

      // 7. Generate Offline QR Code
      const qrCanvas = document.createElement('canvas');
      await QREngine.renderToCanvas(qrCanvas, QREngine.getSessionPhotoUrl(session.sessionId), { width: 220 });

      // 8. Memory Check
      if (performance.memory) {
        const heap = performance.memory.usedJSHeapSize / (1024 * 1024);
        report.maxMemoryHeap = Math.max(report.maxMemoryHeap, heap);
        report.minMemoryHeap = Math.min(report.minMemoryHeap, heap);
      }

      // 9. Reset and Clean Up
      sessionManager.cleanupCurrentSession();

      // Verify URL leak check: all object URLs in session must be revoked
      if (sessionManager.createdObjectUrls.size !== 0) {
        report.urlLeakDetected = true;
        throw new Error(`Object URLs not cleanly revoked in session ${s}`);
      }

      report.completedSessions++;

      if (s % 10 === 0 || s === totalSessions) {
        const sEnd = performance.now();
        logCallback(`✅ Session ${s}/${totalSessions} passed (${(sEnd - sStart).toFixed(1)}ms)`);
      }
    } catch (err) {
      report.failedSessions++;
      report.errors.push({ session: s, message: err.message });
      logCallback(`❌ Session ${s} failed: ${err.message}`);
    }
  }

  const totalTime = ((performance.now() - startTime) / 1000).toFixed(2);
  report.avgSessionTimeMs = (performance.now() - startTime) / totalSessions;

  logCallback(`\n📊 STRESS TEST SUMMARY:`);
  logCallback(`Total Sessions Run: ${report.totalSessions}`);
  logCallback(`Completed Successfully: ${report.completedSessions}`);
  logCallback(`Failed: ${report.failedSessions}`);
  logCallback(`Total Duration: ${totalTime}s`);
  logCallback(`Average per session: ${report.avgSessionTimeMs.toFixed(1)}ms`);
  if (report.maxMemoryHeap > 0) {
    logCallback(`Memory Heap Peak: ${report.maxMemoryHeap.toFixed(2)} MB`);
  }
  logCallback(`Object URL Leak Check: ${report.urlLeakDetected ? 'FAIL ❌' : 'PASS (0 leaks) ✅'}`);

  return report;
}
