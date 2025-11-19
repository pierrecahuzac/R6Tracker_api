/*
  Warnings:

  - You are about to drop the `ActiveGame` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."ActiveGame" DROP CONSTRAINT "ActiveGame_gameId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ActiveGame" DROP CONSTRAINT "ActiveGame_playerId_fkey";

-- DropTable
DROP TABLE "public"."ActiveGame";
