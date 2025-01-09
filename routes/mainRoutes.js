const router = require("express").Router();
const db = require("../models");
const isAuthenticated = require("../middleware/isAuthenticated");
const encrypt = require("../utils/encrypt");
const logi = require("../utils/logi");

router.get("/", (req, res) => {
  if (!req.session.user_id) {
    return res.redirect("/login");
  } else {
    res.redirect("/dashboard");
  }
});

router.get("/dashboard", isAuthenticated, async (req, res) => {
  let settings = await db.softwaresetting.findOne({
    where: {
      name: "company",
    },
  });
  let company = JSON.parse(settings.value);
  res.render("dashboard", { company });
});

router.get("/login", (req, res) => {
  res.render("login", { layout: false });
});

router.post("/login", async (req, res) => {
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
});

router.get("/logout", (req, res) => {
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
});

module.exports = router;
