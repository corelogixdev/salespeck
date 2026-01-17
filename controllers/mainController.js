const db = require("../models");
const encrypt = require("../utils/encrypt");
const moment = require("moment");
const logi = require("../utils/logi");
const { Op } = require("sequelize");
const config = require("../installEnv");

const index = (req, res) => {
  if (!req.session.user_id) {
    return res.redirect("/login");
  } else {
    res.redirect("/dashboard");
  }
};
async function getDashboardStats() {
  try {
    // Define date ranges
    const todayStartDate = moment().startOf("day").toDate();
    const todayEndDate = moment().endOf("day").toDate();
    const yesterdayStartDate = moment().subtract(1, "day").startOf("day").toDate();
    const yesterdayEndDate = moment().subtract(1, "day").endOf("day").toDate();
    const lastMonthStartDate = moment().subtract(30, "days").startOf("day").toDate();
    const lastWeekStartDate = moment().subtract(7, "days").startOf("day").toDate();

    // Optimized: Today's sales amount using Sequelize
    const todaySales = await db.sale.findAll({
      attributes: [
        [db.sequelize.literal('SUM(totalprice - (totalprice * discountpercentage / 100))'), 'total']
      ],
      where: {
        createdAt: { [Op.between]: [todayStartDate, todayEndDate] }
      },
      raw: true
    });
    let todaysSalesAmount = todaySales[0]?.total || 0;
    if (todaysSalesAmount > 0) todaysSalesAmount = parseFloat(todaysSalesAmount).toFixed(2);

    // Optimized: Yesterday's sales amount
    const yesterdaySales = await db.sale.findAll({
      attributes: [
        [db.sequelize.literal('SUM(totalprice - (totalprice * discountpercentage / 100))'), 'total']
      ],
      where: {
        createdAt: { [Op.between]: [yesterdayStartDate, yesterdayEndDate] }
      },
      raw: true
    });
    const yesterdaySalesAmount = yesterdaySales[0]?.total || 0;

    const salesPercentageChange = calculatePercentageChange(
      yesterdaySalesAmount,
      todaysSalesAmount
    ).toFixed(2);
    const salesArrowDirection = todaysSalesAmount >= yesterdaySalesAmount ? "up" : "down";

    // Optimized: Today's customer count
    const todayCustomersCount = await db.user.count({
      where: {
        role: "customer",
        createdAt: { [Op.between]: [todayStartDate, todayEndDate] },
      },
    });

    // Optimized: Yesterday's customer count
    const yesterdayCustomersCount = await db.user.count({
      where: {
        role: "customer",
        createdAt: { [Op.between]: [yesterdayStartDate, yesterdayEndDate] },
      },
    });

    // Calculate percentage change for customers
    const customerPercentageChange = calculatePercentageChange(
      yesterdayCustomersCount,
      todayCustomersCount
    ).toFixed(2);
    const customerArrowDirection =
      todayCustomersCount >= yesterdayCustomersCount ? "up" : "down";

    // Optimized: Last 30 days sales count (instead of all time)
    const totalSalesCount = await db.sale.count({
      where: {
        createdAt: { [Op.gte]: lastMonthStartDate }
      }
    });

    // Optimized: Top 5 sold products (last 30 days only)
    const topFiveSoldProductsWithSoldQuantity = await db.sequelize.query(
      `
        SELECT
          p.name as product_name,
          COUNT(*) as times_added,
          SUM(s.quantity) as total_quantity
        FROM soldproducts s
        JOIN product p ON s.product = p.id
        WHERE s.createdAt >= datetime('now', '-30 days')
        GROUP BY p.name
        ORDER BY total_quantity DESC, times_added DESC
        LIMIT 5
        `,
      { type: db.sequelize.QueryTypes.SELECT }
    );

    // Optimized: Sales count by day for last 30 days
    const salesCountByDay = await db.sequelize.query(
      `
        SELECT
          strftime('%Y-%m-%d', createdAt) as date,
          COUNT(*) as total,
          SUM(totalprice - (totalprice * discountpercentage / 100)) as revenue
        FROM sale
        WHERE createdAt >= datetime('now', '-30 days')
        GROUP BY date
        ORDER BY date ASC
        `,
      { type: db.sequelize.QueryTypes.SELECT }
    );

    // NEW: Weekly sales summary
    const weeklySalesSummary = await db.sequelize.query(
      `
        SELECT
          COUNT(*) as total_orders,
          SUM(totalprice - (totalprice * discountpercentage / 100)) as total_revenue,
          AVG(totalprice - (totalprice * discountpercentage / 100)) as avg_order_value
        FROM sale
        WHERE createdAt >= datetime('now', '-7 days')
        `,
      { type: db.sequelize.QueryTypes.SELECT }
    );

    // NEW: Monthly sales summary
    const monthlySalesSummary = await db.sequelize.query(
      `
        SELECT
          COUNT(*) as total_orders,
          SUM(totalprice - (totalprice * discountpercentage / 100)) as total_revenue,
          AVG(totalprice - (totalprice * discountpercentage / 100)) as avg_order_value
        FROM sale
        WHERE createdAt >= datetime('now', '-30 days')
        `,
      { type: db.sequelize.QueryTypes.SELECT }
    );

    // NEW: Low stock products (quantity < 10)
    const lowStockProducts = await db.product.findAll({
      where: {
        quantity: { [Op.lt]: 10 },
        saleactive: true
      },
      attributes: ['id', 'name', 'quantity', 'saleprice'],
      order: [['quantity', 'ASC']],
      limit: 5
    });

    return {
      todayCustomersCount,
      customerPercentageChange,
      customerArrowDirection,
      totalSalesCount,
      topFiveSoldProductsWithSoldQuantity,
      salesCountByDay,
      todaysSalesAmount,
      salesPercentageChange,
      salesArrowDirection,
      weeklySalesSummary: weeklySalesSummary[0] || {},
      monthlySalesSummary: monthlySalesSummary[0] || {},
      lowStockProducts: lowStockProducts || [],
    };
  } catch (error) {
    logi("Error:", error);
    return {};
  }
}
const dashboard = async (req, res) => {
  try {
    // Fetch company settings
    const settings = await db.softwaresetting.findOne({
      where: { name: "company" },
    });
    const company = JSON.parse(settings?.value || "{}");
    let data = await getDashboardStats();

    const user = await db.user.findOne({ where: { id: req.session.user_id } });

    // Render dashboard
    res.render("dashboard", {
      company,
      ...data,
      user,
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
  let user = await db.user.findOne({ where: { role: "branchmanager" } });
  if (!user) {
    logi("User was not found in local database. Redirecting to login...");
    return res.redirect("/register");
  }
  res.render("login", { hidenav: true, errors: req.session?.errors || {} });
};

const loginPost = async (req, res) => {
  logi("Login request received");
  const { username, password } = req.body;
  logi("Password received:", password);
  try {
    const user = await db.user.findOne({ where: { username } });
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
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 25;
    const offset = (page - 1) * pageSize;

    const { count, rows: logs } = await db.inventorylogs.findAndCountAll({
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

    res.render("inventorylogs", {
      logs: processedLogs,
      searchParams: {},
      pagination,
      query: req.query,
    });
  } catch (error) {
    console.error("Error fetching inventory logs:", error);
    res.render("inventorylogs", {
      logs: [],
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

    res.render("inventorylogs", {
      logs: processedLogs,
      searchParams: req.body,
      pagination,
      query: req.query,
    });
  } catch (error) {
    console.error("Error searching inventory logs:", error);
    res.render("inventorylogs", {
      logs: [],
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

    res.render("inventorylogs", {
      logs: processedLogs,
      title: `Inventory Logs - ${processedLogs[0]?.Product?.name || "Product"}`,
      hidenav: true,
      searchParams: {},
      pagination,
      query: req.query,
    });
  } catch (error) {
    console.error("Error fetching inventory logs:", error);
    res.render("inventorylogs", {
      logs: [],
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
