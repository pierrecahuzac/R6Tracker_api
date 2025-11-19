/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Map` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `Map` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Map" ADD COLUMN     "url" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Map_url_key" ON "public"."Map"("url");
