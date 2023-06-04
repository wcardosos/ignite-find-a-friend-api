/*
  Warnings:

  - A unique constraint covering the columns `[pet_id]` on the table `adoptions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `petId` to the `adoption_requirements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pet_id` to the `adoptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization_id` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "adoption_requirements" ADD COLUMN     "petId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "adoptions" ADD COLUMN     "pet_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "organization_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PetAddress" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "house_number" TEXT,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "PetAddress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PetAddress_pet_id_key" ON "PetAddress"("pet_id");

-- CreateIndex
CREATE UNIQUE INDEX "adoptions_pet_id_key" ON "adoptions"("pet_id");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetAddress" ADD CONSTRAINT "PetAddress_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adoptions" ADD CONSTRAINT "adoptions_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adoption_requirements" ADD CONSTRAINT "adoption_requirements_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
