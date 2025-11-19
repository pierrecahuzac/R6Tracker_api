-- AlterTable
ALTER TABLE "public"."Game" ADD COLUMN     "isFinished" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."Round" ADD COLUMN     "isFinished" BOOLEAN NOT NULL DEFAULT false;
