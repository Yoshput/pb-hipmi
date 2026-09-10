/**
 * HIPMI Telkom University - Input Safety & Sanitization Utilities
 * Prevents XSS, ensures filesystem-safe filenames, and handles text truncation.
 */

/**
 * Escape HTML special characters for safe inclusion in DOM
 */
export function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Sanitize user-provided string for safe OS filename
 * Only permits alphanumeric characters, hyphens, and underscores.
 */
export function sanitizeFilename(str, maxLen = 30) {
  if (!str) return '';
  const cleaned = String(str)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
  return cleaned.slice(0, maxLen);
}

/**
 * Truncate text with ellipsis if exceeding maxLen
 */
export function truncateText(str, maxLen = 40) {
  if (!str) return '';
  const trimmed = String(str).trim();
  if (trimmed.length <= maxLen) return trimmed;
  return trimmed.slice(0, maxLen - 1) + '…';
}
