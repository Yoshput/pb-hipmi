/**
 * HIPMI Telkom University - Camera Engine
 * Rock-solid lifecycle, multi-device switching, guaranteed track cleanup,
 * hardware disconnect detection, readiness validation, and reliable fallback simulation.
 */

class CameraManager {
  constructor() {
    this.stream = null;
    this.currentDeviceId = null;
    this.devices = [];
    this.videoElement = null;
    this.isSimulated = false;
    this._simulationInterval = null;
    this.isMirror = true;
    this.isStopping = false;
    this.disconnectCallbacks = new Set();

    // Listen for hardware plug/unplug events
    if (typeof navigator !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.addEventListener) {
      navigator.mediaDevices.addEventListener('devicechange', async () => {
        const oldDevices = [...this.devices];
        await this.getDevices();
        if (this.stream && !this.isSimulated) {
          const activeTrack = this.stream.getVideoTracks()[0];
          if (!activeTrack || activeTrack.readyState === 'ended') {
            this._notifyDisconnect();
          }
        }
      });
    }
  }

  /**
   * Register callback for camera hardware disconnection
   */
  onDisconnect(callback) {
    this.disconnectCallbacks.add(callback);
    return () => this.disconnectCallbacks.delete(callback);
  }

  _notifyDisconnect() {
    if (this.isStopping) return;
    this.disconnectCallbacks.forEach(fn => {
      try {
        fn();
      } catch (err) {
        console.warn("Error in disconnect callback:", err);
      }
    });
  }

