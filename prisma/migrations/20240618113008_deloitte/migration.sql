-- CreateEnum
CREATE TYPE "Employment" AS ENUM ('Fulltime', 'Parttime', 'Freelancer', 'Selfemployed');

-- CreateEnum
CREATE TYPE "MariedStatus" AS ENUM ('Maried', 'Unmaried');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "addTaxes" BOOLEAN NOT NULL DEFAULT false,
    "EmploymentInfo" "Employment",
    "salary" INTEGER,
    "houseNoumber" INTEGER,
    "location" TEXT,
    "mariedStatus" "MariedStatus",
    "Expenses" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);
