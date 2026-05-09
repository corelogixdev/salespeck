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
    { name: "Assets", type: "asset", code: "1000", category: "ASSET", isDefault: true },
    { name: "Liabilities", type: "liability", code: "2000", category: "LIABILITY", isDefault: true },
    { name: "Equity", type: "equity", code: "3000", category: "EQUITY", isDefault: true },
    { name: "Revenue", type: "revenue", code: "4000", category: "REVENUE", isDefault: true },
    { name: "Expense", type: "expense", code: "5000", category: "EXPENSE", isDefault: true },
  ];

  const children = [
    // Assets
    { name: "Current Assets", type: "asset", code: "1100", category: "ASSET", parentName: "Assets", isDefault: true },
    { name: "Cash", type: "asset", code: "1110", category: "ASSET", parentName: "Current Assets", isDefault: true },
    { name: "Bank", type: "asset", code: "1120", category: "ASSET", parentName: "Current Assets", isDefault: false },
    { name: "Accounts Receivable", type: "asset", code: "1130", category: "ASSET", parentName: "Current Assets", isDefault: true },
    
    // Inventory - Manufacturing Specific
    { name: "Inventory Assets", type: "asset", code: "1140", category: "ASSET", parentName: "Current Assets", isDefault: true },
    { name: "Raw Materials (Fabric/Thread)", type: "asset", code: "1141", category: "ASSET", parentName: "Inventory Assets", isDefault: false },
    { name: "Work-in-Process (WIP)", type: "asset", code: "1142", category: "ASSET", parentName: "Inventory Assets", isDefault: false },
    { name: "Finished Goods", type: "asset", code: "1143", category: "ASSET", parentName: "Inventory Assets", isDefault: false },
    
    // Fixed Assets
    { name: "Fixed Assets", type: "asset", code: "1500", category: "ASSET", parentName: "Assets", isDefault: true },
    { name: "Stitching Machines", type: "asset", code: "1510", category: "ASSET", parentName: "Fixed Assets", isDefault: false },
    { name: "Embroidery Machines", type: "asset", code: "1520", category: "ASSET", parentName: "Fixed Assets", isDefault: false },

    // Liabilities
    { name: "Current Liabilities", type: "liability", code: "2100", category: "LIABILITY", parentName: "Liabilities", isDefault: true },
    { name: "Accounts Payable", type: "liability", code: "2110", category: "LIABILITY", parentName: "Current Liabilities", isDefault: true },
    { name: "Tax Payable", type: "liability", code: "2120", category: "LIABILITY", parentName: "Current Liabilities", isDefault: true },
    { name: "Outsource Vendors Payable", type: "liability", code: "2130", category: "LIABILITY", parentName: "Current Liabilities", isDefault: false },

    // Equity
    { name: "Owner Equity", type: "equity", code: "3100", category: "EQUITY", parentName: "Equity", isDefault: true },
    { name: "Opening Balance Equity", type: "equity", code: "3200", category: "EQUITY", parentName: "Equity", isDefault: true },
    { name: "Retained Earnings", type: "equity", code: "3300", category: "EQUITY", parentName: "Equity", isDefault: true },

    // Revenue
    { name: "Sales Revenue", type: "revenue", code: "4100", category: "REVENUE", parentName: "Revenue", isDefault: true },
    { name: "Stitching Services Income", type: "revenue", code: "4110", category: "REVENUE", parentName: "Sales Revenue", isDefault: false },
    { name: "Embroidery Services Income", type: "revenue", code: "4120", category: "REVENUE", parentName: "Sales Revenue", isDefault: false },
    { name: "Other Income", type: "revenue", code: "4200", category: "REVENUE", parentName: "Revenue", isDefault: false },

    // Expense
    { name: "COGS (Manufacturing)", type: "expense", code: "5100", category: "EXPENSE", parentName: "Expense", isDefault: true },
    { name: "Raw Material Purchases", type: "expense", code: "5110", category: "EXPENSE", parentName: "COGS (Manufacturing)", isDefault: false },
    { name: "Stitching Labor Charges", type: "expense", code: "5120", category: "EXPENSE", parentName: "COGS (Manufacturing)", isDefault: false },
    { name: "Embroidery Labor Charges", type: "expense", code: "5130", category: "EXPENSE", parentName: "COGS (Manufacturing)", isDefault: false },
    { name: "Outsource/Subcontract Charges", type: "expense", code: "5140", category: "EXPENSE", parentName: "COGS (Manufacturing)", isDefault: false },
    
    { name: "Operating Expenses", type: "expense", code: "5200", category: "EXPENSE", parentName: "Expense", isDefault: true },
    { name: "Rent Expense", type: "expense", code: "5210", category: "EXPENSE", parentName: "Operating Expenses", isDefault: false },
    { name: "Utilities Expense", type: "expense", code: "5220", category: "EXPENSE", parentName: "Operating Expenses", isDefault: false },
    { name: "Salaries Expense", type: "expense", code: "5230", category: "EXPENSE", parentName: "Operating Expenses", isDefault: false },
  ];

  const allAccountsMap = new Map();

  // Create Top Level
  for (const a of topLevel) {
    let existing = await prisma.financeaccount.findFirst({
      where: { code: a.code },
    });
    
    if (!existing) {
        // Try fallback by name if code didn't exist
        existing = await prisma.financeaccount.findFirst({
            where: { name: a.name, fk_parent_in_financeaccount: null }
        });
    }

    const data = {
        name: a.name,
        type: a.type,
        code: a.code,
        category: a.category,
        fk_parent_in_financeaccount: null,
        isDefault: a.isDefault,
        source: "must-data-seeder",
    };

    if (existing) {
      const updated = await prisma.financeaccount.update({ where: { id: existing.id }, data });
      allAccountsMap.set(a.name, updated.id);
    } else {
      const created = await prisma.financeaccount.create({
        data: {
          id: generateId(32),
          ...data,
        },
      });
      allAccountsMap.set(a.name, created.id);
    }
  }

  // Create Children (2 levels deep supported by the children array ordering)
  for (const c of children) {
    const parentId = allAccountsMap.get(c.parentName) || null;
    let existing = await prisma.financeaccount.findFirst({
      where: { code: c.code },
    });

    if (!existing) {
        existing = await prisma.financeaccount.findFirst({
            where: { name: c.name, fk_parent_in_financeaccount: parentId }
        });
    }

    const data = {
      name: c.name,
      type: c.type,
      code: c.code,
      category: c.category,
      fk_parent_in_financeaccount: parentId,
      isDefault: c.isDefault ?? false,
      source: "must-data-seeder",
    };

    if (existing) {
      const updated = await prisma.financeaccount.update({ where: { id: existing.id }, data });
      allAccountsMap.set(c.name, updated.id);
    } else {
      const created = await prisma.financeaccount.create({
        data: {
          id: generateId(32),
          ...data,
        },
      });
      allAccountsMap.set(c.name, created.id);
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

