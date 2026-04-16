"use strict";

const { requirePrismaClient } = require("../utils/prismaClient");
const { generateId } = require("../utils/idGenerator");

function getPrisma() {
  return requirePrismaClient();
}

function normalizePagination(page = 1, pageSize = 10) {
  const safePage = Number.isFinite(Number(page)) && Number(page) > 0 ? Number(page) : 1;
  const safePageSize =
    Number.isFinite(Number(pageSize)) && Number(pageSize) > 0 ? Number(pageSize) : 10;
  return {
    page: safePage,
    pageSize: safePageSize,
    skip: (safePage - 1) * safePageSize,
    take: safePageSize,
  };
}

function toLike(value) {
  return `%${String(value || "").trim()}%`;
}

const auth = {
  async getBranchManager() {
    const prisma = getPrisma();
    return prisma.user.findFirst({ where: { role: "branchmanager" } });
  },
  async getUserByUsername(username) {
    const prisma = getPrisma();
    return prisma.user.findFirst({ where: { username } });
  },
  async createBranchManager(data) {
    const prisma = getPrisma();
    return prisma.user.create({ data });
  },
};

const brands = {
  async list({ page, pageSize, sortBy = "name", sortOrder = "asc", search, status }) {
    const prisma = getPrisma();
    const { skip, take } = normalizePagination(page, pageSize);
    const where = {};
    if (search) where.name = { contains: search };
    if (status !== undefined && status !== "") where.status = status === "true" || status === true;
    const [count, rows] = await Promise.all([
      prisma.brand.count({ where }),
      prisma.brand.findMany({
        where,
        orderBy: { [sortBy]: sortOrder.toLowerCase() === "desc" ? "desc" : "asc" },
        skip,
        take,
      }),
    ]);
    return { count, rows };
  },
  async findById(id) {
    const prisma = getPrisma();
    return prisma.brand.findUnique({ where: { id } });
  },
  async findByName(name) {
    const prisma = getPrisma();
    return prisma.brand.findFirst({ where: { name } });
  },
  async findByNameExceptId(name, id) {
    const prisma = getPrisma();
    return prisma.brand.findFirst({ where: { name, NOT: { id } } });
  },
  async create(data) {
    const prisma = getPrisma();
    return prisma.brand.create({ data: { id: generateId(32), ...data } });
  },
  async update(id, data) {
    const prisma = getPrisma();
    return prisma.brand.update({ where: { id }, data });
  },
  async search(search, limit = 20) {
    const prisma = getPrisma();
    return prisma.brand.findMany({
      where: {
        status: true,
        name: { contains: search },
      },
      orderBy: { name: "asc" },
      take: limit,
    });
  },
};

const categories = {
  async list({ page, pageSize, sortBy = "name", sortOrder = "asc", search, status }) {
    const prisma = getPrisma();
    const { skip, take } = normalizePagination(page, pageSize);
    const where = {};
    if (search) where.name = { contains: search };
    if (status !== undefined && status !== "") where.status = status === "true" || status === true;
    const [count, rows] = await Promise.all([
      prisma.category.count({ where }),
      prisma.category.findMany({
        where,
        orderBy: { [sortBy]: sortOrder.toLowerCase() === "desc" ? "desc" : "asc" },
        skip,
        take,
      }),
    ]);
    return { count, rows };
  },
  async findById(id) {
    const prisma = getPrisma();
    return prisma.category.findUnique({ where: { id } });
  },
  async findByName(name) {
    const prisma = getPrisma();
    return prisma.category.findFirst({ where: { name } });
  },
  async findByNameExceptId(name, id) {
    const prisma = getPrisma();
    return prisma.category.findFirst({ where: { name, NOT: { id } } });
  },
  async create(data) {
    const prisma = getPrisma();
    return prisma.category.create({ data: { id: generateId(32), ...data } });
  },
  async update(id, data) {
    const prisma = getPrisma();
    return prisma.category.update({ where: { id }, data });
  },
  async search(search, limit = 20) {
    const prisma = getPrisma();
    return prisma.category.findMany({
      where: {
        status: true,
        name: { contains: search },
      },
      orderBy: { name: "asc" },
      take: limit,
    });
  },
};

