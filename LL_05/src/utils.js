/**
 * Generates a unique id.
 * @returns {string}
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/**
 * Formats a Date as DD.MM.YYYY HH:MM.
 * @param {Date} date
 * @returns {string}
 */
function formatDate(date) {
  const pad = (n) => String(n).padStart(2, "0");
  return (
    pad(date.getDate()) +
    "." +
    pad(date.getMonth() + 1) +
    "." +
    date.getFullYear() +
    " " +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes())
  );
}

/**
 * First 4 words of a string.
 * @param {string} text
 * @returns {string}
 */
function shortDescription(text) {
  return text.trim().split(/\s+/).slice(0, 4).join(" ");
}
