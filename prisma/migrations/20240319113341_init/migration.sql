-- CreateTable
CREATE TABLE "email-change" (
    "token" CHAR(21) NOT NULL,
    "newEmail" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "validUntil" TIMESTAMP(6) NOT NULL DEFAULT (timezone('utc'::text, now()) + '2 days'::interval),

    CONSTRAINT "email-change_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "email-verification" (
    "token" CHAR(21) NOT NULL,
    "userId" INTEGER NOT NULL,
    "validUntil" TIMESTAMP(6) NOT NULL DEFAULT (timezone('utc'::text, now()) + '2 days'::interval),

    CONSTRAINT "email-verification_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "password-reset" (
    "token" CHAR(21) NOT NULL,
    "userId" INTEGER NOT NULL,
    "validUntil" TIMESTAMP(6) NOT NULL DEFAULT (timezone('utc'::text, now()) + '2 days'::interval),

    CONSTRAINT "password-reset_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "email-change_userId_key" ON "email-change"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "email-verification_userId_key" ON "email-verification"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "password-reset_userId_key" ON "password-reset"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- AddForeignKey
ALTER TABLE "email-change" ADD CONSTRAINT "email-change_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email-verification" ADD CONSTRAINT "email-verification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "password-reset" ADD CONSTRAINT "password-reset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
