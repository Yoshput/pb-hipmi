/**
 * HIPMI Telkom University - Event Configuration
 * Centralized dynamic configuration object for the photobooth experience.
 */
export const defaultEventConfig = {
  organization: "HIPMI PT Telkom University Purwokerto",
  subOrganization: "BPC HIPMI PT TELKOM UNIVERSITY PURWOKERTO",
  eventName: "PKKMB 2026",
  eventTagline: "Ignite Passion, Build Future",
  year: "2026",
  dateText: "PURWOKERTO, 2026",
  
  // Official Brand Assets
  logoHipmi: "/assets/logo-hipmi.png",
  logoTelu: "/assets/logo-telu.png",

  // Color System
  colors: {
    bg: "#FFFFFF",
    bgDark: "#0B0C0E",
    primary: "#111111",
    secondary: "#6B6B6B",
    muted: "#F5F5F5",
    border: "#E8E8E8",
    accent: "#C8A84B", // Official HIPMI Gold
    accentDark: "#A88A30",
    accentLight: "#EAD79B"
  },

  // Operational Settings
  photoCount: 4, // Default: 4 (supports 1, 2, 3, 4)
  countdownSeconds: 3, // 3 -> 2 -> 1 -> Flash
  autoResetSeconds: 15, // Return to welcome after 15s inactivity
  shutterSoundEnabled: true,
  mirrorCamera: true, // Default mirror for selfie perspective
  selectedCameraId: "", // Empty = auto/default

  // Cloud & Hosting Upload Settings for Live QR Scanning
  hostingUrl: "", // e.g. "https://photobooth.hipmitelku.com" (used for QR code target)
  cloudProvider: "none", // "none" | "imgbb" | "custom"
  imgbbApiKey: "", // Free key from https://api.imgbb.com/
  customUploadEndpoint: "", // e.g. "https://your-hosting.com/api/upload"
  qrTarget: "viewer" // "viewer" (mobile web landing page) | "direct" (direct photo file)
};

// Local storage key for persistent operator preferences
const CONFIG_STORAGE_KEY = "hipmi_photobooth_v1_config";

export function loadEventConfig() {
  try {
    const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        // Automatically migrate old default Bandung / non-Purwokerto values
        let org = typeof parsed.organization === 'string' && parsed.organization.trim() ? parsed.organization.trim() : defaultEventConfig.organization;
        if (org === 'HIPMI Telkom University') org = defaultEventConfig.organization;

        let subOrg = typeof parsed.subOrganization === 'string' && parsed.subOrganization.trim() ? parsed.subOrganization.trim() : defaultEventConfig.subOrganization;
        if (subOrg === 'BPC HIPMI PT TELKOM UNIVERSITY') subOrg = defaultEventConfig.subOrganization;

        let dt = typeof parsed.dateText === 'string' && parsed.dateText.trim() ? parsed.dateText.trim() : defaultEventConfig.dateText;
        if (dt.toUpperCase().includes('BANDUNG')) dt = defaultEventConfig.dateText;

        return {
          ...defaultEventConfig,
          organization: org,
          subOrganization: subOrg,
          eventName: typeof parsed.eventName === 'string' && parsed.eventName.trim() ? parsed.eventName.trim() : defaultEventConfig.eventName,
          year: typeof parsed.year === 'string' && parsed.year.trim() ? parsed.year.trim() : defaultEventConfig.year,
          dateText: dt,
          photoCount: Number.isInteger(parsed.photoCount) && parsed.photoCount >= 1 && parsed.photoCount <= 6 ? parsed.photoCount : defaultEventConfig.photoCount,
          countdownSeconds: Number.isInteger(parsed.countdownSeconds) && parsed.countdownSeconds >= 1 && parsed.countdownSeconds <= 10 ? parsed.countdownSeconds : defaultEventConfig.countdownSeconds,
          autoResetSeconds: Number.isInteger(parsed.autoResetSeconds) && parsed.autoResetSeconds >= 0 && parsed.autoResetSeconds <= 120 ? parsed.autoResetSeconds : defaultEventConfig.autoResetSeconds,
          mirrorCamera: typeof parsed.mirrorCamera === 'boolean' ? parsed.mirrorCamera : true,
          selectedCameraId: typeof parsed.selectedCameraId === 'string' ? parsed.selectedCameraId : "",
          hostingUrl: typeof parsed.hostingUrl === 'string' ? parsed.hostingUrl.trim() : "",
          cloudProvider: ['none', 'imgbb', 'custom'].includes(parsed.cloudProvider) ? parsed.cloudProvider : "none",
          imgbbApiKey: typeof parsed.imgbbApiKey === 'string' ? parsed.imgbbApiKey.trim() : "",
          customUploadEndpoint: typeof parsed.customUploadEndpoint === 'string' ? parsed.customUploadEndpoint.trim() : "",
          qrTarget: ['viewer', 'direct'].includes(parsed.qrTarget) ? parsed.qrTarget : "viewer"
        };
      }
    }
  } catch (err) {
    console.warn("Could not load stored event configuration, using defaults.", err);
  }
  return { ...defaultEventConfig };
}

export function saveEventConfig(newConfig) {
  try {
    if (!newConfig || typeof newConfig !== 'object') return;
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(newConfig));
  } catch (err) {
    console.warn("Could not save event configuration (e.g. storage quota or private mode).", err);
  }
}
