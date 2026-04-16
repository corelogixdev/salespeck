const queries = require("../prisma/queries");
const moment = require("moment");

// Reports index page
exports.index = async (req, res) => {
  try {
    res.render("reports/index", {
      title: "Reports"
    });
  } catch (error) {
    console.error("Reports index error:", error);
    res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
};

// Sales Report
exports.salesReport = async (req, res) => {
  try {
    const { startDate, endDate, customer, format } = req.query;
    
    const sales = await queries.reports.getSalesReport({ startDate, endDate, customer });

    // Calculate totals
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

    const reportData = {
      sales,
      totals,
      filters: { startDate, endDate, customer },
      generatedAt: new Date()
    };

    // Export functionality
    if (format === 'csv') {
      return exports.exportSalesCSV(req, res, reportData);
    } else if (format === 'excel') {
      return exports.exportSalesExcel(req, res, reportData);
    } else if (format === 'pdf') {
      return exports.exportSalesPDF(req, res, reportData);
    }

    res.render("reports/sales", {
      title: "Sales Report",
      reportData
    });
  } catch (error) {
    console.error("Sales report error:", error);
    res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
};

// Purchases Report
exports.purchasesReport = async (req, res) => {
  try {
    const { startDate, endDate, vendor, format } = req.query;
    
    const purchases = await queries.reports.getPurchasesReport({ startDate, endDate, vendor });

    const totals = {
      totalPurchases: purchases.length,
      totalAmount: purchases.reduce((sum, p) => sum + parseFloat(p.totalAmount || 0), 0),
      totalPayment: purchases.reduce((sum, p) => sum + parseFloat(p.totalPayment || 0), 0)
    };

    const reportData = {
      purchases,
      totals,
      filters: { startDate, endDate, vendor },
      generatedAt: new Date()
    };

    if (format === 'csv') {
      return exports.exportPurchasesCSV(req, res, reportData);
    } else if (format === 'excel') {
      return exports.exportPurchasesExcel(req, res, reportData);
    } else if (format === 'pdf') {
      return exports.exportPurchasesPDF(req, res, reportData);
    }

    res.render("reports/purchases", {
      title: "Purchases Report",
      reportData
    });
  } catch (error) {
    console.error("Purchases report error:", error);
    res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
};

// Inventory Report
exports.inventoryReport = async (req, res) => {
  try {
    const { category, brand, lowStock, format } = req.query;
    
    const products = await queries.reports.getInventoryReport({ category, brand, lowStock });

    const totals = {
      totalProducts: products.length,
      totalValue: products.reduce((sum, p) => {
        const qty = parseFloat(p.quantity || 0);
        const price = parseFloat(p.purchaseprice || 0);
        return sum + (qty * price);
      }, 0),
      lowStockItems: products.filter(p => parseFloat(p.quantity || 0) <= 10).length
    };

    const reportData = {
      products,
      totals,
      filters: { category, brand, lowStock },
      generatedAt: new Date()
    };

    if (format === 'csv') {
      return exports.exportInventoryCSV(req, res, reportData);
    } else if (format === 'excel') {
      return exports.exportInventoryExcel(req, res, reportData);
    } else if (format === 'pdf') {
      return exports.exportInventoryPDF(req, res, reportData);
    }

    res.render("reports/inventory", {
      title: "Inventory Report",
      reportData
    });
  } catch (error) {
    console.error("Inventory report error:", error);
    res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
};

// Customer Report
exports.customerReport = async (req, res) => {
  try {
    const { startDate, endDate, format } = req.query;
    
    const customersWithSales = await queries.reports.getCustomerReport({ startDate, endDate });

    const totals = {
      totalCustomers: customersWithSales.length,
      totalSales: customersWithSales.reduce((sum, c) => sum + c.totalPurchases, 0),
      totalRevenue: customersWithSales.reduce((sum, c) => sum + c.totalSpent, 0)
    };

    const reportData = {
      customers: customersWithSales,
      totals,
      filters: { startDate, endDate },
      generatedAt: new Date()
    };

    if (format === 'csv') {
      return exports.exportCustomerCSV(req, res, reportData);
    } else if (format === 'excel') {
      return exports.exportCustomerExcel(req, res, reportData);
    } else if (format === 'pdf') {
      return exports.exportCustomerPDF(req, res, reportData);
    }

    res.render("reports/customers", {
      title: "Customer Report",
      reportData
    });
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

// Export Functions - PDF (Simple HTML for now, can be enhanced with puppeteer or pdfkit)
exports.exportSalesPDF = (req, res, reportData) => {
  res.render("reports/export/sales-pdf", {
    reportData,
    layout: false
  });
};

exports.exportPurchasesPDF = (req, res, reportData) => {
  res.render("reports/export/purchases-pdf", {
    reportData,
    layout: false
  });
};

exports.exportInventoryPDF = (req, res, reportData) => {
  res.render("reports/export/inventory-pdf", {
    reportData,
    layout: false
  });
};

exports.exportCustomerPDF = (req, res, reportData) => {
  res.render("reports/export/customers-pdf", {
    reportData,
    layout: false
  });
};
