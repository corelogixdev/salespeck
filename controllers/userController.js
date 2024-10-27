const { Op } = require('sequelize');
const db = require('../models');
const encrypt = require('../utils/encrypt');

const PER_PAGE = 100;
function getPageRange(currentPage, totalPages) {
  let startPage, endPage;
  if (totalPages <= 3) {
      startPage = 1;
      endPage = totalPages;
  } else {
      if (currentPage === 1) {
          startPage = 1;
          endPage = 3;
      } else if (currentPage === totalPages) {
          startPage = totalPages - 2;
          endPage = totalPages;
      } else {
          startPage = currentPage - 1;
          endPage = currentPage + 1;
      }
  }
  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
}

exports.index = async (req, res) => {
  const role = req.query.role || 'user'; // Default role to 'user' if not provided
  let searchdata = req.query.search || '';
  searchdata = searchdata.trim();
  let page = req.query.page || 1;
  var role_query = {
    [Op.or]: ['user', 'admin']
  }
  if (role === 'customer') {
    role_query = role
  }
  const data = await db.user.findAll({
    where: {
      role: role_query,
      [Op.or]: [
        { username: { [Op.like]: `%${searchdata}%` } },
        { phone: { [Op.like]: `%${searchdata}%` } },
        { name: { [Op.like]: `%${searchdata}%` } }
      ]
    },
    limit: PER_PAGE,
    offset: (page - 1) * PER_PAGE,
  });
  let total = await db.user.count({
    where: {
      role: role_query,
      [Op.or]: [
        { username: { [Op.like]: `%${searchdata}%` } },
        { phone: { [Op.like]: `%${searchdata}%` } },
        { name: { [Op.like]: `%${searchdata}%` } }
      ]
    }
  });
  let paginator = {
    page: page * 1, // Convert string to number
    per_page: PER_PAGE,
    total: total,
    start: (page - 1) * PER_PAGE + 1,
    end: Math.min(page * PER_PAGE, total),
    total_pages: Math.ceil(total / PER_PAGE),
    page_range: getPageRange(page * 1, Math.ceil(total / PER_PAGE))
  }
  res.render('users/index', { title: role === 'user' ? 'Users' : 'Customers', data, role, searchdata, paginator });
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
  var { id, name, phone, username, role,password,address } = req.body;
  var password = password;
  if (password) {
    password = encrypt.encrypt(password);
  }
  try {
    if (id) {

      await db.user.update({ name, phone, username, role,password,address }, { where: { id } });
    } else {
      await db.user.create({ name, phone, username, role, password,address });
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