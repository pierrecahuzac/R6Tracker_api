/*
  Warnings:

  - You are about to drop the column `code` on the `GameMode` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `Side` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `GameMode` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Result` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Side` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `GameMode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Side` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."GameMode_code_key";

-- DropIndex
DROP INDEX "public"."Result_code_key";

-- DropIndex
DROP INDEX "public"."Side_code_key";

-- AlterTable
ALTER TABLE "public"."GameMode" DROP COLUMN "code",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Result" DROP COLUMN "code",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Side" DROP COLUMN "code",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GameMode_name_key" ON "public"."GameMode"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Result_name_key" ON "public"."Result"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Side_name_key" ON "public"."Side"("name");
