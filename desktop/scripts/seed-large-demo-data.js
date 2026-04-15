"use strict";

const encrypt = require("../utils/encrypt");
const { generateId } = require("../utils/idGenerator");
const db = require("../models");
const { Op } = require("sequelize");

// Configuration
const CONFIG = {
  CLIENTS_COUNT: 20000,
  PRODUCTS_COUNT: 30000,
  SALES_COUNT: 300000,
  MIN_ITEMS_PER_SALE: 1,
  MAX_ITEMS_PER_SALE: 8,
  TRANSACTIONS_COUNT: 50000,
  BATCH_SIZE: 1000, // Insert in batches for performance
  CATEGORIES_COUNT: 50,
  BRANDS_COUNT: 100,
  VENDORS_COUNT: 100,
};

// Progress tracking
let progress = {
  categories: 0,
  brands: 0,
  vendors: 0,
  clients: 0,
  products: 0,
  sales: 0,
  soldProducts: 0,
  transactions: 0,
};

function logProgress(entity, current, total) {
  const percent = ((current / total) * 100).toFixed(1);
  process.stdout.write(
    `\r  [${entity}] ${current.toLocaleString()} / ${total.toLocaleString()} (${percent}%)`,
  );
}

function logComplete(entity, count, time) {
  console.log(
    `\n  [${entity}] Completed: ${count.toLocaleString()} records in ${(time / 1000).toFixed(2)}s`,
  );
}

// Random data generators
const firstNames = [
  "James",
  "Mary",
  "John",
  "Patricia",
  "Robert",
  "Jennifer",
  "Michael",
  "Linda",
  "William",
  "Elizabeth",
  "David",
  "Barbara",
  "Richard",
  "Susan",
  "Joseph",
  "Jessica",
  "Thomas",
  "Sarah",
  "Charles",
  "Karen",
  "Christopher",
  "Lisa",
  "Daniel",
  "Nancy",
  "Matthew",
  "Betty",
  "Anthony",
  "Margaret",
  "Mark",
  "Sandra",
  "Donald",
  "Ashley",
  "Steven",
  "Kimberly",
  "Paul",
  "Emily",
  "Andrew",
  "Donna",
  "Joshua",
  "Michelle",
  "Ahmed",
  "Ali",
  "Hassan",
  "Omar",
  "Fatima",
  "Aisha",
  "Mohammed",
  "Zainab",
  "Ibrahim",
  "Maryam",
];

const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
  "Perez",
  "Thompson",
  "White",
  "Harris",
  "Sanchez",
  "Clark",
  "Ramirez",
  "Lewis",
  "Robinson",
  "Walker",
  "Young",
  "Allen",
  "King",
  "Wright",
  "Scott",
  "Torres",
  "Nguyen",
  "Hill",
  "Flores",
  "Khan",
  "Ahmad",
  "Hussein",
  "Abbas",
  "Rahman",
  "Malik",
  "Shah",
  "Patel",
  "Singh",
  "Kumar",
];

const productNames = [
  "Widget",
  "Gadget",
  "Device",
  "Tool",
  "Component",
  "Module",
  "Unit",
  "Part",
  "Item",
  "Element",
  "Accessory",
  "Adapter",
  "Cable",
  "Connector",
  "Sensor",
  "Controller",
  "Display",
  "Panel",
  "Board",
  "Chip",
  "Motor",
  "Pump",
  "Valve",
  "Filter",
  "Bearing",
  "Gear",
  "Belt",
  "Chain",
  "Spring",
  "Screw",
];

const productAdjectives = [
  "Premium",
  "Standard",
  "Basic",
  "Advanced",
  "Pro",
  "Elite",
  "Compact",
  "Heavy-Duty",
  "Industrial",
  "Commercial",
  "Residential",
  "Portable",
  "Wireless",
  "Digital",
  "Analog",
  "Smart",
  "Mini",
  "Mega",
  "Ultra",
  "Super",
];

