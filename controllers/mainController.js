const db = require("../models");
const encrypt = require("../utils/encrypt");
const moment = require("moment");
const logi = require("../utils/logi");
const { Op } = require("sequelize");
const config = require("../config");


const index = (req, res) => {
  if (!req.session.user_id) {
    return res.redirect("/login");
  } else {
    res.redirect("/dashboard");
  }
};
async function getDashboardStats(){
  try {
      // Define start and end of today's date
      const todayStartDate = moment().startOf("day").toDate();
      const todayEndDate = moment().endOf("day").toDate();
  
      // Fetch today's sales amount
      const todaysSalesAmount =
        (await db.soldproducts.sum("price", {
          where: { createdAt: { [Op.between]: [todayStartDate, todayEndDate] } },
        })) || 0;
  
      // Fetch today's and yesterday's sales
      const salesComparison = await db.sequelize.query(
        `
        SELECT
          (SELECT SUM(price) FROM soldproducts WHERE createdAt BETWEEN date('now', '-1 day') AND date('now', '-1 day', '+1 day')) as yesterday,
          (SELECT SUM(price) FROM soldproducts WHERE createdAt BETWEEN date('now') AND date('now', '+1 day')) as today
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
          SUM(s.quantity) as total_quantity
        FROM soldproducts s
        JOIN product p ON s.product = p.id
        GROUP BY month, p.name
        ORDER BY total_quantity DESC
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
    }
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

    console.log(data);
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
  const { email, password } = req.body;
  logi("Password received:", password);
  try {
    const user = await db.user.findOne({ where: { email } });
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
          email: "User not found. Please register.",
        };
      } else {
        logi("Password incorrect. Redirecting to login...");
        req.session.errors = {
          email: "",
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

async function registerOnWeb(data) {
  let account_key = Math.random().toString(36).substring(2, 15); 
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      account_key: account_key,
    }),
  };

  // Fetch call
  let req = await fetch(config.webUrl + "/api/register", options);
  let res = await req.json();
  return res;
}


const registerpost = async (req, res) => {
  logi("Register request received");
  logi("Data:", req.body);

  try {
    logi("Creating user in local database...");
    const hashedPassword = encrypt.encrypt(req.body.password);
    let user = await db.user.create({
      ...req.body,
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      password: hashedPassword,
      role: "branchmanager",
    });
    logi("BranchManager user created successfully!");
    await db.userpermissions.create({ user_id: user.id, permission_id: 777 });
    logi("BranchManager user permissions set successfully");
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
    if(file){
      res.download(file);
    }
  } catch (error) {
    logi("Error:", error);
    res.json({ error: "An error occurred. Please try again" });
  }
};

const inventorylogs = async (req, res) => {
  try {
    let logs = await db.inventorylogs.findAll({
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
    });

    if (!logs) logs = [];
    logs = logs.map((log) => {
      const plainLog = log.get({ plain: true });
      return {
        ...plainLog,
        Product: plainLog.Product || { name: "Unknown Product" },
        User: plainLog.User || { firstname: "Unknown User", lastname: "" },
      };
    });

    res.render("inventorylogs", {
      logs,
      searchParams: {},
    });
  } catch (error) {
    console.error("Error fetching inventory logs:", error);
    req.session.message = {
      type: "error",
      text: "An error occurred while fetching inventory logs.",
      searchParams: {},
    };
    res.redirect("/dashboard");
  }
};

const searchInventoryLogs = async (req, res) => {
  try {
    const { dateRange, product, createdBy } = req.body;

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
        attributes: ["id", "name"],
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
      includeOptions[1].where.name = { [Op.like]: `%${createdBy}%` };
    }

    let logs = await db.inventorylogs.findAll({
      where: whereClause,
      include: includeOptions,
      order: [["createdAt", "DESC"]],
    });

    if (!logs) logs = [];
    logs = logs.map((log) => {
      const plainLog = log.get({ plain: true });
      return {
        ...plainLog,
        Product: plainLog.Product || { name: "Unknown Product" },
        User: plainLog.User || { name: "Unknown User" },
      };
    });

    res.render("inventorylogs", {
      logs,
      searchParams: req.body,
    });
  } catch (error) {
    console.error("Error searching inventory logs:", error);
    req.session.message = {
      type: "error",
      text: "An error occurred while searching inventory logs.",
    };
    res.redirect("/inventorylogs");
  }
};

const inventorylogsById = async (req, res) => {
  try {
    const productId = req.params.id;
    let logs = await db.inventorylogs.findAll({
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
          attributes: ["id", "firstname" , "lastname"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (!logs) {
      logs = [];
    }

    // Add error handling for missing associations
    logs = logs.map((log) => {
      const plainLog = log.get({ plain: true });
      return {
        ...plainLog,
        Product: plainLog.Product || { name: "Unknown Product" },
        User: plainLog.User || { name: "Unknown User" },
      };
    });

    res.render("inventorylogs", {
      logs,
      title: `Inventory Logs - ${logs[0]?.Product?.name || "Product"}`,
      hidenav: true,
      searchParams: {},
    });
  } catch (error) {
    console.error("Error fetching inventory logs:", error);
    req.session.message = {
      type: "error",
      text: "An error occurred while fetching inventory logs.",
    };
    res.redirect("/dashboard");
  }
};

const switchServer = async (req, res) => {
    res.render('switch-server', {
        title: 'Switch Server',
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
  registerOnWeb,
  getDashboardStats
};
