const { Op } = require('sequelize');
const db = require('../models');
const encrypt = require('../utils/encrypt');

exports.index = async (req, res) => {
  const role = req.query.role || 'user'; // Default role to 'user' if not provided
  var role_query = {
    [Op.or]: ['user', 'admin']
  }
  if (role === 'customer') {
    role_query = role

  }
  const users = await db.user.findAll({
    where: {
      role: role_query
    }
  });
  res.render('users/index', { title: role === 'user' ? 'Users' : 'Customers', users, role });
};

exports.form = async (req, res) => {
  const userId = req.query.id;
  const role = req.query.role || 'user'; // Default role to 'user' if not provided
  let user = null;
  if (userId) {
    user = await db.user.findByPk(userId);
    if(user.password){
      user.password = encrypt.decrypt(user.password);
    }
  }
  res.render('users/form', { title: user ? 'Edit User' : 'Create User', user, role });
};

exports.save = async (req, res) => {
  var { id, name, phone, username, role,password } = req.body;
  var password = password;
  if (password) {
    password = encrypt.encrypt(password);
  }
  try {
    if (id) {
      
      await db.user.update({ name, phone, username, role,password }, { where: { id } });
    } else {
      await db.user.create({ name, phone, username, role });
    }
    res.json({ success: true, redirectUrl: `/users?role=${role}` });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.delete = async (req, res) => {
  const user = await db.user.findByPk(req.params.id);
  var role = user.role;
  if(role==='admin'){
     role = "user";
  }
  await db.user.destroy({ where: { id: req.params.id } });
  res.redirect(`/users?role=${role}`);
};