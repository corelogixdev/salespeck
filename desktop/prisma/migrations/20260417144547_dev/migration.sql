-- CreateIndex
CREATE INDEX "inventorylogs_product_id_idx" ON "inventorylogs"("product_id");

-- CreateIndex
CREATE INDEX "inventorylogs_createdAt_idx" ON "inventorylogs"("createdAt");

-- CreateIndex
CREATE INDEX "product_barcode_idx" ON "product"("barcode");

-- CreateIndex
CREATE INDEX "product_name_idx" ON "product"("name");

-- CreateIndex
CREATE INDEX "product_category_idx" ON "product"("category");

-- CreateIndex
CREATE INDEX "sale_invoicenum_idx" ON "sale"("invoicenum");

-- CreateIndex
CREATE INDEX "sale_createdAt_idx" ON "sale"("createdAt");
