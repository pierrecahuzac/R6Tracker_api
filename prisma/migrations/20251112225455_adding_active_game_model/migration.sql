-- CreateTable
CREATE TABLE "ActiveGame" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,

    CONSTRAINT "ActiveGame_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ActiveGame" ADD CONSTRAINT "ActiveGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveGame" ADD CONSTRAINT "ActiveGame_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
