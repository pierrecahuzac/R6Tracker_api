/*
  Warnings:

  - You are about to drop the column `code` on the `Platform` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `Platform` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Platform` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image` to the `Operator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Platform` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Platform_code_key";

-- AlterTable
ALTER TABLE "public"."Operator" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Platform" DROP COLUMN "code",
DROP COLUMN "label",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Platform_name_key" ON "public"."Platform"("name");
