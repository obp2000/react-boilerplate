/*
  Warnings:

  - You are about to drop the column `address` on the `customer_city` table. All the data in the column will be lost.
  - You are about to drop the column `opsname` on the `customer_city` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "customer_city" DROP COLUMN "address",
DROP COLUMN "opsname";
