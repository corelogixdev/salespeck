-- AlterTable
ALTER TABLE "financeaccount" ADD COLUMN "opening_balance_date" DATETIME;

-- AlterTable
ALTER TABLE "product" ADD COLUMN "is_service" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "purchase" ADD COLUMN "discountpercentage" TEXT;
ALTER TABLE "purchase" ADD COLUMN "ledger" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "purchasedproducts" ADD COLUMN "price" REAL;
