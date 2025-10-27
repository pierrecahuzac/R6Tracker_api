-- DropForeignKey
ALTER TABLE "public"."Game" DROP CONSTRAINT "Game_mapId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Game" DROP CONSTRAINT "Game_modeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Game" DROP CONSTRAINT "Game_platformId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Game" DROP CONSTRAINT "Game_playerId_fkey";

-- AlterTable
ALTER TABLE "public"."Game" ALTER COLUMN "playerId" DROP NOT NULL,
ALTER COLUMN "mapId" DROP NOT NULL,
ALTER COLUMN "modeId" DROP NOT NULL,
ALTER COLUMN "platformId" DROP NOT NULL,
ALTER COLUMN "playerScore" DROP NOT NULL,
ALTER COLUMN "opponentScore" DROP NOT NULL,
ALTER COLUMN "overtime" DROP NOT NULL,
ALTER COLUMN "totalKills" DROP NOT NULL,
ALTER COLUMN "totalDeaths" DROP NOT NULL,
ALTER COLUMN "totalAssists" DROP NOT NULL,
ALTER COLUMN "totalPoints" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Game" ADD CONSTRAINT "Game_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "public"."Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Game" ADD CONSTRAINT "Game_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "public"."Map"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Game" ADD CONSTRAINT "Game_modeId_fkey" FOREIGN KEY ("modeId") REFERENCES "public"."GameMode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Game" ADD CONSTRAINT "Game_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "public"."Platform"("id") ON DELETE SET NULL ON UPDATE CASCADE;
