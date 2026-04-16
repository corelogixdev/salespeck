const db = require("../models");
const { requirePrismaClient } = require("../utils/prismaClient");
const encrypt = require("../utils/encrypt");
const moment = require("moment");
const logi = require("../utils/logi");
const { Op } = require("sequelize");
const config = require("../installEnv");
const { getPaginationMeta, buildSortClause } = require('../utils/paginationHelper');

const index = (req, res) => {
  if (!req.session.user_id) {
    return res.redirect("/login");
  } else {
    res.redirect("/dashboard");
  }
};
async function getDashboardStats() {
  try {
    // Pre-calculate all date ranges - use ISO strings for SQLite
    const todayStartDate = moment().startOf("day").toDate();
    const todayEndDate = moment().endOf("day").toDate();
    const yesterdayStartDate = moment().subtract(1, "day").startOf("day").toDate();
    const yesterdayEndDate = moment().subtract(1, "day").endOf("day").toDate();
    const last7DaysStart = moment().subtract(7, "days").startOf("day").toDate();
    const last30DaysStart = moment().subtract(30, "days").startOf("day").toDate();

    // Use parameterized dates instead of datetime() functions for better performance
    const last7DaysISO = last7DaysStart.toISOString();
    const last30DaysISO = last30DaysStart.toISOString();

    // Parallelize all independent queries
    const [
      todaySalesResult,
      yesterdaySalesResult,
      todayCustomersResult,
      yesterdayCustomersResult,
      salesAndTopProductsResult,
      weeklyMonthlySummaryResult,
      lowStockResult
    ] = await Promise.all([
      // Today's sales amount - simplified calculation
      db.sequelize.query(
        `SELECT COALESCE(SUM(CAST(totalprice AS REAL) * (1 - CAST(discountpercentage AS REAL) / 100.0)), 0) as total
         FROM sale WHERE createdAt >= ? AND createdAt < ?`,
        {
          replacements: [todayStartDate.toISOString(), moment(todayEndDate).add(1, 'day').toISOString()],
          type: db.sequelize.QueryTypes.SELECT
        }
      ),
      // Yesterday's sales amount
      db.sequelize.query(
        `SELECT COALESCE(SUM(CAST(totalprice AS REAL) * (1 - CAST(discountpercentage AS REAL) / 100.0)), 0) as total
         FROM sale WHERE createdAt >= ? AND createdAt < ?`,
        {
          replacements: [yesterdayStartDate.toISOString(), moment(yesterdayEndDate).add(1, 'day').toISOString()],
          type: db.sequelize.QueryTypes.SELECT
        }
      ),
      // Today's customer count - optimized with raw SQL
      db.sequelize.query(
        `SELECT COUNT(*) as today_count FROM user WHERE role = 'customer' AND createdAt >= ? AND createdAt < ?`,
        {
          replacements: [todayStartDate.toISOString(), moment(todayEndDate).add(1, 'day').toISOString()],
          type: db.sequelize.QueryTypes.SELECT
        }
      ),
      // Yesterday's customer count
      db.sequelize.query(
        `SELECT COUNT(*) as yesterday_count FROM user WHERE role = 'customer' AND createdAt >= ? AND createdAt < ?`,
        {
          replacements: [yesterdayStartDate.toISOString(), moment(yesterdayEndDate).add(1, 'day').toISOString()],
          type: db.sequelize.QueryTypes.SELECT
        }
      ),
      // Combined query for sales count and sales by day (last 30 days)
      db.sequelize.query(
        `SELECT 
          strftime('%Y-%m-%d', createdAt) as date,
          COUNT(*) as total,
          COALESCE(SUM(CAST(totalprice AS REAL) * (1 - CAST(discountpercentage AS REAL) / 100.0)), 0) as revenue
        FROM sale
        WHERE createdAt >= ?
        GROUP BY date
        ORDER BY date ASC`,
        {
          replacements: [last30DaysISO],
          type: db.sequelize.QueryTypes.SELECT
        }
      ),
      // Combined weekly and monthly summary in one query
      db.sequelize.query(
        `SELECT 
          'weekly' as period,
          COUNT(*) as total_orders,
          COALESCE(SUM(CAST(totalprice AS REAL) * (1 - CAST(discountpercentage AS REAL) / 100.0)), 0) as total_revenue,
          COALESCE(AVG(CAST(totalprice AS REAL) * (1 - CAST(discountpercentage AS REAL) / 100.0)), 0) as avg_order_value
        FROM sale
        WHERE createdAt >= ? AND createdAt < ?
        UNION ALL
        SELECT 
          'monthly' as period,
          COUNT(*) as total_orders,
          COALESCE(SUM(CAST(totalprice AS REAL) * (1 - CAST(discountpercentage AS REAL) / 100.0)), 0) as total_revenue,
          COALESCE(AVG(CAST(totalprice AS REAL) * (1 - CAST(discountpercentage AS REAL) / 100.0)), 0) as avg_order_value
        FROM sale
        WHERE createdAt >= ?`,
        {
          replacements: [
            last7DaysISO,
            moment().add(1, 'day').startOf("day").toISOString(),
            last30DaysISO
          ],
          type: db.sequelize.QueryTypes.SELECT
        }
      ),
      // Low stock products - using raw SQL for better performance
      db.sequelize.query(
        `SELECT id, name, quantity, saleprice 
         FROM product 
         WHERE quantity < 10 AND saleactive = 1 
         ORDER BY quantity ASC 
         LIMIT 5`,
        { type: db.sequelize.QueryTypes.SELECT }
      )
    ]);

    // Get top 5 products separately (smaller dataset)
    const topProductsResult = await db.sequelize.query(
      `SELECT
        p.name as product_name,
        COUNT(*) as times_added,
        SUM(s.quantity) as total_quantity
      FROM soldproducts s
      INNER JOIN product p ON s.product = p.id
      WHERE s.createdAt >= ?
      GROUP BY p.id, p.name
      ORDER BY total_quantity DESC
      LIMIT 5`,
      {
        replacements: [last30DaysISO],
        type: db.sequelize.QueryTypes.SELECT
      }
    );

    // Extract and process results
    let todaysSalesAmount = parseFloat(todaySalesResult[0]?.total || 0);
    todaysSalesAmount = todaysSalesAmount > 0 ? todaysSalesAmount.toFixed(2) : 0;
    const yesterdaySalesAmount = parseFloat(yesterdaySalesResult[0]?.total || 0);
    
    const todayCustomersCount = parseInt(todayCustomersResult[0]?.today_count || 0);
    const yesterdayCustomersCount = parseInt(yesterdayCustomersResult[0]?.yesterday_count || 0);
    
    const salesByDayResult = salesAndTopProductsResult || [];
    const totalSalesCount = salesByDayResult.reduce((sum, day) => sum + (parseInt(day.total) || 0), 0);
    
    // Split weekly and monthly summary
    const weeklySummaryResult = weeklyMonthlySummaryResult.find(r => r.period === 'weekly') || {};
    const monthlySummaryResult = weeklyMonthlySummaryResult.find(r => r.period === 'monthly') || {};

    // Calculate percentage changes
    const salesPercentageChange = calculatePercentageChange(
      yesterdaySalesAmount,
      todaysSalesAmount
    ).toFixed(2);
    const salesArrowDirection = todaysSalesAmount >= yesterdaySalesAmount ? "up" : "down";

    const customerPercentageChange = calculatePercentageChange(
      yesterdayCustomersCount,
      todayCustomersCount
    ).toFixed(2);
    const customerArrowDirection =
      todayCustomersCount >= yesterdayCustomersCount ? "up" : "down";

    return {
      todayCustomersCount,
      customerPercentageChange,
      customerArrowDirection,
      totalSalesCount,
      topFiveSoldProductsWithSoldQuantity: topProductsResult || [],
      salesCountByDay: salesByDayResult || [],
      todaysSalesAmount,
      salesPercentageChange,
      salesArrowDirection,
      weeklySalesSummary: {
        total_orders: parseInt(weeklySummaryResult.total_orders || 0),
        total_revenue: parseFloat(weeklySummaryResult.total_revenue || 0),
        avg_order_value: parseFloat(weeklySummaryResult.avg_order_value || 0)
      },
      monthlySalesSummary: {
        total_orders: parseInt(monthlySummaryResult.total_orders || 0),
        total_revenue: parseFloat(monthlySummaryResult.total_revenue || 0),
        avg_order_value: parseFloat(monthlySummaryResult.avg_order_value || 0)
      },
      lowStockProducts: lowStockResult || [],
    };
  } catch (error) {
    logi("Error:", error);
    return {};
  }
}
const dashboard = async (req, res) => {
  try {
    // Parallelize fetching company settings, user, and dashboard stats
    const [settings, user, data] = await Promise.all([
      db.softwaresetting.findOne({
        where: { name: "company" },
        attributes: ['value'],
        raw: true
      }),
      db.user.findOne({ 
        where: { id: req.session.user_id },
        attributes: ['id', 'firstname', 'lastname', 'username', 'role', 'profile_image_url', 'dashboard_config'],
        raw: true
      }),
      getDashboardStats()
    ]);

    const company = settings?.value ? JSON.parse(settings.value) : {};

    // Parse dashboard config
    const dashboardConfig = user?.dashboard_config ? JSON.parse(user.dashboard_config) : {};

    // Render dashboard
    res.render("dashboard", {
      company,
      ...data,
      user,
      dashboardConfig, // Pass config to view
    });
  } catch (error) {
    logi("Error:", error);
    req.session.message = {
      type: "error",
      text: "An error occurred. Please try again.",
    };
    res.redirect("/login");
  }
};

