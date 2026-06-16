const queries = require('../prisma/queries');
const encrypt = require('../utils/encrypt');
const { getPaginationMeta, buildSortClause } = require('../utils/paginationHelper');
const moment = require("moment");
const accountingController = require('./accountingController');
const { requirePrismaClient } = require('../utils/prismaClient');
const { generateId } = require('../utils/idGenerator');

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

    const prisma = requirePrismaClient();
    let totalBalance = 0;

    // Calculate balances for customers and vendors
    if (role === 'customer' || role === 'vendor') {
        // 1. Calculate individual balances for the current page
        for (let user of data) {
            if (user.fk_financeaccount_id) {
                const account = await prisma.financeaccount.findUnique({
                    where: { id: user.fk_financeaccount_id },
                    include: { ledger_entries: true }
                });
                if (account) {
                    const ledgerSum = account.ledger_entries.reduce((sum, entry) => sum + (entry.debit - entry.credit), 0);
                    user.balance = (parseFloat(account.opening_balance) || 0) + ledgerSum;
                }
            } else {
                user.balance = 0;
            }
        }

        // 2. Calculate TOTAL aggregate balance for the role (for the title bar)
        const allPartiesWithAccounts = await prisma.user.findMany({
            where: { role, fk_financeaccount_id: { not: null } },
            select: { fk_financeaccount_id: true }
        });
        
        const accountIds = allPartiesWithAccounts.map(p => p.fk_financeaccount_id);
        
        if (accountIds.length > 0) {
            const totalOpening = await prisma.financeaccount.aggregate({
                _sum: { opening_balance: true },
                where: { id: { in: accountIds } }
            });
            
            const totalLedger = await prisma.account_ledger.aggregate({
                _sum: { debit: true, credit: true },
                where: { account_id: { in: accountIds } }
            });
            
            totalBalance = (parseFloat(totalOpening._sum.opening_balance) || 0) + 
                           (totalLedger._sum.debit || 0) - 
                           (totalLedger._sum.credit || 0);
        }
    }

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

    const accounts = await prisma.financeaccount.findMany({
      orderBy: { code: 'asc' }
    });

    res.render('users/index', {
      title,
      data,
      role,
      pagination,
      query,
      sortBy,
      sortOrder,
      accounts, // Pass accounts to view
      totalBalance
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

    const prisma = requirePrismaClient();
    const data = { ...user };

    // Calculate balance for customers and vendors
    if (data.role === 'customer' || data.role === 'vendor') {
        if (data.fk_financeaccount_id) {
            const account = await prisma.financeaccount.findUnique({
                where: { id: data.fk_financeaccount_id },
                include: { ledger_entries: true }
            });
            if (account) {
                const ledgerSum = account.ledger_entries.reduce((sum, entry) => sum + (entry.debit - entry.credit), 0);
                data.balance = (parseFloat(account.opening_balance) || 0) + ledgerSum;
            } else {
                data.balance = 0;
            }

            // Fetch the Opening Balance Journal to populate edit form
            const obReference = `OB-${data.id.substring(0, 6)}`;
            const obJournal = await prisma.account_journal.findFirst({
                where: { reference: obReference },
                include: { ledger_entries: true }
            });

            if (obJournal) {
                data.ob_date = obJournal.date.toISOString().split('T')[0];
                const primaryEntry = obJournal.ledger_entries.find(e => e.account_id === data.fk_financeaccount_id);
                const contraEntry = obJournal.ledger_entries.find(e => e.account_id !== data.fk_financeaccount_id);

                if (primaryEntry) {
                    data.ob_primary_debit = primaryEntry.debit;
                    data.ob_primary_credit = primaryEntry.credit;
                }
                if (contraEntry) {
                    data.ob_contra_account = contraEntry.account_id;
                    data.ob_contra_debit = contraEntry.debit;
                    data.ob_contra_credit = contraEntry.credit;
                }
            }
        } else {
            data.balance = 0;
        }
    }

    if (data.password) {
      data.password = encrypt.decrypt(data.password);
    }
    res.json({ success: true, user: data });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.details = async (req, res) => {
  try {
    const { id } = req.params;
    const role = req.query.role || 'user';
    const user = await queries.users.findById(id);
    
    if (!user) {
      req.session.message = { type: 'error', text: 'Record not found' };
      return res.redirect('/users?role=' + role);
    }

    const prisma = requirePrismaClient();
    let balance = 0;

    if ((user.role === 'customer' || user.role === 'vendor') && user.fk_financeaccount_id) {
        const account = await prisma.financeaccount.findUnique({
            where: { id: user.fk_financeaccount_id },
            include: { ledger_entries: true }
        });
        if (account) {
            const ledgerSum = account.ledger_entries.reduce((sum, entry) => sum + (entry.debit - entry.credit), 0);
            balance = (parseFloat(account.opening_balance) || 0) + ledgerSum;
        }
    }

    res.render('users/details', {
        title: (role === 'vendor' ? 'Vendor' : (role === 'customer' ? 'Customer' : 'User')) + ' Details',
        user,
        role,
        balance
    });
  } catch (error) {
    console.error('Error in user details:', error);
    req.session.message = { type: 'error', text: 'Internal Server Error' };
    res.redirect('/users?role=' + (req.query.role || 'user'));
  }
};

exports.getBalance = async (req, res) => {
  try {
    const { id } = req.params;
    const prisma = requirePrismaClient();
    const user = await prisma.user.findUnique({
      where: { id },
      select: { fk_financeaccount_id: true }
    });

    if (!user || !user.fk_financeaccount_id) {
      return res.json({ success: true, balance: 0 });
    }

    const account = await prisma.financeaccount.findUnique({
      where: { id: user.fk_financeaccount_id },
      include: { ledger_entries: true }
    });

    if (!account) {
      return res.json({ success: true, balance: 0 });
    }

    const ledgerSum = account.ledger_entries.reduce((sum, entry) => sum + (entry.debit - entry.credit), 0);
    const balance = (parseFloat(account.opening_balance) || 0) + ledgerSum;

    res.json({ success: true, balance });
  } catch (error) {
    console.error('Error fetching balance:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.save = async (req, res) => {
  var { id, firstname, lastname, email, phone, username, role, password, address, ob_date } = req.body;
  var password = password;
  var createdby = req.session.user.id;

  // Set the source based on application
  const source = 'desktop';

  if (password) {
    password = encrypt.encrypt(password);
  }
  try {
    // check if email is duplicate (only if email is provided)
    if (email) {
      let user = await queries.users.findByEmail(email);
      if (user && user.id != id) {
        return res.status(400).json({ success: false, message: 'User with this email already exists' });
      }
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

    let savedUser;
    if (id) {
      savedUser = await queries.users.update(id, userData);
    } else {
      savedUser = await queries.users.create(userData);
    }

    // Accounting Integration for Customers/Vendors
    if (role === 'customer' || role === 'vendor') {
      const prisma = requirePrismaClient();
      
      await prisma.$transaction(async (tx) => {
        // Check if user already has an account head
        let accountHeadId = savedUser.fk_financeaccount_id;
        
        if (!accountHeadId) {
          // Find parent account (Accounts Receivable for customers, Accounts Payable for vendors)
          const parentCode = role === 'customer' ? '1130' : '2110';
          const parentAccount = await tx.financeaccount.findFirst({ where: { code: parentCode } });
          
          if (parentAccount) {
            // Create a new sub-account for this user
            const newAccount = await tx.financeaccount.create({
              data: {
                id: generateId(32),
                name: `${firstname} ${lastname} (${role.charAt(0).toUpperCase() + role.slice(1)})`,
                code: `${parentAccount.code}-${savedUser.id.substring(0, 4)}`,
                type: parentAccount.type,
                category: parentAccount.category,
                fk_parent_in_financeaccount: parentAccount.id,
                opening_balance_date: ob_date ? new Date(ob_date) : null,
                source: 'system-generated'
              }
            });
            
            // Link user to the new account
            await tx.user.update({
              where: { id: savedUser.id },
              data: { fk_financeaccount_id: newAccount.id }
            });
            
            accountHeadId = newAccount.id;
          }
        }

        // Handle Opening Balance (Enhanced Double Entry)
        const obContraAccountId = req.body.ob_contra_account;
        
        const pDebit = parseFloat(req.body.ob_primary_debit) || 0;
        const pCredit = parseFloat(req.body.ob_primary_credit) || 0;
        const cDebit = parseFloat(req.body.ob_contra_debit) || 0;
        const cCredit = parseFloat(req.body.ob_contra_credit) || 0;

        if ((pDebit !== 0 || pCredit !== 0) && obContraAccountId && accountHeadId) {
            const contraAccount = await tx.financeaccount.findUnique({ where: { id: obContraAccountId } });
            
            if (contraAccount) {
                const lines = [];
                // Primary Account Lines
                if (pDebit > 0) lines.push({ account_id: accountHeadId, debit: pDebit, credit: 0, details: 'Opening Balance' });
                if (pCredit > 0) lines.push({ account_id: accountHeadId, debit: 0, credit: pCredit, details: 'Opening Balance' });
                
                // Contra Account Lines
                if (cDebit > 0) lines.push({ account_id: contraAccount.id, debit: cDebit, credit: 0, details: `Opening Balance for ${firstname} ${lastname}` });
                if (cCredit > 0) lines.push({ account_id: contraAccount.id, debit: 0, credit: cCredit, details: `Opening Balance for ${firstname} ${lastname}` });

                // Delete existing opening balance entry if any
                await tx.account_ledger.deleteMany({
                    where: { journal: { reference: `OB-${savedUser.id.substring(0, 6)}` } }
                });
                await tx.account_journal.deleteMany({
                    where: { reference: `OB-${savedUser.id.substring(0, 6)}` }
                });

                if (lines.length >= 2) {
                    await accountingController.recordJournalEntry(tx, {
                        date: ob_date ? new Date(ob_date) : new Date(),
                        description: `Opening Balance for ${role}: ${firstname} ${lastname}`,
                        reference: `OB-${savedUser.id.substring(0, 6)}`,
                        source: 'opening-balance',
                        lines
                    });
                }
            }
        }
      });
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