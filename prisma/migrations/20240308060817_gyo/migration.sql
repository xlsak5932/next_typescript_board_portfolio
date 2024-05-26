/*
  Warnings:

  - Added the required column `lesson_class` to the `lesson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lesson" ADD COLUMN     "lesson_class" INTEGER NOT NULL;
