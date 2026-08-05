const queries = require("../prisma/queries");
const moment = require("moment");
const { getPaginationMeta } = require("../utils/paginationHelper");

function withNavLocals(res, data) {
  return Object.assign(
    {
      user: res.locals.user || null,
      isAuthenticated: !!(res.locals.user || res.locals.isAuthenticated)
    },
    data
  );
}

function requireUser(req, res) {
  if (res.locals.user) {
    return true;
  }
  res.redirect("/login");
  return false;
}

// Reports index page
exports.index = async (req, res) => {
  try {
    if (!requireUser(req, res)) return;
    res.render("reports/index", withNavLocals(res, {
      title: "Reports"
    }));
  } catch (error) {
    console.error("Reports index error:", error);
    res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
};

// PDF Viewer page
exports.pdfViewer = async (req, res) => {
  try {
    res.render("reports/pdf-viewer", {
      title: "Report PDF Viewer",
      pdfUrl: req.query.src || "",
      layout: false
    });
  } catch (error) {
    console.error("PDF viewer error:", error);
    res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
};

// Sales Report
exports.salesReport = async (req, res) => {
  try {
    const { startDate, endDate, customer, format, page = 1, pageSize = 25 } = req.query;
    const filters = { startDate, endDate, customer };
    const isGenerating = req.query.generate === "1";

    if (!isGenerating) {
      return res.render("reports/sales", withNavLocals(res, {
        title: "Sales Report",
        reportData: { filters, generated: false },
        query: req.query,
        baseUrl: "/reports/sales",
        pagination: null
      }));
    }

    // Export functionality uses full dataset
    if (format) {
      const sales = await queries.reports.getSalesReport(filters);
      const totals = {
        totalSales: sales.length,
        totalAmount: sales.reduce((sum, sale) => sum + parseFloat(sale.totalprice || 0), 0),
        totalPayment: sales.reduce((sum, sale) => sum + parseFloat(sale.totalpayment || 0), 0),
        totalDiscount: sales.reduce((sum, sale) => {
          const price = parseFloat(sale.totalprice || 0);
          const payment = parseFloat(sale.totalpayment || 0);
          return sum + (price - payment);
        }, 0)
      };
      const reportData = { sales, totals, filters, generatedAt: new Date() };
      if (format === "csv") return exports.exportSalesCSV(req, res, reportData);
      if (format === "excel") return exports.exportSalesExcel(req, res, reportData);
      if (format === "pdf") return await exports.exportSalesPDF(req, res, reportData);
    }

    // Paginated report view with aggregate totals
    const [{ count, rows: sales }, totals] = await Promise.all([
      queries.reports.getSalesReportPaginated(filters, page, pageSize),
      queries.reports.getSalesReportTotals(filters)
    ]);

    const pagination = getPaginationMeta(page, pageSize, count);

    const reportData = {
      sales,
      totals,
      filters,
      generated: true,
      generatedAt: new Date()
    };

    res.render("reports/sales", withNavLocals(res, {
      title: "Sales Report",
      reportData,
      pagination,
      query: req.query,
      baseUrl: "/reports/sales"
    }));
  } catch (error) {
    console.error("Sales report error:", error);
    res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
};

// Purchases Report
exports.purchasesReport = async (req, res) => {
  try {
    const { startDate, endDate, vendor, format, page = 1, pageSize = 25 } = req.query;
    const filters = { startDate, endDate, vendor };
    const isGenerating = req.query.generate === "1";

    if (!isGenerating) {
      return res.render("reports/purchases", withNavLocals(res, {
        title: "Purchases Report",
        reportData: { filters, generated: false },
        query: req.query,
        baseUrl: "/reports/purchases",
        pagination: null
      }));
    }

    if (format) {
      const purchases = await queries.reports.getPurchasesReport(filters);
      const totals = {
        totalPurchases: purchases.length,
        totalAmount: purchases.reduce((sum, p) => sum + parseFloat(p.totalAmount || 0), 0),
        totalPayment: purchases.reduce((sum, p) => sum + parseFloat(p.totalPayment || 0), 0)
      };
      const reportData = { purchases, totals, filters, generatedAt: new Date() };
      if (format === "csv") return exports.exportPurchasesCSV(req, res, reportData);
      if (format === "excel") return exports.exportPurchasesExcel(req, res, reportData);
      if (format === "pdf") return await exports.exportPurchasesPDF(req, res, reportData);
    }

    const [{ count, rows: purchases }, totals] = await Promise.all([
      queries.reports.getPurchasesReportPaginated(filters, page, pageSize),
      queries.reports.getPurchasesReportTotals(filters)
    ]);

    const pagination = getPaginationMeta(page, pageSize, count);

    const reportData = {
      purchases,
      totals,
      filters,
      generated: true,
      generatedAt: new Date()
    };

    res.render("reports/purchases", withNavLocals(res, {
      title: "Purchases Report",
      reportData,
      pagination,
      query: req.query,
      baseUrl: "/reports/purchases"
    }));
  } catch (error) {
    console.error("Purchases report error:", error);
    res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
};

// Inventory Report
exports.inventoryReport = async (req, res) => {
  try {
    const { category, brand, lowStock, format, page = 1, pageSize = 25 } = req.query;
    const filters = { category, brand, lowStock };
    const isGenerating = req.query.generate === "1";

    if (!isGenerating) {
      return res.render("reports/inventory", withNavLocals(res, {
        title: "Inventory Report",
        reportData: { filters, generated: false },
        query: req.query,
        baseUrl: "/reports/inventory",
        pagination: null
      }));
    }

    if (format) {
      const products = await queries.reports.getInventoryReport(filters);
      const totals = {
        totalProducts: products.length,
        totalValue: products.reduce((sum, p) => {
          const qty = parseFloat(p.quantity || 0);
          const price = parseFloat(p.purchaseprice || 0);
          return sum + (qty * price);
        }, 0),
        lowStockItems: products.filter(p => parseFloat(p.quantity || 0) <= 10).length
      };
      const reportData = { products, totals, filters, generatedAt: new Date() };
      if (format === "csv") return exports.exportInventoryCSV(req, res, reportData);
      if (format === "excel") return exports.exportInventoryExcel(req, res, reportData);
      if (format === "pdf") return await exports.exportInventoryPDF(req, res, reportData);
    }

    const [{ count, rows: products }, totals] = await Promise.all([
      queries.reports.getInventoryReportPaginated(filters, page, pageSize),
      queries.reports.getInventoryReportTotals(filters)
    ]);

    const pagination = getPaginationMeta(page, pageSize, count);

    const reportData = {
      products,
      totals,
      filters,
      generated: true,
      generatedAt: new Date()
    };

    res.render("reports/inventory", withNavLocals(res, {
      title: "Inventory Report",
      reportData,
      pagination,
      query: req.query,
      baseUrl: "/reports/inventory"
    }));
  } catch (error) {
    console.error("Inventory report error:", error);
    res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
};

// Customer Report
exports.customerReport = async (req, res) => {
  try {
    const { startDate, endDate, format, page = 1, pageSize = 25 } = req.query;
    const filters = { startDate, endDate };
    const isGenerating = req.query.generate === "1";

    if (!isGenerating) {
      return res.render("reports/customers", withNavLocals(res, {
        title: "Customer Report",
        reportData: { filters, generated: false },
        query: req.query,
        baseUrl: "/reports/customers",
        pagination: null
      }));
    }

    if (format) {
      const customersWithSales = await queries.reports.getCustomerReport(filters);
      const totals = {
        totalCustomers: customersWithSales.length,
        totalSales: customersWithSales.reduce((sum, c) => sum + c.totalPurchases, 0),
        totalRevenue: customersWithSales.reduce((sum, c) => sum + c.totalSpent, 0)
      };
      const reportData = { customers: customersWithSales, totals, filters, generatedAt: new Date() };
      if (format === "csv") return exports.exportCustomerCSV(req, res, reportData);
      if (format === "excel") return exports.exportCustomerExcel(req, res, reportData);
      if (format === "pdf") return await exports.exportCustomerPDF(req, res, reportData);
    }

    const [{ count, rows: customers }, totals] = await Promise.all([
      queries.reports.getCustomerReportPaginated(filters, page, pageSize),
      queries.reports.getCustomerReportTotals(filters)
    ]);

    const pagination = getPaginationMeta(page, pageSize, count);

    const reportData = {
      customers,
      totals,
      filters,
      generated: true,
      generatedAt: new Date()
    };

    res.render("reports/customers", withNavLocals(res, {
      title: "Customer Report",
      reportData,
      pagination,
      query: req.query,
      baseUrl: "/reports/customers"
    }));
  } catch (error) {
    console.error("Customer report error:", error);
    res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
};

// Export Functions - CSV
exports.exportSalesCSV = (req, res, reportData) => {
  const csv = [
    ['Invoice #', 'Date', 'Customer', 'Total Price', 'Total Payment', 'Discount'].join(',')
  ];

  reportData.sales.forEach(sale => {
    const customerName = sale.Customer 
      ? `${sale.Customer.firstname || ''} ${sale.Customer.lastname || ''}`.trim()
      : 'Walk-in';
    const date = moment(sale.createdAt).format('YYYY-MM-DD HH:mm');
    const discount = parseFloat(sale.totalprice || 0) - parseFloat(sale.totalpayment || 0);
    
    csv.push([
      sale.invoicenum || '',
      date,
      customerName,
      sale.totalprice || '0',
      sale.totalpayment || '0',
      discount.toFixed(2)
    ].join(','));
  });

  csv.push(['', '', 'TOTAL', reportData.totals.totalAmount.toFixed(2), reportData.totals.totalPayment.toFixed(2), reportData.totals.totalDiscount.toFixed(2)].join(','));

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename=sales-report-${moment().format('YYYY-MM-DD')}.csv`);
  res.send(csv.join('\n'));
};

exports.exportPurchasesCSV = (req, res, reportData) => {
  const csv = [
    ['Invoice #', 'Date', 'Vendor', 'Total Amount', 'Total Payment'].join(',')
  ];

  reportData.purchases.forEach(purchase => {
    const vendorName = purchase.Vendor 
      ? `${purchase.Vendor.firstname || ''} ${purchase.Vendor.lastname || ''}`.trim()
      : 'N/A';
    const date = moment(purchase.createdAt).format('YYYY-MM-DD HH:mm');
    
    csv.push([
      purchase.invoicenum || '',
      date,
      vendorName,
      purchase.totalAmount || '0',
      purchase.totalPayment || '0'
    ].join(','));
  });

  csv.push(['', '', 'TOTAL', reportData.totals.totalAmount.toFixed(2), reportData.totals.totalPayment.toFixed(2)].join(','));

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename=purchases-report-${moment().format('YYYY-MM-DD')}.csv`);
  res.send(csv.join('\n'));
};

exports.exportInventoryCSV = (req, res, reportData) => {
  const csv = [
    ['Product Name', 'Barcode', 'Category', 'Brand', 'Quantity', 'Purchase Price', 'Sale Price', 'Stock Value'].join(',')
  ];

  reportData.products.forEach(product => {
    const categoryName = product.Category ? product.Category.name : 'N/A';
    const brandName = product.Brand ? product.Brand.name : 'N/A';
    const stockValue = parseFloat(product.quantity || 0) * parseFloat(product.purchaseprice || 0);
    
    csv.push([
      product.name || '',
      product.barcode || '',
      categoryName,
      brandName,
      product.quantity || '0',
      product.purchaseprice || '0',
      product.saleprice || '0',
      stockValue.toFixed(2)
    ].join(','));
  });

  csv.push(['', '', '', '', '', '', 'TOTAL VALUE', reportData.totals.totalValue.toFixed(2)].join(','));

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename=inventory-report-${moment().format('YYYY-MM-DD')}.csv`);
  res.send(csv.join('\n'));
};

exports.exportCustomerCSV = (req, res, reportData) => {
  const csv = [
    ['Name', 'Phone', 'Email', 'Total Purchases', 'Total Spent', 'Last Purchase'].join(',')
  ];

  reportData.customers.forEach(customer => {
    const name = `${customer.firstname || ''} ${customer.lastname || ''}`.trim();
    const lastPurchase = customer.lastPurchaseDate 
      ? moment(customer.lastPurchaseDate).format('YYYY-MM-DD')
      : 'Never';
    
    csv.push([
      name,
      customer.phone || '',
      customer.email || '',
      customer.totalPurchases || '0',
      customer.totalSpent.toFixed(2),
      lastPurchase
    ].join(','));
  });

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename=customers-report-${moment().format('YYYY-MM-DD')}.csv`);
  res.send(csv.join('\n'));
};

// Export Functions - Excel (Simple CSV format for now, can be enhanced with exceljs)
exports.exportSalesExcel = exports.exportSalesCSV;
exports.exportPurchasesExcel = exports.exportPurchasesCSV;
exports.exportInventoryExcel = exports.exportInventoryCSV;
exports.exportCustomerExcel = exports.exportCustomerCSV;

async function getCompanyForReport() {
  try {
    const setting = await queries.common.getCompanySetting();
    return setting?.value ? JSON.parse(setting.value) : {};
  } catch (e) {
    return {};
  }
}

// Export Functions - PDF
exports.exportSalesPDF = async (req, res, reportData) => {
  const company = await getCompanyForReport();
  res.render("reports/export/sales-pdf", {
    reportData,
    company,
    layout: false
  });
};

exports.exportPurchasesPDF = async (req, res, reportData) => {
  const company = await getCompanyForReport();
  res.render("reports/export/purchases-pdf", {
    reportData,
    company,
    layout: false
  });
};

exports.exportInventoryPDF = async (req, res, reportData) => {
  const company = await getCompanyForReport();
  res.render("reports/export/inventory-pdf", {
    reportData,
    company,
    layout: false
  });
};

exports.exportCustomerPDF = async (req, res, reportData) => {
  const company = await getCompanyForReport();
  res.render("reports/export/customers-pdf", {
    reportData,
    company,
    layout: false
  });
};
