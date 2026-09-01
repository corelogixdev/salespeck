const { requirePrismaClient } = require('../utils/prismaClient');
const queries = require('../prisma/queries');
const crypto = require('crypto');

function generateUUID() {
  return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36);
}

exports.index = async (req, res) => {
  try {
    const prisma = requirePrismaClient();
    const statusFilter = req.query.status || 'ALL';
    const searchQuery = req.query.search || '';

    let whereClause = {};
    if (statusFilter !== 'ALL') {
      whereClause.status = statusFilter;
    }
    if (searchQuery) {
      whereClause.OR = [
        { ordernum: { contains: searchQuery } },
        { customer: { contains: searchQuery } },
        { designNotes: { contains: searchQuery } }
      ];
    }

    const orders = await prisma.salesorder.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      include: { items: true }
    });

    // Summary Statistics
    const allOrders = await prisma.salesorder.findMany({ select: { status: true, totalAmount: true, advancePayment: true } });
    const stats = {
      total: allOrders.length,
      booked: allOrders.filter(o => o.status === 'BOOKED').length,
      inWork: allOrders.filter(o => o.status === 'IN_EMBROIDERY' || o.status === 'IN_STITCHING').length,
      ready: allOrders.filter(o => o.status === 'READY').length,
      fulfilled: allOrders.filter(o => o.status === 'FULFILLED').length,
      totalAdvance: allOrders.reduce((sum, o) => sum + (o.advancePayment || 0), 0)
    };

    // Customer map for name resolution
    const customers = await prisma.user.findMany({ where: { role: 'customer' }, select: { id: true, firstname: true, lastname: true, phone: true } });
    const customerMap = new Map(customers.map(c => [c.id, `${c.firstname || ''} ${c.lastname || ''}`.trim() || c.phone || 'Walk-in Customer']));

    const formattedOrders = orders.map(order => ({
      ...order,
      customerName: customerMap.get(order.customer) || order.customer || 'Walk-in Customer'
    }));

    res.render('sales_order/index', {
      orders: formattedOrders,
      stats,
      currentStatus: statusFilter,
      searchQuery,
      hidenav: false
    });
  } catch (error) {
    console.error('Error listing sales orders:', error);
    res.status(500).render('sales_order/index', { orders: [], stats: { total: 0, booked: 0, inWork: 0, ready: 0, fulfilled: 0, totalAdvance: 0 }, currentStatus: 'ALL', searchQuery: '', error: error.message, hidenav: false });
  }
};

exports.bookingForm = async (req, res) => {
  try {
    const prisma = requirePrismaClient();

    // Get Customers & Products for selection
    const customers = await prisma.user.findMany({
      where: { role: 'customer' },
      select: { id: true, firstname: true, lastname: true, phone: true, email: true, address: true }
    });

    const products = await prisma.product.findMany({
      where: { saleactive: true },
      select: { id: true, name: true, saleprice: true, category: true, barcode: true }
    });

    // Generate Next Order Number (e.g. SO-1001)
    const count = await prisma.salesorder.count();
    const nextOrderNum = `SO-${1001 + count}`;

    res.render('sales_order/booking_form', {
      customers,
      products,
      nextOrderNum,
      hidenav: false
    });
  } catch (error) {
    console.error('Error rendering booking form:', error);
    res.status(500).redirect('/sales-orders');
  }
};

