const db = require("../models");
const logi = require("./logi");
const socket = require("./socket");
const socketUtils = require("./socketUtils");

let lastConnectionStatus = null;
let userRegistered = false;

async function onNetworkAvailable() {
  try {
    let connection = await handleWebSocketConnection();
    if (!userRegistered && connection.success) {
      await socketUtils.handleUserRegistration();
    }
  } catch (error) {
    logi("Error setting up web connection:", error.message);
  }
}

function checkInternetConnection() {

  const handleOnline = () => {
    if (lastConnectionStatus === false || lastConnectionStatus === null) {
      onNetworkAvailable();
    }
    lastConnectionStatus = true;
  };

  const handleOffline = () => {
    if (lastConnectionStatus === true || lastConnectionStatus === null) {
      logi("Internet connection lost");
    }
    lastConnectionStatus = false;
  };

  function checkConnection() {
      fetch("https://www.google.com", { mode: "no-cors" })
        .then(() => handleOnline())
        .catch(() => handleOffline());
  }

  // Initial check
  checkConnection();

  // Set up periodic checking
  setInterval(() => {
      checkConnection();
  }, 30000); // Check every 30 seconds
}

async function handleWebSocketConnection() {
  let connection;
  try {
    connection = await socket.connect(async(io)=>{
      await socketUtils.handleUserRegistration(io);
      socketUtils.dashboardStatsListener(io);
    });
  } catch (error) {
    logi("Error setting up WebSocket connection:", error.message);
  }
  return connection;
}

module.exports = {
  onNetworkAvailable,
  checkInternetConnection,
};