  /**
   * Enumerate available video inputs
   */
  async getDevices() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      this.devices = [{
        deviceId: 'simulated',
        label: 'Virtual Test Camera (HIPMI Studio Simulation)'
      }];
      return this.devices;
    }
    try {
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      const physical = allDevices.filter(d => d.kind === 'videoinput');
      this.devices = [...physical];
      // Always provide Virtual Test Camera for booth testing & environments without webcam
      this.devices.push({
        deviceId: 'simulated',
        label: 'Virtual Test Camera (HIPMI Studio Simulation)'
      });
      return this.devices;
    } catch (err) {
      console.warn("Could not enumerate camera devices:", err);
      this.devices = [{
        deviceId: 'simulated',
        label: 'Virtual Test Camera (HIPMI Studio Simulation)'
      }];
      return this.devices;
    }
  }

  /**
   * Return only actual physical camera devices
   */
  async getPhysicalDevices() {
    await this.getDevices();
    return this.devices.filter(d => d.deviceId !== 'simulated');
  }

  /**
   * Start camera stream and attach to video element
   * Implements multi-tier fallback: ideal constraints -> loose constraints -> simulated camera
   */
  async startCamera(videoElement, preferredDeviceId = null, mirror = null) {
    this.videoElement = videoElement;
    this.isStopping = false;

    // Stop any existing stream before opening a new one
    this.stopCamera();

    // Check if preferredDeviceId is simulated or URL has ?simulated=true or ?mock=true
    const urlParams = new URLSearchParams(window.location.search);
    if (preferredDeviceId === 'simulated' || urlParams.get('simulated') === 'true' || urlParams.get('camera') === 'mock' || urlParams.get('mock') === 'true') {
      this.isMirror = mirror !== null ? mirror : false;
      return this._startSimulatedCamera(videoElement);
    }

    // Determine initial mirror mode based on device label/intent if not explicitly provided
    if (mirror !== null) {
      this.isMirror = mirror;
    } else {
      this.isMirror = true; // Default front/selfie
    }

    const constraints = {
      audio: false,
      video: {
        width: { ideal: 1920 },
        height: { ideal: 1080 },
        facingMode: preferredDeviceId ? undefined : "user"
      }
    };

    if (preferredDeviceId) {
      constraints.video.deviceId = { ideal: preferredDeviceId };
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("NOT_SUPPORTED");
      }

      // Try ideal constraints first
      try {
        this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (firstErr) {
        // If ideal constraints failed (e.g. OverconstrainedError on older cams/portrait orientation), try generic video
        if (firstErr.name === 'OverconstrainedError' || firstErr.name === 'ConstraintNotSatisfiedError') {
          console.warn("Camera overconstrained with ideal resolution, retrying with generic constraints:", firstErr);
          this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        } else {
          throw firstErr;
        }
      }

      this.isSimulated = false;

      if (this.videoElement) {
        this.videoElement.srcObject = this.stream;
        this.videoElement.style.transform = this.isMirror ? 'scaleX(-1)' : 'none';
        try {
          await this.videoElement.play();
        } catch (playErr) {
          console.warn("video.play() was interrupted or waiting for user gesture:", playErr);
        }
      }

      // Update current device info
      const tracks = this.stream.getVideoTracks();
      if (tracks.length > 0) {
        const settings = tracks[0].getSettings ? tracks[0].getSettings() : {};
        this.currentDeviceId = settings.deviceId || preferredDeviceId;

        // Auto-detect rear camera from label/facingMode if mirror wasn't explicitly forced
        if (mirror === null) {
          const label = (tracks[0].label || '').toLowerCase();
          const facing = settings.facingMode || '';
          if (facing === 'environment' || label.includes('back') || label.includes('rear')) {
            this.setMirror(false);
          } else {
            this.setMirror(true);
          }
        }

        // Monitor track for unexpected closure / disconnect
        tracks[0].onended = () => {
          if (!this.isStopping) {
            console.warn("Camera track ended unexpectedly");
            this._notifyDisconnect();
          }
        };
      }

      await this.getDevices();
      return { success: true, isSimulated: false };
    } catch (err) {
      console.warn("Real camera access failed, checking fallback:", err);

      // Distinguish explicit user permission rejection
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError' || err.message === 'PERMISSION_DENIED') {
        throw new Error("PERMISSION_DENIED");
      }

      // If camera hardware not found or environment has no webcam, start high-fidelity simulation
      return this._startSimulatedCamera(videoElement);
    }
  }

  /**
   * High-fidelity simulated camera stream for testing / non-webcam displays
   */
  _startSimulatedCamera(videoElement) {
    this.isSimulated = true;
    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');

    let frame = 0;
    const drawSimulation = () => {
      frame++;
      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, 1280, 720);
      grad.addColorStop(0, '#1E222B');
      grad.addColorStop(1, '#0D0F12');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1280, 720);

      // Studio light accents
      ctx.fillStyle = 'rgba(200, 168, 75, 0.08)';
      ctx.beginPath();
      ctx.arc(640 + Math.sin(frame * 0.02) * 80, 320, 260, 0, Math.PI * 2);
      ctx.fill();

      // Simulated participant silhouette
      ctx.fillStyle = '#2A2E39';
      // Head
      ctx.beginPath();
      ctx.arc(640, 280, 100, 0, Math.PI * 2);
      ctx.fill();
      // Shoulders
      ctx.beginPath();
      ctx.ellipse(640, 520, 220, 160, 0, 0, Math.PI);
      ctx.fill();

      // Subtle badge & frame overlay
      ctx.fillStyle = '#C8A84B';
      ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText("SIMULATED CAMERA • HIPMI BOOTH TEST MODE", 640, 80);

      ctx.fillStyle = '#A0A0A0';
      ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText(new Date().toLocaleTimeString(), 640, 115);
    };

    drawSimulation();
    this._simulationInterval = setInterval(drawSimulation, 1000 / 30);

    const simulatedStream = canvas.captureStream(30);
    this.stream = simulatedStream;

    if (videoElement) {
      videoElement.srcObject = simulatedStream;
      videoElement.style.transform = 'none';
      videoElement.play().catch(() => {});
    }

    return { success: true, isSimulated: true };
  }

  /**
   * Set mirror mode
   */
  setMirror(isMirror) {
    this.isMirror = isMirror;
    if (this.videoElement) {
      this.videoElement.style.transform = (isMirror && !this.isSimulated) ? 'scaleX(-1)' : 'none';
    }
  }

  /**
   * Switch to next available camera
   * Hardened against race conditions and misleading mirror toggles
   */
  async switchCamera() {
    if (this.isSwitching) return this.currentDeviceId;
    this.isSwitching = true;

    try {
      const physicalDevices = await this.getPhysicalDevices();
      if (physicalDevices.length <= 1) {
        // Do not perform misleading mirror toggle; return current device
        return this.currentDeviceId;
      }

      const currentIndex = physicalDevices.findIndex(d => d.deviceId === this.currentDeviceId);
      const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % physicalDevices.length;
      const nextDevice = physicalDevices[nextIndex];

      // Auto-detect mirror for next device
      const label = (nextDevice.label || '').toLowerCase();
      const isRear = label.includes('back') || label.includes('rear') || label.includes('environment');
      const nextMirror = !isRear;

      await this.startCamera(this.videoElement, nextDevice.deviceId, nextMirror);
      return nextDevice.deviceId;
    } finally {
      this.isSwitching = false;
    }
  }

  /**
   * Wait for video element readiness before capture
   */
  async waitForVideoReady(timeoutMs = 1500) {
    if (!this.videoElement) throw new Error("NO_VIDEO_ELEMENT");
    if (!this.stream && !this.isSimulated) throw new Error("NO_ACTIVE_STREAM");
    const video = this.videoElement;

    if (video.videoWidth > 0 && video.videoHeight > 0 && video.readyState >= 2) {
      return true;
    }

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        cleanup();
        if (video.videoWidth > 0 && video.videoHeight > 0) {
          resolve(true);
        } else {
          reject(new Error("VIDEO_NOT_READY"));
        }
      }, timeoutMs);

      const onReady = () => {
        if (video.videoWidth > 0 && video.videoHeight > 0) {
          cleanup();
          resolve(true);
        }
      };

      const cleanup = () => {
        clearTimeout(timer);
        video.removeEventListener('loadedmetadata', onReady);
        video.removeEventListener('canplay', onReady);
      };

      video.addEventListener('loadedmetadata', onReady);
      video.addEventListener('canplay', onReady);
    });
  }

  /**
   * Capture photo from current video element into high-resolution Blob & DataURL
   */
  async capturePhoto() {
    if (!this.videoElement) {
      throw new Error("NO_VIDEO_ELEMENT");
    }

    // Ensure video is ready and has valid non-zero dimensions
    await this.waitForVideoReady(1500);

    const video = this.videoElement;
    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;

    if (width <= 0 || height <= 0) {
      throw new Error("INVALID_VIDEO_DIMENSIONS");
    }

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error("CANVAS_CONTEXT_FAILED");
    }

    // Handle mirror transformation on capture
    if (this.isMirror && !this.isSimulated) {
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, width, height);

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          reject(new Error("CANVAS_TO_BLOB_FAILED"));
          return;
        }
        const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
        resolve({ blob, dataUrl, width, height });
      }, 'image/jpeg', 0.95);
    });
  }

  /**
   * Guaranteed cleanup: Stop all tracks and clear video source
   */
  stopCamera() {
    this.isStopping = true;

    if (this._simulationInterval) {
      clearInterval(this._simulationInterval);
      this._simulationInterval = null;
    }

    if (this.stream) {
      this.stream.getTracks().forEach(track => {
        try {
          track.stop();
        } catch (e) {
          // Handled
        }
      });
      this.stream = null;
    }

    if (this.videoElement) {
      this.videoElement.srcObject = null;
      this.videoElement.onloadedmetadata = null;
      this.videoElement.oncanplay = null;
    }

    this.isStopping = false;
  }
}

export const cameraManager = new CameraManager();