const users = {
  async list({ role, page, pageSize, search, daterange, sortBy = "id", sortOrder = "desc" }) {
    const prisma = getPrisma();
    const { skip, take } = normalizePagination(page, pageSize);
    const where = { role };
    if (search) {
      where.OR = [
        { username: { contains: search } },
        { phone: { contains: search } },
        { firstname: { contains: search } },
        { lastname: { contains: search } },
        { email: { contains: search } },
      ];
    }
    if (daterange) {
      const [start, end] = String(daterange).split(" to ").map((v) => v.trim());
      if (start && end) {
        where.createdAt = { gte: new Date(start), lte: new Date(end) };
      }
    }
    const [count, rows] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        orderBy: { [sortBy]: sortOrder.toLowerCase() === "desc" ? "desc" : "asc" },
        skip,
        take,
      }),
    ]);
    return { count, rows };
  },
  async findById(id) {
    const prisma = getPrisma();
    return prisma.user.findUnique({ where: { id } });
  },
  async findSessionUserById(id) {
    const prisma = getPrisma();
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        username: true,
        role: true,
        profile_image_url: true,
      },
    });
  },
  async findByEmail(email) {
    const prisma = getPrisma();
    return prisma.user.findFirst({ where: { email } });
  },
  async create(data) {
    const prisma = getPrisma();
    return prisma.user.create({ data: { id: generateId(32), ...data } });
  },
  async update(id, data) {
    const prisma = getPrisma();
    return prisma.user.update({ where: { id }, data });
  },
  async remove(id) {
    const prisma = getPrisma();
    return prisma.user.delete({ where: { id } });
  },
  async listByRole(role) {
    const prisma = getPrisma();
    return prisma.user.findMany({ where: { role } });
  },
  async searchByRole(role, search, limit = 10) {
    const prisma = getPrisma();
    return prisma.user.findMany({
      where: {
        role,
        OR: [{ firstname: { contains: search } }, { lastname: { contains: search } }, { phone: { contains: search } }],
      },
      take: limit,
    });
  },
};

const taxes = {
  async list({ page, pageSize, sortBy = "name", sortOrder = "asc", search }) {
    const prisma = getPrisma();
    const { skip, take } = normalizePagination(page, pageSize);
    const where = {};
    if (search) {
      where.name = { contains: search };
    }
    const [count, rows] = await Promise.all([
      prisma.taxes.count({ where }),
      prisma.taxes.findMany({
        where,
        orderBy: { [sortBy]: sortOrder.toLowerCase() === "desc" ? "desc" : "asc" },
        skip,
        take,
      }),
    ]);
    return { count, rows };
  },
  async findById(id) {
    const prisma = getPrisma();
    return prisma.taxes.findUnique({ where: { id } });
  },
  async create(data) {
    const prisma = getPrisma();
    return prisma.taxes.create({ data: { id: generateId(32), ...data } });
  },
  async update(id, data) {
    const prisma = getPrisma();
    return prisma.taxes.update({ where: { id }, data });
  },
  async remove(id) {
    const prisma = getPrisma();
    return prisma.taxes.delete({ where: { id } });
  },
};

const settings = {
  async getAllSoftwareSettings() {
    const prisma = getPrisma();
    return prisma.softwaresetting.findMany();
  },
  async getSettingByName(name) {
    const prisma = getPrisma();
    return prisma.softwaresetting.findFirst({ where: { name } });
  },
  async updateSettingByName(name, value) {
    const prisma = getPrisma();
    const existing = await prisma.softwaresetting.findFirst({ where: { name } });
    if (!existing) return null;
    return prisma.softwaresetting.update({ where: { id: existing.id }, data: { value } });
  },
  async updateUserDashboardConfig(userId, dashboardConfig) {
    const prisma = getPrisma();
    return prisma.user.update({
      where: { id: userId },
      data: { dashboard_config: JSON.stringify(dashboardConfig) },
    });
  },
};

const profile = {
  async getProfileById(userId) {
    const prisma = getPrisma();
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        firstname: true,
        lastname: true,
        email: true,
        phone: true,
        phone2: true,
        address: true,
        profile_image_url: true,
        role: true,
      },
    });
  },
  async updateProfileImage(userId, imageUrl) {
    const prisma = getPrisma();
    return prisma.user.update({ where: { id: userId }, data: { profile_image_url: imageUrl } });
  },
  async updateProfile(userId, data) {
    const prisma = getPrisma();
    return prisma.user.update({ where: { id: userId }, data });
  },
};

const products = {
  async list({ page, pageSize, where = {}, sortBy = "id", sortOrder = "desc" }) {
    const prisma = getPrisma();
    const { skip, take } = normalizePagination(page, pageSize);
    const [count, rows] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        orderBy: { [sortBy]: sortOrder.toLowerCase() === "desc" ? "desc" : "asc" },
        skip,
        take,
      }),
    ]);
    return { count, rows };
  },
  async findById(id) {
    const prisma = getPrisma();
    return prisma.product.findUnique({ where: { id } });
  },
  async findByName(name) {
    const prisma = getPrisma();
    return prisma.product.findFirst({ where: { name } });
  },
  async findByBarcode(barcode) {
    const prisma = getPrisma();
    return prisma.product.findFirst({ where: { barcode } });
  },
  async create(data) {
    const prisma = getPrisma();
    return prisma.product.create({ data: { id: generateId(32), ...data } });
  },
  async update(id, data) {
    const prisma = getPrisma();
    return prisma.product.update({ where: { id }, data });
  },
  async remove(id) {
    const prisma = getPrisma();
    return prisma.product.delete({ where: { id } });
  },
  async searchByName(search) {
    const prisma = getPrisma();
    return prisma.product.findMany({
      where: { name: { contains: search } },
      select: { id: true, name: true, saleprice: true },
    });
  },
  async findForSale(searchFilter, limit = 5) {
    const prisma = getPrisma();
    return prisma.product.findMany({
      where: {
        ...searchFilter,
        quantity: { gt: 0 },
        saleactive: true,
      },
      take: limit,
      orderBy: { name: "asc" },
    });
  },
  async findForPurchase(searchFilter) {
    const prisma = getPrisma();
    return prisma.product.findMany({
      where: {
        ...searchFilter,
        purchaseactive: true,
      },
    });
  },
  async incrementQuantity(id, amount) {
    const prisma = getPrisma();
    return prisma.product.update({
      where: { id },
      data: { quantity: { increment: Number(amount) } },
    });
  },
};

