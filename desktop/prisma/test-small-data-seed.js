"use strict";

require("dotenv").config();

const { requirePrismaClient } = require("../utils/prismaClient");
const encrypt = require("../utils/encrypt");
const { generateId } = require("../utils/idGenerator");
const logi = require("../utils/logi");

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

if (require.main === module) {
  seedTestSmallData()
    .then(() => process.exit(0))
    .catch((err) => {
      logi({ prismaTestSmallSeedError: err?.message || String(err) });
      process.exit(1);
    });
} else {
  module.exports = seedTestSmallData;
}