const categoryNames = [
  "Electronics",
  "Hardware",
  "Software",
  "Accessories",
  "Tools",
  "Parts",
  "Equipment",
  "Supplies",
  "Components",
  "Materials",
  "Consumables",
  "Safety",
  "Cleaning",
  "Packaging",
  "Office",
  "Industrial",
  "Automotive",
  "Medical",
  "Food",
  "Beverages",
  "Clothing",
  "Furniture",
  "Lighting",
  "Plumbing",
  "Electrical",
];

const brandPrefixes = [
  "Tech",
  "Pro",
  "Global",
  "Prime",
  "Max",
  "Ultra",
  "Smart",
  "Power",
  "Quick",
  "Super",
  "Eco",
  "Bio",
  "Nano",
  "Mega",
  "Mini",
  "Multi",
  "Auto",
  "Digi",
  "Net",
  "Cloud",
];

const brandSuffixes = [
  "Corp",
  "Inc",
  "Co",
  "Systems",
  "Solutions",
  "Industries",
  "Group",
  "Tech",
  "Works",
  "Labs",
  "Direct",
  "Plus",
  "Pro",
  "Max",
  "One",
  "First",
  "Best",
  "Top",
  "Prime",
  "Elite",
];

const streets = [
  "Main St",
  "Oak Ave",
  "Maple Dr",
  "Cedar Ln",
  "Pine Rd",
  "Elm St",
  "Park Ave",
  "Lake Dr",
  "River Rd",
  "Hill St",
  "Valley Rd",
  "Forest Ave",
  "Ocean Blvd",
  "Mountain View",
  "Sunset Dr",
];

const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "Fort Worth",
  "Columbus",
  "Charlotte",
];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max, decimals = 2) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

function generatePhone() {
  return `${randomInt(100, 999)}-${randomInt(100, 999)}-${randomInt(1000, 9999)}`;
}

