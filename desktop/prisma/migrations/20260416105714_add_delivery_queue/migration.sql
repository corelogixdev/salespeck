-- CreateTable
CREATE TABLE "delivery_queue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sale" TEXT,
    "customer" TEXT,
    "deliveryuser" TEXT,
    "queueno" INTEGER,
    "status" TEXT DEFAULT 'pending',
    "address" TEXT,
    "note" TEXT,
    "source" TEXT DEFAULT 'desktop',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
