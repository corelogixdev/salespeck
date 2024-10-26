const express = require('express');
const session = require('express-session');
const path = require('path');
const { Sequelize } = require('sequelize');
const db = require('../models'); // Sequelize models directory
const encrypt = require('../utils/encrypt'); // Sequelize models directory
const expressLayouts = require('express-ejs-layouts');
const config = require('../config.js'); // Link to the Express app


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the "node_modules" directory
app.use('/node_modules', express.static(path.join(__dirname, '..', 'node_modules')));

// Set view engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Use express-ejs-layouts
app.use(expressLayouts);
//app.set('layout', 'layout'); // Default layout

// Initialize SQLite database with Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  "storage": "./db/database.sqlite"
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

app.use(
  session({
    secret: 'your-secret',
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
app.get('/', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login')
  } else {
    res.redirect('/dashboard')
  }

});
app.get('/login', (req, res) => {
  res.render('login', { layout: false });
});
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await db.user.findOne({ where: { username } });
  if (user && encrypt.compare(user.password, password)) {
    req.session.userId = user.id;
    req.session.user_name = user.name;

    res.redirect('/dashboard');
  } else {
    res.redirect('/login');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      // You can handle the error appropriately, e.g., return an error response or redirect to a dashboard
      return res.redirect('/dashboard'); // Ensure to return here to avoid further code execution
    }

    // Clear the cookie and redirect only if session destruction is successful
    res.clearCookie('connect.sid');
    res.redirect('/login'); // Redirect to login after successful logout
  });
});
app.get('/dashboard', (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  //res.sendFile(path.join(__dirname, '../views/dashboard.html'));
  res.render('dashboard', { username: req.session.user_name });
});

// Import the product controller
const productController = require('../controllers/productController');

// Product CRUD routes
app.get('/products', productController.index);
app.get('/products/form', productController.form);
app.post('/products/save', productController.save);
app.post('/products/:id/delete', productController.delete);

// Import the product controller
const userController = require('../controllers/userController');

// User CRUD routes
app.get('/users', userController.index);
app.get('/users/form', userController.form); // Use the same form for creating and editing
app.post('/users/save', userController.save); // Handle both create and edit
app.post('/users/:id/delete', userController.delete);


app.get('/*', (req, res) => {
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Express server listening on http://localhost:'+config.port);
});
module.exports = app;
