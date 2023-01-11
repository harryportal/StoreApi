/*
  Warnings:

  - Added the required column `userId` to the `ProductRating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductRating" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductRating" ADD CONSTRAINT "ProductRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
