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
    name: "StitchCore Demo",
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


const encrypt = require("../utils/encrypt");

function safeTrim(value) {
  return value === undefined || value === null ? "" : String(value).trim();
}

async function upsertUserByUsername(prisma, payload) {
  const existing = await prisma.user.findFirst({ where: { username: payload.username } });
  if (existing) {
    return prisma.user.update({ where: { id: existing.id }, data: payload });
  }
  return prisma.user.create({ data: { id: generateId(32), ...payload } });
}

async function upsertBrand(prisma, adminId, { name, description }) {
  const existing = await prisma.brand.findFirst({ where: { name } });
  if (existing) return existing;
  return prisma.brand.create({
    data: {
      id: generateId(32),
      name,
      description,
      status: true,
      createdby: adminId,
      updatedby: adminId,
      source: "test-small-data-seed",
    },
  });
}

async function upsertCategory(prisma, adminId, { name, description }) {
  const existing = await prisma.category.findFirst({ where: { name } });
  if (existing) return existing;
  return prisma.category.create({
    data: {
      id: generateId(32),
      name,
      description,
      status: true,
      createdby: adminId,
      updatedby: adminId,
      source: "test-small-data-seed",
    },
  });
}

async function upsertProduct(prisma, adminId, { barcode, name, brandId, categoryId, quantity }) {
  const existing = await prisma.product.findFirst({ where: { barcode } });
  if (existing) {
    return prisma.product.update({
      where: { id: existing.id },
      data: {
        name,
        brand: brandId,
        category: categoryId,
        quantity,
        purchaseprice: 10,
        saleprice: 12,
        ispurchaseable: true,
        issaleable: true,
        purchaseactive: true,
        saleactive: true,
        carrycost: 0,
        discount: 0,
        createdby: existing.createdby || adminId,
        updatedby: adminId,
        source: "test-small-data-seed",
      },
    });
  }
  return prisma.product.create({
    data: {
      id: generateId(32),
      barcode,
      name,
      brand: brandId,
      category: categoryId,
      purchaseprice: 10,
      saleprice: 12,
      quantity,
      ispurchaseable: true,
      issaleable: true,
      purchaseactive: true,
      saleactive: true,
      carrycost: 0,
      discount: 0,
      createdby: adminId,
      updatedby: adminId,
      source: "test-small-data-seed",
    },
  });
}

async function upsertSingleBatchForProduct(prisma, adminId, { productId, quantity }) {
  const existing = await prisma.productbatches.findFirst({ where: { product: productId } });
  const batchData = {
    product: productId,
    quantity,
    expirydate: null,
    source: "test-small-data-seed",
    createdby: adminId,
  };

  if (existing) {
    return prisma.productbatches.update({
      where: { id: existing.id },
      data: { quantity, source: "test-small-data-seed" },
    });
  }

  // productbatches schema doesn't expose createdby; keep only supported fields.
  return prisma.productbatches.create({
    data: {
      id: generateId(32),
      product: batchData.product,
      quantity: batchData.quantity,
      expirydate: batchData.expirydate,
      source: batchData.source,
    },
  });
}

