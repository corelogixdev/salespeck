const db = require("../models");
const encrypt = require("../utils/encrypt");
const moment = require("moment");
const logi = require("../utils/logi");
const { Op } = require("sequelize");

const index = (req, res) => {
  if (!req.session.user_id) {
    return res.redirect("/login");
  } else {
    res.redirect("/dashboard");
  }
};

const dashboard = async (req, res) => {
  let settings = await db.softwaresetting.findOne({
    where: {
      name: "company",
    },
  });
  let company = JSON.parse(settings.value);
  // get today's date with time set to 00:00:00
  const todayStartDate = moment().startOf("day").toDate();
  const todayEndDate = moment().endOf("day").toDate();

  const todaySalesCount = await db.soldproducts.count({
    where: {
      createdAt: {
        [Op.between]: [todayStartDate, todayEndDate],
      },
    },
  });
  const todayCustomersCount = await db.user.count({
    where: {
      role: "customer",
      createdAt: {
        [Op.between]: [todayStartDate, todayEndDate],
      },
    },
  });
  const totalSalesCount = await db.sale.count();
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
  const salesCountByMonth = await db.sequelize.query(
    `SELECT strftime('%m', createdAt) as month, COUNT(*) as total FROM sale GROUP BY month`,
    { type: db.sequelize.QueryTypes.SELECT }
  );

  res.render("dashboard", { company, todaySalesCount, todayCustomersCount, totalSalesCount, topFiveSoldProductsWithSoldQuantity, salesCountByMonth });
};

const loginGet = (req, res) => {
  res.render("login", { layout: false });
};

const loginPost = async (req, res) => {
  logi("Login request received");
  const { username, password } = req.body;
  logi("Username:", username);
  logi("Password received:", password);
  try {
    const user = await db.user.findOne({ where: { username } });
    logi("User found:", user.name);
    if (user && encrypt.compare(user.password, password)) {
      logi("Login successful");
      req.session.user_id = user.id;
      req.session.user = user;
      req.session.message = { type: "success", text: "Login successful!" };
      res.redirect("/dashboard");
    } else {
      logi("Login failed");
      req.session.message = {
        type: "error",
        text: "Invalid username or password.",
      };
      res.redirect("/login");
    }
  } catch (e) {
    logi("Error:");
    logi(e);
  }
};
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      // You can handle the error appropriately, e.g., return an error response or redirect to a dashboard
      res.redirect("/dashboard"); // Ensure to return here to avoid further code execution
    }

    // Clear the cookie and redirect only if session destruction is successful
    //req.session.message = { type: 'success', text: 'Logout successful!' };
    res.clearCookie("connect.sid");
    res.redirect("/login"); // Redirect to login after successful logout
  });
};

module.exports = { index, dashboard, loginGet, loginPost, logout };
