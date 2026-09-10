/**
 * HIPMI Telkom University - Screen 2: Camera View
 * Viewfinder, Framing Guides, Scale-fade Countdown, Audio Feedback, Flash, and Capture Pipeline.
 * Hardened with video readiness check, disconnect handling, and unmount race protection.
 */

import { cameraManager } from '../engine/cameraManager.js';
import { soundEngine } from '../engine/audioEffects.js';
import { sessionManager } from '../engine/sessionManager.js';

export class CameraView {
  constructor({
    targetSlotIndex = null,
    totalSlots = 3,
    countdownSeconds = 3,
    eventConfig,
    onPhotoCaptured,
    onAllPhotosCompleted,
    onCancel,
    onCameraError
  }) {
    this.targetSlotIndex = targetSlotIndex; // If set, only retaking this slot
    this.totalSlots = totalSlots;
    this.countdownSeconds = countdownSeconds;
    this.eventConfig = eventConfig;
    this.onPhotoCaptured = onPhotoCaptured;
    this.onAllPhotosCompleted = onAllPhotosCompleted;
    this.onCancel = onCancel;
    this.onCameraError = onCameraError;

    this.currentSlot = targetSlotIndex !== null ? targetSlotIndex : 0;
    this.isCountingDown = false;
    this.isCapturing = false;
    this.isAutoShooting = false;
    this.isDestroyed = false;
    this.countdownTimer = null;
    this.transitionTimer = null;
    this.completionTimer = null;
    this.container = null;
    this.videoEl = null;
    this.removeDisconnectListener = null;
    this.keyHandler = null;
  }