function generateEmail(firstName, lastName, index) {
  const domains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "email.com",
  ];
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index}@${randomElement(domains)}`;
}

function generateAddress() {
  return `${randomInt(1, 9999)} ${randomElement(streets)}, ${randomElement(cities)}`;
}

// Batch insert helper
async function batchInsert(model, records, entityName, totalCount) {
  const batches = [];
  for (let i = 0; i < records.length; i += CONFIG.BATCH_SIZE) {
    batches.push(records.slice(i, i + CONFIG.BATCH_SIZE));
  }

  let inserted = 0;
  for (const batch of batches) {
    await model.bulkCreate(batch, { ignoreDuplicates: true });
    inserted += batch.length;
    logProgress(entityName, inserted, totalCount);
  }
  return inserted;
}

// Generate Categories
async function generateCategories() {
  console.log("\n[1/8] Generating Categories...");
  const startTime = Date.now();
  const categories = [];
  const now = new Date();

  for (let i = 0; i < CONFIG.CATEGORIES_COUNT; i++) {
    const name = `${randomElement(categoryNames)} ${randomElement(["Type", "Category", "Class", "Group"])} ${i + 1}`;
    categories.push({
      id: generateId(32),
      name: name.substring(0, 100),
      description: `Category for ${name}`,
      status: true,
      source: "demo-seeder",
      createdAt: now,
      updatedAt: now,
    });
  }

  await batchInsert(
    db.category,
    categories,
    "Categories",
    CONFIG.CATEGORIES_COUNT,
  );
  logComplete("Categories", categories.length, Date.now() - startTime);
  return categories;
}

// Generate Brands
async function generateBrands() {
  console.log("\n[2/8] Generating Brands...");
  const startTime = Date.now();
  const brands = [];
  const now = new Date();

  for (let i = 0; i < CONFIG.BRANDS_COUNT; i++) {
    const name = `${randomElement(brandPrefixes)}${randomElement(brandSuffixes)} ${i + 1}`;
    brands.push({
      id: generateId(32),
      name: name.substring(0, 100),
      description: `Brand ${name} - Quality products`,
      status: true,
      source: "demo-seeder",
      createdAt: now,
      updatedAt: now,
    });
  }

  await batchInsert(db.brand, brands, "Brands", CONFIG.BRANDS_COUNT);
  logComplete("Brands", brands.length, Date.now() - startTime);
  return brands;
}

// Generate Vendors
async function generateVendors() {
  console.log("\n[3/8] Generating Vendors...");
  const startTime = Date.now();
  const vendors = [];
  
  // Use random dates over the past 2 years
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 2);
  const endDate = new Date();

  for (let i = 0; i < CONFIG.VENDORS_COUNT; i++) {
    const firstName = randomElement(firstNames);
    const lastName = randomElement(lastNames);
    const createdDate = randomDate(startDate, endDate);
    
    vendors.push({
      id: generateId(32),
      firstname: firstName,
      lastname: lastName,
      username: `vendor_${i + 1}`,
      email: generateEmail(firstName, lastName, i),
      password: encrypt.encrypt("vendor123"),
      phone: generatePhone(),
      address: generateAddress(),
      role: "vendor",
      source: "demo-seeder",
      createdAt: createdDate,
      updatedAt: createdDate,
    });
  }

  await batchInsert(db.user, vendors, "Vendors", CONFIG.VENDORS_COUNT);
  logComplete("Vendors", vendors.length, Date.now() - startTime);
  return vendors;
}

// Generate Clients (Customers)
async function generateClients() {
  console.log("\n[4/8] Generating Clients (20,000)...");
  const startTime = Date.now();
  const clients = [];
  
  // Use random dates over the past 2 years
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 2);
  const endDate = new Date();

  for (let i = 0; i < CONFIG.CLIENTS_COUNT; i++) {
    const firstName = randomElement(firstNames);
    const lastName = randomElement(lastNames);
    const createdDate = randomDate(startDate, endDate);
    
    clients.push({
      id: generateId(32),
      firstname: firstName,
      lastname: lastName,
      username: `client_${i + 1}`,
      email: generateEmail(firstName, lastName, i),
      password: encrypt.encrypt("client123"),
      phone: generatePhone(),
      phone2: Math.random() > 0.7 ? generatePhone() : null,
      address: generateAddress(),
      role: "customer",
      source: "demo-seeder",
      createdAt: createdDate,
      updatedAt: createdDate,
    });
  }

  await batchInsert(db.user, clients, "Clients", CONFIG.CLIENTS_COUNT);
  logComplete("Clients", clients.length, Date.now() - startTime);
  return clients;
}

// Generate Products
async function generateProducts(categories, brands, adminUser) {
  console.log("\n[5/8] Generating Products (30,000)...");
  const startTime = Date.now();
  const products = [];
  const now = new Date();

  for (let i = 0; i < CONFIG.PRODUCTS_COUNT; i++) {
    const purchasePrice = randomFloat(1, 500);
    const salePrice = purchasePrice * randomFloat(1.1, 2.5);
    const isPurchaseable = Math.random() > 0.1;
    const isSaleable = Math.random() > 0.1;

    products.push({
      id: generateId(32),
      name: `${randomElement(productAdjectives)} ${randomElement(productNames)} ${i + 1}`,
      barcode: `PRD${String(i + 1).padStart(8, "0")}`,
      category: randomElement(categories).id,
      brand: randomElement(brands).id,
      quantity: randomInt(0, 1000),
      purchaseprice: purchasePrice,
      saleprice: salePrice,
      carrycost: randomFloat(0, 10),
      discount: randomFloat(0, 20),
      ispurchaseable: isPurchaseable,
      issaleable: isSaleable,
      purchaseactive: isPurchaseable,
      saleactive: isSaleable,
      createdby: adminUser.id,
      updatedby: adminUser.id,
      source: "demo-seeder",
    });
  }

  await batchInsert(db.product, products, "Products", CONFIG.PRODUCTS_COUNT);
  logComplete("Products", products.length, Date.now() - startTime);
  return products;
}

// Generate Sales and SoldProducts
async function generateSales(clients, products, adminUser) {
  console.log("\n[6/8] Generating Sales (300,000) with Items...");
  const startTime = Date.now();

  const saleableProducts = products.filter((p) => p.issaleable);
  if (saleableProducts.length === 0) {
    console.log("  No saleable products found, using all products");
    saleableProducts.push(...products);
  }

  // Get sales finance account (pos sale or sale)
  const salesFinanceAccount = await db.financeaccount.findOne({
    where: {
      name: { [Op.in]: ['pos sale', 'sale'] },
      type: 'income'
    }
  });
  
  if (!salesFinanceAccount) {
    console.log("  Warning: No sales finance account found. Sales will not be linked to finance accounts.");
  }

  const startDate = new Date("2023-01-01");
  const endDate = new Date();

  let salesInserted = 0;
  let soldProductsInserted = 0;
  let financeTransactionsInserted = 0;

  // Process sales in larger batches
  const SALES_BATCH = 5000;

  for (
    let batchStart = 0;
    batchStart < CONFIG.SALES_COUNT;
    batchStart += SALES_BATCH
  ) {
    const batchEnd = Math.min(batchStart + SALES_BATCH, CONFIG.SALES_COUNT);
    const sales = [];
    const soldProducts = [];
    const financeTransactions = [];

    for (let i = batchStart; i < batchEnd; i++) {
      const saleId = generateId(32);
      const saleDate = randomDate(startDate, endDate);
      const customer = randomElement(clients);
      const itemCount = randomInt(
        CONFIG.MIN_ITEMS_PER_SALE,
        CONFIG.MAX_ITEMS_PER_SALE,
      );

      let totalPrice = 0;
      const selectedProducts = new Set();

      // Generate sold products for this sale
      for (let j = 0; j < itemCount; j++) {
        let product;
        let attempts = 0;
        do {
          product = randomElement(saleableProducts);
          attempts++;
        } while (selectedProducts.has(product.id) && attempts < 10);

        if (selectedProducts.has(product.id)) continue;
        selectedProducts.add(product.id);

        const quantity = randomInt(1, 10);
        const price = product.saleprice;
        const itemTotal = quantity * price;
        totalPrice += itemTotal;

        soldProducts.push({
          id: generateId(32),
          sale: saleId,
          product: product.id,
          quantity: quantity,
          price: price,
          total: itemTotal,
          source: "demo-seeder",
          createdAt: saleDate,
          updatedAt: saleDate,
        });
      }

      const discountPercentage = Math.random() > 0.7 ? randomInt(0, 20) : 0;
      const discountedTotal = totalPrice * (1 - discountPercentage / 100);
      const payment =
        Math.random() > 0.1
          ? discountedTotal
          : discountedTotal * randomFloat(0.5, 1);

      sales.push({
        id: saleId,
        user: adminUser.id,
        customer: customer.id,
        invoicenum: `INV-${String(i + 1).padStart(8, "0")}`,
        discountpercentage: String(discountPercentage),
        totalprice: String(totalPrice.toFixed(2)),
        totalpayment: String(payment.toFixed(2)),
        createdby: adminUser.id,
        updatedby: adminUser.id,
        source: "demo-seeder",
        createdAt: saleDate,
        updatedAt: saleDate,
      });

      // Create finance transaction for this sale if finance account exists
      if (salesFinanceAccount) {
        financeTransactions.push({
          id: generateId(32),
          name: `Sale ${saleId.substring(0, 8)}`,
          amount: parseFloat(payment),
          status: 'completed',
          date: saleDate,
          details: `Sale transaction for invoice ${sales[sales.length - 1].invoicenum}`,
          fk_financeaccount_in_financetransaction: salesFinanceAccount.id,
          fk_user_targetto_in_financetransaction: customer.id,
          createdby: adminUser.id,
          updatedby: adminUser.id,
          source: "demo-seeder",
          createdAt: saleDate,
          updatedAt: saleDate,
        });
      }
    }

    // Bulk insert this batch
    await db.sale.bulkCreate(sales, { ignoreDuplicates: true });
    await db.soldproducts.bulkCreate(soldProducts, { ignoreDuplicates: true });
    
    // Create finance transactions for sales
    if (financeTransactions.length > 0) {
      await db.financetransaction.bulkCreate(financeTransactions, { ignoreDuplicates: true });
      financeTransactionsInserted += financeTransactions.length;
    }

    salesInserted += sales.length;
    soldProductsInserted += soldProducts.length;
    logProgress("Sales", salesInserted, CONFIG.SALES_COUNT);
  }

  logComplete("Sales", salesInserted, Date.now() - startTime);
  console.log(
    `    - Total Sold Product Items: ${soldProductsInserted.toLocaleString()}`,
  );
  if (salesFinanceAccount) {
    console.log(
      `    - Finance Transactions Created: ${financeTransactionsInserted.toLocaleString()}`,
    );
  }

  return { salesCount: salesInserted, soldProductsCount: soldProductsInserted };
}

// Generate Finance Transactions
async function generateTransactions(clients, adminUser) {
  console.log("\n[7/8] Generating Finance Transactions (50,000)...");
  const startTime = Date.now();

  // Get finance accounts
  const financeAccounts = await db.financeaccount.findAll();
  if (financeAccounts.length === 0) {
    console.log("  No finance accounts found. Skipping transactions.");
    return [];
  }

  const transactions = [];
  const startDate = new Date("2023-01-01");
  const endDate = new Date();
  const now = new Date();

  const transactionTypes = [
    { name: "Payment Received", status: "completed" },
    { name: "Payment Made", status: "completed" },
    { name: "Refund Issued", status: "completed" },
    { name: "Deposit", status: "completed" },
    { name: "Withdrawal", status: "completed" },
    { name: "Transfer", status: "completed" },
    { name: "Pending Payment", status: "pending" },
    { name: "Invoice Payment", status: "completed" },
    { name: "Expense", status: "completed" },
    { name: "Revenue", status: "completed" },
  ];

  for (let i = 0; i < CONFIG.TRANSACTIONS_COUNT; i++) {
    const txDate = randomDate(startDate, endDate);
    const txType = randomElement(transactionTypes);
    const customer = randomElement(clients);
    const account = randomElement(financeAccounts);

    transactions.push({
      id: generateId(32),
      name: `${txType.name} #${i + 1}`,
      amount: randomFloat(10, 10000),
      status: txType.status,
      date: txDate,
      details: `${txType.name} transaction for customer ${customer.firstname} ${customer.lastname}`,
      fk_financeaccount_in_financetransaction: account.id,
      fk_user_targetto_in_financetransaction: customer.id,
      createdby: adminUser.id,
      updatedby: adminUser.id,
      source: "demo-seeder",
      createdAt: txDate,
      updatedAt: txDate,
    });
  }

  await batchInsert(
    db.financetransaction,
    transactions,
    "Transactions",
    CONFIG.TRANSACTIONS_COUNT,
  );
  logComplete("Transactions", transactions.length, Date.now() - startTime);
  return transactions;
}

