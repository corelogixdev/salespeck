"use strict";

/** All named permissions used by route middleware */
const ALL_PERMISSION_KEYS = [
  "productsList",
  "productsCreate",
  "productsUpdate",
  "productsDelete",
  "productsView",
  "productsSearch",
  "salesList",
  "salesCreate",
  "salesUpdate",
  "salesDelete",
  "salesView",
  "salesSearch",
  "usersList",
  "usersCreate",
  "usersUpdate",
  "usersDelete",
  "usersView",
  "usersSearch",
  "customersList",
  "customersCreate",
  "customersUpdate",
  "customersDelete",
  "customersView",
  "customersSearch",
  "vendorsList",
  "vendorsCreate",
  "vendorsUpdate",
  "vendorsDelete",
  "vendorsView",
  "vendorsSearch",
  "settings",
  "purchasesList",
  "purchasesCreate",
  "purchasesUpdate",
  "purchasesDelete",
  "purchasesView",
  "purchasesSearch",
  "taxesList",
  "taxesView",
  "brandsList",
  "brandsView",
  "categoriesList",
  "categoriesView",
  "reportsView",
  "accountingView",
  "accountingCreate",
  "accountingUpdate",
  "accountingDelete",
  "adminOnly",
  "all",
];

function mapFromKeys(keys, value = true) {
  const out = {};
  for (const k of ALL_PERMISSION_KEYS) out[k] = false;
  for (const k of keys) {
    if (Object.prototype.hasOwnProperty.call(out, k) || ALL_PERMISSION_KEYS.includes(k)) {
      out[k] = value;
    }
  }
  return out;
}

function allTrue() {
  return mapFromKeys(ALL_PERMISSION_KEYS, true);
}

/** Staff cashier / clerk — POS focused, no settings / COA admin / user admin */
function staffPermissions() {
  return mapFromKeys([
    "productsList",
    "productsView",
    "productsSearch",
    "salesList",
    "salesCreate",
    "salesView",
    "salesSearch",
    "customersList",
    "customersCreate",
    "customersView",
    "customersSearch",
    "vendorsList",
    "vendorsView",
    "vendorsSearch",
    "purchasesList",
    "purchasesView",
    "purchasesSearch",
    "taxesList",
    "taxesView",
    "brandsList",
    "brandsView",
    "categoriesList",
    "categoriesView",
    "reportsView",
    "accountingView",
  ]);
}

function permissionsForRole(role) {
  const r = String(role || "user").toLowerCase();
  if (r === "branchmanager" || r === "admin" || r === "superadmin") {
    return allTrue();
  }
  // customer/vendor should not log into POS chrome; treat as empty if they somehow do
  if (r === "customer" || r === "vendor") {
    return mapFromKeys([]);
  }
  return staffPermissions();
}

function hasPermission(permissions, required) {
  if (!required || required.length === 0) return true;
  const perms = permissions || {};
  if (perms.all === true) return true;
  return required.every((p) => perms[p] === true);
}

module.exports = {
  ALL_PERMISSION_KEYS,
  permissionsForRole,
  hasPermission,
  allTrue,
  staffPermissions,
};