async function seedTestSmallData() {
  const prisma = requirePrismaClient();

  const admin = await upsertUserByUsername(prisma, {
    firstname: "Test",
    lastname: "User",
    username: "test",
    email: "test@test.com",
    password: encrypt.encrypt("test"),
    role: "branchmanager",
    source: "test-small-data-seed",
    dashboard_config: "{}",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [vendor, customer] = await Promise.all([
    upsertUserByUsername(prisma, {
      firstname: "Vendor",
      lastname: "Small",
      username: "vendor1",
      email: "vendor1@example.com",
      password: encrypt.encrypt("vendor1"),
      role: "vendor",
      phone: "555-0001",
      address: "Supplier Street",
      source: "test-small-data-seed",
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    upsertUserByUsername(prisma, {
      firstname: "Customer",
      lastname: "Small",
      username: "customer1",
      email: "customer1@example.com",
      password: encrypt.encrypt("customer1"),
      role: "customer",
      phone: "555-1001",
      address: "Buyer Avenue",
      source: "test-small-data-seed",
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  ]);

  const brand = await upsertBrand(prisma, admin.id, {
    name: "Default Brand",
    description: "Seed brand for small test",
  });
  const category = await upsertCategory(prisma, admin.id, {
    name: "Default Category",
    description: "Seed category for small test",
  });

  const products = [
    { barcode: "SMALL-001", name: "Small Test Product A", quantity: 50 },
    { barcode: "SMALL-002", name: "Small Test Product B", quantity: 100 },
    { barcode: "SMALL-003", name: "Small Test Product C", quantity: 25 },
  ];

  for (const p of products) {
    const product = await upsertProduct(prisma, admin.id, {
      barcode: p.barcode,
      name: p.name,
      brandId: brand.id,
      categoryId: category.id,
      quantity: p.quantity,
    });

    await upsertSingleBatchForProduct(prisma, admin.id, {
      productId: product.id,
      quantity: p.quantity,
    });
  }

  return { adminId: admin.id, vendorId: vendor.id, customerId: customer.id };
}

function parseIntEnv(name, fallback) {
  const raw = process.env[name];
  const n = raw === undefined ? fallback : parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function chunkArray(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function upsertSoftSetting(prisma, { name, value, source = "test-large-data-seed" }) {
  const existing = await prisma.softwaresetting.findFirst({ where: { name } });
  if (existing) {
    return prisma.softwaresetting.update({
      where: { id: existing.id },
      data: { value, source: existing.source || source },
    });
  }
  return prisma.softwaresetting.create({
    data: { id: generateId(32), name, value, source },
  });
}

async function ensureBrandAndCategory(prisma, adminId) {
  const brand = await prisma.brand.findFirst({ where: { name: "Default Brand" } });
  const category = await prisma.category.findFirst({ where: { name: "Default Category" } });

  const finalBrand = brand
    ? brand
    : await prisma.brand.create({
        data: {
          id: generateId(32),
          name: "Default Brand",
          description: "Seed brand for large test",
          status: true,
          createdby: adminId,
          updatedby: adminId,
          source: "test-large-data-seed",
        },
      });

  const finalCategory = category
    ? category
    : await prisma.category.create({
        data: {
          id: generateId(32),
          name: "Default Category",
          description: "Seed category for large test",
          status: true,
          createdby: adminId,
          updatedby: adminId,
          source: "test-large-data-seed",
        },
      });

  return { brandId: finalBrand.id, categoryId: finalCategory.id };
}

async function ensureAdminAndBase(prisma) {
  const existing = await prisma.user.findFirst({ where: { username: "test" } });
  if (existing) return existing;

  return prisma.user.create({
    data: {
      id: generateId(32),
      firstname: "Test",
      lastname: "User",
      username: "test",
      email: "test@test.com",
      password: encrypt.encrypt("test"),
      role: "branchmanager",
      source: "test-large-data-seed",
      dashboard_config: "{}",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
}

async function seedLargeData() {
  const prisma = requirePrismaClient();

  const CUSTOMERS_COUNT = parseIntEnv("CUSTOMERS_COUNT", 5000);
  const PRODUCTS_COUNT = parseIntEnv("PRODUCTS_COUNT", 2000);
  const SALES_COUNT = parseIntEnv("SALES_COUNT", 2000);
  const BATCH_SIZE = parseIntEnv("BATCH_SIZE", 500);
  const INITIAL_PRODUCT_QTY = parseIntEnv("INITIAL_PRODUCT_QTY", 500);
  const FORCE = process.argv.includes("--force");

  const SEED_MARKER = "test_large_seed_v1";
  const already = await prisma.softwaresetting.findFirst({ where: { name: SEED_MARKER } });
  if (already && !FORCE) {
    return { skipped: true, marker: SEED_MARKER };
  }

  const admin = await ensureAdminAndBase(prisma);
  const { brandId, categoryId } = await ensureBrandAndCategory(prisma, admin.id);

  // Create customers
  const customerUsers = Array.from({ length: CUSTOMERS_COUNT }, (_, i) => {
    const idx = i + 1;
    const username = `customer_perf_${idx}`;
    return {
      firstname: "Perf",
      lastname: `Customer ${idx}`,
      username,
      email: `${username}@example.com`,
      password: encrypt.encrypt(`c${idx}`),
      role: "customer",
      phone: `555-${String(idx).padStart(4, "0")}`,
      address: `Perf Buyer Address ${idx}`,
      source: "test-large-data-seed",
      createdAt: new Date(),
      updatedAt: new Date(),
      id: generateId(32),
    };
  });

  // bulk insert customers (performance-oriented; duplicates avoided by marker / force flow)
  for (const part of chunkArray(customerUsers, BATCH_SIZE)) {
    await prisma.user.createMany({ data: part });
  }

  // Create products + one batch each
  const products = Array.from({ length: PRODUCTS_COUNT }, (_, i) => {
    const idx = i + 1;
    const barcode = `PERF-${String(idx).padStart(5, "0")}`;
    return {
      id: generateId(32),
      barcode,
      name: `Perf Product ${idx}`,
      brand: brandId,
      category: categoryId,
      carrycost: 0,
      discount: 0,
      purchaseprice: 10,
      saleprice: 12,
      quantity: INITIAL_PRODUCT_QTY,
      ispurchaseable: true,
      issaleable: true,
      purchaseactive: true,
      saleactive: true,
      taxid: null,
      createdby: admin.id,
      updatedby: admin.id,
      source: "test-large-data-seed",
    };
  });

  const createdProducts = [];
  for (const part of chunkArray(products, BATCH_SIZE)) {
    await prisma.product.createMany({ data: part });
    // For mapping, re-query ids/ids by barcode (cheap compared to huge lookups)
    const barcodes = part.map((p) => p.barcode).filter(Boolean);
    const fetched = await prisma.product.findMany({ where: { barcode: { in: barcodes } } });
    createdProducts.push(...fetched);
  }

  // Create product batches (one per product)
  const batches = createdProducts.map((p) => ({
    id: generateId(32),
    product: p.id,
    quantity: INITIAL_PRODUCT_QTY,
    expirydate: null,
    source: "test-large-data-seed",
  }));
  for (const part of chunkArray(batches, BATCH_SIZE)) {
    await prisma.productbatches.createMany({ data: part });
  }

  // Build sales and soldproducts
  // Each sale uses quantity=1 for speed; soldproducts are 1 row per sale.
  const customers = await prisma.user.findMany({
    where: { role: "customer", username: { startsWith: "customer_perf_" } },
    select: { id: true, username: true },
  });

  const pickedCustomers = customers.map((c) => c.id);
  const sales = Array.from({ length: SALES_COUNT }, (_, i) => {
    const idx = i + 1;
    const product = createdProducts[i % createdProducts.length];
    const customerId = pickedCustomers[i % pickedCustomers.length];
    const saleId = generateId(32);
    const invoicenum = `INV-PERF-${idx}`;
    return {
      id: saleId,
      user: admin.id,
      customer: customerId,
      invoicenum,
      discountpercentage: "0",
      totalprice: String(product.saleprice ?? 0),
      totalpayment: String(product.saleprice ?? 0),
      createdby: admin.id,
      updatedby: admin.id,
      source: "test-large-data-seed",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  for (const part of chunkArray(sales, BATCH_SIZE)) {
    await prisma.sale.createMany({ data: part });
  }

  const soldProducts = sales.map((saleRow, i) => {
    const idx = i + 1;
    const product = createdProducts[i % createdProducts.length];
    return {
      id: generateId(32),
      sale: saleRow.id,
      product: product.id,
      quantity: 1,
      price: product.saleprice ?? 0,
      source: "test-large-data-seed",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  for (const part of chunkArray(soldProducts, BATCH_SIZE)) {
    await prisma.soldproducts.createMany({ data: part });
  }

  // Update inventory quantities + product batch quantities based on soldproducts
  const soldByProduct = await prisma.soldproducts.groupBy({
    by: ["product"],
    _count: { product: true },
  });

  // Apply decrements
  for (const item of soldByProduct) {
    const productId = item.product;
    const qty = item._count.product;
    if (!productId || !qty) continue;
    await prisma.product.update({
      where: { id: productId },
      data: { quantity: { decrement: qty } },
    });
  }

  // For batches, decrement the first batch row per product
  const batchUpdates = soldByProduct
    .filter((i) => i.product)
    .map((i) => ({ productId: i.product, qty: i._count.product }));

  for (const bu of batchUpdates) {
    const batch = await prisma.productbatches.findFirst({ where: { product: bu.productId } });
    if (!batch) continue;
    const nextQty = (batch.quantity ?? 0) - bu.qty;
    if (nextQty <= 0) {
      await prisma.productbatches.delete({ where: { id: batch.id } });
    } else {
      await prisma.productbatches.update({ where: { id: batch.id }, data: { quantity: nextQty } });
    }
  }

  // Inventory logs (one per sale)
  const inventoryLogs = sales.map((saleRow, i) => {
    const product = createdProducts[i % createdProducts.length];
    return {
      id: generateId(32),
      product_id: product.id,
      quantity: -1,
      note: "Sold (perf seed)",
      createdby: admin.id,
      type: "sale",
      vendor: null,
      source: "test-large-data-seed",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  for (const part of chunkArray(inventoryLogs, BATCH_SIZE)) {
    await prisma.inventorylogs.createMany({ data: part });
  }

  await upsertSoftSetting(prisma, {
    name: SEED_MARKER,
    value: new Date().toISOString(),
    source: "system",
  });

  return { skipped: false, customers: CUSTOMERS_COUNT, products: PRODUCTS_COUNT, sales: SALES_COUNT };
}

module.exports = {
  seedMustData,
  seedTestSmallData,
  seedLargeData
};

if (require.main === module) {
  const args = process.argv.slice(2);
  let promise;
  
  if (args.includes('--small')) {
    promise = seedMustData().then(seedTestSmallData);
  } else if (args.includes('--large')) {
    promise = seedMustData().then(seedLargeData);
  } else {
    promise = seedMustData({ disconnect: true });
  }
  
  promise.then(() => process.exit(0)).catch((err) => {
    logi({ prismaSeedError: err?.message || String(err) });
    process.exit(1);
  });
}
