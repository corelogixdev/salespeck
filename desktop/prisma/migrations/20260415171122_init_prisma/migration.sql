-- CreateTable
CREATE TABLE "SequelizeMeta" (
    "name" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "brand" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" BOOLEAN DEFAULT true,
    "createdby" TEXT,
    "updatedby" TEXT,
    "source" TEXT DEFAULT 'desktop',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "cashclosing" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "closingbalance" REAL,
    "date" DATETIME,
    "expence" REAL,
    "note" TEXT,
    "sale" REAL,
    "fk_user_in_cashclosing" TEXT,
    "source" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" BOOLEAN DEFAULT true,
    "createdby" TEXT,
    "updatedby" TEXT,
    "source" TEXT DEFAULT 'desktop',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "financeaccount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "type" TEXT,
    "fk_parent_in_financeaccount" TEXT,
    "createdby" TEXT,
    "updatedby" TEXT,
    "source" TEXT,
    "value" DECIMAL,
    "isDefault" BOOLEAN,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "financetransaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "amount" REAL,
    "status" TEXT,
    "date" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "details" TEXT,
    "source" TEXT,
    "fk_user_targetto_in_financetransaction" TEXT,
    "fk_financeaccount_in_financetransaction" TEXT,
    "createdby" TEXT,
    "updatedby" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "inventorylogs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "note" TEXT,
    "createdby" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "vendor" TEXT,
    "source" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "barcode" TEXT,
    "brand" TEXT,
    "carrycost" REAL,
    "category" TEXT,
    "discount" REAL,
    "ispurchaseable" BOOLEAN,
    "issaleable" BOOLEAN,
    "name" TEXT,
    "purchaseactive" BOOLEAN,
    "purchaseprice" REAL,
    "quantity" REAL,
    "saleactive" BOOLEAN,
    "saleprice" REAL,
    "taxid" TEXT,
    "createdby" TEXT,
    "updatedby" TEXT,
    "source" TEXT DEFAULT 'desktop'
);

-- CreateTable
CREATE TABLE "productbatches" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "product" TEXT,
    "expirydate" DATETIME,
    "quantity" REAL,
    "source" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "productsalepurchase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "price" REAL,
    "quantity" REAL,
    "total" REAL,
    "fk_product_in_productsalepurchase" TEXT,
    "fk_financetransaction_in_productsalepurchase" TEXT,
    "source" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "productsub" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fk_product_main_in_productsub" TEXT,
    "fk_product_sub_in_productsub" TEXT,
    "quantity" REAL,
    "source" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "purchase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdby" TEXT,
    "updatedby" TEXT,
    "vendor" TEXT,
    "totalAmount" REAL,
    "totalPayment" REAL,
    "invoicenum" TEXT,
    "source" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "purchasedproducts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "purchase" TEXT,
    "product" TEXT,
    "quantity" INTEGER,
    "totalAmount" REAL,
    "source" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "sale" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user" TEXT,
    "customer" TEXT,
    "deliveryuser" TEXT,
    "invoicenum" TEXT,
    "discountpercentage" TEXT,
    "totalprice" TEXT,
    "totalpayment" TEXT,
    "createdby" TEXT,
    "updatedby" TEXT,
    "source" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "softwaresetting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "value" TEXT,
    "source" TEXT
);

-- CreateTable
CREATE TABLE "soldproducts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sale" TEXT,
    "product" TEXT,
    "quantity" INTEGER,
    "price" REAL,
    "source" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "taxes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "percentage" REAL,
    "source" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "address" TEXT,
    "account_key" TEXT,
    "email" TEXT,
    "firstname" TEXT,
    "lastname" TEXT,
    "password" TEXT,
    "username" TEXT,
    "phone" TEXT,
    "phone2" TEXT,
    "role" TEXT DEFAULT 'user',
    "createdby" TEXT,
    "updatedby" TEXT,
    "source" TEXT DEFAULT 'desktop',
    "profile_image_url" TEXT,
    "dashboard_config" TEXT DEFAULT '{}',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
