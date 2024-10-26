const express = require('express');
const session = require('express-session');
const path = require('path');
const { Sequelize } = require('sequelize');
const db = require('../models'); // Sequelize models directory
const encrypt = require('../utils/encrypt'); // Sequelize models directory


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the "node_modules" directory
app.use('/node_modules', express.static(path.join(__dirname, '..', 'node_modules')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

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
app.get('/', (req, res) =>{
  if (!req.session.userId){
    return res.redirect('/login') 
  } else {
    res.redirect('/dashboard')
  }
  
});
app.get('/login', (req, res) => {
  res.render('login');
});
app.post('/login', async (req, res) => {
  console.log('here');
  console.log(req.body);
  const { username, password } = req.body;
  const user = await db.user.findOne({ where: { username } });
  if (user && encrypt.compare(user.password,password)) {
    console.log('here 3');
    //all user object properties are available in req.session
    req.session.userId = user.id;
    req.session.user_name = user.name;

    res.redirect('/dashboard');
  } else {
    console.log('here 2');
    //redirect back to login page with error message
    res.redirect('/login');
  }
});
app.get('/dashboard', (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  //res.sendFile(path.join(__dirname, '../views/dashboard.html'));
  res.render('dashboard', { username: req.session.user_name });
});

module.exports = app;