const common = {
  async listBrandsForSelect() {
    const prisma = getPrisma();
    return prisma.brand.findMany({ where: { status: true }, orderBy: { name: "asc" } });
  },
  async listCategoriesForSelect() {
    const prisma = getPrisma();
    return prisma.category.findMany({ where: { status: true }, orderBy: { name: "asc" } });
  },
  async listTaxes() {
    const prisma = getPrisma();
    return prisma.taxes.findMany({ orderBy: { name: "asc" } });
  },
  async getCompanySetting() {
    const prisma = getPrisma();
    return prisma.softwaresetting.findFirst({ where: { name: "company" } });
  },
};

const inventory = {
  async createLog(data) {
    const prisma = getPrisma();
    return prisma.inventorylogs.create({ data: { id: generateId(32), ...data } });
  },
  async listLogs({ page, pageSize, dateRange, product, createdBy, productId, sortBy = "createdAt", sortOrder = "desc" }) {
    const prisma = getPrisma();
    const { skip, take } = normalizePagination(page, pageSize);
    const where = {};

    if (dateRange) {
      const [startDate, endDate] = String(dateRange).split(" to ").map((date) => date.trim());
      if (startDate && endDate) {
        where.createdAt = {
          gte: new Date(startDate),
          lte: new Date(endDate),
        };
      }
    }

    if (productId) {
      where.product_id = productId;
    } else if (product) {
      if (!Number.isNaN(Number(product)) && String(product).trim() !== "") {
        where.product_id = String(product);
      } else {
        const matchedProducts = await prisma.product.findMany({
          where: { name: { contains: String(product).trim() } },
          select: { id: true },
        });
        const productIds = matchedProducts.map((item) => item.id);
        where.product_id = productIds.length > 0 ? { in: productIds } : "__no_product_match__";
      }
    }

    if (createdBy) {
      const matchedUsers = await prisma.user.findMany({
        where: {
          OR: [
            { firstname: { contains: String(createdBy).trim() } },
            { lastname: { contains: String(createdBy).trim() } },
          ],
        },
        select: { id: true },
      });
      const userIds = matchedUsers.map((item) => item.id);
      where.createdby = userIds.length > 0 ? { in: userIds } : "__no_user_match__";
    }

    const [count, rows] = await Promise.all([
      prisma.inventorylogs.count({ where }),
      prisma.inventorylogs.findMany({
        where,
        orderBy: { [sortBy]: sortOrder.toLowerCase() === "asc" ? "asc" : "desc" },
        skip,
        take,
      }),
    ]);

    const productIds = [...new Set(rows.map((item) => item.product_id).filter(Boolean))];
    const userIds = [...new Set(rows.map((item) => item.createdby).filter(Boolean))];
    const [products, users] = await Promise.all([
      productIds.length > 0
        ? prisma.product.findMany({
            where: { id: { in: productIds } },
            select: { id: true, name: true },
          })
        : Promise.resolve([]),
      userIds.length > 0
        ? prisma.user.findMany({
            where: { id: { in: userIds } },
            select: { id: true, firstname: true, lastname: true },
          })
        : Promise.resolve([]),
    ]);
    const productMap = new Map(products.map((item) => [item.id, item]));
    const userMap = new Map(users.map((item) => [item.id, item]));

    return {
      count,
      rows: rows.map((item) => ({
        ...item,
        Product: productMap.get(item.product_id) || { name: "Unknown Product" },
        User: userMap.get(item.createdby) || { firstname: "Unknown User", lastname: "" },
      })),
    };
  },
};

const batches = {
  async create(data) {
    const prisma = getPrisma();
    return prisma.productbatches.create({ data: { id: generateId(32), ...data } });
  },
  async listByProduct(productId) {
    const prisma = getPrisma();
    return prisma.productbatches.findMany({
      where: { product: productId },
      orderBy: { createdAt: "asc" },
    });
  },
  async updateQuantity(id, quantity) {
    const prisma = getPrisma();
    return prisma.productbatches.update({ where: { id }, data: { quantity } });
  },
  async remove(id) {
    const prisma = getPrisma();
    return prisma.productbatches.delete({ where: { id } });
  },
};

