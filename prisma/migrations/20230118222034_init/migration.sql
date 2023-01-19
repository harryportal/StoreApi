/*
  Warnings:

  - You are about to drop the column `price` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "price",
ADD COLUMN     "totalPrice" DECIMAL(65,30);
