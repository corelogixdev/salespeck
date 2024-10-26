const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const path = require('path');
const { Sequelize } = require('sequelize');
const db = require('../models'); // Sequelize models

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize SQLite database with Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  "storage": "./db/database.sqlite"
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Initialize session
app.use(
  session({
    secret: 'your-secret',
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
app.get('/', (req, res) =>{
  if (!req.session.userId) return res.redirect('/login');
});
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, '../views/login.html')));
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await db.User.findOne({ where: { username } });

  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.userId = user.id;
    res.redirect('/dashboard');
  } else {
    //redirect back to login page with error message
    res.redirect('/login');
  }
});
app.get('/dashboard', (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  res.sendFile(path.join(__dirname, '../views/dashboard.html'));
});

module.exports = app;
