"use strict";

require("dotenv").config();

const { requirePrismaClient } = require("../utils/prismaClient");
const { generateId } = require("../utils/idGenerator");
const logi = require("../utils/logi");

function safeString(value) {
  const str = value === undefined || value === null ? "" : String(value);
  return str.trim();
}

async function upsertFinanceAccount({ prisma, account }) {
  const name = safeString(account.name);
  const type = safeString(account.type);
  const parentName = safeString(account.parentName);

  const existing = await prisma.financeaccount.findFirst({
    where: {
      name,
      type,
      fk_parent_in_financeaccount: parentName ? undefined : null,
    },
  });

  const data = {
    name,
    type,
    fk_parent_in_financeaccount: parentName ? account.parentId : null,
    isDefault: account.isDefault ?? false,
    createdby: null,
    updatedby: null,
    source: "must-data-seeder",
    value: null,
  };

  if (existing) {
    return prisma.financeaccount.update({ where: { id: existing.id }, data });
  }

  return prisma.financeaccount.create({
    data: {
      id: generateId(32),
      ...data,
    },
  });
}

async function upsertChartOfAccounts(prisma) {
  // Build parent first then children so FK ids exist.
  const topLevel = [
    { name: "Assets", type: "asset", isDefault: true },
    { name: "Liabilities", type: "liability", isDefault: true },
    { name: "Equity", type: "equity", isDefault: true },
    { name: "Revenue", type: "revenue", isDefault: true },
    { name: "Expense", type: "expense", isDefault: true },
  ];

  const children = [
    { name: "Cash", type: "asset", parentName: "Assets", isDefault: true },
    { name: "Accounts Receivable", type: "asset", parentName: "Assets", isDefault: false },
    { name: "Inventory Assets", type: "asset", parentName: "Assets", isDefault: false },

    { name: "Accounts Payable", type: "liability", parentName: "Liabilities", isDefault: false },
    { name: "Tax Payable", type: "liability", parentName: "Liabilities", isDefault: false },

    { name: "Owner Equity", type: "equity", parentName: "Equity", isDefault: true },

    { name: "Sales Revenue", type: "revenue", parentName: "Revenue", isDefault: true },
    { name: "Other Income", type: "revenue", parentName: "Revenue", isDefault: false },

    { name: "COGS", type: "expense", parentName: "Expense", isDefault: true },
    { name: "Rent Expense", type: "expense", parentName: "Expense", isDefault: false },
    { name: "Utilities Expense", type: "expense", parentName: "Expense", isDefault: false },
  ];

  const topLevelCreated = [];
  for (const a of topLevel) {
    const existing = await prisma.financeaccount.findFirst({
      where: {
        name: a.name,
        type: a.type,
        fk_parent_in_financeaccount: null,
      },
    });
    if (existing) {
      topLevelCreated.push({ ...a, id: existing.id });
    } else {
      const created = await prisma.financeaccount.create({
        data: {
          id: generateId(32),
          name: a.name,
          type: a.type,
          fk_parent_in_financeaccount: null,
          isDefault: a.isDefault,
          createdby: null,
          updatedby: null,
          source: "must-data-seeder",
          value: null,
        },
      });
      topLevelCreated.push({ ...a, id: created.id });
    }
  }

  const topMap = new Map(topLevelCreated.map((item) => [item.name, item.id]));

  for (const c of children) {
    const parentId = topMap.get(c.parentName) || null;
    const existing = await prisma.financeaccount.findFirst({
      where: {
        name: c.name,
        type: c.type,
        fk_parent_in_financeaccount: parentId,
      },
    });

    const data = {
      name: c.name,
      type: c.type,
      fk_parent_in_financeaccount: parentId,
      isDefault: c.isDefault ?? false,
      createdby: null,
      updatedby: null,
      source: "must-data-seeder",
      value: null,
    };

    if (existing) {
      await prisma.financeaccount.update({ where: { id: existing.id }, data });
    } else {
      await prisma.financeaccount.create({
        data: {
          id: generateId(32),
          ...data,
        },
      });
    }
  }
}

async function upsertCompanySetting(prisma) {
  const companyPayload = {
    name: "OpenMenu Demo",
    phone: "",
    address: "",
  };

  const existing = await prisma.softwaresetting.findFirst({ where: { name: "company" } });
  const value = JSON.stringify(companyPayload);

  if (existing) {
    await prisma.softwaresetting.update({
      where: { id: existing.id },
      data: { value, source: existing.source || "must-data-seeder" },
    });
  } else {
    await prisma.softwaresetting.create({
      data: {
        id: generateId(32),
        name: "company",
        value,
        source: "must-data-seeder",
      },
    });
  }
}

async function seedMustData({ disconnect = false } = {}) {
  const prisma = requirePrismaClient();

  try {
    await upsertCompanySetting(prisma);
    await upsertChartOfAccounts(prisma);
  } finally {
    if (disconnect) {
      await prisma.$disconnect();
    }
  }
}

if (require.main === module) {
  seedMustData({ disconnect: true })
    .then(() => process.exit(0))
    .catch((err) => {
      logi({ prismaMustDataError: err?.message || String(err) });
      process.exit(1);
    });
} else {
  module.exports = seedMustData;
}

