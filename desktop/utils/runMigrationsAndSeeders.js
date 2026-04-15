const logi = require("./logi");
const db = require("../models");
const fs = require("fs");
const path = require("path");

async function runMigrationsAndSeeders() {
  try {
    const migrationsPath = path.join(__dirname, "..", "migrations");
    const seedersPath = path.join(__dirname, "..", "seeders");
    // Run migrations
    const migrationFiles = fs.readdirSync(migrationsPath);
    for (const file of migrationFiles) {
      const migration = require(path.join(migrationsPath, file));
      await migration.up(db.sequelize.getQueryInterface(), db.Sequelize);
      logi(`Migration executed: ${file}`);
    }
    // Run seeders
    const seederFiles = fs.readdirSync(seedersPath);
    for (const file of seederFiles) {
      const seeder = require(path.join(seedersPath, file));
      await seeder.up(db.sequelize.getQueryInterface(), db.Sequelize);
      logi(`Seeder executed: ${file}`);
    }
  } catch (error) {
    logi("Error running migrations or seeders:");
    logi(error);
  }
}

module.exports = runMigrationsAndSeeders;
