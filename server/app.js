require('dotenv').config();
const express = require('express');
const session = require('cookie-session');
const path = require('path');
const logi = require('../utils/logi');
const expressLayouts = require('express-ejs-layouts');
const config = require('../config.js'); // Link to the Express app
const sessionDataMiddleware = require('../middleware/sessionData');
const productRoutes = require('../routes/productRoutes');
const userRoutes = require('../routes/userRoutes');
const settingRoutes = require('../routes/settingRoutes');
const mainRoutes = require('../routes/mainRoutes');
const saleRoutes = require('../routes/saleRoutes');
const { permissions } = require('../middleware/populatePermissions.js');
const app = express();
const runMigrationsAndSeeders = require('../utils/runMigrationsAndSeeders.js');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));
// Serve static files from the "node_modules" directory
app.use('/node_modules', express.static(path.join(__dirname, '..', 'node_modules')));
// Set view engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
// Use express-ejs-layouts
app.use(expressLayouts);
// Session middleware
app.use(
  session({
    secret: 'your-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
  })
);
app.use(sessionDataMiddleware);
app.use(permissions);

// Routes

app.use('/', mainRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/settings', settingRoutes);
app.use('/sales', saleRoutes);

// app.get('/*', (req, res) => {
//   res.redirect('/');
// });

runMigrationsAndSeeders(); // Uncomment to run migrations and seeders

app.listen(3000, () => {
  logi('Express server listening on http://localhost:' + config.port);
});
module.exports = app;