// Helper function to calculate percentage change
function calculatePercentageChange(previous = 0, current) {
  if (previous === null) previous = 0;
  if (current === null) current = 0;
  if (previous > 0) {
    return ((current - previous) / previous) * 100;
  } else if (previous === 0 && current > 0) {
    return 100; // Infinite increase
  } else if (previous === 0 && current === 0) {
    return 0; // No change
  } else if (previous < 0 && current === 0) {
    return -100; // Infinite decrease
  } else if (previous < 0 && current > 0) {
    return 100; // Infinite increase
  }
  return 0;
}
const loginGet = async (req, res) => {
  const prisma = requirePrismaClient();
  let user = null;
  try {
    user = await prisma.user.findFirst({ where: { role: "branchmanager" } });
  } catch (error) {
    logi("Prisma loginGet error:", error.message || error);
    throw error;
  }

  if (!user) {
    logi("User was not found in local database. Redirecting to login...");
    return res.redirect("/register");
  }
  res.render("login", { hidenav: true, errors: req.session?.errors || {} });
};

const loginPost = async (req, res) => {
  logi("Login request received");
  const { username, password } = req.body;
  try {
    let user = null;
    const prisma = requirePrismaClient();

    try {
      user = await prisma.user.findFirst({ where: { username } });
    } catch (prismaError) {
      logi("Prisma loginPost error:", prismaError.message || prismaError);
      throw prismaError;
    }

    if (user && encrypt.compare(user.password, password)) {
      logi("User found:", user.firstname);
      logi("Login successful");
      req.session.user_id = user.id;
      req.session.user = user;
      req.session.message = { type: "success", text: "Login successful!" };
      res.redirect("/");
    } else {
      if (!user) {
        logi("User was not found. Redirecting to login...");
        req.session.errors = {
          username: "User not found. Please register.",
        };
      } else {
        logi("Password incorrect. Redirecting to login...");
        req.session.errors = {
          username: "",
          password: "Password incorrect.",
        };
      }
      res.redirect("/login");
    }
  } catch (e) {
    logi("Error:");
    logi(e);
  }
};
const logout = (req, res) => {
  req.session = null;
  res.redirect("/login");
};