exports.saveBooking = async (req, res) => {
  try {
    const prisma = requirePrismaClient();
    const {
      ordernum, customer, customer_name, customer_phone,
      bookingDate, deliveryDate, fabricSource,
      totalAmount, advancePayment, discount,
      designNotes, embroidererNotes, tailorNotes,
      items,
      // Measurement Specs
      lambai, gheera, bazu, bazu_mori, teera, chest, kamar, hip, chaak,
      shalwar_lambai, paincha, thigh, lower_style,
      dupatta_specs, pattern_code, thread_details
    } = req.body;

    const user = res.locals.user || req.session?.user;

    const parsedDiscount = parseFloat(discount) || 0;
    const parsedTotal = parseFloat(totalAmount) || 0;
    const parsedAdvance = parseFloat(advancePayment) || 0;
    const calculatedBalance = Math.max(0, parsedTotal - parsedAdvance);

    const newOrderId = generateUUID();

    let orderItems = [];
    let itemsMeasurementMap = [];

    if (Array.isArray(items)) {
      orderItems = items.map((item, idx) => {
        const itemMeas = item.measurements || {};
        itemsMeasurementMap.push(itemMeas);
        return {
          id: generateUUID(),
          product_id: item.product_id || null,
          item_name: item.item_name || 'Custom Boutique Item',
          item_type: item.item_type || 'Stitching',
          quantity: parseFloat(item.quantity) || 1,
          price: parseFloat(item.price) || 0,
          subtotal: (parseFloat(item.quantity) || 1) * (parseFloat(item.price) || 0),
          notes: Object.keys(itemMeas).length > 0 ? JSON.stringify(itemMeas) : (item.notes || '')
        };
      });
    }

    // Global / Combined measurement object
    const measurementObj = {
      discount: parsedDiscount,
      itemsMeasurements: itemsMeasurementMap,
      globalUpper: { lambai, gheera, bazu, bazu_mori, teera, chest, kamar, hip, chaak },
      globalLower: { shalwar_lambai, paincha, thigh, lower_style },
      globalEmbroidery: { dupatta_specs, pattern_code, thread_details }
    };

    const orderData = {
      id: newOrderId,
      ordernum: ordernum || `SO-${Date.now().toString().slice(-4)}`,
      customer: customer || customer_name || 'Walk-in Customer',
      user: user ? user.id : null,
      bookingDate: bookingDate ? new Date(bookingDate) : new Date(),
      deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
      status: 'BOOKED',
      fabricSource: fabricSource || 'CLIENT_PROVIDED',
      totalAmount: parsedTotal,
      advancePayment: parsedAdvance,
      balanceAmount: calculatedBalance,
      designNotes: designNotes || '',
      embroidererNotes: embroidererNotes || '',
      tailorNotes: tailorNotes || '',
      measurementData: JSON.stringify(measurementObj),
      createdby: user ? user.id : null,
      items: {
        create: orderItems
      }
    };

    const createdOrder = await prisma.salesorder.create({
      data: orderData,
      include: { items: true }
    });

    // Post Double-Entry Accounting Ledger for Advance Payment Deposit if > 0
    if (parsedAdvance > 0) {
      try {
        const queries = require('../prisma/queries');
        const generateId = (len = 32) => require('crypto').randomBytes(len / 2).toString('hex');
        
        let customerAccountId = null;
        if (customer) {
          customerAccountId = await queries.accounting.getOrCreateUserAccount(prisma, customer, 'customer');
        }
        if (!customerAccountId) {
          customerAccountId = await queries.accounting.getOrCreateWalkinAccount(prisma);
        }

        const cashAccount = await prisma.financeaccount.findFirst({ where: { code: '1110' } });

        const advanceJournalId = generateId(32);
        await prisma.account_journal.create({
          data: {
            id: advanceJournalId,
            date: bookingDate ? new Date(bookingDate) : new Date(),
            description: `Advance Deposit Received - Sales Order ${createdOrder.ordernum}`,
            reference: createdOrder.id,
            voucher_no: createdOrder.ordernum,
            source: 'desktop',
            createdby: user ? user.id : null
          }
        });

        if (cashAccount) {
          await prisma.account_ledger.create({
            data: {
              id: generateId(32),
              journal_id: advanceJournalId,
              account_id: cashAccount.id,
              debit: parsedAdvance,
              details: `Advance Cash Received for Sales Order ${createdOrder.ordernum}`
            }
          });
        }

        if (customerAccountId) {
          await prisma.account_ledger.create({
            data: {
              id: generateId(32),
              journal_id: advanceJournalId,
              account_id: customerAccountId,
              credit: parsedAdvance,
              details: `Advance Deposit Credited for Sales Order ${createdOrder.ordernum}`
            }
          });
        }
      } catch (ledgerErr) {
        console.error('Error posting advance deposit ledger:', ledgerErr);
      }
    }

    res.json({
      success: true,
      message: 'Sales Order booked successfully!',
      orderId: createdOrder.id,
      ordernum: createdOrder.ordernum
    });
  } catch (error) {
    console.error('Error saving sales order booking:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to save booking' });
  }
};

