/*
  Warnings:

  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "post";

-- CreateTable
CREATE TABLE "lesson" (
    "idx" TEXT NOT NULL,
    "lesson_type" TEXT NOT NULL,
    "current_people" INTEGER NOT NULL,
    "class_number" INTEGER NOT NULL,
    "class_time" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "user_idx" TEXT NOT NULL,

    CONSTRAINT "lesson_pkey" PRIMARY KEY ("idx")
);

-- AddForeignKey
ALTER TABLE "lesson" ADD CONSTRAINT "lesson_user_idx_fkey" FOREIGN KEY ("user_idx") REFERENCES "users"("idx") ON DELETE RESTRICT ON UPDATE CASCADE;
