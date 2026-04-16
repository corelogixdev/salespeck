const path = require("path");
const fs = require("fs");
const { spawnSync } = require("child_process");
const logi = require("./logi");
const { generateId } = require("./idGenerator");
const seedMustData = require("../prisma/seed-must-data");
const { resolveDatabasePath, resolveDatabaseUrl, ensureDatabaseDirectory } = require("./prismaDbConfig");
const { requirePrismaClient } = require("./prismaClient");

const SEED_MARKER = "prisma_seed_v1";

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

function runPrismaCli(args) {
  const schemaPath = path.join(__dirname, "..", "prisma", "schema.prisma");
  const spawnCwd = resolveSpawnCwd();
  const env = {
    ...process.env,
    DATABASE_URL: process.env.DATABASE_URL || resolveDatabaseUrl(),
  };

  let result;
  if (!__dirname.includes("app.asar")) {
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
  const databasePath = resolveDatabasePath();
  if (!fs.existsSync(databasePath)) {
    return;
  }

  const stats = fs.statSync(databasePath);
  if (stats.size === 0) {
    return;
  }

  const backupDir = path.join(path.dirname(databasePath), "backups");
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupPath = path.join(backupDir, `database-${stamp}.sqlite`);
  fs.copyFileSync(databasePath, backupPath);
}

async function prismaStartupBootstrap() {
  ensureDatabaseDirectory();
  process.env.DATABASE_URL = process.env.DATABASE_URL || resolveDatabaseUrl();

  backupDatabaseIfExists();
  try {
    runPrismaCli(["migrate", "deploy"]);
  } catch (error) {
    // Keep startup resilient on packaged edge-cases; app can still run with existing schema.
    logi("Prisma migrate deploy skipped:", error.message || error);
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
