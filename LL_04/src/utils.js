/** @returns {string} Unique ID based on timestamp + random suffix. */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/**
 * @param {Date} date
 * @returns {string} Formatted as "DD.MM.YYYY HH:MM".
 */
export function formatDate(date) {
  const pad = (n) => String(n).padStart(2, "0");
  return (
    `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()} ` +
    `${pad(date.getHours())}:${pad(date.getMinutes())}`
  );
}

/**
 * Returns the first 4 words of a string.
 * @param {string} text
 * @returns {string}
 */
export function shortDescription(text) {
  return text.split(/\s+/).slice(0, 4).join(" ");
}
