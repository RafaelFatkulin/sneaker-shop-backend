/*
  Warnings:

  - The primary key for the `email-change` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `email-verification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `password-reset` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "email-change" DROP CONSTRAINT "email-change_pkey",
ALTER COLUMN "token" SET DATA TYPE CHAR(36),
ADD CONSTRAINT "email-change_pkey" PRIMARY KEY ("token");

-- AlterTable
ALTER TABLE "email-verification" DROP CONSTRAINT "email-verification_pkey",
ALTER COLUMN "token" SET DATA TYPE CHAR(36),
ADD CONSTRAINT "email-verification_pkey" PRIMARY KEY ("token");

-- AlterTable
ALTER TABLE "password-reset" DROP CONSTRAINT "password-reset_pkey",
ALTER COLUMN "token" SET DATA TYPE CHAR(36),
ADD CONSTRAINT "password-reset_pkey" PRIMARY KEY ("token");
