-- AddForeignKey
ALTER TABLE "public"."Donasi" ADD CONSTRAINT "Donasi_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
