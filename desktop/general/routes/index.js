const fs = require("fs");
const path = require("path");

const routes = {};

fs.readdirSync(__dirname)
  .filter((file) => file.endsWith(".js") && file !== "index.js")
  .forEach((file) => {
    const routeName = path.basename(file, ".js"); // Get the filename without extension
    routes[routeName] = require(path.join(__dirname, file)); // Import the route file
  });

module.exports = routes;
