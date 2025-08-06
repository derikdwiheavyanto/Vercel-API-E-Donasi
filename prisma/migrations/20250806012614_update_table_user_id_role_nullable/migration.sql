-- DropForeignKey
ALTER TABLE "public"."user" DROP CONSTRAINT "user_id_role_fkey";

-- AlterTable
ALTER TABLE "public"."user" ALTER COLUMN "id_role" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."user" ADD CONSTRAINT "user_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "public"."roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
