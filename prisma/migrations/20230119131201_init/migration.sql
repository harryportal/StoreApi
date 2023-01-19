-- CreateEnum
CREATE TYPE "Status" AS ENUM ('FAILED', 'SUCCESS', 'PENDING');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';
