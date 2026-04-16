"use strict";

// Kept for backward compatibility with older scripts.
// Startup and required metadata seeding is handled by `seed-must-data.js`.
module.exports = require("./seed-must-data");

if (require.main === module) {
  const seedMustData = require("./seed-must-data");
  seedMustData({ disconnect: true })
    .then(() => process.exit(0))
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      process.exit(1);
    });
}

