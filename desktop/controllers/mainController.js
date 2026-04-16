const { requirePrismaClient } = require("../utils/prismaClient");
const queries = require("../prisma/queries");
const encrypt = require("../utils/encrypt");
const moment = require("moment");
const logi = require("../utils/logi");
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
    return queries.dashboard.getStats();
  } catch (error) {
    logi("Error:", error);
    return {};
  }
}
const dashboard = async (req, res) => {
  try {
    // Parallelize fetching company settings, user, and dashboard stats
    const [settings, user, data] = await Promise.all([
      queries.common.getCompanySetting(),
      queries.users.findById(req.session.user_id),
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

    await queries.users.create({
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

    const { count, rows: processedLogs } = await queries.inventory.listLogs({
      page,
      pageSize,
      dateRange,
      product,
      createdBy,
      sortBy,
      sortOrder
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

    const { count, rows: processedLogs } = await queries.inventory.listLogs({
      page,
      pageSize,
      dateRange,
      product,
      createdBy,
      sortBy: "createdAt",
      sortOrder: "desc"
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

    const { count, rows: processedLogs } = await queries.inventory.listLogs({
      page,
      pageSize,
      productId,
      sortBy: "createdAt",
      sortOrder: "desc"
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
