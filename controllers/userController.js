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
  const data = await db.user.findAll({
    where: {
      role: role_query
    }
  });
  res.render('users/index', { title: role === 'user' ? 'Users' : 'Customers', data, role });
};

exports.form = async (req, res) => {
  const userId = req.query.id;
  const role = req.query.role || 'user'; // Default role to 'user' if not provided
  let data = null;
  if (userId) {
    data = await db.user.findByPk(userId);
    if(data.password){
      data.password = encrypt.decrypt(data.password);
    }
  }
  res.render('users/form', { title: data ? 'Edit User' : 'Create User', data, role });
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