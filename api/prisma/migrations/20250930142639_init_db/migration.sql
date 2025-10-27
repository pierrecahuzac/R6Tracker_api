-- CreateTable
CREATE TABLE "public"."Platform" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Platform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Side" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Side_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GameMode" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "GameMode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Result" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Player" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PlayerAccount" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "platformId" INTEGER NOT NULL,
    "gamertag" TEXT NOT NULL,
    "externalId" TEXT,

    CONSTRAINT "PlayerAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Map" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Map_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Operator" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sideId" INTEGER NOT NULL,

    CONSTRAINT "Operator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Game" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3),
    "playerId" INTEGER NOT NULL,
    "mapId" INTEGER NOT NULL,
    "modeId" INTEGER NOT NULL,
    "platformId" INTEGER NOT NULL,
    "accountId" INTEGER,
    "startingSideId" INTEGER,
    "playerScore" INTEGER NOT NULL DEFAULT 0,
    "opponentScore" INTEGER NOT NULL DEFAULT 0,
    "resultId" INTEGER,
    "overtime" BOOLEAN NOT NULL DEFAULT false,
    "totalKills" INTEGER NOT NULL DEFAULT 0,
    "totalDeaths" INTEGER NOT NULL DEFAULT 0,
    "totalAssists" INTEGER NOT NULL DEFAULT 0,
    "totalPoints" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Round" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameId" INTEGER NOT NULL,
    "roundNumber" INTEGER NOT NULL,
    "sideId" INTEGER NOT NULL,
    "winningSideId" INTEGER NOT NULL,
    "operatorId" INTEGER,
    "kills" INTEGER NOT NULL DEFAULT 0,
    "death" BOOLEAN NOT NULL DEFAULT false,
    "assists" INTEGER NOT NULL DEFAULT 0,
    "disconnected" BOOLEAN NOT NULL DEFAULT false,
    "points" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Round_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Platform_code_key" ON "public"."Platform"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Side_code_key" ON "public"."Side"("code");

-- CreateIndex
CREATE UNIQUE INDEX "GameMode_code_key" ON "public"."GameMode"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Result_code_key" ON "public"."Result"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Player_email_key" ON "public"."Player"("email");

-- CreateIndex
CREATE INDEX "PlayerAccount_platformId_gamertag_idx" ON "public"."PlayerAccount"("platformId", "gamertag");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerAccount_playerId_platformId_key" ON "public"."PlayerAccount"("playerId", "platformId");

-- CreateIndex
CREATE UNIQUE INDEX "Map_name_key" ON "public"."Map"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Operator_name_key" ON "public"."Operator"("name");

-- CreateIndex
CREATE INDEX "Game_playerId_idx" ON "public"."Game"("playerId");

-- CreateIndex
CREATE INDEX "Game_mapId_idx" ON "public"."Game"("mapId");

-- CreateIndex
CREATE INDEX "Game_modeId_idx" ON "public"."Game"("modeId");

-- CreateIndex
CREATE INDEX "Game_platformId_idx" ON "public"."Game"("platformId");

-- CreateIndex
CREATE INDEX "Game_date_idx" ON "public"."Game"("date");

-- CreateIndex
CREATE INDEX "Round_gameId_idx" ON "public"."Round"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "Round_gameId_roundNumber_key" ON "public"."Round"("gameId", "roundNumber");

-- AddForeignKey
ALTER TABLE "public"."PlayerAccount" ADD CONSTRAINT "PlayerAccount_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "public"."Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PlayerAccount" ADD CONSTRAINT "PlayerAccount_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "public"."Platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Operator" ADD CONSTRAINT "Operator_sideId_fkey" FOREIGN KEY ("sideId") REFERENCES "public"."Side"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Game" ADD CONSTRAINT "Game_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "public"."Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Game" ADD CONSTRAINT "Game_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "public"."Map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Game" ADD CONSTRAINT "Game_modeId_fkey" FOREIGN KEY ("modeId") REFERENCES "public"."GameMode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Game" ADD CONSTRAINT "Game_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "public"."Platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Game" ADD CONSTRAINT "Game_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "public"."PlayerAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Game" ADD CONSTRAINT "Game_startingSideId_fkey" FOREIGN KEY ("startingSideId") REFERENCES "public"."Side"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Game" ADD CONSTRAINT "Game_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "public"."Result"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Round" ADD CONSTRAINT "Round_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "public"."Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Round" ADD CONSTRAINT "Round_sideId_fkey" FOREIGN KEY ("sideId") REFERENCES "public"."Side"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Round" ADD CONSTRAINT "Round_winningSideId_fkey" FOREIGN KEY ("winningSideId") REFERENCES "public"."Side"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Round" ADD CONSTRAINT "Round_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "public"."Operator"("id") ON DELETE SET NULL ON UPDATE CASCADE;
