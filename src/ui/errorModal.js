/**
 * HIPMI Telkom University - Polished Error State Modal
 * Human-centric non-technical error notifications with direct retry action.
 */

export class ErrorModal {
  constructor({ type = "camera", message = null, onRetry, onUseVirtual, onHome }) {
    this.type = type;
    this.message = message;
    this.onRetry = onRetry;
    this.onUseVirtual = onUseVirtual;
    this.onHome = onHome;
    this.container = null;
  }

  getErrorDetails() {
    switch (this.type) {
      case 'PERMISSION_DENIED':
        return {
          title: "Camera Access Required",
          desc: "Please allow camera access in your browser settings to capture your photobooth moment.",
          icon: "camera-off"
        };
      case 'CAMERA_UNAVAILABLE':
      case 'NOT_SUPPORTED':
        return {
          title: "Camera Unavailable",
          desc: "Please check that your camera or USB booth webcam is connected and try again.",
          icon: "alert-circle"
        };
      case 'CAPTURE_FAILED':
        return {
          title: "Capture Incomplete",
          desc: "We couldn't capture this photo frame. Please try again.",
          icon: "refresh-cw"
        };
      case 'PROCESSING_ERROR':
        return {
          title: "Processing Issue",
          desc: "Something went wrong while preparing your photo composition. Please try again.",
          icon: "sliders"
        };
      default:
        return {
          title: "Notice",
          desc: this.message || "An unexpected situation occurred. Please try again.",
          icon: "alert-circle"
        };
    }
  }

  render() {
    const div = document.createElement('div');
    div.className = 'modal-backdrop view-enter';
    this.container = div;

    const details = this.getErrorDetails();

    div.innerHTML = `
      <div class="modal-content" style="max-width: 440px; text-align: center; padding: 36px 28px;">
        <div style="width: 64px; height: 64px; border-radius: 50%; background-color: var(--color-accent-light); border: 1.5px solid var(--color-accent); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; color: var(--color-accent-dark);">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>

        <h2 style="font-size: 22px; font-weight: 800; color: var(--color-primary); margin-bottom: 8px;">
          ${details.title}
        </h2>

        <p style="font-size: 14px; color: var(--color-secondary); line-height: 1.5; margin-bottom: 28px;">
          ${details.desc}
        </p>

        <div style="display: flex; flex-direction: column; gap: 10px;">
          <button class="btn-primary btn-accent" id="btn-error-retry" style="width: 100%;">
            Try Again
          </button>
          <button class="btn-secondary" id="btn-error-virtual" style="width: 100%; border-color: var(--color-accent); color: var(--color-accent-dark);">
            Use Virtual Test Camera (Studio Simulation)
          </button>
          <button class="btn-secondary" id="btn-error-home" style="width: 100%;">
            Return to Welcome
          </button>
        </div>
      </div>
    `;

    this.isHandled = false;

    const retryBtn = div.querySelector('#btn-error-retry');
    retryBtn.addEventListener('click', () => {
      if (this.isHandled) return;
      this.isHandled = true;
      this.close();
      if (this.onRetry) this.onRetry();
    });

    const virtualBtn = div.querySelector('#btn-error-virtual');
    virtualBtn.addEventListener('click', () => {
      if (this.isHandled) return;
      this.isHandled = true;
      this.close();
      if (this.onUseVirtual) this.onUseVirtual();
    });

    const homeBtn = div.querySelector('#btn-error-home');
    homeBtn.addEventListener('click', () => {
      if (this.isHandled) return;
      this.isHandled = true;
      this.close();
      if (this.onHome) this.onHome();
    });

    return div;
  }

  close() {
    this.isHandled = true;
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
}
