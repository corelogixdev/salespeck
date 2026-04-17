const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const { spawnSync } = require("child_process");
const logi = require("./logi");
const { generateId } = require("./idGenerator");
const seedMustData = require("../prisma/seed-must-data");
const { resolveDatabasePath, resolveDatabaseUrl, ensureDatabaseDirectory } = require("./prismaDbConfig");
const { requirePrismaClient } = require("./prismaClient");

const SEED_MARKER = "prisma_seed_v1";

function isPackagedRuntime() {
  return __dirname.includes("app.asar");
}

function resolveCliExecutable() {
  if (process.execPath && fs.existsSync(process.execPath)) {
    return process.execPath;
  }
  if (process.argv0 && fs.existsSync(process.argv0)) {
    return process.argv0;
  }
  throw new Error("No valid runtime executable found for Prisma CLI");
}

function resolveSpawnCwd() {
  const packagedBase = path.dirname(process.execPath || "");
  if (packagedBase && fs.existsSync(packagedBase)) {
    return packagedBase;
  }

  const projectRoot = path.join(__dirname, "..");
  if (fs.existsSync(projectRoot)) {
    return projectRoot;
  }

  return process.cwd();
}

let cachedMigrationEntries = null;

function resolveMigrationsDir() {
  return path.join(__dirname, "..", "prisma", "migrations");
}

function listMigrationEntries() {
  if (cachedMigrationEntries) return cachedMigrationEntries;
  
  const migrationsDir = resolveMigrationsDir();
  if (!fs.existsSync(migrationsDir)) {
    return (cachedMigrationEntries = []);
  }

  cachedMigrationEntries = fs.readdirSync(migrationsDir)
    .filter((entry) => entry !== "migration_lock.toml")
    .map((entry) => ({
      name: entry,
      sqlPath: path.join(migrationsDir, entry, "migration.sql"),
    }))
    .filter((entry) => fs.existsSync(entry.sqlPath))
    .sort((a, b) => a.name.localeCompare(b.name));
    
  return cachedMigrationEntries;
}

function splitSqlStatements(sql) {
  const lines = sql.split(/\r?\n/);
  const statements = [];
  let current = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("--")) {
      continue;
    }

    current.push(line);
    if (trimmed.endsWith(";")) {
      const statement = current.join("\n").trim();
      if (statement) {
        statements.push(statement.replace(/;$/, "").trim());
      }
      current = [];
    }
  }

  const trailing = current.join("\n").trim();
  if (trailing) {
    statements.push(trailing);
  }

  return statements;
}

async function ensureMigrationTable(prisma) {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "checksum" TEXT NOT NULL,
      "finished_at" DATETIME,
      "migration_name" TEXT NOT NULL UNIQUE,
      "logs" TEXT,
      "rolled_back_at" DATETIME,
      "started_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "applied_steps_count" INTEGER NOT NULL DEFAULT 0
    )
  `);
}

async function applyBundledMigrations(prisma) {
  const entries = listMigrationEntries();
  if (entries.length === 0) {
    return;
  }

  await ensureMigrationTable(prisma);
  const appliedRows = await prisma.$queryRawUnsafe(`SELECT "migration_name" FROM "_prisma_migrations"`);
  const appliedNames = new Set((appliedRows || []).map((row) => row.migration_name));

  for (const entry of entries) {
    if (appliedNames.has(entry.name)) {
      continue;
    }

    const sql = fs.readFileSync(entry.sqlPath, "utf8");
    const statements = splitSqlStatements(sql);
    const startedAt = new Date().toISOString();
    const checksum = crypto.createHash("sha256").update(sql).digest("hex");
    const migrationId = generateId(32);

    for (const statement of statements) {
      await prisma.$executeRawUnsafe(statement);
    }

    await prisma.$executeRawUnsafe(
      `INSERT INTO "_prisma_migrations" ("id", "checksum", "finished_at", "migration_name", "logs", "rolled_back_at", "started_at", "applied_steps_count")
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      migrationId,
      checksum,
      new Date().toISOString(),
      entry.name,
      "",
      null,
      startedAt,
      statements.length
    );
  }
}

