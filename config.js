var env = process.env.NODE_ENV || 'development';
const config = {
  "development": {
    "env": "development",
    "port": 3000,
    "webUrl": "http://localhost:5000",
  },
  "production": {
    "env": "production",
    "port": 3000,
    "webUrl": "http://localhost:5000",
  }
}

module.exports = config[env];