  async render() {
    const div = document.createElement('div');
    div.className = 'view-container view-enter camera-view';
    this.container = div;

    const isRetakeMode = this.targetSlotIndex !== null;
    const slotDisplay = String(this.currentSlot + 1).padStart(2, '0');
    const totalDisplay = String(this.totalSlots).padStart(2, '0');
    const pillText = isRetakeMode ? `RETAKE PHOTO ${slotDisplay}` : `PHOTO ${slotDisplay} / ${totalDisplay}`;

    // Inspect physical camera devices
    const physicalDevices = await cameraManager.getPhysicalDevices();
    const hasMultipleCameras = physicalDevices.length > 1;

    div.innerHTML = `
      <!-- Camera Viewfinder -->
      <div class="camera-container">
        <video class="camera-video" id="camera-feed" autoplay playsinline muted></video>

        <!-- Framing Guide & Safe Zone with Layout-Aware Aspect Mask -->
        <div class="framing-guide framing-guide-slots-${this.totalSlots}" id="framing-guide">
          <div class="corner-bracket corner-tl"></div>
          <div class="corner-bracket corner-tr"></div>
          <div class="corner-bracket corner-bl"></div>
          <div class="corner-bracket corner-br"></div>
          <div class="face-target"></div>
          <div class="framing-hint-pill">
            ${this.totalSlots === 1 ? '👑 AREA FOTO 1 SOLO VIP' : this.totalSlots === 3 ? '📸 AREA FOTO 3 STRIP' : '🎞️ AREA FOTO 4 CLASSIC'}
          </div>
        </div>

        <!-- Photo Counter Pill -->
        <div class="counter-pill" id="counter-pill">
          <span class="counter-dot pulse-indicator"></span>
          <span id="counter-text">${pillText}</span>
        </div>

        <!-- Countdown Overlay (Hidden by default) -->
        <div class="countdown-overlay" id="countdown-overlay" style="display: none;">
          <div class="countdown-digits countdown-number" id="countdown-digits">3</div>
          <div class="countdown-subtext" id="countdown-subtext" style="display: none;"></div>
        </div>

        <!-- Shutter Flash Overlay -->
        <div class="flash-overlay" id="flash-overlay"></div>

        <!-- Bottom Controls Bar -->
        <div class="camera-bottom-bar">
          <!-- Cancel / Back button -->
          <button class="camera-tool-btn" id="btn-camera-cancel" title="${isRetakeMode ? 'Cancel Retake' : 'Back'}" aria-label="${isRetakeMode ? 'Cancel Retake' : 'Back'}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <!-- Circular Shutter Trigger (Initially disabled until stream is ready) -->
          <button class="shutter-btn btn-disabled" id="btn-shutter" title="Take Photo" aria-label="Take Photo" disabled>
            <div class="shutter-inner"></div>
          </button>

          <!-- Mirror Toggle Button -->
          <button class="camera-tool-btn" id="btn-camera-mirror" title="Toggle Mirror (Flip)" aria-label="Toggle Mirror (Flip)">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 3v18"></path>
              <path d="M16 7l4 5-4 5"></path>
              <path d="M8 17l-4-5 4-5"></path>
            </svg>
          </button>

          <!-- Camera Switcher (Dynamically toggled based on physical camera count) -->
          <button class="camera-tool-btn" id="btn-camera-switch" title="Switch Camera Device" aria-label="Switch Camera Device" style="display: none;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M23 4v6h-6"></path>
              <path d="M1 20v-6h6"></path>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 1 20.49 15"></path>
            </svg>
          </button>
        </div>
      </div>
    `;

    this.videoEl = div.querySelector('#camera-feed');
    const shutterBtn = div.querySelector('#btn-shutter');
    const switchBtn = div.querySelector('#btn-camera-switch');
    const cancelBtn = div.querySelector('#btn-camera-cancel');
    const mirrorBtn = div.querySelector('#btn-camera-mirror');

    // Enable shutter button when video stream is ready
    this.enableShutterIfReady = () => {
      if (this.isDestroyed) return;
      if (this.videoEl && this.videoEl.videoWidth > 0 && !this.isCountingDown && !this.isCapturing && !this.isAutoShooting) {
        shutterBtn.classList.remove('btn-disabled');
        shutterBtn.disabled = false;
      }
    };

    this.videoEl.addEventListener('loadedmetadata', this.enableShutterIfReady);
    this.videoEl.addEventListener('canplay', this.enableShutterIfReady);

    // Attach button listeners
    shutterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      soundEngine.unlock();
      this.startAutoSequence();
    });

    // Keyboard Spacebar / Enter trigger
    this.keyHandler = (e) => {
      if ((e.code === 'Space' || e.key === 'Enter') && !this.isAutoShooting && !this.isCountingDown && !this.isCapturing) {
        e.preventDefault();
        soundEngine.unlock();
        this.startAutoSequence();
      }
    };
    window.addEventListener('keydown', this.keyHandler);

    mirrorBtn.addEventListener('click', (e) => {
      e.preventDefault();
      cameraManager.setMirror(!cameraManager.isMirror);
    });

    switchBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      if (this.isDestroyed || this.isCountingDown || this.isCapturing) return;
      try {
        switchBtn.classList.add('btn-disabled');
        switchBtn.disabled = true;
        shutterBtn.classList.add('btn-disabled');
        shutterBtn.disabled = true;
        await cameraManager.switchCamera();
        this.enableShutterIfReady();
      } catch (err) {
        console.warn("Camera switch error:", err);
      } finally {
        if (!this.isDestroyed) {
          switchBtn.classList.remove('btn-disabled');
          switchBtn.disabled = false;
        }
      }
    });

    cancelBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.isNavigating || this.isDestroyed) return;
      this.isNavigating = true;
      cancelBtn.classList.add('btn-disabled');
      cancelBtn.disabled = true;
      this.destroy();
      if (this.onCancel) this.onCancel();
    });

    // Listen for unexpected camera disconnection
    this.removeDisconnectListener = cameraManager.onDisconnect(() => {
      if (this.isDestroyed) return;
      console.warn("Camera hardware disconnected while active!");
      if (this.onCameraError) {
        this.onCameraError('CAMERA_UNAVAILABLE');
      }
    });

    // Start Camera Stream
    try {
      await cameraManager.startCamera(
        this.videoEl,
        this.eventConfig.selectedCameraId || null,
        this.eventConfig.mirrorCamera !== false
      );

      // Re-evaluate physical cameras after permission is granted to update switch button visibility
      const physical = await cameraManager.getPhysicalDevices();
      if (switchBtn && !this.isDestroyed) {
        switchBtn.style.display = physical.length > 1 ? 'flex' : 'none';
      }

      // Extra check in case metadata already loaded
      setTimeout(() => this.enableShutterIfReady(), 200);
    } catch (err) {
      console.error("Camera start error:", err);
      throw err;
    }

    return div;
  }

  /**
   * Start automated photobooth sequence.
   * Locks controls and automatically captures all photos with countdown per shot.
   */
  startAutoSequence() {
    if (this.isAutoShooting || this.isCountingDown || this.isCapturing || this.isDestroyed) return;
    this.isAutoShooting = true;

    const shutterBtn = this.container?.querySelector('#btn-shutter');
    const switchBtn = this.container?.querySelector('#btn-camera-switch');
    const mirrorBtn = this.container?.querySelector('#btn-camera-mirror');

    if (shutterBtn) {
      shutterBtn.classList.add('btn-disabled');
      shutterBtn.disabled = true;
    }
    if (switchBtn) {
      switchBtn.classList.add('btn-disabled');
      switchBtn.disabled = true;
    }
    if (mirrorBtn) {
      mirrorBtn.classList.add('btn-disabled');
      mirrorBtn.disabled = true;
    }

    this.runCountdownForCurrentSlot();
  }

  /**
   * Run 3-second countdown for the current photo slot
   */
  runCountdownForCurrentSlot() {
    if (this.isDestroyed) return;
    this.isCountingDown = true;

    const overlay = this.container.querySelector('#countdown-overlay');
    const digitsEl = this.container.querySelector('#countdown-digits');
    const subtextEl = this.container.querySelector('#countdown-subtext');

    overlay.style.display = 'flex';
    if (subtextEl) {
      subtextEl.style.display = 'none';
      subtextEl.textContent = '';
    }

    let count = this.countdownSeconds;

    const runTick = () => {
      if (this.isDestroyed) return;

      digitsEl.textContent = count < 10 ? `0${count}` : `${count}`;
      digitsEl.classList.remove('countdown-number');
      void digitsEl.offsetWidth; // Reflow for bounce animation
      digitsEl.classList.add('countdown-number');

      // Play audio beep (higher pitch on 1)
      soundEngine.playBeep(count === 1);

      if (this.countdownTimer) {
        sessionManager.unregisterTimer(this.countdownTimer);
        this.countdownTimer = null;
      }

      if (count <= 1) {
        // Next tick triggers frame capture!
        const timerId = setTimeout(async () => {
          this.countdownTimer = null;
          if (this.isDestroyed) return;
          overlay.style.display = 'none';
          await this.executeCapture();
        }, 1000);
        this.countdownTimer = timerId;
        sessionManager.registerTimer(timerId);
      } else {
        count--;
        const timerId = setTimeout(runTick, 1000);
        this.countdownTimer = timerId;
        sessionManager.registerTimer(timerId);
      }
    };

    runTick();
  }

  /**
   * Capture photo frame, flash screen, play shutter sound, and advance slot
   */
  async executeCapture() {
    if (this.isDestroyed) return;
    this.isCapturing = true;
    const flashEl = this.container.querySelector('#flash-overlay');

    // 1. Trigger Shutter Flash & Audio Feedback
    flashEl.classList.add('active');
    soundEngine.playShutter();

    // 2. Capture high-res frame from video
    let captureResult = null;
    try {
      captureResult = await cameraManager.capturePhoto();
    } catch (err) {
      console.error("Failed to capture photo frame:", err);
      if (this.isDestroyed) return;
      this.isCapturing = false;
      this.isCountingDown = false;
      this.isAutoShooting = false;
      flashEl.classList.remove('active');
      this.enableShutterIfReady();
      return;
    }

    if (this.isDestroyed) return;

    // Fade out flash
    setTimeout(() => {
      if (flashEl) flashEl.classList.remove('active');
    }, 120);

    // 3. Callback with captured photo
    if (this.onPhotoCaptured) {
      this.onPhotoCaptured(this.currentSlot, captureResult.blob, captureResult.dataUrl);
    }

    // 4. Single Retake Mode
    if (this.targetSlotIndex !== null) {
      this.completionTimer = setTimeout(() => {
        this.completionTimer = null;
        if (this.isDestroyed) return;
        this.destroy();
        if (this.onAllPhotosCompleted) this.onAllPhotosCompleted();
      }, 500);
      sessionManager.registerTimer(this.completionTimer);
      return;
    }

    // 5. Automated multi-photo progression
    this.isCapturing = false;
    this.isCountingDown = false;

    if (this.currentSlot + 1 < this.totalSlots) {
      this.currentSlot++;
      const slotDisplay = String(this.currentSlot + 1).padStart(2, '0');
      const totalDisplay = String(this.totalSlots).padStart(2, '0');
      const counterText = this.container.querySelector('#counter-text');
      if (counterText) {
        counterText.textContent = `PHOTO ${slotDisplay} / ${totalDisplay}`;
      }

      // Show pose transition hint for 1.2s, then automatically run next countdown
      const overlay = this.container.querySelector('#countdown-overlay');
      const digitsEl = this.container.querySelector('#countdown-digits');
      const subtextEl = this.container.querySelector('#countdown-subtext');

      if (overlay && digitsEl && subtextEl) {
        overlay.style.display = 'flex';
        digitsEl.textContent = '📸';
        subtextEl.style.display = 'block';
        subtextEl.textContent = `SIAP POSE ${slotDisplay} / ${totalDisplay}!`;
      }

      this.transitionTimer = setTimeout(() => {
        this.transitionTimer = null;
        if (this.isDestroyed) return;
        this.runCountdownForCurrentSlot();
      }, 1200);
      sessionManager.registerTimer(this.transitionTimer);
    } else {
      // All photos completed!
      const overlay = this.container.querySelector('#countdown-overlay');
      const digitsEl = this.container.querySelector('#countdown-digits');
      const subtextEl = this.container.querySelector('#countdown-subtext');

      if (overlay && digitsEl && subtextEl) {
        overlay.style.display = 'flex';
        digitsEl.textContent = '✨';
        subtextEl.style.display = 'block';
        subtextEl.textContent = 'SEMUA FOTO SELESAI!';
      }

      this.completionTimer = setTimeout(() => {
        this.completionTimer = null;
        if (this.isDestroyed) return;
        this.destroy();
        if (this.onAllPhotosCompleted) this.onAllPhotosCompleted();
      }, 700);
      sessionManager.registerTimer(this.completionTimer);
    }
  }

  destroy() {
    this.isDestroyed = true;

    if (this.keyHandler) {
      window.removeEventListener('keydown', this.keyHandler);
      this.keyHandler = null;
    }

    if (this.countdownTimer) {
      clearTimeout(this.countdownTimer);
      sessionManager.unregisterTimer(this.countdownTimer);
      this.countdownTimer = null;
    }

    if (this.transitionTimer) {
      clearTimeout(this.transitionTimer);
      sessionManager.unregisterTimer(this.transitionTimer);
      this.transitionTimer = null;
    }

    if (this.completionTimer) {
      clearTimeout(this.completionTimer);
      sessionManager.unregisterTimer(this.completionTimer);
      this.completionTimer = null;
    }

    if (this.removeDisconnectListener) {
      this.removeDisconnectListener();
      this.removeDisconnectListener = null;
    }

    if (this.videoEl && this.enableShutterIfReady) {
      this.videoEl.removeEventListener('loadedmetadata', this.enableShutterIfReady);
      this.videoEl.removeEventListener('canplay', this.enableShutterIfReady);
    }

    this.isCountingDown = false;
    this.isCapturing = false;
    this.isAutoShooting = false;
    this.isNavigating = false;

    // Strict Stream Cleanup
    cameraManager.stopCamera();

    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
}
