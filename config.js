var env = process.env.NODE_ENV || 'development';
const config = {
  "development": {
    "env": "development",
    "port": 3000,
    "webUrl": "http://localhost:5000",
    "webSocketUrl": "ws://localhost:5000",
  },
  "production": {
    "env": "production",
    "port": 3000,
    "webUrl": "https://openmenu.live",
    "webSocketUrl": "wss://openmenu.live",
  }
}

module.exports = config[env];