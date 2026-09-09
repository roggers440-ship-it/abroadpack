-- AlterTable
ALTER TABLE "Variant" ADD COLUMN     "availability" TEXT NOT NULL DEFAULT 'Available',
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
