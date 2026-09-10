/**
 * HIPMI Telkom University - Template Definitions & Configuration
 * 6 Premium Contemporary Editorial & Event Technology Templates.
 */

export const TEMPLATES = [
  {
    id: "signature",
    name: "Signature Minimal",
    category: "Editorial",
    description: "Pristine white canvas with official HIPMI branding and clean typography.",
    badge: "Official",
    width: 1200,
    height: 1600,
    background: "#FFFFFF",
    textColor: "#111111",
    accentColor: "#C8A84B",
    header: {
      showLogo: true,
      height: 140,
      title: "HIPMI TELKOM UNIVERSITY",
      subtitle: "PHOTOBOOTH EXPERIENCE"
    },
    footer: {
      height: 140,
      showDualLogo: true,
      text: "BANDUNG • INDONESIA",
      showDate: true
    },
    getSlots: (photoCount) => {
      // Return slots based on count within 1200x1600
      // Usable photo area: y: 150 to 1440 (height 1290), x: 70 to 1130 (width 1060)
      if (photoCount === 1) {
        return [
          { id: 0, x: 80, y: 160, width: 1040, height: 1260, borderRadius: 12, objectFit: "cover", border: "1px solid #EBEBEB" }
        ];
      }
      if (photoCount === 2) {
        return [
          { id: 0, x: 80, y: 160, width: 1040, height: 615, borderRadius: 10, objectFit: "cover", border: "1px solid #EBEBEB" },
          { id: 1, x: 80, y: 805, width: 1040, height: 615, borderRadius: 10, objectFit: "cover", border: "1px solid #EBEBEB" }
        ];
      }
      if (photoCount === 4) {
        return [
          { id: 0, x: 80, y: 160, width: 505, height: 615, borderRadius: 10, objectFit: "cover", border: "1px solid #EBEBEB" },
          { id: 1, x: 615, y: 160, width: 505, height: 615, borderRadius: 10, objectFit: "cover", border: "1px solid #EBEBEB" },
          { id: 2, x: 80, y: 805, width: 505, height: 615, borderRadius: 10, objectFit: "cover", border: "1px solid #EBEBEB" },
          { id: 3, x: 615, y: 805, width: 505, height: 615, borderRadius: 10, objectFit: "cover", border: "1px solid #EBEBEB" }
        ];
      }
      // Default: 3 photos (1 large top + 2 side-by-side bottom)
      return [
        { id: 0, x: 80, y: 160, width: 1040, height: 690, borderRadius: 10, objectFit: "cover", border: "1px solid #EBEBEB" },
        { id: 1, x: 80, y: 880, width: 505, height: 550, borderRadius: 10, objectFit: "cover", border: "1px solid #EBEBEB" },
        { id: 2, x: 615, y: 880, width: 505, height: 550, borderRadius: 10, objectFit: "cover", border: "1px solid #EBEBEB" }
      ];
    }
  },

  {
    id: "bold",
    name: "Bold Editorial",
    category: "Typography",
    description: "High-contrast editorial layout with bold HIPMI typography and gold accents.",
    badge: "Trending",
    width: 1200,
    height: 1600,
    background: "#0E0E10",
    textColor: "#FFFFFF",
    accentColor: "#C8A84B",
    header: {
      showLogo: true,
      height: 180,
      boldEditorial: true,
      title: "HIPMI",
      subheadline: "PT TELKOM UNIVERSITY"
    },
    footer: {
      height: 150,
      showDualLogo: false,
      text: "ENTREPRENEURIAL MOMENT",
      showDate: true
    },
    getSlots: (photoCount) => {
      if (photoCount === 1) {
        return [
          { id: 0, x: 60, y: 200, width: 1080, height: 1220, borderRadius: 8, objectFit: "cover", border: "2px solid #C8A84B" }
        ];
      }
      if (photoCount === 2) {
        return [
          { id: 0, x: 60, y: 200, width: 1080, height: 595, borderRadius: 8, objectFit: "cover", border: "1px solid rgba(200,168,75,0.4)" },
          { id: 1, x: 60, y: 825, width: 1080, height: 595, borderRadius: 8, objectFit: "cover", border: "1px solid rgba(200,168,75,0.4)" }
        ];
      }
      if (photoCount === 4) {
        return [
          { id: 0, x: 60, y: 200, width: 525, height: 595, borderRadius: 8, objectFit: "cover", border: "1px solid rgba(200,168,75,0.4)" },
          { id: 1, x: 615, y: 200, width: 525, height: 595, borderRadius: 8, objectFit: "cover", border: "1px solid rgba(200,168,75,0.4)" },
          { id: 2, x: 60, y: 825, width: 525, height: 595, borderRadius: 8, objectFit: "cover", border: "1px solid rgba(200,168,75,0.4)" },
          { id: 3, x: 615, y: 825, width: 525, height: 595, borderRadius: 8, objectFit: "cover", border: "1px solid rgba(200,168,75,0.4)" }
        ];
      }
      // 3 photos: 3 horizontal editorial bars or 1 big + 2 bottom
      return [
        { id: 0, x: 60, y: 200, width: 1080, height: 680, borderRadius: 8, objectFit: "cover", border: "2px solid #C8A84B" },
        { id: 1, x: 60, y: 910, width: 525, height: 510, borderRadius: 8, objectFit: "cover", border: "1px solid rgba(200,168,75,0.4)" },
        { id: 2, x: 615, y: 910, width: 525, height: 510, borderRadius: 8, objectFit: "cover", border: "1px solid rgba(200,168,75,0.4)" }
      ];
    }
  },

  {
    id: "business",
    name: "Executive Summit",
    category: "Formal",
    description: "Sleek formal design suited for business talks, conferences, and summits.",
    badge: "Formal",
    width: 1200,
    height: 1600,
    background: "#12141A",
    textColor: "#FFFFFF",
    accentColor: "#D4AF37",
    header: {
      showLogo: true,
      height: 150,
      title: "SUMMIT & BUSINESS FORUM",
      subtitle: "HIPMI PT TELKOM UNIVERSITY"
    },
    footer: {
      height: 140,
      showDualLogo: true,
      text: "NETWORKING & LEADERSHIP",
      showDate: true
    },
    getSlots: (photoCount) => {
      if (photoCount === 1) {
        return [
          { id: 0, x: 90, y: 170, width: 1020, height: 1240, borderRadius: 4, objectFit: "cover", border: "2px solid #D4AF37" }
        ];
      }
      if (photoCount === 2) {
        return [
          { id: 0, x: 90, y: 170, width: 1020, height: 600, borderRadius: 4, objectFit: "cover", border: "1.5px solid #D4AF37" },
          { id: 1, x: 90, y: 800, width: 1020, height: 600, borderRadius: 4, objectFit: "cover", border: "1.5px solid #D4AF37" }
        ];
      }
      if (photoCount === 4) {
        return [
          { id: 0, x: 90, y: 170, width: 495, height: 600, borderRadius: 4, objectFit: "cover", border: "1.5px solid #D4AF37" },
          { id: 1, x: 615, y: 170, width: 495, height: 600, borderRadius: 4, objectFit: "cover", border: "1.5px solid #D4AF37" },
          { id: 2, x: 90, y: 800, width: 495, height: 600, borderRadius: 4, objectFit: "cover", border: "1.5px solid #D4AF37" },
          { id: 3, x: 615, y: 800, width: 495, height: 600, borderRadius: 4, objectFit: "cover", border: "1.5px solid #D4AF37" }
        ];
      }
      // 3 photos: 3 stacked clean executive frames
      return [
        { id: 0, x: 90, y: 170, width: 1020, height: 390, borderRadius: 4, objectFit: "cover", border: "1.5px solid #D4AF37" },
        { id: 1, x: 90, y: 585, width: 1020, height: 390, borderRadius: 4, objectFit: "cover", border: "1.5px solid #D4AF37" },
        { id: 2, x: 90, y: 1000, width: 1020, height: 390, borderRadius: 4, objectFit: "cover", border: "1.5px solid #D4AF37" }
      ];
    }
  },

  {
    id: "youth",
    name: "Youth Innovation",
    category: "Contemporary",
    description: "Modern asymmetrical rhythm, clean geometric accents, and bold youth energy.",
    badge: "Creative",
    width: 1200,
    height: 1600,
    background: "#F8F8F6",
    textColor: "#111111",
    accentColor: "#C8A84B",
    header: {
      showLogo: true,
      height: 140,
      title: "YOUTH FOUNDERS",
      subtitle: "HIPMI TELKOM UNIVERSITY"
    },
    footer: {
      height: 140,
      showDualLogo: true,
      text: "IDEATE • VALIDATE • SCALE",
      showDate: true
    },
    getSlots: (photoCount) => {
      if (photoCount === 1) {
        return [
          { id: 0, x: 70, y: 160, width: 1060, height: 1260, borderRadius: 16, objectFit: "cover", border: "3px solid #111111" }
        ];
      }
      if (photoCount === 2) {
        return [
          { id: 0, x: 70, y: 160, width: 1060, height: 610, borderRadius: 16, objectFit: "cover", border: "3px solid #111111" },
          { id: 1, x: 70, y: 800, width: 1060, height: 610, borderRadius: 16, objectFit: "cover", border: "3px solid #C8A84B" }
        ];
      }
      if (photoCount === 4) {
        return [
          { id: 0, x: 70, y: 160, width: 515, height: 610, borderRadius: 16, objectFit: "cover", border: "3px solid #111111" },
          { id: 1, x: 615, y: 160, width: 515, height: 610, borderRadius: 16, objectFit: "cover", border: "3px solid #C8A84B" },
          { id: 2, x: 70, y: 800, width: 515, height: 610, borderRadius: 16, objectFit: "cover", border: "3px solid #C8A84B" },
          { id: 3, x: 615, y: 800, width: 515, height: 610, borderRadius: 16, objectFit: "cover", border: "3px solid #111111" }
        ];
      }
      // 3 photos: Dynamic asymmetric editorial layout spanning full photo area
      return [
        { id: 0, x: 70, y: 160, width: 610, height: 1250, borderRadius: 16, objectFit: "cover", border: "3px solid #111111" },
        { id: 1, x: 710, y: 160, width: 420, height: 610, borderRadius: 16, objectFit: "cover", border: "3px solid #C8A84B" },
        { id: 2, x: 710, y: 800, width: 420, height: 610, borderRadius: 16, objectFit: "cover", border: "3px solid #111111" }
      ];
    }
  },

  {
    id: "strip",
    name: "Classic Strip",
    category: "Photobooth",
    description: "Authentic vertical photobooth strip with signature HIPMI branding footer.",
    badge: "Classic",
    width: 800,
    height: 2000,
    background: "#FFFFFF",
    textColor: "#111111",
    accentColor: "#C8A84B",
    header: {
      showLogo: true,
      height: 130,
      title: "HIPMI TEL-U",
      subtitle: "MEMORIES"
    },
    footer: {
      height: 220,
      showDualLogo: true,
      text: "HIPMI TELKOM UNIVERSITY",
      subtext: "2026 EDITION",
      showDate: true
    },
    getSlots: (photoCount) => {
      // Classic vertical strip layout
      if (photoCount === 1) {
        return [
          { id: 0, x: 50, y: 140, width: 700, height: 1600, borderRadius: 4, objectFit: "cover", border: "1px solid #EEEEEE" }
        ];
      }
      if (photoCount === 2) {
        return [
          { id: 0, x: 50, y: 140, width: 700, height: 790, borderRadius: 4, objectFit: "cover", border: "1px solid #EEEEEE" },
          { id: 1, x: 50, y: 955, width: 700, height: 790, borderRadius: 4, objectFit: "cover", border: "1px solid #EEEEEE" }
        ];
      }
      if (photoCount === 4) {
        const slotH = 390;
        const gap = 20;
        return [
          { id: 0, x: 50, y: 140 + 0 * (slotH + gap), width: 700, height: slotH, borderRadius: 4, objectFit: "cover", border: "1px solid #EEEEEE" },
          { id: 1, x: 50, y: 140 + 1 * (slotH + gap), width: 700, height: slotH, borderRadius: 4, objectFit: "cover", border: "1px solid #EEEEEE" },
          { id: 2, x: 50, y: 140 + 2 * (slotH + gap), width: 700, height: slotH, borderRadius: 4, objectFit: "cover", border: "1px solid #EEEEEE" },
          { id: 3, x: 50, y: 140 + 3 * (slotH + gap), width: 700, height: slotH, borderRadius: 4, objectFit: "cover", border: "1px solid #EEEEEE" }
        ];
      }
      // Default: 3 photos vertical
      const slotH = 515;
      const gap = 25;
      return [
        { id: 0, x: 50, y: 140 + 0 * (slotH + gap), width: 700, height: slotH, borderRadius: 4, objectFit: "cover", border: "1px solid #E5E5E5" },
        { id: 1, x: 50, y: 140 + 1 * (slotH + gap), width: 700, height: slotH, borderRadius: 4, objectFit: "cover", border: "1px solid #E5E5E5" },
        { id: 2, x: 50, y: 140 + 2 * (slotH + gap), width: 700, height: slotH, borderRadius: 4, objectFit: "cover", border: "1px solid #E5E5E5" }
      ];
    }
  },

  {
    id: "polaroid",
    name: "Modern Polaroid",
    category: "Physical",
    description: "Instant physical print aesthetic with wide bottom bezel for handwritten note.",
    badge: "Retro",
    width: 1200,
    height: 1500,
    background: "#FFFFFF",
    textColor: "#111111",
    accentColor: "#C8A84B",
    header: {
      showLogo: false,
      height: 40
    },
    footer: {
      height: 250,
      showDualLogo: true,
      text: "HIPMI Telkom University",
      showDate: true
    },
    getSlots: (photoCount) => {
      if (photoCount === 1) {
        return [
          { id: 0, x: 80, y: 80, width: 1040, height: 1080, borderRadius: 2, objectFit: "cover", border: "1px solid #ECECEC" }
        ];
      }
      if (photoCount === 2) {
        return [
          { id: 0, x: 80, y: 80, width: 505, height: 1080, borderRadius: 2, objectFit: "cover", border: "1px solid #ECECEC" },
          { id: 1, x: 615, y: 80, width: 505, height: 1080, borderRadius: 2, objectFit: "cover", border: "1px solid #ECECEC" }
        ];
      }
      if (photoCount === 4) {
        return [
          { id: 0, x: 80, y: 80, width: 505, height: 525, borderRadius: 2, objectFit: "cover", border: "1px solid #ECECEC" },
          { id: 1, x: 615, y: 80, width: 505, height: 525, borderRadius: 2, objectFit: "cover", border: "1px solid #ECECEC" },
          { id: 2, x: 80, y: 635, width: 505, height: 525, borderRadius: 2, objectFit: "cover", border: "1px solid #ECECEC" },
          { id: 3, x: 615, y: 635, width: 505, height: 525, borderRadius: 2, objectFit: "cover", border: "1px solid #ECECEC" }
        ];
      }
      // 3 photos: 1 large on top + 2 small below
      return [
        { id: 0, x: 80, y: 80, width: 1040, height: 640, borderRadius: 2, objectFit: "cover", border: "1px solid #ECECEC" },
        { id: 1, x: 80, y: 745, width: 505, height: 420, borderRadius: 2, objectFit: "cover", border: "1px solid #ECECEC" },
        { id: 2, x: 615, y: 745, width: 505, height: 420, borderRadius: 2, objectFit: "cover", border: "1px solid #ECECEC" }
      ];
    }
  }
];

export function getTemplateById(id) {
  return TEMPLATES.find(t => t.id === id) || TEMPLATES[0];
}
