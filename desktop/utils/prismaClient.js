require("dotenv").config();
const { resolveDatabaseUrl, ensureDatabaseDirectory } = require("./prismaDbConfig");

function getPrismaClient() {
  if (global.__stitchcorePrismaClient) {
    return global.__stitchcorePrismaClient;
  }

  try {
    const { PrismaClient } = require("../generated/prisma-client");
    const { PrismaLibSql } = require("@prisma/adapter-libsql");

    ensureDatabaseDirectory();
    const databaseUrl = process.env.DATABASE_URL || resolveDatabaseUrl();
    if (!databaseUrl || !databaseUrl.trim()) {
      return null;
    }

    const adapter = new PrismaLibSql({
      url: databaseUrl,
    });

    global.__stitchcorePrismaClient = new PrismaClient({
      adapter,
    });

    return global.__stitchcorePrismaClient;
  } catch (error) {
    global.__stitchcorePrismaLastError = error;
    return null;
  }
}

function requirePrismaClient() {
  const prisma = getPrismaClient();
  if (!prisma) {
    const baseMessage = "Prisma client could not be initialized.";
    const errorMessage = global.__stitchcorePrismaLastError?.message;
    throw new Error(errorMessage ? `${baseMessage} ${errorMessage}` : baseMessage);
  }
  return prisma;
}

module.exports = { getPrismaClient, requirePrismaClient };