const sales = {
  async listIndex({ page, pageSize, customer, daterange, productId, sortBy = "createdAt", sortOrder = "desc" }) {
    const prisma = getPrisma();
    const allowedSortColumns = ["createdAt", "discountpercentage", "totalprice", "totalpayment"];
    const sortColumn = allowedSortColumns.includes(sortBy) ? sortBy : "createdAt";
    const sortDir = sortOrder.toLowerCase() === "asc" ? "ASC" : "DESC";
    const limit = Number(pageSize);
    const offset = (Number(page) - 1) * Number(pageSize);

    let countQuery = "SELECT COUNT(*) as count FROM sale s";
    const replacements = [];

    if (customer) {
      countQuery += " INNER JOIN user u ON s.customer = u.id";
      countQuery += " WHERE (u.firstname LIKE ? OR u.lastname LIKE ?)";
      const customerSearch = toLike(customer);
      replacements.push(customerSearch, customerSearch);
    }

    if (daterange) {
      const [start, end] = String(daterange).split(" to ");
      const startDate = new Date(start).toISOString();
      const endDate = new Date(end).toISOString();
      countQuery += customer ? " AND" : " WHERE";
      countQuery += " s.createdAt >= ? AND s.createdAt <= ?";
      replacements.push(startDate, endDate);
    }

    if (productId) {
      countQuery += customer || daterange ? " AND" : " WHERE";
      countQuery += " EXISTS (SELECT 1 FROM soldproducts sp WHERE sp.sale = s.id AND sp.product = ?)";
      replacements.push(productId);
    }

    let salesQuery = `
      SELECT s.id, s.invoicenum, s.discountpercentage, s.totalprice, s.totalpayment, s.createdAt
      FROM sale s
    `;
    const salesReplacements = [];
    const whereConditions = [];

    if (customer) {
      salesQuery += " INNER JOIN user u ON s.customer = u.id";
      whereConditions.push("(u.firstname LIKE ? OR u.lastname LIKE ?)");
      const customerSearch = toLike(customer);
      salesReplacements.push(customerSearch, customerSearch);
    }
    if (daterange) {
      const [start, end] = String(daterange).split(" to ");
      salesReplacements.push(new Date(start).toISOString(), new Date(end).toISOString());
      whereConditions.push("s.createdAt >= ? AND s.createdAt <= ?");
    }
    if (productId) {
      whereConditions.push("EXISTS (SELECT 1 FROM soldproducts sp2 WHERE sp2.sale = s.id AND sp2.product = ?)");
      salesReplacements.push(productId);
    }
    if (whereConditions.length > 0) {
      salesQuery += ` WHERE ${whereConditions.join(" AND ")}`;
    }
    salesQuery += `
      GROUP BY s.id, s.invoicenum, s.discountpercentage, s.totalprice, s.totalpayment, s.createdAt
      ORDER BY s.${sortColumn} ${sortDir}
      LIMIT ? OFFSET ?
    `;
    salesReplacements.push(limit, offset);

    const [countResult, salesResult] = await Promise.all([
      prisma.$queryRawUnsafe(countQuery, ...replacements),
      prisma.$queryRawUnsafe(salesQuery, ...salesReplacements),
    ]);

    const count = parseInt(countResult[0]?.count || 0, 10);
    const saleIds = salesResult.map((item) => item.id);
    const soldItems = saleIds.length > 0
      ? await prisma.soldproducts.findMany({
          where: { sale: { in: saleIds } },
        })
      : [];
    const productIds = [...new Set(soldItems.map((item) => item.product).filter(Boolean))];
    const products = productIds.length > 0
      ? await prisma.product.findMany({
          where: { id: { in: productIds } },
          select: { id: true, name: true },
        })
      : [];
    const productMap = new Map(products.map((item) => [item.id, item]));
    const itemsBySale = new Map();
    for (const item of soldItems) {
      const current = itemsBySale.get(item.sale) || [];
      current.push({
        ...item,
        Product: item.product ? productMap.get(item.product) || null : null,
      });
      itemsBySale.set(item.sale, current);
    }

    return {
      count,
      rows: salesResult.map((item) => ({
        ...item,
        SoldPoducts: (itemsBySale.get(item.id) || []).slice(0, 5),
      })),
    };
  },
  async listReport({ startDate, endDate, customer }) {
    const prisma = getPrisma();
    const where = {};
    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }
    if (customer) {
      where.customer = customer;
    }

    const saleRows = await prisma.sale.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    const customerIds = [...new Set(saleRows.map((item) => item.customer).filter(Boolean))];
    const saleIds = saleRows.map((item) => item.id);
    const soldItems = saleIds.length > 0
      ? await prisma.soldproducts.findMany({
          where: { sale: { in: saleIds } },
          orderBy: { createdAt: "asc" },
        })
      : [];
    const productIds = [...new Set(soldItems.map((item) => item.product).filter(Boolean))];

    const [customers, products] = await Promise.all([
      customerIds.length > 0
        ? prisma.user.findMany({
            where: { id: { in: customerIds } },
            select: { id: true, firstname: true, lastname: true, phone: true },
          })
        : Promise.resolve([]),
      productIds.length > 0
        ? prisma.product.findMany({
            where: { id: { in: productIds } },
            select: { id: true, name: true, barcode: true },
          })
        : Promise.resolve([]),
    ]);

    const customerMap = new Map(customers.map((item) => [item.id, item]));
    const productMap = new Map(products.map((item) => [item.id, item]));
    const itemsBySale = new Map();
    for (const item of soldItems) {
      const current = itemsBySale.get(item.sale) || [];
      current.push({
        ...item,
        Product: item.product ? productMap.get(item.product) || null : null,
      });
      itemsBySale.set(item.sale, current);
    }

    return saleRows.map((item) => ({
      ...item,
      Customer: item.customer ? customerMap.get(item.customer) || null : null,
      SoldPoducts: itemsBySale.get(item.id) || [],
    }));
  },
  async getById(id) {
    const prisma = getPrisma();
    const sale = await prisma.sale.findUnique({ where: { id } });
    if (!sale) {
      return null;
    }

    const soldItems = await prisma.soldproducts.findMany({
      where: { sale: id },
      orderBy: { createdAt: "asc" },
    });
    const userIds = [...new Set([sale.customer, sale.user].filter(Boolean))];
    const productIds = [...new Set(soldItems.map((item) => item.product).filter(Boolean))];
    const [users, products] = await Promise.all([
      userIds.length > 0
        ? prisma.user.findMany({
            where: { id: { in: userIds } },
            select: { id: true, firstname: true, lastname: true, phone: true, address: true },
          })
        : Promise.resolve([]),
      productIds.length > 0
        ? prisma.product.findMany({
            where: { id: { in: productIds } },
            select: { id: true, name: true, barcode: true, saleprice: true, purchaseprice: true },
          })
        : Promise.resolve([]),
    ]);
    const userMap = new Map(users.map((item) => [item.id, item]));
    const productMap = new Map(products.map((item) => [item.id, item]));

    return {
      ...sale,
      Customer: sale.customer ? userMap.get(sale.customer) || null : null,
      User: sale.user ? userMap.get(sale.user) || null : null,
      SoldPoducts: soldItems.map((item) => ({
        ...item,
        Product: item.product ? productMap.get(item.product) || null : null,
      })),
    };
  },
  async createSaleTransaction({ userId, customer, discountpercentage, totalPayment, totalPrice, products }) {
    const prisma = getPrisma();
    return prisma.$transaction(async (tx) => {
      const productIds = products.map((item) => item.productId);
      const dbProducts = await tx.product.findMany({
        where: { id: { in: productIds } },
      });
      const allBatches = await tx.productbatches.findMany({
        where: { product: { in: productIds } },
        orderBy: [{ product: "asc" }, { createdAt: "asc" }],
      });

      const productsMap = new Map(dbProducts.map((item) => [item.id, item]));
      const batchesByProduct = new Map();
      for (const batch of allBatches) {
        const current = batchesByProduct.get(batch.product) || [];
        current.push(batch);
        batchesByProduct.set(batch.product, current);
      }

      const saleProductsData = [];
      const inventoryUpdates = [];
      const batchUpdates = [];
      const batchDeletes = [];

      for (const orderProduct of products) {
        const dbProduct = productsMap.get(orderProduct.productId);
        if (!dbProduct) {
          throw new Error(`Product with ID ${orderProduct.productId} not found`);
        }
        if (Number(orderProduct.quantity) > Number(dbProduct.quantity || 0)) {
          throw new Error(
            `Insufficient stock for ${dbProduct.name}. Available: ${dbProduct.quantity}, Requested: ${orderProduct.quantity}`
          );
        }

        saleProductsData.push({
          id: generateId(32),
          product: dbProduct.id,
          quantity: Number(orderProduct.quantity),
          price: Number(orderProduct.price),
        });

        inventoryUpdates.push({
          id: dbProduct.id,
          quantity: Number(dbProduct.quantity || 0) - Number(orderProduct.quantity),
        });

        const batches = batchesByProduct.get(orderProduct.productId) || [];
        let reducedQuantity = 0;
        let iteration = 0;
        while (reducedQuantity !== Number(orderProduct.quantity) && iteration < batches.length) {
          const batch = batches[iteration];
          const remaining = Number(orderProduct.quantity) - reducedQuantity;
          if (Number(batch.quantity || 0) > remaining) {
            batchUpdates.push({
              id: batch.id,
              quantity: Number(batch.quantity || 0) - remaining,
            });
            reducedQuantity = Number(orderProduct.quantity);
          } else {
            batchDeletes.push(batch.id);
            reducedQuantity += Number(batch.quantity || 0);
          }
          iteration += 1;
        }
      }

      for (const update of batchUpdates) {
        await tx.productbatches.update({
          where: { id: update.id },
          data: { quantity: update.quantity },
        });
      }

      if (batchDeletes.length > 0) {
        await tx.productbatches.deleteMany({
          where: { id: { in: batchDeletes } },
        });
      }

      const saleId = generateId(32);
      await tx.sale.create({
        data: {
          id: saleId,
          user: userId,
          customer: customer || null,
          discountpercentage: String(discountpercentage ?? 0),
          totalpayment: String(totalPayment ?? 0),
          totalprice: String(totalPrice ?? 0),
          invoicenum: `INV-${Math.floor(Math.random() * 1000000)}`,
          createdby: userId,
        },
      });

      await tx.soldproducts.createMany({
        data: saleProductsData.map((item) => ({
          ...item,
          sale: saleId,
        })),
      });

      for (const update of inventoryUpdates) {
        await tx.product.update({
          where: { id: update.id },
          data: { quantity: update.quantity },
        });
      }

      await tx.inventorylogs.createMany({
        data: saleProductsData.map((item) => ({
          id: generateId(32),
          product_id: item.product,
          quantity: -Math.abs(Number(item.quantity)),
          note: "Sold",
          createdby: userId,
          type: "sale",
        })),
      });

      return { id: saleId };
    });
  },
};

