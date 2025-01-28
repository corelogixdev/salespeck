require('dotenv').config();
const express = require('express');
const session = require('cookie-session');
const path = require('path');
const cors = require('cors');
const logi = require('../utils/logi');
const expressLayouts = require('express-ejs-layouts');
const config = require('../config.js'); // Link to the Express app
const sessionDataMiddleware = require('../middleware/sessionData');
const routes = require('../routes');
const { permissions } = require('../middleware/populatePermissions.js');
const app = express();
const runMigrationsAndSeeders = require('../utils/runMigrationsAndSeeders.js');

// CORS Configuration
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));
// Serve static files from the "node_modules" directory
app.use('/node_modules', express.static(path.join(__dirname, '..', 'node_modules')));
// Set view engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.set('view cache', false);

// Use express-ejs-layouts
app.use(expressLayouts);
// Session middleware
app.use(
  session({
    secret: 'your-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { 
      secure: false, // Set to true if using HTTPS
      maxAge: 3600000 // 1 hour
    }
  })
);
app.use(sessionDataMiddleware);
app.use(permissions);

// API Server verification endpoint
app.get('/api/verify-server', (req, res) => {
  res.status(200).json({ status: "success", message: 'Server is running' });
});
// Routes
app.use('/', routes.mainRoutes);
app.use('/products', routes.productRoutes);
app.use('/users', routes.userRoutes);
app.use('/settings', routes.settingRoutes);
app.use('/sales', routes.saleRoutes);
app.use('/accounting', routes.accountingRoutes);

// app.get('/*', (req, res) => {
//   res.redirect('/');
// });

runMigrationsAndSeeders(); // Uncomment to run migrations and seeders

app.listen(3000, () => {
  logi('Express server listening on http://localhost:' + config.port);
});
module.exports = app;
