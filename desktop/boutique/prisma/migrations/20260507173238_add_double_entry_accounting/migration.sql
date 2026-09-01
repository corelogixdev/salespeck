-- AlterTable
ALTER TABLE "financeaccount" ADD COLUMN "balance_type" TEXT DEFAULT 'DEBIT';
ALTER TABLE "financeaccount" ADD COLUMN "category" TEXT;
ALTER TABLE "financeaccount" ADD COLUMN "code" TEXT;
ALTER TABLE "financeaccount" ADD COLUMN "opening_balance" REAL DEFAULT 0;

-- AlterTable
ALTER TABLE "user" ADD COLUMN "fk_financeaccount_id" TEXT;

-- CreateTable
CREATE TABLE "account_journal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "reference" TEXT,
    "source" TEXT,
    "createdby" TEXT,
    "updatedby" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "account_ledger" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "journal_id" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "debit" REAL NOT NULL DEFAULT 0,
    "credit" REAL NOT NULL DEFAULT 0,
    "details" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "account_ledger_journal_id_fkey" FOREIGN KEY ("journal_id") REFERENCES "account_journal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "account_ledger_journal_id_idx" ON "account_ledger"("journal_id");

-- CreateIndex
CREATE INDEX "account_ledger_account_id_idx" ON "account_ledger"("account_id");
