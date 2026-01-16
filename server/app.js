require('dotenv').config();
const express = require('express');
const session = require('cookie-session');
const path = require('path');
const cors = require('cors');
const logi = require('../utils/logi');
const expressLayouts = require('express-ejs-layouts');
const config = require('../installEnv.js'); // Link to the Express app
const sessionDataMiddleware = require('../middleware/sessionData');
const routes = require('../routes');
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
// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
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

// Add these route imports
const brandRoutes = require('../routes/brandRoutes');
const categoryRoutes = require('../routes/categoryRoutes');

// API Server verification endpoint
app.get('/api/verify-server', (req, res) => {
  res.status(200).json({ status: "success", message: 'Server is running' });
});

// Add a new endpoint to trigger demo data seeding
app.get('/api/seed-demo-data', async (req, res) => {
  try {
    await seedDemoData();
    res.status(200).json({ status: "success", message: 'Demo data seeded successfully' });
  } catch (error) {
    console.error('Error seeding demo data:', error);
    res.status(500).json({ status: "error", message: 'Failed to seed demo data' });
  }
});

// Routes
app.use('/', routes.mainRoutes);
app.use('/products', routes.productRoutes);
app.use('/users', routes.userRoutes);
app.use('/settings', routes.settingRoutes);
app.use('/sales', routes.saleRoutes);
app.use('/accounting', routes.accountingRoutes);

// Add these routes
app.use('/brands', brandRoutes);
app.use('/categories', categoryRoutes);
app.use('/', require('../routes/profile')); // Profile routes

// app.get('/*', (req, res) => {
//   res.redirect('/');
// });

runMigrationsAndSeeders(); // Uncomment to run migrations and seeders
app.listen(config.port, () => {
  logi('Express server listening on http://localhost:' + config.port);
});

module.exports = app;
