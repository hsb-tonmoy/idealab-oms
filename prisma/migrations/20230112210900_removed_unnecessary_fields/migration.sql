/*
  Warnings:

  - You are about to drop the column `secret` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `File` table. All the data in the column will be lost.
  - Added the required column `color` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "File_secret_key";

-- DropIndex
DROP INDEX "File_url_key";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "secret",
DROP COLUMN "type",
DROP COLUMN "url",
ALTER COLUMN "color" DROP NOT NULL,
ALTER COLUMN "notes" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT;