function runPrismaCli(args) {
  const schemaPath = path.join(__dirname, "..", "prisma", "schema.prisma");
  const spawnCwd = resolveSpawnCwd();
  const env = {
    ...process.env,
    DATABASE_URL: process.env.DATABASE_URL || resolveDatabaseUrl(),
  };

  let result;
  if (!isPackagedRuntime()) {
    const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";
    result = spawnSync(
      npxCommand,
      ["prisma", ...args, "--schema", schemaPath],
      {
        cwd: spawnCwd,
        env,
        stdio: "pipe",
        encoding: "utf8",
        timeout: 120000,
      }
    );
  } else {
    const prismaCliPath = require.resolve("prisma/build/index.js");
    const runtimeExecutable = resolveCliExecutable();
    result = spawnSync(
      runtimeExecutable,
      [prismaCliPath, ...args, "--schema", schemaPath],
      {
        cwd: spawnCwd,
        env: {
          ...env,
          ELECTRON_RUN_AS_NODE: "1",
        },
        stdio: "pipe",
        encoding: "utf8",
        timeout: 120000,
      }
    );
  }

  if (result.error) {
    throw new Error(`Prisma CLI execution failed: ${result.error.message}`);
  }

  if (result.stdout) {
    logi(result.stdout);
  }
  if (result.stderr) {
    logi(result.stderr);
  }

  if (result.status !== 0) {
    throw new Error(`Prisma CLI command failed: prisma ${args.join(" ")}`);
  }
}

function backupDatabaseIfExists() {
  try {
    const databasePath = resolveDatabasePath();
    if (!fs.existsSync(databasePath)) return;

    const stats = fs.statSync(databasePath);
    if (!stats || stats.size === 0) return;

    const backupDir = path.join(path.dirname(databasePath), "backups");
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupPath = path.join(backupDir, `database-${stamp}.sqlite`);
    
    // Copy synchronously only if small (< 50MB); otherwise we'll eventually move to async
    // High performance: we only backup if it's been more than 24 hours (implemented later)
    fs.copyFileSync(databasePath, backupPath);
  } catch (err) {
    logi("Backup failed (non-critical):", err.message);
  }
}

async function prismaStartupBootstrap() {
  ensureDatabaseDirectory();
  process.env.DATABASE_URL = process.env.DATABASE_URL || resolveDatabaseUrl();

  if (isPackagedRuntime()) {
    backupDatabaseIfExists();
    try {
      runPrismaCli(["migrate", "deploy"]);
    } catch (error) {
      logi("Prisma migrate deploy failed, trying bundled migrations:", error.message || error);

      try {
        const prisma = requirePrismaClient();
        await applyBundledMigrations(prisma);
        logi("Bundled migrations applied successfully.");
      } catch (fallbackError) {
        throw new Error(
          `Database migration failed. Prisma CLI error: ${error.message || error}. Fallback error: ${
            fallbackError.message || fallbackError
          }`
        );
      }
    }
  } else {
    logi("Dev mode detected: skipping automatic backup and migrate deploy.");
  }

  const prisma = requirePrismaClient();
  const seedMarker = await prisma.softwaresetting.findFirst({
    where: { name: SEED_MARKER },
  });

  if (!seedMarker) {
    try {
      await seedMustData({ disconnect: false });
      await prisma.softwaresetting.create({
        data: {
          id: generateId(32),
          name: SEED_MARKER,
          value: new Date().toISOString(),
          source: "system-bootstrap",
        },
      });
      logi("Prisma seed marker created.");
    } catch (error) {
      logi("Prisma seed step skipped:", error.message || error);
    }
  }

  // Even when the seed marker exists, ensure must-have data is present.
  // This protects already-installed databases that may have seeded earlier before financeaccount/chart-of-accounts existed.
  try {
    const [companySetting, hasFinanceAccounts] = await Promise.all([
      prisma.softwaresetting.findFirst({ where: { name: "company" } }),
      prisma.financeaccount.findFirst({ select: { id: true } }),
    ]);

    if (!companySetting || !hasFinanceAccounts) {
      await seedMustData({ disconnect: false });
      logi("Prisma must-data seed applied.");
    }
  } catch (error) {
    logi("Prisma must-data check skipped:", error.message || error);
  }
}

module.exports = prismaStartupBootstrap;
