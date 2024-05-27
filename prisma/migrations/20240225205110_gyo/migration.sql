/*
  Warnings:

  - You are about to drop the column `views` on the `notice` table. All the data in the column will be lost.
  - Added the required column `content` to the `notice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notice" DROP COLUMN "views",
ADD COLUMN     "content" TEXT NOT NULL;
