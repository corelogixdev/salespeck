const { Op } = require('sequelize');
const db = require('../models');
const encrypt = require('../utils/encrypt');
const { getPagination, getPagingData } = require('../utils/pagination');

const PER_PAGE = 10;

exports.index = async (req, res) => {
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
  
  res.render('users/index', { 
    title: role === 'user' ? 'Users' : 'Customers', 
    data, 
    role, 
    searchdata,
    pagination
  });
};

exports.form = async (req, res) => {
  let permissions = await db.permissions.findAll();
  permissions = permissions.filter(permission => permission.name !== 'all' && !permission.name.includes('settings'));
  let currentUserPermissions = [];
  if(req.query.id){
    currentUserPermissions = await db.userpermissions.findAll({
      where: { user_id: req.query.id }
    });
  }
  const groupedPermissions = permissions.reduce((acc, perm) => {
    let currentUserHasPermission = currentUserPermissions.some(up => up.permission_id === perm.id)
    if (currentUserHasPermission) {
      perm.checked = true;
    }
    const [prefix, action] = perm.name.split(".");
    if (!acc[prefix]) {
      acc[prefix] = [];
    }
    if (action) {
      acc[prefix].push({ id: perm.id, action, description: perm.description, checked: perm.checked });
    } else {
      acc[prefix].push({ id: perm.id, action: null, description: perm.description, checked: perm.checked });
    }
    return acc;
  }, {});

  const userId = req.query.id;
  const role = req.query.role || 'user'; // Default role to 'user' if not provided
  let data = null;
  if (userId) {
    data = await db.user.findByPk(userId);
    if(data.password){
      data.password = encrypt.decrypt(data.password);
    }
  }
  res.render('users/form', { title: data ? 'Edit User' : 'Create User', data, role , groupedPermissions});
};

exports.save = async (req, res) => {
  var { id, firstname,lastname, email,  phone, username, role,password,address, permissions } = req.body;
  let allPermissions = await db.permissions.findAll();
  var password = password;
  var createdby = req.session.user.id;
  if (password) {
    password = encrypt.encrypt(password);
  }
  try {
    // check if username is duplicate
    let user = await db.user.findOne({ where: { email } });
    if(user && user.id != id) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }
    if (id) {
      await db.user.update({ firstname,lastname, email, phone, username, role, password, address, createdby}, { where: { id } });
    } else {
      let res = await db.user.create({ firstname,lastname, email, phone, username, role, password, address, createdby});
      id = res.id;
    }
    if(role == 'user'){
      await db.userpermissions.destroy({ where: { user_id: id } });
      Object.keys(permissions).forEach(async permission => {
        let permissionId = allPermissions.find(p => p.name === permission).id;
        await db.userpermissions.create({ user_id: id, permission_id: permissionId });
      });
    }
    res.json({ success: true, message: 'User saved successfully'});
  } catch (error) {
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
    res.send({ success: true, message: 'User deleted successfully', redirect: '/users?role='+role });
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
}