exports.details = async (req, res) => {
  try {
    const prisma = requirePrismaClient();
    const { id } = req.params;

    const order = await prisma.salesorder.findUnique({
      where: { id },
      include: { items: true }
    });

    if (!order) {
      return res.status(404).render('404', { message: 'Sales Order not found' });
    }

    let customerDetails = null;
    if (order.customer) {
      customerDetails = await prisma.user.findFirst({
        where: { OR: [{ id: order.customer }, { firstname: order.customer }] }
      });
    }

    let measurementData = {};
    try {
      if (order.measurementData) {
        measurementData = JSON.parse(order.measurementData);
      }
    } catch (e) {
      console.error('Failed to parse measurement JSON:', e);
    }

    res.render('sales_order/details', {
      order,
      customerDetails,
      measurements: measurementData,
      hidenav: false
    });
  } catch (error) {
    console.error('Error showing sales order details:', error);
    res.status(500).redirect('/sales-orders');
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const prisma = requirePrismaClient();
    const { id, status } = req.body;

    const allowedStatuses = ['BOOKED', 'IN_EMBROIDERY', 'IN_STITCHING', 'READY', 'FULFILLED', 'CANCELLED'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const updatedOrder = await prisma.salesorder.update({
      where: { id },
      data: { status, updatedAt: new Date() }
    });

    res.json({ success: true, message: `Status updated to ${status}`, newStatus: updatedOrder.status });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.jobTicket = async (req, res) => {
  try {
    const prisma = requirePrismaClient();
    const { id } = req.params;

    const order = await prisma.salesorder.findUnique({
      where: { id },
      include: { items: true }
    });

    if (!order) {
      return res.status(404).send('Sales Order Not Found');
    }

    let customerDetails = null;
    if (order.customer) {
      customerDetails = await prisma.user.findFirst({
        where: { OR: [{ id: order.customer }, { firstname: order.customer }] }
      });
    }

    let measurementData = {};
    try {
      if (order.measurementData) {
        measurementData = JSON.parse(order.measurementData);
      }
    } catch (e) {}

    res.render('sales_order/job_ticket', {
      order,
      customerDetails,
      measurements: measurementData,
      layout: false
    });
  } catch (error) {
    console.error('Error generating job ticket:', error);
    res.status(500).send(error.message);
  }
};

exports.getUnfulfilledOrders = async (req, res) => {
  try {
    const prisma = requirePrismaClient();
    const orders = await prisma.salesorder.findMany({
      where: {
        status: { in: ['BOOKED', 'IN_EMBROIDERY', 'IN_STITCHING', 'READY'] }
      },
      orderBy: { createdAt: 'desc' },
      include: { items: true }
    });

    const customers = await prisma.user.findMany({ where: { role: 'customer' }, select: { id: true, firstname: true, lastname: true } });
    const customerMap = new Map(customers.map(c => [c.id, `${c.firstname || ''} ${c.lastname || ''}`.trim()]));

    const formatted = orders.map(o => ({
      ...o,
      customerName: customerMap.get(o.customer) || o.customer || 'Walk-in Customer'
    }));

    res.json({ success: true, orders: formatted });
  } catch (error) {
    console.error('Error fetching unfulfilled orders:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOrderApi = async (req, res) => {
  try {
    const prisma = requirePrismaClient();
    const { id } = req.params;
    const order = await prisma.salesorder.findUnique({
      where: { id },
      include: { items: true }
    });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    let customerDetails = null;
    if (order.customer) {
      customerDetails = await prisma.user.findFirst({
        where: { OR: [{ id: order.customer }, { firstname: order.customer }] },
        select: { id: true, firstname: true, lastname: true, phone: true }
      });
    }

    res.json({ success: true, order, customerDetails });
  } catch (error) {
    console.error('Error fetching order API:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.customerReceipt = async (req, res) => {
  try {
    const prisma = requirePrismaClient();
    const { id } = req.params;

    const order = await prisma.salesorder.findUnique({
      where: { id },
      include: { items: true }
    });

    if (!order) {
      return res.status(404).send('Sales Order Not Found');
    }

    let customerDetails = null;
    if (order.customer) {
      customerDetails = await prisma.user.findFirst({
        where: { OR: [{ id: order.customer }, { firstname: order.customer }] }
      });
    }

    let measurementData = {};
    try {
      if (order.measurementData) {
        measurementData = JSON.parse(order.measurementData);
      }
    } catch (e) {}

    // Fetch dynamic company settings
    let company = {
      name: 'Elation By Aroona Usman',
      tagline: 'BRIDAL | PARTY | FORMAL',
      address: 'Shop No.8, LG Mall 79, Near Beconhouse School, Liberty Market Gulberg-III, Lahore.',
      phone: '0304 0012 202',
      email: 'aroona42@gmail.com',
      logo: ''
    };

    try {
      const setting = await prisma.softwaresetting.findFirst({ where: { name: 'company' } });
      if (setting && setting.value) {
        const parsed = typeof setting.value === 'string' ? JSON.parse(setting.value) : setting.value;
        if (parsed.name) company.name = parsed.name;
        if (parsed.phone) company.phone = parsed.phone;
        if (parsed.address) company.address = parsed.address;
        if (parsed.email) company.email = parsed.email;
        if (parsed.tagline) company.tagline = parsed.tagline;
        if (parsed.logo) company.logo = parsed.logo;
      }
    } catch (e) {}

    res.render('sales_order/customer_receipt', {
      order,
      customerDetails,
      measurements: measurementData,
      company,
      layout: false
    });
  } catch (error) {
    console.error('Error generating customer receipt:', error);
    res.status(500).send(error.message);
  }
};
