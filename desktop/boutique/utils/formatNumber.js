/**
 * Format number to 2 decimal places
 * @param {number|string} value - The number to format
 * @returns {string} - Formatted number with 2 decimal places
 */
function formatNumber(value) {
  if (value === null || value === undefined || value === '') {
    return '0.00';
  }
  const num = parseFloat(value);
  if (isNaN(num)) {
    return '0.00';
  }
  return num.toFixed(2);
}

/**
 * Format number to 2 decimal places (for quantities/whole numbers)
 * Returns as-is if it's a whole number, otherwise 2 decimals
 * @param {number|string} value - The number to format
 * @returns {string|number} - Formatted number
 */
function formatDecimal(value) {
  if (value === null || value === undefined || value === '') {
    return '0.00';
  }
  const num = parseFloat(value);
  if (isNaN(num)) {
    return '0.00';
  }
  // If it's a whole number, return as integer, otherwise 2 decimals
  if (num % 1 === 0) {
    return num.toString();
  }
  return num.toFixed(2);
}

module.exports = {
  formatNumber,
  formatDecimal
};
