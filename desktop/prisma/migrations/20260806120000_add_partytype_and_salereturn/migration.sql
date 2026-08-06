-- AlterTable
ALTER TABLE "user" ADD COLUMN "fk_partytype_id" TEXT;

-- CreateTable
CREATE TABLE "partytype" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "createdby" TEXT,
    "updatedby" TEXT,
    "source" TEXT DEFAULT 'desktop',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "salereturn" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sale" TEXT NOT NULL,
    "invoicenum" TEXT,
    "customer" TEXT,
    "user" TEXT,
    "totalamount" REAL,
    "refundmode" TEXT,
    "note" TEXT,
    "createdby" TEXT,
    "source" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "salereturn_sale_idx" ON "salereturn"("sale");

-- CreateIndex
CREATE INDEX "salereturn_invoicenum_idx" ON "salereturn"("invoicenum");

-- CreateIndex
CREATE INDEX "salereturn_createdAt_idx" ON "salereturn"("createdAt");

-- CreateTable
CREATE TABLE "salereturnitems" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "salereturn" TEXT,
    "soldproduct" TEXT,
    "product" TEXT,
    "quantity" INTEGER,
    "price" REAL,
    "source" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "salereturnitems_salereturn_idx" ON "salereturnitems"("salereturn");

-- CreateIndex
CREATE INDEX "salereturnitems_soldproduct_idx" ON "salereturnitems"("soldproduct");
