const express = require('express');
const session = require('express-session');
const path = require('path');
const { Sequelize } = require('sequelize');
const db = require('../models'); // Sequelize models directory
const encrypt = require('../utils/encrypt'); // Sequelize models directory
const expressLayouts = require('express-ejs-layouts');
const config = require('../config.js'); // Link to the Express app
const sessionDataMiddleware = require('../middleware/sessionData');
const isAuthenticated = require('../middleware/isAuthenticated');


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




app.use(
  session({
    secret: 'your-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
  })
);
app.use(sessionDataMiddleware);
// Routes
app.get('/', (req, res) => {
  if (!req.session.user_id) {
    return res.redirect('/login')
  } else {
    res.redirect('/dashboard')
  }
});

// Initialize SQLite database with Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  "storage": "./db/database.sqlite"
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

app.get('/login', (req, res) => {
  res.render('login', { layout: false });
});
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await db.user.findOne({ where: { username } });
;  if (user && encrypt.compare(user.password, password)) {
    req.session.user_id = user.id;
    req.session.user = user;
    req.session.message = { type: 'success', text: 'Login successful!' };
    res.redirect('/dashboard');
  } else {
    req.session.message = { type: 'error', text: 'Invalid username or password.' };
    res.redirect('/login');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      // You can handle the error appropriately, e.g., return an error response or redirect to a dashboard
      res.redirect('/dashboard'); // Ensure to return here to avoid further code execution
    }

    // Clear the cookie and redirect only if session destruction is successful
    //req.session.message = { type: 'success', text: 'Logout successful!' };
    res.clearCookie('connect.sid');
    res.redirect('/login'); // Redirect to login after successful logout
  });
});

app.get('/dashboard',isAuthenticated, (req, res) => {
  res.render('dashboard');
});

// Import the product controller
const productController = require('../controllers/productController');

// Product CRUD routes
app.get('/products',isAuthenticated, productController.index);
app.get('/products/form',isAuthenticated, productController.form);
app.post('/products/save',isAuthenticated, productController.save);
app.post('/products/:id/delete',isAuthenticated, productController.delete);

// Import the product controller
const userController = require('../controllers/userController');

// User CRUD routes
app.get('/users',isAuthenticated, userController.index);
app.get('/users/form',isAuthenticated, userController.form); // Use the same form for creating and editing
app.post('/users/save',isAuthenticated, userController.save); // Handle both create and edit
app.post('/users/:id/delete',isAuthenticated, userController.delete);


// app.get('/*', (req, res) => {
//   res.redirect('/');
// });

app.listen(3000, () => {
  console.log('Express server listening on http://localhost:'+config.port);
});
module.exports = app;
