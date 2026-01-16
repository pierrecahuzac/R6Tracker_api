/*
  Warnings:

  - You are about to drop the `ActiveGame` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[activeGameId]` on the table `Player` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ActiveGame" DROP CONSTRAINT "ActiveGame_gameId_fkey";

-- DropForeignKey
ALTER TABLE "ActiveGame" DROP CONSTRAINT "ActiveGame_playerId_fkey";

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "activeGameId" TEXT;

-- DropTable
DROP TABLE "ActiveGame";

-- CreateIndex
CREATE UNIQUE INDEX "Player_activeGameId_key" ON "Player"("activeGameId");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_activeGameId_fkey" FOREIGN KEY ("activeGameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;
