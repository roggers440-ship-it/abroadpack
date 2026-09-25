-- CreateTable
CREATE TABLE "Preset" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Preset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PresetItem" (
    "id" TEXT NOT NULL,
    "presetId" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "qty" INTEGER NOT NULL DEFAULT 1,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PresetItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Preset_slug_key" ON "Preset"("slug");

-- CreateIndex
CREATE INDEX "PresetItem_presetId_idx" ON "PresetItem"("presetId");

-- CreateIndex
CREATE UNIQUE INDEX "PresetItem_presetId_variantId_key" ON "PresetItem"("presetId", "variantId");

-- AddForeignKey
ALTER TABLE "PresetItem" ADD CONSTRAINT "PresetItem_presetId_fkey" FOREIGN KEY ("presetId") REFERENCES "Preset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PresetItem" ADD CONSTRAINT "PresetItem_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "Variant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
