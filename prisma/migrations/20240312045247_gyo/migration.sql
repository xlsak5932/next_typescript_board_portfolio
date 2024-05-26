-- CreateTable
CREATE TABLE "education" (
    "idx" SERIAL NOT NULL,
    "edu_time" TEXT NOT NULL,
    "edu_person" INTEGER NOT NULL DEFAULT 0,
    "edu_description" TEXT NOT NULL,
    "edu_target" TEXT NOT NULL,
    "edu_fee" INTEGER NOT NULL,

    CONSTRAINT "education_pkey" PRIMARY KEY ("idx")
);
