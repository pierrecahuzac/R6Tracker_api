/*
  Warnings:

  - You are about to drop the column `resultId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the `Result` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Game" DROP CONSTRAINT "Game_resultId_fkey";

-- AlterTable
ALTER TABLE "public"."Game" DROP COLUMN "resultId";

-- DropTable
DROP TABLE "public"."Result";
