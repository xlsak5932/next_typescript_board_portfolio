-- DropForeignKey
ALTER TABLE "lesson" DROP CONSTRAINT "lesson_user_idx_fkey";

-- AlterTable
ALTER TABLE "lesson" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "user_idx" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "lesson" ADD CONSTRAINT "lesson_user_idx_fkey" FOREIGN KEY ("user_idx") REFERENCES "users"("idx") ON DELETE SET NULL ON UPDATE CASCADE;