const reports = {
  async getSalesReport(filters) {
    const salesRows = await sales.listReport(filters);
    return salesRows;
  },
  async getPurchasesReport({ startDate, endDate, vendor }) {
    const prisma = getPrisma();
    const where = {};
    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }
    if (vendor) {
      where.vendor = vendor;
    }
    const purchaseRows = await prisma.purchase.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    const purchaseIds = purchaseRows.map((item) => item.id);
    const vendorIds = [...new Set(purchaseRows.map((item) => item.vendor).filter(Boolean))];
    const purchasedItems = purchaseIds.length > 0
      ? await prisma.purchasedproducts.findMany({
          where: { purchase: { in: purchaseIds } },
          orderBy: { createdAt: "asc" },
        })
      : [];
    const productIds = [...new Set(purchasedItems.map((item) => item.product).filter(Boolean))];

    const [vendors, products] = await Promise.all([
      vendorIds.length > 0
        ? prisma.user.findMany({
            where: { id: { in: vendorIds } },
            select: { id: true, firstname: true, lastname: true, phone: true },
          })
        : Promise.resolve([]),
      productIds.length > 0
        ? prisma.product.findMany({
            where: { id: { in: productIds } },
            select: { id: true, name: true, barcode: true },
          })
        : Promise.resolve([]),
    ]);

    const vendorMap = new Map(vendors.map((item) => [item.id, item]));
    const productMap = new Map(products.map((item) => [item.id, item]));
    const itemsByPurchase = new Map();
    for (const item of purchasedItems) {
      const current = itemsByPurchase.get(item.purchase) || [];
      current.push({
        ...item,
        Product: item.product ? productMap.get(item.product) || null : null,
      });
      itemsByPurchase.set(item.purchase, current);
    }

    return purchaseRows.map((item) => ({
      ...item,
      Vendor: item.vendor ? vendorMap.get(item.vendor) || null : null,
      PurchasedItems: itemsByPurchase.get(item.id) || [],
    }));
  },
  async getInventoryReport({ category, brand, lowStock }) {
    const prisma = getPrisma();
    const where = {};
    if (category) where.category = category;
    if (brand) where.brand = brand;
    if (lowStock === "true") where.quantity = { lte: 10 };

    const products = await prisma.product.findMany({
      where,
      orderBy: { name: "asc" },
    });

    const categoryIds = [...new Set(products.map((item) => item.category).filter(Boolean))];
    const brandIds = [...new Set(products.map((item) => item.brand).filter(Boolean))];
    const [categories, brands] = await Promise.all([
      categoryIds.length > 0 ? prisma.category.findMany({ where: { id: { in: categoryIds } } }) : Promise.resolve([]),
      brandIds.length > 0 ? prisma.brand.findMany({ where: { id: { in: brandIds } } }) : Promise.resolve([]),
    ]);
    const categoryMap = new Map(categories.map((item) => [item.id, item]));
    const brandMap = new Map(brands.map((item) => [item.id, item]));

    return products.map((item) => ({
      ...item,
      Category: item.category ? categoryMap.get(item.category) || null : null,
      Brand: item.brand ? brandMap.get(item.brand) || null : null,
    }));
  },
  async getCustomerReport({ startDate, endDate }) {
    const prisma = getPrisma();
    const customers = await prisma.user.findMany({
      where: { role: "customer" },
      orderBy: { firstname: "asc" },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        phone: true,
        email: true,
        address: true,
        createdAt: true,
      },
    });

    const customerIds = customers.map((item) => item.id);
    const saleWhere = { customer: { in: customerIds } };
    if (startDate && endDate) {
      saleWhere.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }
    const salesRows = customerIds.length > 0 ? await prisma.sale.findMany({ where: saleWhere }) : [];
    const salesByCustomer = new Map();
    for (const sale of salesRows) {
      const current = salesByCustomer.get(sale.customer) || [];
      current.push(sale);
      salesByCustomer.set(sale.customer, current);
    }

    return customers.map((customer) => {
      const customerSales = salesByCustomer.get(customer.id) || [];
      return {
        ...customer,
        totalPurchases: customerSales.length,
        totalSpent: customerSales.reduce((sum, item) => sum + parseFloat(item.totalpayment || 0), 0),
        lastPurchaseDate: customerSales.length > 0 ? customerSales[customerSales.length - 1].createdAt : null,
      };
    });
  },
};