const registerget = (req, res) => {
  res.render("register", {
    hidenav: true,
    errors: {
      username: "",
    },
  });
};

const registerpost = async (req, res) => {
  logi("Register request received");
  logi("Data:", req.body);

  try {
    logi("Creating user in local database...");
    const hashedPassword = encrypt.encrypt(req.body.password);

    // Handle profile image if uploaded
    let profileImageUrl = null;
    if (req.file) {
      profileImageUrl = `/uploads/profile-images/${req.file.filename}`;
      logi("Profile image uploaded:", profileImageUrl);
    }

    let user = await db.user.create({
      ...req.body,
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      password: hashedPassword,
      role: "branchmanager",
      profile_image_url: profileImageUrl,
    });
    logi("BranchManager user created successfully!");
    req.session.message = {
      type: "success",
      text: "Registration successful! Please login.",
    };
    res.redirect("/login");
  } catch (e) {
    logi("Error:");
    logi(e);
    req.session.message = {
      type: "error",
      text: "An error occurred. Please try again.",
    };
    res.redirect("/register");
  }
};

const exportDb = async (req, res) => {
  try {
    let file = config.storage;
    if (file) {
      res.download(file);
    }
  } catch (error) {
    logi("Error:", error);
    res.json({ error: "An error occurred. Please try again" });
  }
};

