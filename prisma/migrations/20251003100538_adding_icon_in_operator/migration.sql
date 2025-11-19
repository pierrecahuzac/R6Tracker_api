/*
  Warnings:

  - Added the required column `icon` to the `Operator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Operator" ADD COLUMN     "icon" TEXT NOT NULL,
ALTER COLUMN "image" DROP NOT NULL;
