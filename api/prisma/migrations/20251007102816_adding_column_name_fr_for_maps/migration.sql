/*
  Warnings:

  - A unique constraint covering the columns `[nameFr]` on the table `Map` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nameFr` to the `Map` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Map" ADD COLUMN     "nameFr" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Map_nameFr_key" ON "public"."Map"("nameFr");
