"use strict";

require("dotenv").config();

const { requirePrismaClient } = require("../utils/prismaClient");
const encrypt = require("../utils/encrypt");
const { generateId } = require("../utils/idGenerator");

async function upsertUserByUsername(prisma, payload) {
  const existingUser = await prisma.user.findFirst({
    where: { username: payload.username },
  });

  if (existingUser) {
    return prisma.user.update({
      where: { id: existingUser.id },
      data: payload,
    });
  }

  return prisma.user.create({
    data: {
      id: generateId(32),
      ...payload,
    },
  });
}

async function upsertByName(model, payload) {
  const existing = await model.findFirst({
    where: { name: payload.name },
  });

  if (existing) {
    return model.update({
      where: { id: existing.id },
      data: payload,
    });
  }

  return model.create({
    data: {
      id: generateId(32),
      ...payload,
    },
  });
}

async function seedPrisma(options = {}) {
  const shouldDisconnect = options.disconnect !== false;
  const prisma = requirePrismaClient();

  try {
    const now = new Date();

    const admin = await upsertUserByUsername(prisma, {
      firstname: "Test",
      lastname: "User",
      username: "test",
      email: "test@test.com",
      password: encrypt.encrypt("test"),
      role: "branchmanager",
      source: "prisma-seeder",
      createdAt: now,
      updatedAt: now,
      dashboard_config: "{}",
    });

    await upsertUserByUsername(prisma, {
      firstname: "Vendor",
      lastname: "One",
      username: "vendor1",
      email: "vendor1@example.com",
      password: encrypt.encrypt("vendor1"),
      role: "vendor",
      phone: "555-0001",
      address: "123 Supplier Street, Vendor City",
      source: "prisma-seeder",
      createdAt: now,
      updatedAt: now,
    });

    await upsertUserByUsername(prisma, {
      firstname: "Customer",
      lastname: "One",
      username: "customer1",
      email: "customer1@example.com",
      password: encrypt.encrypt("customer1"),
      role: "customer",
      phone: "555-1001",
      address: "789 Buyer Avenue, Customer City",
      source: "prisma-seeder",
      createdAt: now,
      updatedAt: now,
    });

    const defaultBrand = await upsertByName(prisma.brand, {
      name: "Default Brand",
      description: "Default seeded brand",
      status: true,
      createdby: admin.id,
      updatedby: admin.id,
      source: "prisma-seeder",
      createdAt: now,
      updatedAt: now,
    });

    const defaultCategory = await upsertByName(prisma.category, {
      name: "Default Category",
      description: "Default seeded category",
      status: true,
      createdby: admin.id,
      updatedby: admin.id,
      source: "prisma-seeder",
      createdAt: now,
      updatedAt: now,
    });

    const existingProduct = await prisma.product.findFirst({
      where: { barcode: "PRISMA-0001" },
    });

    if (!existingProduct) {
      await prisma.product.create({
        data: {
          id: generateId(32),
          name: "Prisma Seed Product",
          barcode: "PRISMA-0001",
          brand: defaultBrand.id,
          category: defaultCategory.id,
          purchaseprice: 100,
          saleprice: 130,
          quantity: 50,
          ispurchaseable: true,
          issaleable: true,
          purchaseactive: true,
          saleactive: true,
          carrycost: 0,
          discount: 0,
          createdby: admin.id,
          updatedby: admin.id,
          source: "prisma-seeder",
        },
      });
    }

    // financeaccount has legacy schema variance in older installed databases.
    // Skip Prisma seeding here to keep startup resilient during migration rollout.

    const companySetting = await prisma.softwaresetting.findFirst({
      where: { name: "company" },
    });

    const companyPayload = {
      name: "company",
      value: JSON.stringify({
        name: "OpenMenu Demo",
        phone: "",
        address: "",
      }),
      source: "prisma-seeder",
    };

    if (companySetting) {
      await prisma.softwaresetting.update({
        where: { id: companySetting.id },
        data: companyPayload,
      });
    } else {
      await prisma.softwaresetting.create({
        data: {
          id: generateId(32),
          ...companyPayload,
        },
      });
    }

    console.log("Prisma seed completed successfully.");
  } catch (error) {
    console.error("Prisma seed failed:", error);
    throw error;
  } finally {
    if (shouldDisconnect) {
      await prisma.$disconnect();
    }
  }
}

if (require.main === module) {
  seedPrisma()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
} else {
  module.exports = seedPrisma;
}