const dashboard = {
  async getStats() {
    const prisma = getPrisma();
    const moment = require("moment");

    const todayStartDate = moment().startOf("day").toISOString();
    const tomorrowStartDate = moment().add(1, "day").startOf("day").toISOString();
    const yesterdayStartDate = moment().subtract(1, "day").startOf("day").toISOString();
    const todayEndDate = moment().startOf("day").toISOString();
    const last7DaysISO = moment().subtract(7, "days").startOf("day").toISOString();
    const last30DaysISO = moment().subtract(30, "days").startOf("day").toISOString();

    const [
      todaySalesResult,
      yesterdaySalesResult,
      todayCustomersResult,
      yesterdayCustomersResult,
      salesByDayResult,
      weeklyMonthlySummaryResult,
      lowStockResult,
      topProductsResult,
    ] = await Promise.all([
      prisma.$queryRawUnsafe(
        `SELECT COALESCE(SUM(CAST(totalprice AS REAL) * (1 - CAST(discountpercentage AS REAL) / 100.0)), 0) as total
         FROM sale WHERE createdAt >= ? AND createdAt < ?`,
        todayStartDate,
        tomorrowStartDate
      ),
      prisma.$queryRawUnsafe(
        `SELECT COALESCE(SUM(CAST(totalprice AS REAL) * (1 - CAST(discountpercentage AS REAL) / 100.0)), 0) as total
         FROM sale WHERE createdAt >= ? AND createdAt < ?`,
        yesterdayStartDate,
        todayEndDate
      ),
      prisma.$queryRawUnsafe(
        `SELECT COUNT(*) as today_count FROM user WHERE role = 'customer' AND createdAt >= ? AND createdAt < ?`,
        todayStartDate,
        tomorrowStartDate
      ),
      prisma.$queryRawUnsafe(
        `SELECT COUNT(*) as yesterday_count FROM user WHERE role = 'customer' AND createdAt >= ? AND createdAt < ?`,
        yesterdayStartDate,
        todayEndDate
      ),
      prisma.$queryRawUnsafe(
        `SELECT strftime('%Y-%m-%d', createdAt) as date, COUNT(*) as total,
         COALESCE(SUM(CAST(totalprice AS REAL) * (1 - CAST(discountpercentage AS REAL) / 100.0)), 0) as revenue
         FROM sale WHERE createdAt >= ? GROUP BY date ORDER BY date ASC`,
        last30DaysISO
      ),
      prisma.$queryRawUnsafe(
        `SELECT 'weekly' as period, COUNT(*) as total_orders,
         COALESCE(SUM(CAST(totalprice AS REAL) * (1 - CAST(discountpercentage AS REAL) / 100.0)), 0) as total_revenue,
         COALESCE(AVG(CAST(totalprice AS REAL) * (1 - CAST(discountpercentage AS REAL) / 100.0)), 0) as avg_order_value
         FROM sale WHERE createdAt >= ? AND createdAt < ?
         UNION ALL
         SELECT 'monthly' as period, COUNT(*) as total_orders,
         COALESCE(SUM(CAST(totalprice AS REAL) * (1 - CAST(discountpercentage AS REAL) / 100.0)), 0) as total_revenue,
         COALESCE(AVG(CAST(totalprice AS REAL) * (1 - CAST(discountpercentage AS REAL) / 100.0)), 0) as avg_order_value
         FROM sale WHERE createdAt >= ?`,
        last7DaysISO,
        tomorrowStartDate,
        last30DaysISO
      ),
      prisma.$queryRawUnsafe(
        `SELECT id, name, quantity, saleprice FROM product
         WHERE quantity < 10 AND saleactive = 1 ORDER BY quantity ASC LIMIT 5`
      ),
      prisma.$queryRawUnsafe(
        `SELECT p.name as product_name, COUNT(*) as times_added, SUM(s.quantity) as total_quantity
         FROM soldproducts s INNER JOIN product p ON s.product = p.id
         WHERE s.createdAt >= ? GROUP BY p.id, p.name ORDER BY total_quantity DESC LIMIT 5`,
        last30DaysISO
      ),
    ]);

    const todaysSalesAmountValue = parseFloat(todaySalesResult[0]?.total || 0);
    const yesterdaySalesAmount = parseFloat(yesterdaySalesResult[0]?.total || 0);
    const todayCustomersCount = parseInt(todayCustomersResult[0]?.today_count || 0, 10);
    const yesterdayCustomersCount = parseInt(yesterdayCustomersResult[0]?.yesterday_count || 0, 10);
    const totalSalesCount = (salesByDayResult || []).reduce((sum, day) => sum + (parseInt(day.total || 0, 10) || 0), 0);
    const weeklySummaryResult = (weeklyMonthlySummaryResult || []).find((item) => item.period === "weekly") || {};
    const monthlySummaryResult = (weeklyMonthlySummaryResult || []).find((item) => item.period === "monthly") || {};

    function calculatePercentageChange(previous = 0, current = 0) {
      if (previous > 0) {
        return ((current - previous) / previous) * 100;
      }
      if (previous === 0 && current > 0) {
        return 100;
      }
      return 0;
    }

    return {
      todayCustomersCount,
      customerPercentageChange: calculatePercentageChange(yesterdayCustomersCount, todayCustomersCount).toFixed(2),
      customerArrowDirection: todayCustomersCount >= yesterdayCustomersCount ? "up" : "down",
      totalSalesCount,
      topFiveSoldProductsWithSoldQuantity: topProductsResult || [],
      salesCountByDay: salesByDayResult || [],
      todaysSalesAmount: todaysSalesAmountValue > 0 ? todaysSalesAmountValue.toFixed(2) : 0,
      salesPercentageChange: calculatePercentageChange(yesterdaySalesAmount, todaysSalesAmountValue).toFixed(2),
      salesArrowDirection: todaysSalesAmountValue >= yesterdaySalesAmount ? "up" : "down",
      weeklySalesSummary: {
        total_orders: parseInt(weeklySummaryResult.total_orders || 0, 10),
        total_revenue: parseFloat(weeklySummaryResult.total_revenue || 0),
        avg_order_value: parseFloat(weeklySummaryResult.avg_order_value || 0),
      },
      monthlySalesSummary: {
        total_orders: parseInt(monthlySummaryResult.total_orders || 0, 10),
        total_revenue: parseFloat(monthlySummaryResult.total_revenue || 0),
        avg_order_value: parseFloat(monthlySummaryResult.avg_order_value || 0),
      },
      lowStockProducts: lowStockResult || [],
    };
  },
};

