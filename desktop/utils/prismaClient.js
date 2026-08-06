require("dotenv").config();
const { resolveDatabaseUrl, ensureDatabaseDirectory } = require("./prismaDbConfig");

function tryBetterSqlite3(databaseUrl) {
  // Force-load native binding early so ABI mismatches fail here, not on first query.
  require("better-sqlite3");
  const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
  return new PrismaBetterSqlite3({ url: databaseUrl });
}

function tryLibsql(databaseUrl) {
  const { PrismaLibSql } = require("@prisma/adapter-libsql");
  return new PrismaLibSql({ url: databaseUrl });
}

function createAdapter(databaseUrl) {
  // Packaged Electron: prefer better-sqlite3 (asar-friendly after electron-rebuild).
  // Plain Node (scripts / some dev tooling): prefer libsql (N-API, no Electron ABI).
  const preferBetterSqlite =
    !!(process.versions && process.versions.electron) ||
    __dirname.includes("app.asar");

  const attempts = preferBetterSqlite
    ? [tryBetterSqlite3, tryLibsql]
    : [tryLibsql, tryBetterSqlite3];

  const errors = [];
  for (const tryFn of attempts) {
    try {
      return tryFn(databaseUrl);
    } catch (error) {
      errors.push(`${tryFn.name}: ${error.message}`);
    }
  }

  throw new Error(`SQLite adapters failed. ${errors.join(" | ")}`);
}

function getPrismaClient() {
  if (global.__salespeckPrismaClient) {
    return global.__salespeckPrismaClient;
  }

  try {
    const { PrismaClient } = require("../generated/prisma-client");

    ensureDatabaseDirectory();
    const databaseUrl = process.env.DATABASE_URL || resolveDatabaseUrl();
    if (!databaseUrl || !databaseUrl.trim()) {
      return null;
    }

    const adapter = createAdapter(databaseUrl);

    global.__salespeckPrismaClient = new PrismaClient({
      adapter,
    });

    return global.__salespeckPrismaClient;
  } catch (error) {
    global.__salespeckPrismaLastError = error;
    return null;
  }
}

function requirePrismaClient() {
  const prisma = getPrismaClient();
  if (!prisma) {
    const baseMessage = "Prisma client could not be initialized.";
    const errorMessage = global.__salespeckPrismaLastError?.message;
    throw new Error(errorMessage ? `${baseMessage} ${errorMessage}` : baseMessage);
  }
  return prisma;
}

module.exports = { getPrismaClient, requirePrismaClient };
