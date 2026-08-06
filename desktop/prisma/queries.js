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

async function findManyInChunks(model, field, ids, options = {}) {
  const chunkSize = 500;
  const chunks = [];
  for (let i = 0; i < ids.length; i += chunkSize) {
    chunks.push(ids.slice(i, i + chunkSize));
  }
  const results = await Promise.all(
    chunks.map((chunk) => model.findMany({ ...options, where: { [field]: { in: chunk } } }))
  );
  return results.flat();
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
    if (status !== undefined && status !== "" && status !== null) {
      where.status = String(status) === "1" || String(status).toLowerCase() === "true" || status === true;
    }
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
    if (status !== undefined && status !== "" && status !== null) {
      where.status = String(status) === "1" || String(status).toLowerCase() === "true" || status === true;
    }
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
  async getOrCreateServiceCategory() {
    const prisma = getPrisma();
    let serviceCategory = await prisma.category.findFirst({ where: { name: "Service" } });
    if (!serviceCategory) {
      serviceCategory = await prisma.category.create({
        data: { id: generateId(32), name: "Service", status: true },
      });
    }
    return serviceCategory;
  },
  async backfillServiceProductCategories() {
    const prisma = getPrisma();
    const serviceCategory = await this.getOrCreateServiceCategory();
    const result = await prisma.product.updateMany({
      where: {
        is_service: true,
        OR: [{ category: null }, { category: "" }],
      },
      data: { category: serviceCategory.id },
    });
    return { categoryId: serviceCategory.id, updated: result.count };
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
    const where = {};
    if (role === 'user') {
      where.role = { in: ['user', 'branchmanager'] };
    } else {
      where.role = role;
    }
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
        OR: [
          { firstname: { contains: search } }, 
          { lastname: { contains: search } }, 
          { phone: { contains: search } },
          { username: { contains: search } }
        ],
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        phone: true,
        username: true,
        fk_financeaccount_id: true
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
    const existingRows = await prisma.softwaresetting.findMany({ where: { name } });
    if (!existingRows.length) {
      return prisma.softwaresetting.create({
        data: {
          id: generateId(32),
          name,
          value,
          source: "settings-ui",
        },
      });
    }
    const primary = existingRows[0];
    const updated = await prisma.softwaresetting.update({
      where: { id: primary.id },
      data: { value },
    });
    if (existingRows.length > 1) {
      await prisma.softwaresetting.deleteMany({
        where: { id: { in: existingRows.slice(1).map((r) => r.id) } },
      });
    }
    return updated;
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
  async bulkCreate(dataArray) {
    const prisma = getPrisma();
    const dataWithIds = dataArray.map(data => ({ id: generateId(32), ...data }));
    
    // Give the local SQLite database driver a moment to completely release 
    // any locks from the preceding findForSale query before attempting a bulk write
    await new Promise(resolve => setTimeout(resolve, 800));

    let retries = 8;
    while (retries > 0) {
      try {
        await prisma.product.createMany({ data: dataWithIds });
        break; // Success!
      } catch (error) {
        retries--;
        if (retries === 0) {
          console.error('Final retry failed for bulkCreate:', error);
          throw error;
        }
        // Wait longer on each retry
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    return dataWithIds;
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
  async findForSale(searchFilter, limit = 500) {
    const prisma = getPrisma();
    return prisma.product.findMany({
      where: {
        ...searchFilter
      },
      take: limit,
      orderBy: { name: "asc" },
    });
  },
  async findForPurchase(searchFilter) {
    const prisma = getPrisma();
    return prisma.product.findMany({
      where: {
        ...searchFilter
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
  getPrisma() {
    return getPrisma();
  },
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
      ? await findManyInChunks(prisma.soldproducts, 'sale', saleIds)
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
      ? await findManyInChunks(prisma.soldproducts, 'sale', saleIds, { orderBy: { createdAt: 'asc' } })
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
  async createSaleTransaction({ userId, customer, discountpercentage, totalPayment, totalPrice, ledger, products, transactionDate, revenueAccountId }) {
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

      const invoicenum = await helpers.getNextInvoiceNumber('SAL', tx);
      const saleId = generateId(32);
      await tx.sale.create({
        data: {
          id: saleId,
          user: userId,
          customer: customer || null,
          discountpercentage: String(discountpercentage ?? 0),
          totalpayment: String(totalPayment ?? 0),
          totalprice: String(totalPrice ?? 0),
          invoicenum,
          createdby: userId,
          createdAt: transactionDate ? new Date(transactionDate) : undefined
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
          note: `Sold via Invoice ${invoicenum}`,
          createdby: userId,
          type: "sale",
          createdAt: transactionDate ? new Date(transactionDate) : undefined
        })),
      });

      // --- DOUBLE ENTRY LEDGER POSTING ---
      if (ledger) {
        const discount = parseFloat(discountpercentage) || 0;
        const grossAmt = parseFloat(totalPrice) || 0;
        const netAmt = grossAmt - (grossAmt * discount / 100);
        const paidAmt = parseFloat(totalPayment) || 0;

        // Resolve revenue account
        let salesAccount = null;
        if (revenueAccountId) {
          salesAccount = await tx.financeaccount.findUnique({ where: { id: revenueAccountId } });
        }
        if (!salesAccount) {
          salesAccount = await tx.financeaccount.findFirst({ where: { code: '4100' } });
        }

        // Resolve customer finance account (creates it if missing)
        let customerAccountId = null;
        if (customer) {
          customerAccountId = await accounting.getOrCreateUserAccount(tx, customer, 'customer');
        }

        // ── JOURNAL 1: Invoice Raised ──
        // Dr Customer (full net amount)   Cr Revenue (full net amount)
        const invoiceJournalId = generateId(32);
        await tx.account_journal.create({
          data: {
            id: invoiceJournalId,
            date: transactionDate ? new Date(transactionDate) : new Date(),
            description: `Sale Invoice ${invoicenum}`,
            reference: saleId,
            voucher_no: invoicenum,
            source: 'desktop',
            createdby: userId
          }
        });

        if (customerAccountId) {
          await tx.account_ledger.create({
            data: {
              id: generateId(32),
              journal_id: invoiceJournalId,
              account_id: customerAccountId,
              debit: netAmt,
              details: `Invoice ${invoicenum} raised`
            }
          });
        }

        if (salesAccount) {
          await tx.account_ledger.create({
            data: {
              id: generateId(32),
              journal_id: invoiceJournalId,
              account_id: salesAccount.id,
              credit: netAmt,
              details: `Sales Revenue for Invoice ${invoicenum}`
            }
          });
        }

        // ── JOURNAL 2: Payment Received (only if payment > 0) ──
        // Dr Cash/Bank (paid amount)   Cr Customer (paid amount)
        if (paidAmt > 0) {
          const paymentJournalId = generateId(32);
          await tx.account_journal.create({
            data: {
              id: paymentJournalId,
              date: transactionDate ? new Date(transactionDate) : new Date(),
              description: `Payment for Invoice ${invoicenum}`,
              reference: saleId,
              voucher_no: invoicenum,
              source: 'desktop',
              createdby: userId
            }
          });

          const cashAccount = await tx.financeaccount.findFirst({ where: { code: '1110' } });
          if (cashAccount) {
            await tx.account_ledger.create({
              data: {
                id: generateId(32),
                journal_id: paymentJournalId,
                account_id: cashAccount.id,
                debit: paidAmt,
                details: `Cash received for Invoice ${invoicenum}`
              }
            });
          }

          if (customerAccountId) {
            await tx.account_ledger.create({
              data: {
                id: generateId(32),
                journal_id: paymentJournalId,
                account_id: customerAccountId,
                credit: paidAmt,
                details: `Payment received for Invoice ${invoicenum}`
              }
            });
          }
        }
      }

      return { id: saleId };
    });
  },
  async createServiceSaleTransaction({ userId, customer, discountpercentage, totalPayment, totalPrice, ledger, products, transactionDate, revenueAccountId }) {
    const prisma = getPrisma();
    return prisma.$transaction(async (tx) => {
      let serviceCategory = await tx.category.findFirst({ where: { name: 'Service' } });
      if (!serviceCategory) {
        serviceCategory = await tx.category.create({
          data: { id: generateId(32), name: 'Service', status: true }
        });
      }

      const saleProductsData = [];

      for (const orderProduct of products) {
        let productId = orderProduct.productId;
        if (!productId) {
          // Find or create product by name (design number)
          let dbProduct = await tx.product.findFirst({ where: { name: orderProduct.name } });
          if (!dbProduct) {
            dbProduct = await tx.product.create({
              data: {
                id: generateId(32),
                name: orderProduct.name,
                barcode: orderProduct.name, // using name as barcode
                category: serviceCategory.id,
                ispurchaseable: false,
                issaleable: true,
                quantity: 999999,
                saleprice: Number(orderProduct.price),
                is_service: true,
                createdby: userId
              }
            });
          }
          productId = dbProduct.id;
        }

        saleProductsData.push({
          id: generateId(32),
          product: productId,
          quantity: Number(orderProduct.quantity),
          price: Number(orderProduct.price),
        });
      }

      const invoicenum = await helpers.getNextInvoiceNumber('SRV', tx);
      const saleId = generateId(32);
      await tx.sale.create({
        data: {
          id: saleId,
          user: userId,
          customer: customer || null,
          discountpercentage: String(discountpercentage ?? 0),
          totalpayment: String(totalPayment ?? 0),
          totalprice: String(totalPrice ?? 0),
          invoicenum,
          createdby: userId,
          createdAt: transactionDate ? new Date(transactionDate) : undefined
        },
      });

      await tx.soldproducts.createMany({
        data: saleProductsData.map((item) => ({
          ...item,
          sale: saleId,
        })),
      });

      // --- DOUBLE ENTRY LEDGER POSTING ---
      if (ledger) {
        const discount = parseFloat(discountpercentage) || 0;
        const grossAmt = parseFloat(totalPrice) || 0;
        const netAmt = grossAmt - (grossAmt * discount / 100);
        const paidAmt = parseFloat(totalPayment) || 0;
        const balanceAmt = netAmt - paidAmt;

        // Resolve revenue account
        let salesAccount = null;
        if (revenueAccountId) {
          salesAccount = await tx.financeaccount.findUnique({ where: { id: revenueAccountId } });
        }
        if (!salesAccount) {
          salesAccount = await tx.financeaccount.findFirst({ where: { code: '4100' } });
        }

        // Resolve customer finance account (creates it if missing)
        let customerAccountId = null;
        if (customer) {
          customerAccountId = await accounting.getOrCreateUserAccount(tx, customer, 'customer');
        }

        // -- JOURNAL 1: Invoice Raised --
        // Dr Customer (full net amount)   Cr Revenue (full net amount)
        const invoiceJournalId = generateId(32);
        await tx.account_journal.create({
          data: {
            id: invoiceJournalId,
            date: transactionDate ? new Date(transactionDate) : new Date(),
            description: "Service Invoice " + invoicenum,
            reference: saleId,
            source: 'desktop',
            createdby: userId
          }
        });

        if (customerAccountId) {
          await tx.account_ledger.create({
            data: {
              id: generateId(32),
              journal_id: invoiceJournalId,
              account_id: customerAccountId,
              debit: netAmt,
              details: "Service Invoice " + invoicenum + " raised"
            }
          });
        }

        if (salesAccount) {
          await tx.account_ledger.create({
            data: {
              id: generateId(32),
              journal_id: invoiceJournalId,
              account_id: salesAccount.id,
              credit: netAmt,
              details: "Service Revenue for Invoice " + invoicenum
            }
          });
        }

        // -- JOURNAL 2: Payment Received (only if payment > 0) --
        // Dr Cash/Bank (paid amount)   Cr Customer (paid amount)
        if (paidAmt > 0) {
          const paymentJournalId = generateId(32);
          await tx.account_journal.create({
            data: {
              id: paymentJournalId,
              date: transactionDate ? new Date(transactionDate) : new Date(),
              description: "Payment for Service Invoice " + invoicenum,
              reference: saleId,
              source: 'desktop',
              createdby: userId
            }
          });

          const cashAccount = await tx.financeaccount.findFirst({ where: { code: '1110' } });
          if (cashAccount) {
            await tx.account_ledger.create({
              data: {
                id: generateId(32),
                journal_id: paymentJournalId,
                account_id: cashAccount.id,
                debit: paidAmt,
                details: "Cash received for Service Invoice " + invoicenum
              }
            });
          }

          if (customerAccountId) {
            await tx.account_ledger.create({
              data: {
                id: generateId(32),
                journal_id: paymentJournalId,
                account_id: customerAccountId,
                credit: paidAmt,
                details: "Payment received for Service Invoice " + invoicenum
              }
            });
          }
        }
      }
      return { id: saleId };
    });
  },

  async lookupSalesForReturn(q, limit = 15) {
    const prisma = getPrisma();
    const term = String(q || "").trim();
    if (!term) return [];

    const or = [
      { invoicenum: { contains: term } },
      { id: { contains: term } },
    ];

    const matchingCustomers = await prisma.user.findMany({
      where: {
        OR: [
          { firstname: { contains: term } },
          { lastname: { contains: term } },
          { phone: { contains: term } },
        ],
      },
      select: { id: true },
      take: 20,
    });
    if (matchingCustomers.length > 0) {
      or.push({ customer: { in: matchingCustomers.map((c) => c.id) } });
    }

    const salesRows = await prisma.sale.findMany({
      where: { OR: or },
      orderBy: { createdAt: "desc" },
      take: Math.min(Number(limit) || 15, 30),
    });

    const customerIds = [...new Set(salesRows.map((s) => s.customer).filter(Boolean))];
    const customers = customerIds.length
      ? await prisma.user.findMany({
          where: { id: { in: customerIds } },
          select: { id: true, firstname: true, lastname: true, phone: true },
        })
      : [];
    const customerMap = new Map(customers.map((c) => [c.id, c]));

    return salesRows.map((s) => {
      const cust = s.customer ? customerMap.get(s.customer) : null;
      return {
        id: s.id,
        invoicenum: s.invoicenum,
        totalprice: s.totalprice,
        totalpayment: s.totalpayment,
        createdAt: s.createdAt,
        customerName: cust
          ? `${cust.firstname || ""} ${cust.lastname || ""}`.trim() || cust.phone || "Customer"
          : "Walk-in",
      };
    });
  },

  async getSaleForReturn(saleId) {
    const prisma = getPrisma();
    const sale = await this.getById(saleId);
    if (!sale) return null;

    const priorReturns = await prisma.salereturn.findMany({
      where: { sale: saleId },
      select: { id: true },
    });
    const priorReturnIds = priorReturns.map((r) => r.id);
    const priorItems = priorReturnIds.length
      ? await prisma.salereturnitems.findMany({
          where: { salereturn: { in: priorReturnIds } },
        })
      : [];

    const returnedBySoldProduct = new Map();
    for (const item of priorItems) {
      if (!item.soldproduct) continue;
      const prev = returnedBySoldProduct.get(item.soldproduct) || 0;
      returnedBySoldProduct.set(item.soldproduct, prev + Number(item.quantity || 0));
    }

    const productIds = [...new Set((sale.SoldPoducts || []).map((i) => i.product).filter(Boolean))];
    const productsMeta = productIds.length
      ? await prisma.product.findMany({
          where: { id: { in: productIds } },
          select: { id: true, name: true, is_service: true, barcode: true },
        })
      : [];
    const metaMap = new Map(productsMeta.map((p) => [p.id, p]));

    const journals = await prisma.account_journal.findMany({
      where: { reference: saleId },
      select: { id: true },
      take: 1,
    });

    const lines = (sale.SoldPoducts || []).map((item) => {
      const alreadyReturned = returnedBySoldProduct.get(item.id) || 0;
      const soldQty = Number(item.quantity || 0);
      const returnableQty = Math.max(0, soldQty - alreadyReturned);
      const meta = item.product ? metaMap.get(item.product) : null;
      return {
        id: item.id,
        product: item.product,
        quantity: soldQty,
        price: Number(item.price || 0),
        alreadyReturned,
        returnableQty,
        isService: !!(meta && meta.is_service),
        Product: item.Product || (meta ? { id: meta.id, name: meta.name, barcode: meta.barcode } : null),
      };
    });

    return {
      id: sale.id,
      invoicenum: sale.invoicenum,
      customer: sale.customer,
      discountpercentage: sale.discountpercentage,
      totalprice: sale.totalprice,
      totalpayment: sale.totalpayment,
      createdAt: sale.createdAt,
      Customer: sale.Customer,
      User: sale.User,
      hasLedger: journals.length > 0,
      lines,
    };
  },

  async getSaleReturnById(returnId) {
    const prisma = getPrisma();
    const ret = await prisma.salereturn.findUnique({ where: { id: returnId } });
    if (!ret) return null;

    const items = await prisma.salereturnitems.findMany({
      where: { salereturn: returnId },
      orderBy: { createdAt: "asc" },
    });
    const productIds = [...new Set(items.map((i) => i.product).filter(Boolean))];
    const userIds = [...new Set([ret.customer, ret.user].filter(Boolean))];
    const [products, users, originalSale] = await Promise.all([
      productIds.length
        ? prisma.product.findMany({
            where: { id: { in: productIds } },
            select: { id: true, name: true, barcode: true },
          })
        : Promise.resolve([]),
      userIds.length
        ? prisma.user.findMany({
            where: { id: { in: userIds } },
            select: { id: true, firstname: true, lastname: true, phone: true, address: true },
          })
        : Promise.resolve([]),
      ret.sale ? prisma.sale.findUnique({ where: { id: ret.sale }, select: { id: true, invoicenum: true } }) : null,
    ]);
    const productMap = new Map(products.map((p) => [p.id, p]));
    const userMap = new Map(users.map((u) => [u.id, u]));

    return {
      ...ret,
      OriginalSale: originalSale,
      Customer: ret.customer ? userMap.get(ret.customer) || null : null,
      User: ret.user ? userMap.get(ret.user) || null : null,
      Items: items.map((item) => ({
        ...item,
        Product: item.product ? productMap.get(item.product) || null : null,
      })),
    };
  },

  async createSaleReturnTransaction({ saleId, items, refundMode, note, userId, ledger }) {
    const prisma = getPrisma();
    return prisma.$transaction(async (tx) => {
      const sale = await tx.sale.findUnique({ where: { id: saleId } });
      if (!sale) throw new Error("Original sale not found");

      const mode = String(refundMode || "").toLowerCase();
      if (mode !== "cash" && mode !== "credit") {
        throw new Error("Refund mode must be cash or credit");
      }

      if (!Array.isArray(items) || items.length === 0) {
        throw new Error("No return items provided");
      }

      const soldLines = await tx.soldproducts.findMany({ where: { sale: saleId } });
      const soldMap = new Map(soldLines.map((s) => [s.id, s]));

      const priorReturns = await tx.salereturn.findMany({
        where: { sale: saleId },
        select: { id: true },
      });
      const priorReturnIds = priorReturns.map((r) => r.id);
      const priorItems = priorReturnIds.length
        ? await tx.salereturnitems.findMany({ where: { salereturn: { in: priorReturnIds } } })
        : [];
      const returnedBySoldProduct = new Map();
      for (const item of priorItems) {
        if (!item.soldproduct) continue;
        returnedBySoldProduct.set(
          item.soldproduct,
          (returnedBySoldProduct.get(item.soldproduct) || 0) + Number(item.quantity || 0)
        );
      }

      const productIds = [...new Set(soldLines.map((s) => s.product).filter(Boolean))];
      const products = productIds.length
        ? await tx.product.findMany({ where: { id: { in: productIds } } })
        : [];
      const productsMap = new Map(products.map((p) => [p.id, p]));

      const normalizedItems = [];
      let grossReturn = 0;

      for (const raw of items) {
        const qty = Number(raw.quantity);
        if (!raw.soldproduct || !Number.isFinite(qty) || qty <= 0) {
          throw new Error("Invalid return line quantity");
        }
        const soldLine = soldMap.get(raw.soldproduct);
        if (!soldLine || soldLine.sale !== saleId) {
          throw new Error("Return line does not belong to this sale");
        }
        const already = returnedBySoldProduct.get(soldLine.id) || 0;
        const returnable = Math.max(0, Number(soldLine.quantity || 0) - already);
        if (qty > returnable) {
          const pname = productsMap.get(soldLine.product)?.name || "item";
          throw new Error(`Return qty exceeds returnable for ${pname}. Returnable: ${returnable}`);
        }
        const price = Number(soldLine.price || 0);
        grossReturn += qty * price;
        normalizedItems.push({
          soldproduct: soldLine.id,
          product: soldLine.product,
          quantity: qty,
          price,
          isService: !!(productsMap.get(soldLine.product)?.is_service),
        });
      }

      const discount = parseFloat(sale.discountpercentage) || 0;
      const netReturn = Math.round((grossReturn - (grossReturn * discount) / 100) * 100) / 100;

      const invoicenum = await helpers.getNextInvoiceNumber("RET", tx);
      const returnId = generateId(32);

      await tx.salereturn.create({
        data: {
          id: returnId,
          sale: saleId,
          invoicenum,
          customer: sale.customer || null,
          user: userId,
          totalamount: netReturn,
          refundmode: mode,
          note: note || null,
          createdby: userId,
          source: "desktop",
        },
      });

      await tx.salereturnitems.createMany({
        data: normalizedItems.map((item) => ({
          id: generateId(32),
          salereturn: returnId,
          soldproduct: item.soldproduct,
          product: item.product,
          quantity: item.quantity,
          price: item.price,
          source: "desktop",
        })),
      });

      for (const item of normalizedItems) {
        if (item.isService || !item.product) continue;
        const dbProduct = productsMap.get(item.product);
        if (!dbProduct) continue;

        const newQty = Number(dbProduct.quantity || 0) + Number(item.quantity);
        await tx.product.update({
          where: { id: item.product },
          data: { quantity: newQty },
        });
        dbProduct.quantity = newQty;

        await tx.productbatches.create({
          data: {
            id: generateId(32),
            product: item.product,
            quantity: Number(item.quantity),
            source: "desktop",
          },
        });

        await tx.inventorylogs.create({
          data: {
            id: generateId(32),
            product_id: item.product,
            quantity: Math.abs(Number(item.quantity)),
            note: `Return via ${invoicenum} (from ${sale.invoicenum || saleId})`,
            createdby: userId,
            type: "return",
            source: "desktop",
          },
        });
      }

      const existingJournals = await tx.account_journal.findMany({
        where: { reference: saleId },
        select: { id: true },
        take: 1,
      });
      const shouldPostLedger = ledger === true || ledger === "true" || existingJournals.length > 0;

      if (shouldPostLedger && netReturn > 0) {
        let salesAccount = await tx.financeaccount.findFirst({ where: { code: "4100" } });
        let customerAccountId = null;
        if (sale.customer) {
          customerAccountId = await accounting.getOrCreateUserAccount(tx, sale.customer, "customer");
        }

        // Journal 1: reverse invoice recognition — Dr Revenue / Cr Customer AR
        const reverseJournalId = generateId(32);
        await tx.account_journal.create({
          data: {
            id: reverseJournalId,
            date: new Date(),
            description: `Sales Return ${invoicenum}`,
            reference: returnId,
            source: "desktop",
            createdby: userId,
          },
        });

        if (salesAccount) {
          await tx.account_ledger.create({
            data: {
              id: generateId(32),
              journal_id: reverseJournalId,
              account_id: salesAccount.id,
              debit: netReturn,
              details: `Sales return ${invoicenum} (from ${sale.invoicenum || ""})`,
            },
          });
        }

        if (customerAccountId) {
          await tx.account_ledger.create({
            data: {
              id: generateId(32),
              journal_id: reverseJournalId,
              account_id: customerAccountId,
              credit: netReturn,
              details: `AR credit for return ${invoicenum}`,
            },
          });
        }

        // Journal 2: cash refund — Dr Customer AR / Cr Cash
        if (mode === "cash") {
          const cashJournalId = generateId(32);
          await tx.account_journal.create({
            data: {
              id: cashJournalId,
              date: new Date(),
              description: `Cash refund ${invoicenum}`,
              reference: returnId,
              source: "desktop",
              createdby: userId,
            },
          });

          if (customerAccountId) {
            await tx.account_ledger.create({
              data: {
                id: generateId(32),
                journal_id: cashJournalId,
                account_id: customerAccountId,
                debit: netReturn,
                details: `Cash refund for return ${invoicenum}`,
              },
            });
          }

          const cashAccount = await tx.financeaccount.findFirst({ where: { code: "1110" } });
          if (cashAccount) {
            await tx.account_ledger.create({
              data: {
                id: generateId(32),
                journal_id: cashJournalId,
                account_id: cashAccount.id,
                credit: netReturn,
                details: `Cash paid for return ${invoicenum}`,
              },
            });
          }
        }
      }

      return { id: returnId, invoicenum, totalamount: netReturn };
    });
  },
};

const reports = {
  async getSalesReport(filters) {
    const salesRows = await sales.listReport(filters);
    return salesRows;
  },
  async getSalesReportPaginated(filters, page = 1, pageSize = 25) {
    const prisma = getPrisma();
    const { skip, take } = normalizePagination(page, pageSize);
    const where = {};
    if (filters.startDate && filters.endDate) {
      where.createdAt = { gte: new Date(filters.startDate), lte: new Date(filters.endDate) };
    }
    if (filters.customer) where.customer = filters.customer;

    const [count, saleRows] = await Promise.all([
      prisma.sale.count({ where }),
      prisma.sale.findMany({ where, orderBy: { createdAt: "desc" }, skip, take }),
    ]);

    const customerIds = [...new Set(saleRows.map((item) => item.customer).filter(Boolean))];
    const saleIds = saleRows.map((item) => item.id);
    const soldItems = saleIds.length > 0
      ? await findManyInChunks(prisma.soldproducts, 'sale', saleIds, { orderBy: { createdAt: 'asc' } })
      : [];
    const productIds = [...new Set(soldItems.map((item) => item.product).filter(Boolean))];

    const [customers, products] = await Promise.all([
      customerIds.length > 0
        ? prisma.user.findMany({ where: { id: { in: customerIds } }, select: { id: true, firstname: true, lastname: true, phone: true } })
        : Promise.resolve([]),
      productIds.length > 0
        ? prisma.product.findMany({ where: { id: { in: productIds } }, select: { id: true, name: true, barcode: true } })
        : Promise.resolve([]),
    ]);

    const customerMap = new Map(customers.map((item) => [item.id, item]));
    const productMap = new Map(products.map((item) => [item.id, item]));
    const itemsBySale = new Map();
    for (const item of soldItems) {
      const current = itemsBySale.get(item.sale) || [];
      current.push({ ...item, Product: item.product ? productMap.get(item.product) || null : null });
      itemsBySale.set(item.sale, current);
    }

    const rows = saleRows.map((item) => ({
      ...item,
      Customer: item.customer ? customerMap.get(item.customer) || null : null,
      SoldPoducts: itemsBySale.get(item.id) || [],
    }));
    return { count, rows };
  },
  async getSalesReportTotals(filters) {
    const prisma = getPrisma();
    const where = {};
    if (filters.startDate && filters.endDate) {
      where.createdAt = { gte: new Date(filters.startDate), lte: new Date(filters.endDate) };
    }
    if (filters.customer) where.customer = filters.customer;

    const count = await prisma.sale.count({ where });

    const conditions = [];
    const replacements = [];
    if (filters.startDate && filters.endDate) {
      conditions.push("createdAt >= ? AND createdAt <= ?");
      replacements.push(new Date(filters.startDate), new Date(filters.endDate));
    }
    if (filters.customer) {
      conditions.push("customer = ?");
      replacements.push(filters.customer);
    }
    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const agg = await prisma.$queryRawUnsafe(
      `SELECT COALESCE(SUM(CAST(totalprice AS REAL)), 0) as totalAmount, COALESCE(SUM(CAST(totalpayment AS REAL)), 0) as totalPayment FROM sale ${whereClause}`,
      ...replacements
    );

    const totalAmount = parseFloat(agg[0]?.totalAmount || 0);
    const totalPayment = parseFloat(agg[0]?.totalPayment || 0);
    return { totalSales: count, totalAmount, totalPayment, totalDiscount: totalAmount - totalPayment };
  },

  async getPurchasesReport({ startDate, endDate, vendor }) {
    const prisma = getPrisma();
    const where = {};
    if (startDate && endDate) {
      where.createdAt = { gte: new Date(startDate), lte: new Date(endDate) };
    }
    if (vendor) where.vendor = vendor;
    const purchaseRows = await prisma.purchase.findMany({ where, orderBy: { createdAt: "desc" } });

    const purchaseIds = purchaseRows.map((item) => item.id);
    const vendorIds = [...new Set(purchaseRows.map((item) => item.vendor).filter(Boolean))];
    const purchasedItems = purchaseIds.length > 0
      ? await findManyInChunks(prisma.purchasedproducts, 'purchase', purchaseIds, { orderBy: { createdAt: 'asc' } })
      : [];
    const productIds = [...new Set(purchasedItems.map((item) => item.product).filter(Boolean))];

    const [vendors, products] = await Promise.all([
      vendorIds.length > 0
        ? prisma.user.findMany({ where: { id: { in: vendorIds } }, select: { id: true, firstname: true, lastname: true, phone: true } })
        : Promise.resolve([]),
      productIds.length > 0
        ? prisma.product.findMany({ where: { id: { in: productIds } }, select: { id: true, name: true, barcode: true } })
        : Promise.resolve([]),
    ]);

    const vendorMap = new Map(vendors.map((item) => [item.id, item]));
    const productMap = new Map(products.map((item) => [item.id, item]));
    const itemsByPurchase = new Map();
    for (const item of purchasedItems) {
      const current = itemsByPurchase.get(item.purchase) || [];
      current.push({ ...item, Product: item.product ? productMap.get(item.product) || null : null });
      itemsByPurchase.set(item.purchase, current);
    }

    return purchaseRows.map((item) => ({
      ...item,
      Vendor: item.vendor ? vendorMap.get(item.vendor) || null : null,
      PurchasedItems: itemsByPurchase.get(item.id) || [],
    }));
  },
  async getPurchasesReportPaginated(filters, page = 1, pageSize = 25) {
    const prisma = getPrisma();
    const { skip, take } = normalizePagination(page, pageSize);
    const where = {};
    if (filters.startDate && filters.endDate) {
      where.createdAt = { gte: new Date(filters.startDate), lte: new Date(filters.endDate) };
    }
    if (filters.vendor) where.vendor = filters.vendor;

    const [count, purchaseRows] = await Promise.all([
      prisma.purchase.count({ where }),
      prisma.purchase.findMany({ where, orderBy: { createdAt: "desc" }, skip, take }),
    ]);

    const purchaseIds = purchaseRows.map((item) => item.id);
    const vendorIds = [...new Set(purchaseRows.map((item) => item.vendor).filter(Boolean))];
    const purchasedItems = purchaseIds.length > 0
      ? await findManyInChunks(prisma.purchasedproducts, 'purchase', purchaseIds, { orderBy: { createdAt: 'asc' } })
      : [];
    const productIds = [...new Set(purchasedItems.map((item) => item.product).filter(Boolean))];

    const [vendors, products] = await Promise.all([
      vendorIds.length > 0
        ? prisma.user.findMany({ where: { id: { in: vendorIds } }, select: { id: true, firstname: true, lastname: true, phone: true } })
        : Promise.resolve([]),
      productIds.length > 0
        ? prisma.product.findMany({ where: { id: { in: productIds } }, select: { id: true, name: true, barcode: true } })
        : Promise.resolve([]),
    ]);

    const vendorMap = new Map(vendors.map((item) => [item.id, item]));
    const productMap = new Map(products.map((item) => [item.id, item]));
    const itemsByPurchase = new Map();
    for (const item of purchasedItems) {
      const current = itemsByPurchase.get(item.purchase) || [];
      current.push({ ...item, Product: item.product ? productMap.get(item.product) || null : null });
      itemsByPurchase.set(item.purchase, current);
    }

    const rows = purchaseRows.map((item) => ({
      ...item,
      Vendor: item.vendor ? vendorMap.get(item.vendor) || null : null,
      PurchasedItems: itemsByPurchase.get(item.id) || [],
    }));
    return { count, rows };
  },
  async getPurchasesReportTotals(filters) {
    const prisma = getPrisma();
    const where = {};
    if (filters.startDate && filters.endDate) {
      where.createdAt = { gte: new Date(filters.startDate), lte: new Date(filters.endDate) };
    }
    if (filters.vendor) where.vendor = filters.vendor;

    const [count, agg] = await Promise.all([
      prisma.purchase.count({ where }),
      prisma.purchase.aggregate({ where, _sum: { totalAmount: true, totalPayment: true } }),
    ]);

    return {
      totalPurchases: count,
      totalAmount: parseFloat(agg._sum.totalAmount || 0),
      totalPayment: parseFloat(agg._sum.totalPayment || 0),
    };
  },

  async getInventoryReport({ category, brand, lowStock }) {
    const prisma = getPrisma();
    const where = {};
    if (category) where.category = category;
    if (brand) where.brand = brand;
    if (lowStock === "true") where.quantity = { lte: 10 };

    const products = await prisma.product.findMany({ where, orderBy: { name: "asc" } });

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
  async getInventoryReportPaginated(filters, page = 1, pageSize = 25) {
    const prisma = getPrisma();
    const { skip, take } = normalizePagination(page, pageSize);
    const where = {};
    if (filters.category) where.category = filters.category;
    if (filters.brand) where.brand = filters.brand;
    if (filters.lowStock === "true") where.quantity = { lte: 10 };

    const [count, products] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({ where, orderBy: { name: "asc" }, skip, take }),
    ]);

    const categoryIds = [...new Set(products.map((item) => item.category).filter(Boolean))];
    const brandIds = [...new Set(products.map((item) => item.brand).filter(Boolean))];
    const [categories, brands] = await Promise.all([
      categoryIds.length > 0 ? prisma.category.findMany({ where: { id: { in: categoryIds } } }) : Promise.resolve([]),
      brandIds.length > 0 ? prisma.brand.findMany({ where: { id: { in: brandIds } } }) : Promise.resolve([]),
    ]);
    const categoryMap = new Map(categories.map((item) => [item.id, item]));
    const brandMap = new Map(brands.map((item) => [item.id, item]));

    const rows = products.map((item) => ({
      ...item,
      Category: item.category ? categoryMap.get(item.category) || null : null,
      Brand: item.brand ? brandMap.get(item.brand) || null : null,
    }));
    return { count, rows };
  },
  async getInventoryReportTotals(filters) {
    const prisma = getPrisma();
    const where = {};
    if (filters.category) where.category = filters.category;
    if (filters.brand) where.brand = filters.brand;
    if (filters.lowStock === "true") where.quantity = { lte: 10 };

    const totalProducts = await prisma.product.count({ where });
    const lowStockItems = await prisma.product.count({ where: { ...where, quantity: { lte: 10 } } });

    // Compute total stock value. Prisma aggregate does not support computed expressions,
    // so we load only the two required fields and sum in JS.
    const allProducts = await prisma.product.findMany({ where, select: { quantity: true, purchaseprice: true } });
    const totalValue = allProducts.reduce((sum, p) => sum + (parseFloat(p.quantity || 0) * parseFloat(p.purchaseprice || 0)), 0);

    return { totalProducts, totalValue, lowStockItems };
  },

  async getCustomerReport({ startDate, endDate }) {
    const prisma = getPrisma();
    const customers = await prisma.user.findMany({
      where: { role: "customer" },
      orderBy: { firstname: "asc" },
      select: { id: true, firstname: true, lastname: true, phone: true, email: true, address: true, createdAt: true },
    });

    const customerIds = customers.map((item) => item.id);
    const saleWhere = { customer: { in: customerIds } };
    if (startDate && endDate) {
      saleWhere.createdAt = { gte: new Date(startDate), lte: new Date(endDate) };
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
  async getCustomerReportPaginated(filters, page = 1, pageSize = 25) {
    const prisma = getPrisma();
    const { skip, take } = normalizePagination(page, pageSize);
    const customerWhere = { role: "customer" };

    const [count, customers] = await Promise.all([
      prisma.user.count({ where: customerWhere }),
      prisma.user.findMany({
        where: customerWhere,
        orderBy: { firstname: "asc" },
        select: { id: true, firstname: true, lastname: true, phone: true, email: true, address: true, createdAt: true },
        skip,
        take,
      }),
    ]);

    const customerIds = customers.map((item) => item.id);
    const saleWhere = { customer: { in: customerIds } };
    if (filters.startDate && filters.endDate) {
      saleWhere.createdAt = { gte: new Date(filters.startDate), lte: new Date(filters.endDate) };
    }

    const salesRows = customerIds.length > 0
      ? await prisma.sale.findMany({ where: saleWhere, select: { customer: true, totalpayment: true, createdAt: true } })
      : [];
    const salesByCustomer = new Map();
    for (const sale of salesRows) {
      const current = salesByCustomer.get(sale.customer) || [];
      current.push(sale);
      salesByCustomer.set(sale.customer, current);
    }

    const rows = customers.map((customer) => {
      const customerSales = salesByCustomer.get(customer.id) || [];
      return {
        ...customer,
        totalPurchases: customerSales.length,
        totalSpent: customerSales.reduce((sum, item) => sum + parseFloat(item.totalpayment || 0), 0),
        lastPurchaseDate: customerSales.length > 0 ? customerSales[customerSales.length - 1].createdAt : null,
      };
    });
    return { count, rows };
  },
  async getCustomerReportTotals(filters) {
    const prisma = getPrisma();
    const totalCustomers = await prisma.user.count({ where: { role: "customer" } });

    const conditions = ["customer IS NOT NULL"];
    const replacements = [];
    if (filters.startDate && filters.endDate) {
      conditions.push("createdAt >= ? AND createdAt <= ?");
      replacements.push(new Date(filters.startDate), new Date(filters.endDate));
    }
    const whereClause = `WHERE ${conditions.join(" AND ")}`;

    const [totalSalesAgg, totalRevenueAgg] = await Promise.all([
      prisma.$queryRawUnsafe(`SELECT COUNT(*) as totalSales FROM sale ${whereClause}`, ...replacements),
      prisma.$queryRawUnsafe(`SELECT COALESCE(SUM(CAST(totalpayment AS REAL)), 0) as totalRevenue FROM sale ${whereClause}`, ...replacements),
    ]);

    return {
      totalCustomers,
      totalSales: parseInt(totalSalesAgg[0]?.totalSales || 0, 10),
      totalRevenue: parseFloat(totalRevenueAgg[0]?.totalRevenue || 0),
    };
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
      todayHourlySalesResult,
      topCategorySalesResult,
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
      prisma.$queryRawUnsafe(
        `SELECT strftime('%H', createdAt) as hour, 
         COALESCE(SUM(CAST(totalprice AS REAL) * (1 - CAST(discountpercentage AS REAL) / 100.0)), 0) as revenue
         FROM sale WHERE createdAt >= ? GROUP BY hour ORDER BY hour ASC`,
        todayStartDate
      ),
      prisma.$queryRawUnsafe(
        `SELECT COALESCE(NULLIF(TRIM(c.name), ''), 'Uncategorized') as category,
         SUM(s.quantity) as total_quantity,
         SUM(CAST(s.price AS REAL) * s.quantity) as total_revenue
         FROM soldproducts s
         INNER JOIN product p ON s.product = p.id
         LEFT JOIN category c ON c.id = p.category
         WHERE s.createdAt >= ?
         GROUP BY COALESCE(NULLIF(TRIM(c.name), ''), 'Uncategorized')
         ORDER BY total_revenue DESC
         LIMIT 5`,
        last30DaysISO
      ),
    ]);

    const todaysSalesAmountValue = Number(todaySalesResult[0]?.total || 0);
    const yesterdaySalesAmount = Number(yesterdaySalesResult[0]?.total || 0);
    const todayCustomersCount = Number(todayCustomersResult[0]?.today_count || 0);
    const yesterdayCustomersCount = Number(yesterdayCustomersResult[0]?.yesterday_count || 0);
    const salesByDayNormalized = (salesByDayResult || []).map((day) => ({
      date: day.date,
      total: Number(day.total || 0),
      revenue: Number(day.revenue || 0),
    }));
    const totalSalesCount = salesByDayNormalized.reduce((sum, day) => sum + day.total, 0);
    const weeklySummaryResult = (weeklyMonthlySummaryResult || []).find((item) => item.period === "weekly") || {};
    const monthlySummaryResult = (weeklyMonthlySummaryResult || []).find((item) => item.period === "monthly") || {};
    const hourlySalesResult = (todayHourlySalesResult || []).map((row) => ({
      hour: row.hour != null ? String(row.hour) : row.hour,
      revenue: Number(row.revenue || 0),
    }));
    const topProductsNormalized = (topProductsResult || []).map((row) => ({
      product_name: row.product_name,
      times_added: Number(row.times_added || 0),
      total_quantity: Number(row.total_quantity || 0),
    }));
    const categorySalesResult = (topCategorySalesResult || []).map((row) => ({
      category: row.category || "Uncategorized",
      total_quantity: Number(row.total_quantity || 0),
      total_revenue: Number(row.total_revenue || 0),
    }));

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
      topFiveSoldProductsWithSoldQuantity: topProductsNormalized,
      salesCountByDay: salesByDayNormalized,
      todaysSalesAmount: todaysSalesAmountValue > 0 ? todaysSalesAmountValue.toFixed(2) : 0,
      salesPercentageChange: calculatePercentageChange(yesterdaySalesAmount, todaysSalesAmountValue).toFixed(2),
      salesArrowDirection: todaysSalesAmountValue >= yesterdaySalesAmount ? "up" : "down",
      weeklySalesSummary: {
        total_orders: Number(weeklySummaryResult.total_orders || 0),
        total_revenue: Number(weeklySummaryResult.total_revenue || 0),
        avg_order_value: Number(weeklySummaryResult.avg_order_value || 0),
      },
      monthlySalesSummary: {
        total_orders: Number(monthlySummaryResult.total_orders || 0),
        total_revenue: Number(monthlySummaryResult.total_revenue || 0),
        avg_order_value: Number(monthlySummaryResult.avg_order_value || 0),
      },
      lowStockProducts: lowStockResult || [],
      hourlySales: hourlySalesResult,
      categorySales: categorySalesResult,
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
  async createPurchaseTransaction({ userId, vendor, discountpercentage, totalAmount, totalPayment, ledger, products, source, transactionDate, purchaseAccountId }) {
    const prisma = getPrisma();
    return prisma.$transaction(async (tx) => {
      const invoicenum = await helpers.getNextInvoiceNumber('PUR', tx);
      const purchaseId = generateId(32);
      const purchase = await tx.purchase.create({
        data: {
          id: purchaseId,
          vendor,
          discountpercentage: String(discountpercentage ?? 0),
          totalAmount: parseFloat(totalAmount ?? 0),
          totalPayment: parseFloat(totalPayment ?? 0),
          ledger: !!ledger,
          createdby: userId,
          invoicenum,
          createdAt: transactionDate ? new Date(transactionDate) : undefined
        }
      });

      for (const product of products) {
        await tx.purchasedproducts.create({
          data: {
            id: generateId(32),
            purchase: purchaseId,
            product: product.productId,
            quantity: Number(product.quantity),
            price: Number(product.price),
            source
          }
        });

        // Create/update batch
        let expiry = null;
        if (product.expiryDate && product.expiryDate.trim()) {
          const d = new Date(product.expiryDate);
          if (!isNaN(d.getTime())) {
            expiry = d;
          }
        }
        await tx.productbatches.create({
          data: {
            id: generateId(32),
            product: product.productId,
            quantity: Number(product.quantity),
            expirydate: expiry,
            source
          }
        });

        // Increment stock
        await tx.product.update({
          where: { id: product.productId },
          data: { quantity: { increment: Number(product.quantity) } }
        });

        // Log inventory
        await tx.inventorylogs.create({
          data: {
            id: generateId(32),
            product_id: product.productId,
            quantity: Number(product.quantity),
            note: vendor ? `Purchased from vendor (Ref: ${invoicenum})` : `Purchased (Ref: ${invoicenum})`,
            createdby: userId,
            type: "purchase",
            createdAt: transactionDate ? new Date(transactionDate) : undefined
          }
        });
      }

      // --- DOUBLE ENTRY LEDGER POSTING ---
      if (ledger) {
        const discount = parseFloat(discountpercentage) || 0;
        const grossAmt = parseFloat(totalAmount) || 0;
        const netAmt = grossAmt - (grossAmt * discount / 100);
        const paidAmt = parseFloat(totalPayment) || 0;
        const balanceAmt = netAmt - paidAmt;

        // -- JOURNAL 1: Invoice Raised --
        // Dr Purchase (full net amount)   Cr Vendor (full net amount)
        const invoiceJournalId = generateId(32);
        await tx.account_journal.create({
          data: {
            id: invoiceJournalId,
            date: transactionDate ? new Date(transactionDate) : new Date(),
            description: `Purchase Invoice ${invoicenum}`,
            reference: purchaseId,
            source: 'desktop',
            createdby: userId
          }
        });

        let purchaseAccount = null;
        if (purchaseAccountId) {
          purchaseAccount = await tx.financeaccount.findUnique({ where: { id: purchaseAccountId } });
        }
        if (!purchaseAccount) {
          purchaseAccount = await tx.financeaccount.findFirst({ where: { code: '5100' } });
        }

        let vendorAccountId = null;
        if (vendor) {
          vendorAccountId = await accounting.getOrCreateUserAccount(tx, vendor, 'vendor');
        }

        if (purchaseAccount) {
          await tx.account_ledger.create({
            data: {
              id: generateId(32),
              journal_id: invoiceJournalId,
              account_id: purchaseAccount.id,
              debit: netAmt,
              details: `Purchase for Invoice ${invoicenum}`
            }
          });
        }

        if (vendorAccountId) {
          await tx.account_ledger.create({
            data: {
              id: generateId(32),
              journal_id: invoiceJournalId,
              account_id: vendorAccountId,
              credit: netAmt,
              details: `Payable for Invoice ${invoicenum}`
            }
          });
        }

        // -- JOURNAL 2: Payment Made (only if payment > 0) --
        // Dr Vendor (paid amount)   Cr Cash/Bank (paid amount)
        if (paidAmt > 0) {
          const paymentJournalId = generateId(32);
          await tx.account_journal.create({
            data: {
              id: paymentJournalId,
              date: transactionDate ? new Date(transactionDate) : new Date(),
              description: `Payment for Purchase Invoice ${invoicenum}`,
              reference: purchaseId,
              source: 'desktop',
              createdby: userId
            }
          });

          if (vendorAccountId) {
            await tx.account_ledger.create({
              data: {
                id: generateId(32),
                journal_id: paymentJournalId,
                account_id: vendorAccountId,
                debit: paidAmt,
                details: `Cash paid for Invoice ${invoicenum}`
              }
            });
          }

          const cashAccount = await tx.financeaccount.findFirst({ where: { code: '1110' } });
          if (cashAccount) {
            await tx.account_ledger.create({
              data: {
                id: generateId(32),
                journal_id: paymentJournalId,
                account_id: cashAccount.id,
                credit: paidAmt,
                details: `Cash paid for Invoice ${invoicenum}`
              }
            });
          }
        }
      }

      return purchase;
    });
  },
};

const helpers = {
  normalizePagination,
  toLike,
  async getNextInvoiceNumber(prefix, tx = null) {
    const prisma = tx || getPrisma();
    const table = prefix === 'PUR' ? 'purchase' : prefix === 'RET' ? 'salereturn' : 'sale';
    const lastRecord = await prisma[table].findFirst({
      where: { invoicenum: { startsWith: prefix } },
      orderBy: { createdAt: 'desc' },
      select: { invoicenum: true }
    });

    let nextNumber = 1;
    if (lastRecord && lastRecord.invoicenum) {
      const parts = lastRecord.invoicenum.split('-');
      if (parts.length > 1) {
        // Find the numeric part. Some might have random numbers from before.
        // We try to find the max numeric part if possible, or just increment the last one.
        const lastNum = parseInt(parts[1]);
        if (!isNaN(lastNum)) {
          nextNumber = lastNum + 1;
        }
      }
    }
    return `${prefix}-${String(nextNumber).padStart(6, '0')}`;
  },
};

const accounting = {
  async getCOA() {
    const prisma = getPrisma();
    return prisma.financeaccount.findMany({
      orderBy: [
        { category: 'asc' },
        { code: 'asc' }
      ]
    });
  },
  async getAccountsByParent(parentCode) {
    const prisma = getPrisma();
    const parent = await prisma.financeaccount.findFirst({ where: { code: parentCode } });
    if (!parent) return [];
    return prisma.financeaccount.findMany({
      where: { fk_parent_in_financeaccount: parent.id },
      orderBy: { code: 'asc' }
    });
  },
  async findAccountByCode(code) {
    const prisma = getPrisma();
    return prisma.financeaccount.findFirst({ where: { code } });
  },
  async getOrCreateUserAccount(tx, userId, role) {
    const user = await tx.user.findUnique({
      where: { id: userId },
      select: { id: true, firstname: true, lastname: true, fk_financeaccount_id: true }
    });

    if (user && user.fk_financeaccount_id) {
      return user.fk_financeaccount_id;
    }

    if (!user) return null;

    // Find parent account
    let parentCode = role === 'customer' ? '1130' : '2110';
    if (role === 'vendor') {
        const outsourceParent = await tx.financeaccount.findFirst({ where: { code: '2130' } });
        if (outsourceParent) parentCode = '2130';
    }
    const parentAccount = await tx.financeaccount.findFirst({ where: { code: parentCode } });
    if (!parentAccount) return null;

    // Create a new sub-account
    const newAccount = await tx.financeaccount.create({
      data: {
        id: generateId(32),
        name: `${user.firstname} ${user.lastname} (${role.charAt(0).toUpperCase() + role.slice(1)})`,
        code: `${parentAccount.code}-${user.id.substring(0, 4)}`,
        type: parentAccount.type,
        category: parentAccount.category,
        fk_parent_in_financeaccount: parentAccount.id,
        source: 'system-generated'
      }
    });

    // Link user to the new finance account
    await tx.user.update({
      where: { id: user.id },
      data: { fk_financeaccount_id: newAccount.id }
    });

    return newAccount.id;
  },
  async findAccountByName(name) {
    const prisma = getPrisma();
    return prisma.financeaccount.findFirst({ where: { name } });
  },
  async createAccount(data) {
    const prisma = getPrisma();
    return prisma.financeaccount.create({ data: { id: generateId(32), ...data } });
  },
  async getPartyBalance(userId) {
    const prisma = getPrisma();
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { fk_financeaccount_id: true }
    });
    if (!user || !user.fk_financeaccount_id) return null;
    const ledgerEntries = await prisma.account_ledger.findMany({
      where: { account_id: user.fk_financeaccount_id },
      select: { debit: true, credit: true }
    });
    const totalDebit = ledgerEntries.reduce((s, e) => s + (parseFloat(e.debit) || 0), 0);
    const totalCredit = ledgerEntries.reduce((s, e) => s + (parseFloat(e.credit) || 0), 0);
    return parseFloat((totalDebit - totalCredit).toFixed(2));
  },
  async postJournalEntry(tx, { description, reference, source, userId, entries }) {
    const journalId = generateId(32);
    await tx.account_journal.create({
      data: {
        id: journalId,
        date: new Date(),
        description,
        reference,
        source: source || 'desktop',
        createdby: userId
      }
    });
    for (const entry of entries) {
      await tx.account_ledger.create({
        data: {
          id: generateId(32),
          journal_id: journalId,
          account_id: entry.accountId,
          debit: entry.debit || 0,
          credit: entry.credit || 0,
          details: entry.details
        }
      });
    }
    return journalId;
  },

  async getJournalById(id) {
    const prisma = getPrisma();
    return prisma.account_journal.findUnique({
      where: { id },
      include: {
        ledger_entries: {
          include: { account: true }
        }
      }
    });
  },

  async updateJournalEntry(tx, journalId, { description, reference, date, entries }) {
    // 1. Delete existing ledger entries for this journal
    await tx.account_ledger.deleteMany({
      where: { journal_id: journalId }
    });

    // 2. Update journal record
    await tx.account_journal.update({
      where: { id: journalId },
      data: {
        date: new Date(date),
        description,
        reference
      }
    });

    // 3. Insert new ledger entries
    for (const entry of entries) {
      await tx.account_ledger.create({
        data: {
          id: generateId(32),
          journal_id: journalId,
          account_id: entry.accountId,
          debit: entry.debit || 0,
          credit: entry.credit || 0,
          details: entry.details
        }
      });
    }
  },

  async createExpense({ date, expenseAccountId, paymentAccountId, amount, description }, userId) {
    const prisma = getPrisma();
    const journalId = generateId(32);
    const expenseAmount = parseFloat(amount);

    return prisma.$transaction(async (tx) => {
      // 1. Create Journal Entry
      const journal = await tx.account_journal.create({
        data: {
          id: journalId,
          date: new Date(date),
          description: description,
          source: 'expense',
          createdby: userId
        }
      });

      // 2. Debit Expense Account
      await tx.account_ledger.create({
        data: {
          id: generateId(32),
          journal_id: journalId,
          account_id: expenseAccountId,
          debit: expenseAmount,
          details: description
        }
      });

      // 3. Credit Payment Account
      await tx.account_ledger.create({
        data: {
          id: generateId(32),
          journal_id: journalId,
          account_id: paymentAccountId,
          credit: expenseAmount,
          details: description
        }
      });

      return journal;
    });
  },

  async getExpenses(filters = {}) {
    const prisma = getPrisma();
    let where = { source: 'expense' };

    if (filters.startDate && filters.endDate) {
      where.date = {
        gte: new Date(filters.startDate),
        lte: new Date(filters.endDate)
      };
    }

    const expenses = await prisma.account_journal.findMany({
      where,
      include: {
        ledger_entries: {
          include: {
            account: true
          }
        }
      },
      orderBy: { date: 'desc' }
    });

    return expenses.map(journal => {
      const debitEntry = journal.ledger_entries.find(e => parseFloat(e.debit) > 0);
      const creditEntry = journal.ledger_entries.find(e => parseFloat(e.credit) > 0);

      return {
        id: journal.id,
        date: journal.date,
        description: journal.description,
        amount: debitEntry ? parseFloat(debitEntry.debit) : 0,
        expenseAccount: debitEntry?.account?.name || 'Unknown',
        paymentAccount: creditEntry?.account?.name || 'Unknown'
      };
    });
  },

  async getAllJournals(filters = {}) {
    const prisma = getPrisma();
    let where = {};
    if (filters.startDate && filters.endDate) {
      where.date = {
        gte: new Date(filters.startDate),
        lte: new Date(filters.endDate)
      };
    }
    if (filters.daterange) {
      const [start, end] = String(filters.daterange).split(" to ").map(d => d.trim());
      if (start && end) {
        where.date = {
          gte: new Date(start),
          lte: new Date(end)
        };
      }
    }
    if (filters.search) {
      where.OR = [
        { description: { contains: filters.search } },
        { reference: { contains: filters.search } }
      ];
    }
    const journals = await prisma.account_journal.findMany({
      where,
      include: {
        ledger_entries: {
          include: { account: true }
        }
      },
      orderBy: { date: 'desc' }
    });
    return journals;
  },

  async saveCashClosing({ expectedCash, actualCash, note, userId }) {
    const prisma = getPrisma();
    const difference = parseFloat(actualCash) - parseFloat(expectedCash);

    return prisma.$transaction(async (tx) => {
      // Create cashclosing record
      const closing = await tx.cashclosing.create({
        data: {
          id: generateId(32),
          closingbalance: parseFloat(actualCash),
          date: new Date(),
          note: note,
          fk_user_in_cashclosing: userId,
          source: 'desktop'
        }
      });

      // If there is a difference, post an adjusting journal entry
      if (Math.abs(difference) > 0.001) {
        // Find Cash account
        const cashAcc = await tx.financeaccount.findFirst({
          where: { name: { contains: 'Cash' }, type: 'asset' }
        });
        
        if (cashAcc) {
          // Find or create "Cash Short/Over" account
          let shortOverAcc = await tx.financeaccount.findFirst({
            where: { name: 'Cash Short/Over' }
          });
          
          if (!shortOverAcc) {
            shortOverAcc = await tx.financeaccount.create({
              data: {
                id: generateId(32),
                name: 'Cash Short/Over',
                code: 'EXP-CSO',
                type: 'expense',
                category: 'expense',
                createdby: userId,
                source: 'system'
              }
            });
          }

          const journalId = generateId(32);
          await tx.account_journal.create({
            data: {
              id: journalId,
              date: new Date(),
              description: `Cash Closing Adjustment for ${new Date().toLocaleDateString()}`,
              source: 'cash-closing',
              createdby: userId
            }
          });

          if (difference < 0) {
            // Cash Shortage: Debit Expense (Short/Over), Credit Cash
            await tx.account_ledger.create({
              data: { id: generateId(32), journal_id: journalId, account_id: shortOverAcc.id, debit: Math.abs(difference), details: 'Cash Shortage' }
            });
            await tx.account_ledger.create({
              data: { id: generateId(32), journal_id: journalId, account_id: cashAcc.id, credit: Math.abs(difference), details: 'Cash Shortage' }
            });
          } else {
            // Cash Overage: Debit Cash, Credit Revenue/Expense (Short/Over)
            await tx.account_ledger.create({
              data: { id: generateId(32), journal_id: journalId, account_id: cashAcc.id, debit: difference, details: 'Cash Overage' }
            });
            await tx.account_ledger.create({
              data: { id: generateId(32), journal_id: journalId, account_id: shortOverAcc.id, credit: difference, details: 'Cash Overage' }
            });
          }
        }
      }

      return closing;
    });
  },

  async getBalanceSheetData(asOfDate) {
    const prisma = getPrisma();
    let dateFilter = new Date();
    if (asOfDate) {
      dateFilter = new Date(asOfDate);
      dateFilter.setUTCHours(23, 59, 59, 999);
    }

    // Fetch all finance accounts
    const accounts = await prisma.financeaccount.findMany({
      orderBy: { code: 'asc' }
    });

    // Fetch all ledger entries up to the date
    const ledgerEntries = await prisma.account_ledger.findMany({
      where: {
        journal: {
          date: { lte: dateFilter }
        }
      },
      include: {
        journal: true
      }
    });

    // Aggregate debits and credits per account
    const accountTotals = {};
    for (const entry of ledgerEntries) {
      if (!accountTotals[entry.account_id]) {
        accountTotals[entry.account_id] = { debit: 0, credit: 0 };
      }
      accountTotals[entry.account_id].debit += parseFloat(entry.debit) || 0;
      accountTotals[entry.account_id].credit += parseFloat(entry.credit) || 0;
    }

    let totalRevenue = 0;
    let totalExpense = 0;

    const assets = [];
    const liabilities = [];
    let equity = [];

    // Calculate balances and group accounts
    for (const acc of accounts) {
      const totals = accountTotals[acc.id] || { debit: 0, credit: 0 };
      const openingBalance = parseFloat(acc.opening_balance) || 0;
      let balance = 0;

      const accType = (acc.type || '').toLowerCase();
      const accCategory = (acc.category || '').toLowerCase();

      // Determine balance calculation based on account type
      if (accType === 'asset' || accType === 'expense' || accCategory === 'asset' || accCategory === 'expense') {
        balance = openingBalance + totals.debit - totals.credit;
      } else {
        balance = openingBalance + totals.credit - totals.debit;
      }

      // We still include zero-balance accounts if they have opening balance or activity,
      // but typical balance sheets only show non-zero balances. Let's include if balance !== 0.
      if (Math.abs(balance) > 0.001) {
        const accData = {
          id: acc.id,
          code: acc.code,
          name: acc.name,
          balance: parseFloat(balance.toFixed(2))
        };

        if (accType === 'asset' || accCategory === 'asset') {
          assets.push(accData);
        } else if (accType === 'liability' || accCategory === 'liability') {
          liabilities.push(accData);
        } else if (accType === 'equity' || accCategory === 'equity') {
          equity.push(accData);
        } else if (accType === 'revenue' || accCategory === 'revenue') {
          totalRevenue += balance;
        } else if (accType === 'expense' || accCategory === 'expense') {
          totalExpense += balance;
        }
      }
    }

    const netIncome = parseFloat((totalRevenue - totalExpense).toFixed(2));

    // Calculate Totals
    const totalAssets = assets.reduce((sum, a) => sum + a.balance, 0);
    const totalLiabilities = liabilities.reduce((sum, l) => sum + l.balance, 0);
    const totalEquityRaw = equity.reduce((sum, e) => sum + e.balance, 0);

    const totalLiabilitiesAndEquity = totalLiabilities + totalEquityRaw + netIncome;

    return {
      asOfDate: dateFilter,
      assets,
      liabilities,
      equity,
      netIncome,
      totalAssets: parseFloat(totalAssets.toFixed(2)),
      totalLiabilities: parseFloat(totalLiabilities.toFixed(2)),
      totalEquity: parseFloat((totalEquityRaw + netIncome).toFixed(2)),
      totalLiabilitiesAndEquity: parseFloat(totalLiabilitiesAndEquity.toFixed(2))
    };
  }
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
  accounting,
  helpers,
};

// --- Test Execution Block ---
if (require.main === module) {
  async function test() {
    console.log("Testing products.list with name filter...");
    const result = await products.list({
      page: 1,
      pageSize: 10,
      where: { name: { contains: "1590" } }
    });
    console.log("Count:", result.count);
    console.log("Rows:", result.rows.map(r => r.name));
    
    console.log("\nTesting products.list with price filter...");
    const result2 = await products.list({
      page: 1,
      pageSize: 10,
      where: { saleprice: { gte: 850 } }
    });
    console.log("Count 2:", result2.count);
    console.log("Rows 2:", result2.rows.map(r => r.name));
    
    console.log("\nTesting products.list with category filter...");
    const cat = await categories.list({page:1, pageSize: 1, search: ""});
    if (cat.rows.length > 0) {
      const catId = cat.rows[0].id;
      const result3 = await products.list({
        page: 1,
        pageSize: 10,
        where: { category: catId }
      });
      console.log("Count 3 (Cat " + catId + "):", result3.count);
      console.log("Rows 3:", result3.rows.map(r => r.name));
    }
  }
  
  test().catch(console.error).finally(() => process.exit());
}
