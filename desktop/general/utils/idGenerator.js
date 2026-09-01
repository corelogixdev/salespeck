'use strict';

/**
 * Generates a random string ID of specified length
 * @param {number} length - Length of the ID (default 16)
 * @returns {string} Random string ID
 */
function generateId(length = 16) {
  // Add timestamp component to reduce duplication chances
  const timestamp = Date.now().toString(36); // Base36 timestamp
  
  // Generate random part for the remaining length
  let randomPart = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  const randomLength = Math.max(0, length - timestamp.length);
  
  for (let i = 0; i < randomLength; i++) {
    randomPart += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  
  return timestamp + randomPart;
}

module.exports = { generateId };
