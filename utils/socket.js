const io = require("socket.io-client");
const config = require("../config");
const logi = require("./logi");
const db = require("../models");
const socketUtils = require("./socketUtils");
let socketInstance = null;
let isConnected = false;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;
const INITIAL_RECONNECT_DELAY = 1000;

// Add event logging wrapper
function wrapSocketWithLogging(socket) {
  const originalEmit = socket.emit;
  const originalOn = socket.on;

  // Wrap emit to log outgoing events
  socket.emit = function (eventName, ...args) {
    logi(`Socket Emit: ${eventName}`, args[0] || "");
    return originalEmit.apply(this, [eventName, ...args]);
  };

  // Wrap on to log incoming events
  socket.on = function (eventName, callback) {
    const wrappedCallback = (...args) => {
      logi(`Socket Received: ${eventName}`, args[0] || "");
      return callback.apply(this, args);
    };
    return originalOn.call(this, eventName, wrappedCallback);
  };

  return socket;
}

function getReconnectDelay() {
  // Exponential backoff with max of 10 seconds
  return Math.min(INITIAL_RECONNECT_DELAY * Math.pow(2, reconnectAttempts), 10000);
}

function connect(onConnect=null) {
  return new Promise((resolve, reject) => {
    if (!socketInstance) {
      socketInstance = wrapSocketWithLogging(
        io(config.webSocketUrl, {
          reconnection: true,
          reconnectionDelay: getReconnectDelay(),
          reconnectionDelayMax: 10000,
          reconnectionAttempts: MAX_RECONNECT_ATTEMPTS,
          timeout: 5000,
          transports: ['websocket', 'polling'],
          forceNew: false,
          autoConnect: true
        })
      );

      socketInstance.on("reconnecting", (attemptNumber) => {
        reconnectAttempts = attemptNumber;
        logi(`Socket reconnection attempt ${attemptNumber} after ${getReconnectDelay()}ms`);
      });

      socketInstance.on("reconnect", (attemptNumber) => {
        reconnectAttempts = 0;
        logi(`Socket reconnected after ${attemptNumber} attempts`);
      });

      socketInstance.on("connect", async () => {
        isConnected = true;
        reconnectAttempts = 0;
        await onConnect?.(socketInstance);
        logi(`Socket connected successfully using ${socketInstance.io.engine.transport.name}`);
        resolve({ success: true });
      });

      socketInstance.on("disconnect", (reason) => {
        isConnected = false;
        logi(`Socket disconnected: ${reason}`);
        if (reason === 'io server disconnect') {
          // Server initiated disconnect, try reconnecting
          socketInstance.connect();
        }
        resolve({ success: false, message: `Socket disconnected: ${reason}` });
      });

      socketInstance.on("connect_error", (error) => {
        isConnected = false;
        logi("Socket connection error:", error.message);
        if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
          logi("Maximum reconnection attempts reached, falling back to polling");
          socketInstance.io.opts.transports = ['polling', 'websocket'];
        }
        resolve({ success: false, message: error.message });
      });
    } else if (!isConnected) {
      socketInstance.connect();
      resolve({ success: true, message: "Reconnecting existing socket" });
    } else {
      resolve({ success: true });
    }
  });
}

function disconnect() {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
    isConnected = false;
  }
}

module.exports = {
  connect,
  disconnect,
  get isConnected() {
    return isConnected;
  },
  get io() {
    return socketInstance;
  },
};
