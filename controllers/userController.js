const { Op } = require('sequelize');
const db = require('../models');
const encrypt = require('../utils/encrypt');
const { getPagination, getPagingData } = require('../utils/pagination');

const PER_PAGE = 10;

exports.index = async (req, res) => {
  // Support multiple roles: user, customer, vendor
  const role = req.query.role || 'user';
  let searchdata = req.query.search || '';
  searchdata = searchdata.trim();
  
  const page = parseInt(req.query.page) || 1;
  const { limit, offset } = getPagination(page, PER_PAGE);
  
  const whereClause = {
    role: role,
    [Op.or]: [
      { username: { [Op.like]: `%${searchdata}%` } },
      { phone: { [Op.like]: `%${searchdata}%` } },
      { firstname: { [Op.like]: `%${searchdata}%` } },
      { lastname: { [Op.like]: `%${searchdata}%` } }
    ]
  };
  
  const { count, rows: data } = await db.user.findAndCountAll({
    where: whereClause,
    limit,
    offset
  });
  
  const pagination = getPagingData(count, page, limit);
  
  let title = 'Users';
  switch(role) {
    case 'customer':
      title = 'Customers';
      break;
    case 'vendor':
      title = 'Vendors';
      break;
  }
  
  res.render('users/index', { 
    title, 
    data, 
    role, 
    searchdata,
    pagination
  });
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
  
  let formTitle = data ? 'Edit User' : 'Create User';
  if (role === 'customer') {
    formTitle = data ? 'Edit Customer' : 'Create Customer';
  } else if (role === 'vendor') {
    formTitle = data ? 'Edit Vendor' : 'Create Vendor';
  }
  
  res.render('users/form', { title: formTitle, data, role, groupedPermissions: {} });
};

exports.save = async (req, res) => {
  var { id, firstname, lastname, email, phone, username, role, password, address } = req.body;
  var password = password;
  var createdby = req.session.user.id;
  
  // Set the source based on application
  const source = 'desktop';
  
  if (password) {
    password = encrypt.encrypt(password);
  }
  try {
    // check if email is duplicate
    let user = await db.user.findOne({ where: { email } });
    if(user && user.id != id) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }
    
    const userData = { 
      firstname, 
      lastname, 
      email, 
      phone, 
      username, 
      role, 
      password, 
      address, 
      createdby,
      source 
    };
    
    if (id) {
      await db.user.update(userData, { where: { id } });
    } else {
      await db.user.create(userData);
    }
    
    res.json({ success: true, message: `${role.charAt(0).toUpperCase() + role.slice(1)} saved successfully`});
  } catch (error) {
    console.error("Save error:", error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.delete = async (req, res) => {
  try {
    const user = await db.user.findByPk(req.params.id);
    var role = user.role;
    if(role==='branchmanager'){
      role = "user";
    }
    await db.user.destroy({ where: { id: req.params.id } });
    res.send({ success: true, message: `${role.charAt(0).toUpperCase() + role.slice(1)} deleted successfully`, redirect: '/users?role='+role });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.getCustomers = async (req, res) => {
  const data = await db.user.findAll({
    where: {
      role: 'customer'
    }
  });
  res.json(data);
};

exports.getVendors = async (req, res) => {
  const data = await db.user.findAll({
    where: {
      role: 'vendor'
    }
  });
  res.json(data);
};

exports.searchVendors = async (req, res) => {
  try {
    let { search } = req.query;
    search = search ? search.trim() : '';
    const vendors = await db.user.findAll({
      where: {
        role: 'vendor',
        [Op.or]: [
          { firstname: { [Op.like]: `%${search}%` } },
          { lastname: { [Op.like]: `%${search}%` } },
        ]
      },
      limit: 10
    });
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};