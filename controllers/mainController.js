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

const dashboard = async (req, res) => {
  try {
    // Fetch company settings
    const settings = await db.softwaresetting.findOne({ where: { name: "company" } });
    const company = JSON.parse(settings?.value || "{}");

    // Define start and end of today's date
    const todayStartDate = moment().startOf("day").toDate();
    const todayEndDate = moment().endOf("day").toDate();

    // Fetch today's sales amount
    const todaysSalesAmount = (await db.soldproducts.sum("price", {
      where: { createdAt: { [Op.between]: [todayStartDate, todayEndDate] } },
    })) || 0;

    // Fetch today's and yesterday's sales
    const salesComparison = await db.sequelize.query(`
      SELECT
        (SELECT SUM(price) FROM soldproducts WHERE createdAt BETWEEN date('now', '-1 day') AND date('now', '-1 day', '+1 day')) as yesterday,
        (SELECT SUM(price) FROM soldproducts WHERE createdAt BETWEEN date('now') AND date('now', '+1 day')) as today
      `,
      { type: db.sequelize.QueryTypes.SELECT }
    );
    const { yesterday: yesterdaySales = 0, today: todaySales = 0 } = salesComparison[0];
    const salesPercentageChange = calculatePercentageChange(yesterdaySales, todaySales).toFixed(2);
    const salesArrowDirection = todaySales >= yesterdaySales ? 'up' : 'down';

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
    const customerPercentageChange = calculatePercentageChange(yesterdayCustomersCount, todayCustomersCount).toFixed(2);
    const customerArrowDirection = todayCustomersCount >= yesterdayCustomersCount ? 'up' : 'down';

    // Fetch total sales count
    const totalSalesCount = await db.sale.count();

    // Fetch top 5 sold products with sold quantities
    const topFiveSoldProductsWithSoldQuantity = await db.sequelize.query(`
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
    const salesCountByMonth = await db.sequelize.query(`
      SELECT strftime('%m', createdAt) as month, COUNT(*) as total FROM sale GROUP BY month
      `,
      { type: db.sequelize.QueryTypes.SELECT }
    );

    // Render dashboard
    res.render("dashboard", {
      company,
      todayCustomersCount,
      customerPercentageChange,
      customerArrowDirection,
      totalSalesCount,
      topFiveSoldProductsWithSoldQuantity,
      salesCountByMonth,
      todaysSalesAmount,
      salesPercentageChange,
      salesArrowDirection,
    });
  } catch (error) {
    logi("Error:", error);
    req.session.message = { type: "error", text: "An error occurred. Please try again." };
    res.redirect("/login");
  }
};

// Helper function to calculate percentage change
function calculatePercentageChange(previous=0, current) {
  if(previous === null ) previous = 0;
  if(current === null ) current = 0;
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
  const BranchManagerExists = await db.user.findOne({ where: { role: "branchmanager" } });
  if (!BranchManagerExists) {
    return res.redirect("/register");
  }  
  res.render("login", { hidenav: true ,
    errors:{
      username: req.session.message?.type === "error" ? "Invalid username or password" : "",
      password: req.session.message?.type === "error" ? "Invalid username or password" : "",
    }
  });
};

const loginPost = async (req, res) => {
  logi("Login request received");
  const { username, password } = req.body;
  logi("Username:", username);
  logi("Password received:", password);
  try {
    const user = await db.user.findOne({ where: { username } });
    if (user && encrypt.compare(user.password, password)) {
      logi("User found:", user.name);
      logi("Login successful");
      req.session.user_id = user.id;
      req.session.user = user;
      req.session.message = { type: "success", text: "Login successful!" };
      res.redirect("/dashboard");
    } else {
      logi("Login failed");
      res.render("login", {
        hidenav: true,
        errors: {
          password: "Invalid password",
        },
      });
    }
  } catch (e) {
    logi("Error:");
    logi(e);
  }
};
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.redirect("/dashboard"); // Ensure to return here to avoid further code execution
    }
    res.clearCookie("connect.sid");
    res.redirect("/login"); // Redirect to login after successful logout
  });
};

const registerget = (req, res) => {
  res.render("register", { hidenav: true, errors:{
    username: '',
  }});
};


const registerpost = async (req, res) => {
  logi("Register request received");
  logi("Data:", req.body);
  const { name, username, password } = req.body;
  // TODO: REGISTER user on the web app
  // TEST: res.redirect("/login");
  logi("Register request received");
  logi("Data:", req.body);
  try {
    const hashedPassword = encrypt.encrypt(password);
    let user = await db.user.create({ name, username, password: hashedPassword, role: "BranchManager" });
    logi("BranchManager user created successfully!");
    await db.userpermissions.create({user_id: user.id, permission_id: 777});
    logi("BranchManager user permissions set successfully");
    req.session.message = { type: "success", text: "BranchManager user created successfully!" };
    res.redirect("/login");
  } catch (e) {
    logi("Error:");
    logi(e);
    req.session.message = { type: "error", text: "An error occurred. Please try again." };
    res.redirect("/register");
  }
}
const exportDb = async (req, res) => {
  try {
    let file = config.storage;
    res.download(file);
  } catch (error) {
    logi("Error:", error);
    res.json({ error: "An error occurred. Please try again" });
  }
}

module.exports = { index, dashboard, loginGet, loginPost, logout, registerget,registerpost , exportDb };