const inventorylogs = async (req, res) => {
  try {
    const query = req.query;
    const page = parseInt(query.page) || 1;
    const pageSize = parseInt(query.pageSize) || 25;
    const offset = (page - 1) * pageSize;

    const sortBy = query.sortBy || 'createdAt';
    const sortOrder = query.sortOrder || 'desc';
    const order = buildSortClause(sortBy, sortOrder, 'createdAt');

    const { dateRange, product, createdBy } = query;
    let whereClause = {};
    let includeOptions = [
      {
        model: db.product,
        as: "Product",
        attributes: ["id", "name"],
        where: {},
      },
      {
        model: db.user,
        as: "User",
        attributes: ["id", "firstname", "lastname"],
        where: {},
      },
    ];

    if (dateRange) {
      const [startDate, endDate] = dateRange.split(" to ").map((date) => date.trim());
      if (startDate && endDate) {
        whereClause.createdAt = {
          [Op.between]: [
            moment(startDate).startOf("day").toDate(),
            moment(endDate).endOf("day").toDate(),
          ],
        };
      }
    }

    if (product) {
      if (!isNaN(product)) {
        includeOptions[0].where.id = product;
      } else {
        includeOptions[0].where.name = { [Op.like]: `%${product}%` };
      }
    }

    if (createdBy) {
      includeOptions[1].where[Op.or] = [
        { firstname: { [Op.like]: `%${createdBy}%` } },
        { lastname: { [Op.like]: `%${createdBy}%` } },
      ];
    }

    const { count, rows: logs } = await db.inventorylogs.findAndCountAll({
      where: whereClause,
      include: includeOptions,
      order,
      limit: pageSize,
      offset: offset,
    });

    const processedLogs = logs.map((log) => {
      const plainLog = log.get({ plain: true });
      return {
        ...plainLog,
        Product: plainLog.Product || { name: "Unknown Product" },
        User: plainLog.User || { firstname: "Unknown User", lastname: "" },
      };
    });

    const pagination = getPaginationMeta(page, pageSize, count);

    if (req.query.partial) {
        return res.render("inventory_logs/_table_rows", {
            layout: false,
            inventoryLogs: processedLogs,
        });
    }

    res.render("inventory_logs/index", {
      inventoryLogs: processedLogs,
      searchParams: {},
      pagination,
      query,
      sortBy,
      sortOrder,
    });
  } catch (error) {
    console.error("Error fetching inventory logs:", error);
    res.render("inventory_logs/index", {
      inventoryLogs: [],
      searchParams: {},
      pagination: null,
      query: {},
      error: "An error occurred while fetching inventory logs.",
    });
  }
};