// Generate Inventory Logs
async function generateInventoryLogs(products, vendors, adminUser) {
  console.log("\n[8/8] Generating Inventory Logs (50,000)...");
  const startTime = Date.now();

  const logs = [];
  const startDate = new Date("2023-01-01");
  const endDate = new Date();
  const logTypes = [
    "purchase",
    "sale",
    "adjustment",
    "return",
    "transfer",
    "damaged",
    "expired",
  ];

  const LOGS_COUNT = 50000;

  for (let i = 0; i < LOGS_COUNT; i++) {
    const logDate = randomDate(startDate, endDate);
    const product = randomElement(products);
    const type = randomElement(logTypes);

    logs.push({
      id: generateId(32),
      product_id: product.id,
      quantity:
        type === "sale" || type === "damaged" || type === "expired"
          ? -randomInt(1, 50)
          : randomInt(1, 100),
      note: `${type.charAt(0).toUpperCase() + type.slice(1)} - Batch ${i + 1}`,
      type: type,
      createdby: adminUser.id,
      source: "demo-seeder",
      createdAt: logDate,
      updatedAt: logDate,
    });
  }

  await batchInsert(db.inventorylogs, logs, "Inventory Logs", LOGS_COUNT);
  logComplete("Inventory Logs", logs.length, Date.now() - startTime);
  return logs;
}

