/*
  Warnings:

  - Added the required column `id_role` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('admin', 'pengurus');

-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "id_role" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."roles" (
    "id" SERIAL NOT NULL,
    "name" "public"."UserRole" NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."user" ADD CONSTRAINT "user_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "public"."roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