const purchases = {
  async list({ page, pageSize, daterange, vendor, invoicenum, sortBy = "createdAt", sortOrder = "desc" }) {
    const prisma = getPrisma();
    const { skip, take } = normalizePagination(page, pageSize);
    const where = {};
    if (daterange) {
      const [start, end] = String(daterange).split(" to ").map((v) => v.trim());
      if (start && end) {
        where.createdAt = { gte: new Date(start), lte: new Date(end) };
      }
    }
    if (invoicenum) where.invoicenum = { contains: String(invoicenum).trim() };
    if (vendor) {
      const matchingVendors = await prisma.user.findMany({
        where: {
          role: "vendor",
          OR: [
            { firstname: { contains: String(vendor).trim() } },
            { lastname: { contains: String(vendor).trim() } },
          ],
        },
        select: { id: true },
      });
      const vendorIds = matchingVendors.map((item) => item.id);
      where.vendor = vendorIds.length > 0 ? { in: vendorIds } : "__no_vendor_match__";
    }

    const [count, rawRows] = await Promise.all([
      prisma.purchase.count({ where }),
      prisma.purchase.findMany({
        where,
        orderBy: { [sortBy]: sortOrder.toLowerCase() === "asc" ? "asc" : "desc" },
        skip,
        take,
      }),
    ]);
    const userIds = [...new Set(rawRows.flatMap((row) => [row.vendor, row.createdby]).filter(Boolean))];
    const users = userIds.length > 0
      ? await prisma.user.findMany({
          where: { id: { in: userIds } },
          select: { id: true, firstname: true, lastname: true },
        })
      : [];
    const userMap = new Map(users.map((item) => [item.id, item]));
    const rows = rawRows.map((row) => ({
      ...row,
      Vendor: row.vendor ? userMap.get(row.vendor) || null : null,
      Creator: row.createdby ? userMap.get(row.createdby) || null : null,
    }));
    return { count, rows };
  },
  async getById(id) {
    const prisma = getPrisma();
    const purchase = await prisma.purchase.findUnique({ where: { id } });
    if (!purchase) {
      return null;
    }

    const items = await prisma.purchasedproducts.findMany({
      where: { purchase: id },
      orderBy: { createdAt: "asc" },
    });

    const userIds = [...new Set([purchase.vendor, purchase.createdby].filter(Boolean))];
    const productIds = [...new Set(items.map((item) => item.product).filter(Boolean))];

    const [users, products] = await Promise.all([
      userIds.length > 0
        ? prisma.user.findMany({
            where: { id: { in: userIds } },
            select: { id: true, firstname: true, lastname: true, phone: true, address: true },
          })
        : Promise.resolve([]),
      productIds.length > 0
        ? prisma.product.findMany({
            where: { id: { in: productIds } },
            select: { id: true, name: true, barcode: true },
          })
        : Promise.resolve([]),
    ]);

    const userMap = new Map(users.map((item) => [item.id, item]));
    const productMap = new Map(products.map((item) => [item.id, item]));

    return {
      ...purchase,
      Vendor: purchase.vendor ? userMap.get(purchase.vendor) || null : null,
      Creator: purchase.createdby ? userMap.get(purchase.createdby) || null : null,
      PurchasedItems: items.map((item) => ({
        ...item,
        Product: item.product ? productMap.get(item.product) || null : null,
      })),
    };
  },
  async create(data) {
    const prisma = getPrisma();
    return prisma.purchase.create({ data: { id: generateId(32), ...data } });
  },
  async createPurchasedProduct(data) {
    const prisma = getPrisma();
    return prisma.purchasedproducts.create({ data: { id: generateId(32), ...data } });
  },
};

const helpers = {
  normalizePagination,
  toLike,
};

module.exports = {
  auth,
  users,
  brands,
  categories,
  taxes,
  settings,
  profile,
  products,
  common,
  inventory,
  batches,
  purchases,
  sales,
  reports,
  dashboard,
  helpers,
};
