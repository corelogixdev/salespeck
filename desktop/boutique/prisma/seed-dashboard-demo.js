"use strict";

require("dotenv").config();
const { requirePrismaClient } = require("../utils/prismaClient");
const { generateId } = require("../utils/idGenerator");
const encrypt = require("../utils/encrypt");
const moment = require("moment");

async function seedDashboardDemoData() {
  const prisma = requirePrismaClient();
  console.log("🌱 Starting Dashboard Synthetic Data Seeding...");

  // 1. Ensure Admin User
  let admin = await prisma.user.findFirst({ where: { role: "branchmanager" } });
  if (!admin) {
    admin = await prisma.user.create({
      data: {
        id: generateId(32),
        firstname: "Admin",
        lastname: "Manager",
        username: "admin",
        email: "admin@salespeck.com",
        password: encrypt.encrypt("admin123"),
        role: "branchmanager",
        source: "demo-seeder",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  // 2. Create Customers
  const customerNames = [
    { first: "Sarah", last: "Khan", email: "sarah.k@example.com", phone: "555-0101" },
    { first: "Ali", last: "Raza", email: "ali.raza@example.com", phone: "555-0102" },
    { first: "Fatima", last: "Ahmed", email: "fatima.a@example.com", phone: "555-0103" },
    { first: "Usman", last: "Tariq", email: "usman.t@example.com", phone: "555-0104" },
    { first: "Ayesha", last: "Malik", email: "ayesha.m@example.com", phone: "555-0105" },
    { first: "Bilal", last: "Hassan", email: "bilal.h@example.com", phone: "555-0106" },
  ];

  const createdCustomers = [];
  for (let i = 0; i < customerNames.length; i++) {
    const c = customerNames[i];
    let cust = await prisma.user.findFirst({ where: { email: c.email } });
    if (!cust) {
      // Set created date spread across yesterday and today
      const createdDate = i % 2 === 0 ? moment().toDate() : moment().subtract(1, "day").toDate();
      cust = await prisma.user.create({
        data: {
          id: generateId(32),
          firstname: c.first,
          lastname: c.last,
          username: `cust_${c.first.toLowerCase()}`,
          email: c.email,
          phone: c.phone,
          password: encrypt.encrypt("customer123"),
          role: "customer",
          source: "demo-seeder",
          createdAt: createdDate,
          updatedAt: createdDate,
        },
      });
    }
    createdCustomers.push(cust);
  }

  // 3. Create Brands
  const brandNames = ["SalesPeck Premium", "Royal Silk Mills", "Urban Stitch", "Classic Textiles"];
  const createdBrands = [];
  for (const bName of brandNames) {
    let b = await prisma.brand.findFirst({ where: { name: bName } });
    if (!b) {
      b = await prisma.brand.create({
        data: {
          id: generateId(32),
          name: bName,
          description: `${bName} brand line`,
          status: true,
          createdby: admin.id,
          source: "demo-seeder",
        },
      });
    }
    createdBrands.push(b);
  }

  // 4. Create Categories
  const categoryList = [
    "Apparel & Garments",
    "Stitching Services",
    "Embroidery & Custom Work",
    "Fabrics & Textiles",
    "Accessories & Trims",
  ];
  const createdCategories = [];
  for (const cName of categoryList) {
    let cat = await prisma.category.findFirst({ where: { name: cName } });
    if (!cat) {
      cat = await prisma.category.create({
        data: {
          id: generateId(32),
          name: cName,
          description: `${cName} category`,
          status: true,
          createdby: admin.id,
          source: "demo-seeder",
        },
      });
    }
    createdCategories.push(cat);
  }

  const catMap = new Map(createdCategories.map((c) => [c.name, c.id]));
  const brandMap = new Map(createdBrands.map((b) => [b.name, b.id]));

  // 5. Create Products (Including Normal Stock and Low Stock < 10 items)
  const productDefinitions = [
    { name: "Designer Kurti 3Pcs", category: "Apparel & Garments", brand: "Urban Stitch", purchaseprice: 45, saleprice: 85, quantity: 45, barcode: "DEMO-1001" },
    { name: "Silk Unstitched Fabric (Mtr)", category: "Fabrics & Textiles", brand: "Royal Silk Mills", purchaseprice: 15, saleprice: 35, quantity: 120, barcode: "DEMO-1002" },
    { name: "Custom Suit Stitching Service", category: "Stitching Services", brand: "SalesPeck Premium", purchaseprice: 20, saleprice: 60, quantity: 500, barcode: "DEMO-1003", is_service: true },
    { name: "Heavy Neck Embroidery Job", category: "Embroidery & Custom Work", brand: "SalesPeck Premium", purchaseprice: 12, saleprice: 40, quantity: 300, barcode: "DEMO-1004", is_service: true },
    { name: "Cotton Lawn Suit Unstitched", category: "Fabrics & Textiles", brand: "Classic Textiles", purchaseprice: 25, saleprice: 55, quantity: 80, barcode: "DEMO-1005" },
    { name: "Golden Zari Thread Roll", category: "Accessories & Trims", brand: "Classic Textiles", purchaseprice: 5, saleprice: 15, quantity: 3, barcode: "DEMO-1006" }, // Low stock!
    { name: "Velvet Embroidered Dupatta", category: "Apparel & Garments", brand: "Royal Silk Mills", purchaseprice: 30, saleprice: 70, quantity: 4, barcode: "DEMO-1007" }, // Low stock!
    { name: "Metallic Designer Buttons (Pack)", category: "Accessories & Trims", brand: "Urban Stitch", purchaseprice: 2, saleprice: 8, quantity: 2, barcode: "DEMO-1008" }, // Low stock!
    { name: "Fancy Lace Trim (10 Yards)", category: "Accessories & Trims", brand: "Classic Textiles", purchaseprice: 8, saleprice: 22, quantity: 65, barcode: "DEMO-1009" },
    { name: "Men's Formal Sherwani Stitching", category: "Stitching Services", brand: "SalesPeck Premium", purchaseprice: 50, saleprice: 150, quantity: 200, barcode: "DEMO-1010", is_service: true },
  ];

  const createdProducts = [];
  for (const pDef of productDefinitions) {
    let p = await prisma.product.findFirst({ where: { barcode: pDef.barcode } });
    if (!p) {
      p = await prisma.product.create({
        data: {
          id: generateId(32),
          barcode: pDef.barcode,
          name: pDef.name,
          brand: brandMap.get(pDef.brand),
          category: catMap.get(pDef.category),
          purchaseprice: pDef.purchaseprice,
          saleprice: pDef.saleprice,
          quantity: pDef.quantity,
          is_service: pDef.is_service || false,
          ispurchaseable: true,
          issaleable: true,
          purchaseactive: true,
          saleactive: true,
          createdby: admin.id,
          source: "demo-seeder",
        },
      });

      // Create initial batch
      await prisma.productbatches.create({
        data: {
          id: generateId(32),
          product: p.id,
          quantity: pDef.quantity,
          source: "demo-seeder",
        },
      });
    }
    createdProducts.push(p);
  }

  // 6. Generate Sales across the last 30 Days and Today's Hours
  console.log("📊 Seeding historical sales across the past 30 days and today...");

  let invoiceCounter = 1000;

  // Past 30 Days Sales
  for (let dayOffset = 30; dayOffset >= 1; dayOffset--) {
    const saleDate = moment().subtract(dayOffset, "days").hour(14).minute(30).toDate();
    // 2 to 5 sales per day
    const salesCount = 2 + (dayOffset % 4);

    for (let s = 0; s < salesCount; s++) {
      invoiceCounter++;
      const cust = createdCustomers[s % createdCustomers.length];
      const prod = createdProducts[s % createdProducts.length];
      const qty = 1 + (s % 3);
      const lineTotal = (prod.saleprice || 20) * qty;

      const saleId = generateId(32);
      await prisma.sale.create({
        data: {
          id: saleId,
          user: admin.id,
          customer: cust.id,
          invoicenum: `INV-DEMO-${invoiceCounter}`,
          discountpercentage: "0",
          totalprice: String(lineTotal),
          totalpayment: String(lineTotal),
          createdby: admin.id,
          source: "demo-seeder",
          createdAt: saleDate,
          updatedAt: saleDate,
        },
      });

      await prisma.soldproducts.create({
        data: {
          id: generateId(32),
          sale: saleId,
          product: prod.id,
          quantity: qty,
          price: prod.saleprice || 20,
          source: "demo-seeder",
          createdAt: saleDate,
          updatedAt: saleDate,
        },
      });
    }
  }

  // Today's Sales Spread Across Different Hours (9 AM, 11 AM, 1 PM, 3 PM, 5 PM, 7 PM)
  const todayHours = [9, 11, 13, 15, 17, 19];
  for (let idx = 0; idx < todayHours.length; idx++) {
    const hr = todayHours[idx];
    const saleDate = moment().hour(hr).minute(15 + idx * 5).toDate();
    
    // Create 1-2 sales for each hour slot today
    for (let sub = 0; sub < 2; sub++) {
      invoiceCounter++;
      const cust = createdCustomers[(idx + sub) % createdCustomers.length];
      const prod = createdProducts[(idx * 2 + sub) % createdProducts.length];
      const qty = 1 + (sub % 2);
      const lineTotal = (prod.saleprice || 25) * qty;

      const saleId = generateId(32);
      await prisma.sale.create({
        data: {
          id: saleId,
          user: admin.id,
          customer: cust.id,
          invoicenum: `INV-TODAY-${invoiceCounter}`,
          discountpercentage: "0",
          totalprice: String(lineTotal),
          totalpayment: String(lineTotal),
          createdby: admin.id,
          source: "demo-seeder",
          createdAt: saleDate,
          updatedAt: saleDate,
        },
      });

      await prisma.soldproducts.create({
        data: {
          id: generateId(32),
          sale: saleId,
          product: prod.id,
          quantity: qty,
          price: prod.saleprice || 25,
          source: "demo-seeder",
          createdAt: saleDate,
          updatedAt: saleDate,
        },
      });
    }
  }

  console.log("✅ Synthetic Dashboard Data Seeding Complete!");
  console.log("Summary:");
  console.log(`- Created ${createdCategories.length} Categories`);
  console.log(`- Created ${createdBrands.length} Brands`);
  console.log(`- Created ${createdProducts.length} Products (including 3 low-stock items)`);
  console.log(`- Created 6 Customers`);
  console.log(`- Generated ~100 Sales transactions across past 30 days + today's hourly slots`);
}

if (require.main === module) {
  seedDashboardDemoData()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("❌ Seeding failed:", err);
      process.exit(1);
    });
}

module.exports = seedDashboardDemoData;
