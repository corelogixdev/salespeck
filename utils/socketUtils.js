const logi = require("./logi");
const mainController = require("../controllers/mainController");
const db = require("../models");

function dashboardStatsListener(io) {
  try {
    io.on("data_dy", async (data) => {
      let d = await mainController.getDashboardStats();
      io.emit("yele", JSON.stringify(d));
    });
  } catch (e) {
    logi("Error getting dashboard stats:", e.message);
  }
}

async function handleUserRegistration(io) {
  try {
    const existingUser = await db.user.findOne({
      where: { role: "branchmanager" },
    });

    if (existingUser && io) {
      const userData = existingUser.get({ plain: true });
      const account_key = Math.floor(Math.random() * 1000000000);
      io.emit("register-branch", {...userData, account_key});
      io.on("register-branch-response", async (data) => {
        existingUser.account_key = data.user.account_key;
        await existingUser.save();
        logi("Data after registeration is: ", JSON.stringify(data));
      });
    } else {
      logi(
        "Branch manager not found in local database or socket not connected"
      );
    }
  } catch (err) {
    logi("Error in branch registration:", err.message);
  }
}
module.exports = {
  dashboardStatsListener,
  handleUserRegistration
};
