/*
  Warnings:

  - You are about to drop the `CategoriesOfProducts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categories` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CategoriesOfProducts" DROP CONSTRAINT "CategoriesOfProducts_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOfProducts" DROP CONSTRAINT "CategoriesOfProducts_productId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "categories" TEXT NOT NULL;

-- DropTable
DROP TABLE "CategoriesOfProducts";

-- DropTable
DROP TABLE "Category";
