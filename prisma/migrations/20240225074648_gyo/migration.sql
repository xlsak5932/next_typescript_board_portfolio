-- CreateTable
CREATE TABLE "notice" (
    "idx" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "views" INTEGER NOT NULL,

    CONSTRAINT "notice_pkey" PRIMARY KEY ("idx")
);
