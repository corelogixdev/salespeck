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
    // Define start and end of today's date
    const todayStartDate = moment().startOf("day").toDate();
    const todayEndDate = moment().endOf("day").toDate();

    let todaysSalesAmount = await db.sequelize.query(
      `
        SELECT SUM(totalprice - (totalprice * discountpercentage / 100)) as total FROM sale WHERE DATE(createdAt) = DATE('now')
        `,
      { type: db.sequelize.QueryTypes.SELECT }
    );
    todaysSalesAmount = todaysSalesAmount[0]?.total || 0;
    if (todaysSalesAmount > 0) todaysSalesAmount.toFixed(2);
    // Fetch today's and yesterday's sales
    const salesComparison = await db.sequelize.query(
      `
        SELECT
          (SELECT SUM(price*quantity) FROM soldproducts WHERE createdAt BETWEEN date('now', '-1 day') AND date('now', '-1 day', '+1 day')) as yesterday,
          (SELECT SUM(price*quantity) FROM soldproducts WHERE createdAt BETWEEN date('now') AND date('now', '+1 day')) as today
        `,
      { type: db.sequelize.QueryTypes.SELECT }
    );
    const { yesterday: yesterdaySales = 0, today: todaySales = 0 } =
      salesComparison[0];
    const salesPercentageChange = calculatePercentageChange(
      yesterdaySales,
      todaySales
    ).toFixed(2);
    const salesArrowDirection = todaySales >= yesterdaySales ? "up" : "down";

    // Fetch today's customer count
    const todayCustomersCount = await db.user.count({
      where: {
        role: "customer",
        createdAt: { [Op.between]: [todayStartDate, todayEndDate] },
      },
    });

    // Fetch yesterday's customer count
    const yesterdayCustomersCount = await db.user.count({
      where: {
        role: "customer",
        createdAt: {
          [Op.between]: [
            moment().subtract(1, "day").startOf("day").toDate(),
            moment().subtract(1, "day").endOf("day").toDate(),
          ],
        },
      },
    });

    // Calculate percentage change for customers
    const customerPercentageChange = calculatePercentageChange(
      yesterdayCustomersCount,
      todayCustomersCount
    ).toFixed(2);
    const customerArrowDirection =
      todayCustomersCount >= yesterdayCustomersCount ? "up" : "down";

    // Fetch total sales count
    const totalSalesCount = await db.sale.count();

    // Fetch top 5 sold products with sold quantities
    const topFiveSoldProductsWithSoldQuantity = await db.sequelize.query(
      `
        SELECT 
          strftime('%m', s.createdAt) as month,
          p.name as product_name,
          COUNT(*) as times_added,
          SUM(s.quantity) as total_quantity
        FROM soldproducts s
        JOIN product p ON s.product = p.id
        GROUP BY month, p.name
        ORDER BY times_added DESC, total_quantity DESC
        LIMIT 5
        `,
      { type: db.sequelize.QueryTypes.SELECT }
    );

    // Fetch sales count by month
    const salesCountByMonth = await db.sequelize.query(
      `
        SELECT strftime('%m', createdAt) as month, COUNT(*) as total FROM sale GROUP BY month
        `,
      { type: db.sequelize.QueryTypes.SELECT }
    );
    return {
      todayCustomersCount,
      customerPercentageChange,
      customerArrowDirection,
      totalSalesCount,
      topFiveSoldProductsWithSoldQuantity,
      salesCountByMonth,
      todaysSalesAmount,
      salesPercentageChange,
      salesArrowDirection,
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
