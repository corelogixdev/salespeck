const queries = require('../prisma/queries');
const encrypt = require('../utils/encrypt');
const { getPaginationMeta, buildSortClause } = require('../utils/paginationHelper');
const moment = require("moment");

exports.index = async (req, res) => {
  try {
    const query = req.query;
    const role = query.role || 'user';
    let { filter, daterange } = query;

    // Handle 'today' filter shortcut
    if (filter === 'today') {
        const today = moment().format('YYYY-MM-DD');
        daterange = `${today} to ${today}`;
        // Update query object so it reflects in the view
        query.daterange = daterange;
    }

    // Pagination
    const page = parseInt(query.page) || 1;
    const pageSize = parseInt(query.pageSize) || 10;

    // Filters
    const sortBy = query.sortBy || 'id';
    const sortOrder = query.sortOrder || 'desc';
    const { count, rows: data } = await queries.users.list({
      role,
      page,
      pageSize,
      search: query.search?.trim(),
      daterange,
      sortBy,
      sortOrder
    });

    const pagination = getPaginationMeta(page, pageSize, count);

    let title = 'Users';
    switch (role) {
      case 'customer':
        title = 'Customers';
        break;
      case 'vendor':
        title = 'Vendors';
        break;
    }

    if (query.partial) {
      return res.render('users/_table_rows', {
        layout: false,
        data,
        role
      });
    }

    res.render('users/index', {
      title,
      data,
      role,
      pagination,
      query,
      sortBy,
      sortOrder
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    req.session.message = {
      type: "error",
      text: "An error occurred while fetching users."
    };
    res.redirect("/dashboard");
  }
};

exports.form = async (req, res) => {
  const userId = req.query.id;
  const role = req.query.role || 'user'; // Default role to 'user' if not provided
  let data = null;
  if (userId) {
    data = await queries.users.findById(userId);
    if (data.password) {
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

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await queries.users.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const data = { ...user };
    if (data.password) {
      data.password = encrypt.decrypt(data.password);
    }
    res.json({ success: true, user: data });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
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
    let user = await queries.users.findByEmail(email);
    if (user && user.id != id) {
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
      await queries.users.update(id, userData);
    } else {
      await queries.users.create(userData);
    }

    res.json({ success: true, message: `${role.charAt(0).toUpperCase() + role.slice(1)} saved successfully` });
  } catch (error) {
    console.error("Save error:", error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.delete = async (req, res) => {
  try {
    const user = await queries.users.findById(req.params.id);
    var role = user.role;
    if (role === 'branchmanager') {
      role = "user";
    }
    await queries.users.remove(req.params.id);
    res.send({ success: true, message: `${role.charAt(0).toUpperCase() + role.slice(1)} deleted successfully`, redirect: '/users?role=' + role });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.getCustomers = async (req, res) => {
  const data = await queries.users.listByRole('customer');
  res.json(data);
};

exports.getVendors = async (req, res) => {
  const data = await queries.users.listByRole('vendor');
  res.json(data);
};

exports.searchVendors = async (req, res) => {
  try {
    let { search } = req.query;
    search = search ? search.trim() : '';
    const vendors = await queries.users.searchByRole('vendor', search, 10);
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};