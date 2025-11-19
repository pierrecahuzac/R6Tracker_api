/*
  Warnings:

  - You are about to drop the column `winningSideId` on the `Round` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Round" DROP CONSTRAINT "Round_winningSideId_fkey";

-- AlterTable
ALTER TABLE "public"."Round" DROP COLUMN "winningSideId";