// Main seeding function
async function seedLargeDemoData() {
  const overallStartTime = Date.now();

  console.log("=".repeat(60));
  console.log("  LARGE DEMO DATA SEEDER");
  console.log("=".repeat(60));
  console.log("\nConfiguration:");
  console.log(`  - Clients:      ${CONFIG.CLIENTS_COUNT.toLocaleString()}`);
  console.log(`  - Products:     ${CONFIG.PRODUCTS_COUNT.toLocaleString()}`);
  console.log(`  - Sales:        ${CONFIG.SALES_COUNT.toLocaleString()}`);
  console.log(
    `  - Items/Sale:   ${CONFIG.MIN_ITEMS_PER_SALE}-${CONFIG.MAX_ITEMS_PER_SALE}`,
  );
  console.log(
    `  - Transactions: ${CONFIG.TRANSACTIONS_COUNT.toLocaleString()}`,
  );
  console.log(`  - Categories:   ${CONFIG.CATEGORIES_COUNT.toLocaleString()}`);
  console.log(`  - Brands:       ${CONFIG.BRANDS_COUNT.toLocaleString()}`);
  console.log(`  - Vendors:      ${CONFIG.VENDORS_COUNT.toLocaleString()}`);
  console.log("");

  try {
    // Create or get admin user
    let adminUser = await db.user.findOne({ where: { username: "test" } });
    if (!adminUser) {
      adminUser = await db.user.create({
        id: generateId(32),
        firstname: "test",
        lastname: "test",
        username: "test",
        email: "test@test.com",
        password: encrypt.encrypt("test"),
        role: "branchmanager",
        source: "demo-seeder",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    console.log(`Admin user: ${adminUser.username} (${adminUser.id})`);

    // Generate all data
    const categories = await generateCategories();
    const brands = await generateBrands();
    const vendors = await generateVendors();
    const clients = await generateClients();
    const products = await generateProducts(categories, brands, adminUser);
    const salesResult = await generateSales(clients, products, adminUser);
    await generateTransactions(clients, adminUser);
    await generateInventoryLogs(products, vendors, adminUser);

    const totalTime = Date.now() - overallStartTime;

    console.log("\n" + "=".repeat(60));
    console.log("  SEEDING COMPLETE");
    console.log("=".repeat(60));
    console.log("\nSummary:");
    console.log(`  - Categories:     ${categories.length.toLocaleString()}`);
    console.log(`  - Brands:         ${brands.length.toLocaleString()}`);
    console.log(`  - Vendors:        ${vendors.length.toLocaleString()}`);
    console.log(`  - Clients:        ${clients.length.toLocaleString()}`);
    console.log(`  - Products:       ${products.length.toLocaleString()}`);
    console.log(
      `  - Sales:          ${salesResult.salesCount.toLocaleString()}`,
    );
    console.log(
      `  - Sold Items:     ${salesResult.soldProductsCount.toLocaleString()}`,
    );
    console.log(
      `  - Transactions:   ${CONFIG.TRANSACTIONS_COUNT.toLocaleString()}`,
    );
    console.log(`  - Inventory Logs: 50,000`);
    console.log(`\nTotal Time: ${(totalTime / 1000 / 60).toFixed(2)} minutes`);
    console.log("=".repeat(60));
  } catch (error) {
    console.error("\n\nError seeding large demo data:", error);
    throw error;
  }
}

// Execute if run directly
if (require.main === module) {
  seedLargeDemoData()
    .then(() => {
      console.log("\nSeeding completed successfully!");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Failed to seed large demo data:", err);
      process.exit(1);
    });
} else {
  module.exports = seedLargeDemoData;
}
