/*
  Warnings:

  - You are about to drop the column `numero` on the `mesa` table. All the data in the column will be lost.
  - Added the required column `mesa` to the `Mesa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mesa` DROP COLUMN `numero`,
    ADD COLUMN `mesa` INTEGER NOT NULL;
