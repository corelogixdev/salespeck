"use strict";

/**
 * Standard financial calculations for Purchases and Sales.
 * Data is calculated from database fields and attached directly to the object
 * so views do not need to re-calculate values on the frontend.
 *
 * @param {Object} item - Purchase or Sale object retrieved from DB
 * @param {Array} itemsList - List of purchased/sold line items (PurchasedItems or SoldProducts)
 * @returns {Object} item with standardized financial fields attached
 */
function attachTransactionFinancials(item, itemsList = []) {
  if (!item) return item;

  // 1. Calculate Gross SubTotal from line items if available, or fallback to stored total (totalAmount / totalprice)
  const lines = itemsList && itemsList.length 
    ? itemsList 
    : (item.PurchasedItems || item.SoldPoducts || item.SoldProducts || []);

  let lineItemsSubtotal = 0;
  if (lines && lines.length > 0) {
    lineItemsSubtotal = lines.reduce((sum, line) => {
      const price = parseFloat(line.price || 0);
      const qty = parseFloat(line.quantity || 0);
      return sum + (price * qty);
    }, 0);
  }

  const storedGross = parseFloat(item.totalAmount ?? item.totalprice ?? 0);
  const subTotal = lineItemsSubtotal > 0 ? lineItemsSubtotal : storedGross;

  // 2. Parse Discount Percentage
  const discountPercentage = parseFloat(item.discountpercentage || 0);

  // 3. Compute Discount Amount & Net Amount (Final invoice bill)
  const discountAmount = Math.round((subTotal * (discountPercentage / 100)) * 100) / 100;
  const netAmount = Math.round((subTotal - discountAmount) * 100) / 100;

  // 4. Parse Total Payment
  const totalPayment = parseFloat(item.totalPayment ?? item.totalpayment ?? 0);

  // 5. Compute Balance and Change
  const isOverpaid = totalPayment > netAmount;
  const change = isOverpaid ? Math.round((totalPayment - netAmount) * 100) / 100 : 0;
  const balance = !isOverpaid ? Math.round((netAmount - totalPayment) * 100) / 100 : 0;

  // Attach standardized numeric & formatted string properties
  item.subTotal = subTotal;
  item.discountPercentage = discountPercentage;
  item.discountAmount = discountAmount;
  item.netAmount = netAmount;
  item.totalPayment = totalPayment;
  item.balance = balance;
  item.change = change;

  // Formatted string values for direct template display
  item.formattedSubTotal = subTotal.toFixed(2);
  item.formattedDiscountPercentage = discountPercentage > 0 ? discountPercentage.toString() : "0";
  item.formattedDiscountAmount = discountAmount.toFixed(2);
  item.formattedNetAmount = netAmount.toFixed(2);
  item.formattedTotalPayment = totalPayment.toFixed(2);
  item.formattedBalance = balance.toFixed(2);
  item.formattedChange = change.toFixed(2);

  return item;
}

module.exports = {
  attachTransactionFinancials,
};
