-- DropForeignKey
ALTER TABLE "lesson" DROP CONSTRAINT "lesson_user_idx_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "joined_lesson" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_joined_lesson_fkey" FOREIGN KEY ("joined_lesson") REFERENCES "lesson"("idx") ON DELETE SET NULL ON UPDATE CASCADE;
