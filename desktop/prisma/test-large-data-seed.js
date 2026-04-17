"use strict";

require("dotenv").config();

const { requirePrismaClient } = require("../utils/prismaClient");
const encrypt = require("../utils/encrypt");
const { generateId } = require("../utils/idGenerator");
const logi = require("../utils/logi");

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

if (require.main === module) {
  seedLargeData()
    .then(() => process.exit(0))
    .catch((err) => {
      logi({ prismaTestLargeSeedError: err?.message || String(err) });
      process.exit(1);
    });
} else {
  module.exports = seedLargeData;
}

