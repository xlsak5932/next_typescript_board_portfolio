-- CreateTable
CREATE TABLE "users" (
    "idx" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "birth_year" INTEGER,
    "gender" TEXT,
    "phone_number" INTEGER,
    "nick_name" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("idx")
);
