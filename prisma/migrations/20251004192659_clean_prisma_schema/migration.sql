/*
  Warnings:

  - You are about to drop the column `startingSideId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `totalAssists` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `totalDeaths` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `totalKills` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `totalPoints` on the `Game` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Game" DROP CONSTRAINT "Game_startingSideId_fkey";

-- AlterTable
ALTER TABLE "public"."Game" DROP COLUMN "startingSideId",
DROP COLUMN "totalAssists",
DROP COLUMN "totalDeaths",
DROP COLUMN "totalKills",
DROP COLUMN "totalPoints";