const searchInventoryLogs = async (req, res) => {
  try {
    const { dateRange, product, createdBy } = req.body;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 25;
    const offset = (page - 1) * pageSize;

    let whereClause = {};
    let includeOptions = [
      {
        model: db.product,
        as: "Product",
        attributes: ["id", "name"],
        where: {},
      },
      {
        model: db.user,
        as: "User",
        attributes: ["id", "firstname", "lastname"],
        where: {},
      },
    ];

    if (dateRange) {
      const [startDate, endDate] = dateRange
        .split(" to ")
        .map((date) => date.trim());
      if (startDate && endDate) {
        whereClause.createdAt = {
          [Op.between]: [
            moment(startDate).startOf("day").toDate(),
            moment(endDate).endOf("day").toDate(),
          ],
        };
      }
    }

    if (product) {
      if (!isNaN(product)) {
        includeOptions[0].where.id = product;
      } else {
        includeOptions[0].where.name = { [Op.like]: `%${product}%` };
      }
    }

    if (createdBy) {
      includeOptions[1].where[Op.or] = [
        { firstname: { [Op.like]: `%${createdBy}%` } },
        { lastname: { [Op.like]: `%${createdBy}%` } },
      ];
    }

    const { count, rows: logs } = await db.inventorylogs.findAndCountAll({
      where: whereClause,
      include: includeOptions,
      order: [["createdAt", "DESC"]],
      limit: pageSize,
      offset: offset,
    });

    const processedLogs = logs.map((log) => {
      const plainLog = log.get({ plain: true });
      return {
        ...plainLog,
        Product: plainLog.Product || { name: "Unknown Product" },
        User: plainLog.User || { firstname: "Unknown User", lastname: "" },
      };
    });

    const totalPages = Math.ceil(count / pageSize);
    const pagination = {
      currentPage: page,
      totalPages: totalPages,
      pageSize: pageSize,
      totalCount: count,
      startRecord: offset + 1,
      endRecord: Math.min(offset + pageSize, count),
      hasPrevious: page > 1,
      hasNext: page < totalPages,
    };

    if (req.query.partial) {
        return res.render("inventory_logs/_table_rows", {
            layout: false,
            inventoryLogs: processedLogs,
        });
    }

    res.render("inventory_logs/index", {
      inventoryLogs: processedLogs,
      title: "Inventory Logs",
      searchParams: req.body,
      pagination,
      query: req.query,
    });
  } catch (error) {
    console.error("Error searching inventory logs:", error);
    res.render("inventory_logs/index", {
      inventoryLogs: [],
      title: "Inventory Logs",
      searchParams: req.body,
      pagination: null,
      query: {},
      error: "An error occurred while searching inventory logs.",
    });
  }
};

const inventorylogsById = async (req, res) => {
  try {
    const productId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 25;
    const offset = (page - 1) * pageSize;

    const { count, rows: logs } = await db.inventorylogs.findAndCountAll({
      where: {
        product_id: productId,
      },
      include: [
        {
          model: db.product,
          as: "Product",
          attributes: ["id", "name"],
        },
        {
          model: db.user,
          as: "User",
          attributes: ["id", "firstname", "lastname"],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: pageSize,
      offset: offset,
    });

    const processedLogs = logs.map((log) => {
      const plainLog = log.get({ plain: true });
      return {
        ...plainLog,
        Product: plainLog.Product || { name: "Unknown Product" },
        User: plainLog.User || { firstname: "Unknown User", lastname: "" },
      };
    });

    const totalPages = Math.ceil(count / pageSize);
    const pagination = {
      currentPage: page,
      totalPages: totalPages,
      pageSize: pageSize,
      totalCount: count,
      startRecord: offset + 1,
      endRecord: Math.min(offset + pageSize, count),
      hasPrevious: page > 1,
      hasNext: page < totalPages,
    };

    if (req.query.partial) {
        return res.render("inventory_logs/_table_rows", {
            layout: false,
            inventoryLogs: processedLogs,
        });
    }

    res.render("inventory_logs/index", {
      inventoryLogs: processedLogs,
      title: `Inventory Logs - ${processedLogs[0]?.Product?.name || "Product"}`,
      hidenav: true,
      searchParams: {},
      pagination,
      query: req.query,
    });
  } catch (error) {
    console.error("Error fetching inventory logs:", error);
    res.render("inventory_logs/index", {
      inventoryLogs: [],
      title: "Inventory Logs",
      hidenav: true,
      searchParams: {},
      pagination: null,
      query: {},
      error: "An error occurred while fetching inventory logs.",
    });
  }
};

const switchServer = async (req, res) => {
  res.render("switch-server", {
    title: "Switch Server",
    port: config.port,
  });
};

module.exports = {
  index,
  dashboard,
  loginGet,
  loginPost,
  logout,
  registerget,
  registerpost,
  exportDb,
  inventorylogs,
  searchInventoryLogs,
  inventorylogsById,
  switchServer,
  getDashboardStats,
};
