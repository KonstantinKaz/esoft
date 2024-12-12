-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'REALTOR', 'CLIENT');

-- CreateEnum
CREATE TYPE "EstateType" AS ENUM ('APARTMENT', 'HOUSE', 'LAND');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_profile" (
    "first_name" TEXT,
    "last_name" TEXT,
    "middle_name" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "realtor_profile" (
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "middle_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "commission" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "admin_profile" (
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "estate" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "EstateType" NOT NULL,
    "city" TEXT,
    "street" TEXT,
    "house" TEXT,

    CONSTRAINT "estate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "apartments" (
    "apartment" TEXT,
    "floor" INTEGER,
    "rooms" INTEGER,
    "total_area" DOUBLE PRECISION,
    "estate_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "houses" (
    "floors" INTEGER,
    "rooms" INTEGER,
    "total_area" DOUBLE PRECISION,
    "estate_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "lands" (
    "total_area" DOUBLE PRECISION,
    "coordinates" JSONB,
    "estate_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "offers" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" INTEGER NOT NULL,
    "estate_id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "realtor_id" TEXT NOT NULL,

    CONSTRAINT "offers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deals" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "offer_id" TEXT NOT NULL,

    CONSTRAINT "deals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "demands" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estateType" "EstateType" NOT NULL,
    "address" TEXT,
    "min_price" INTEGER,
    "max_price" INTEGER,
    "min_area" DOUBLE PRECISION,
    "max_area" DOUBLE PRECISION,
    "min_rooms" INTEGER,
    "max_rooms" INTEGER,
    "min_floor" INTEGER,
    "max_floor" INTEGER,
    "min_floors" INTEGER,
    "max_floors" INTEGER,
    "client_id" TEXT NOT NULL,
    "realtor_id" TEXT NOT NULL,

    CONSTRAINT "demands_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_profile_phone_key" ON "client_profile"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "client_profile_email_key" ON "client_profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "client_profile_userId_key" ON "client_profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "realtor_profile_phone_key" ON "realtor_profile"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "realtor_profile_email_key" ON "realtor_profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "realtor_profile_userId_key" ON "realtor_profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "admin_profile_phone_key" ON "admin_profile"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "admin_profile_email_key" ON "admin_profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admin_profile_userId_key" ON "admin_profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "apartments_estate_id_key" ON "apartments"("estate_id");

-- CreateIndex
CREATE UNIQUE INDEX "houses_estate_id_key" ON "houses"("estate_id");

-- CreateIndex
CREATE UNIQUE INDEX "lands_estate_id_key" ON "lands"("estate_id");

-- AddForeignKey
ALTER TABLE "client_profile" ADD CONSTRAINT "client_profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "realtor_profile" ADD CONSTRAINT "realtor_profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_profile" ADD CONSTRAINT "admin_profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apartments" ADD CONSTRAINT "apartments_estate_id_fkey" FOREIGN KEY ("estate_id") REFERENCES "estate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "houses" ADD CONSTRAINT "houses_estate_id_fkey" FOREIGN KEY ("estate_id") REFERENCES "estate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lands" ADD CONSTRAINT "lands_estate_id_fkey" FOREIGN KEY ("estate_id") REFERENCES "estate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_estate_id_fkey" FOREIGN KEY ("estate_id") REFERENCES "estate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_realtor_id_fkey" FOREIGN KEY ("realtor_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deals" ADD CONSTRAINT "deals_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "offers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demands" ADD CONSTRAINT "demands_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demands" ADD CONSTRAINT "demands_realtor_id_fkey" FOREIGN KEY ("realtor_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
