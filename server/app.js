const express = require('express');
const session = require('express-session');
const path = require('path');
const { Umzug, SequelizeStorage } = require('umzug');
const db = require('../models'); // Sequelize models directory
const encrypt = require('../utils/encrypt'); // Sequelize models directory
const logi = require('../utils/logi');
const expressLayouts = require('express-ejs-layouts');
const config = require('../config.js'); // Link to the Express app
const sessionDataMiddleware = require('../middleware/sessionData');
const isAuthenticated = require('../middleware/isAuthenticated');


const app = express();
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
var fs = require('fs');
async function runMigrationsAndSeeders() {
  // Read the migrations directory
  const migrationsDir = path.join(__dirname, '../migrations');
  fs.readdir(migrationsDir, (err, files) => {
    if (err) {
      console.error("Error reading migration directory:", err);
      return;
    }

    // Filter for .js files
    const migrationFiles = files.filter(file => file.endsWith('.js')).map(file => path.join(migrationsDir, file));
    console.log('Migration files:', migrationFiles); // Log the migration files

    const migrationUmzug = new Umzug({
      migrations: migrationFiles.map(file => ({
        name: path.basename(file),
        up: (queryInterface, Sequelize) => require(file).up(queryInterface, Sequelize), // Use the up method from the migration file
        down: (queryInterface, Sequelize) => require(file).down(queryInterface, Sequelize) // Use the down method from the migration file
      })),
      storage: new SequelizeStorage({ sequelize: db.sequelize }),
      context: db.sequelize.getQueryInterface(),
    });

    // Run migrations and log them
    migrationUmzug.up().then(migrations => {
      logi("Migrations completed:", migrations);
    }).catch(error => {
      console.error("Error running migrations:", error);
    });
  });
}
(async () => {


try {
  await db.sequelize.authenticate();
  console.log("Connection to the database has been established successfully.");
  await runMigrationsAndSeeders();
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
})();

app.get('/login', (req, res) => {
  res.render('login', { layout: false });
});
app.post('/login', async (req, res) => {
  logi('Login request received');
  const { username, password } = req.body;
  logi('Username:', username);
  logi('Password received:', password);
  try {
    const user = await db.user.findOne({ where: { username } });
    logi('User found:', user.name);
    if (user && encrypt.compare(user.password, password)) {
      logi('Login successful');
      req.session.user_id = user.id;
      req.session.user = user;
      req.session.message = { type: 'success', text: 'Login successful!' };
      res.redirect('/dashboard');
    } else {
      logi('Login failed');
      req.session.message = { type: 'error', text: 'Invalid username or password.' };
      res.redirect('/login');
    }
  } catch (e) {
    logi('Error:');
    logi(e)
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

app.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard');
});

// Import the product controller
const productController = require('../controllers/productController');

// Product CRUD routes
app.get('/products', isAuthenticated, productController.index);
app.get('/products/form', isAuthenticated, productController.form);
app.post('/products/save', isAuthenticated, productController.save);
app.post('/products/:id/delete', isAuthenticated, productController.delete);

// Import the product controller
const userController = require('../controllers/userController');

// User CRUD routes
app.get('/users', isAuthenticated, userController.index);
app.get('/users/form', isAuthenticated, userController.form); // Use the same form for creating and editing
app.post('/users/save', isAuthenticated, userController.save); // Handle both create and edit
app.post('/users/:id/delete', isAuthenticated, userController.delete);


// app.get('/*', (req, res) => {
//   res.redirect('/');
// });

app.listen(3000, () => {
  logi('Express server listening on http://localhost:' + config.port);
});
module.exports = app;
