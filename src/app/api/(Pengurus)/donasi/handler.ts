import DonasiRequest from "@/app/(Model)/(Request)/DonasiRequest";
import serviceDonasi from "@/app/(Service)/(Donasi)/service_donasi";
import { createDonasiValidation } from "@/app/(Validation)/donasi_validation";
import AppResponse from "@/lib/helper/app_response";
import { errorHelper } from "@/lib/helper/error_helper";
import { verifyToken } from "@/lib/helper/verify_token";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GETHandler(request: NextRequest) {
  try {
    const user = verifyToken(request);

    const data = await serviceDonasi.getAllDonasiByUser(user.id);

    if (data?.length === 0) {
      return NextResponse.json(AppResponse.success("donasi is empty", data), {
        status: 200,
      });
    }

    return NextResponse.json(
      AppResponse.success("get all donasi success", data),
      { status: 200 }
    );
  } catch (error) {
    return errorHelper(error);
  }
}

export async function POSTHandler(request: NextRequest) {
  try {
    const user = verifyToken(request);

    const formData = await request.formData();

    const nominal = formData.get("nominal");
    const deskripsi = formData.get("deskripsi");
    const file = formData.get("gambar") as File | null;

    if (!file) {
      return NextResponse.json(AppResponse.error("gambar is required", 400), {
        status: 400,
      });
    }

    const body = {
      nominal,
      deskripsi,
    };

    const { error, value } = createDonasiValidation.validate(body);
    if (error) return errorHelper(error);

    const fileName = `${Date.now()}-${file?.name}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("uploads") // nama bucket
      .upload(fileName, file, {
        contentType: file.type,
      });

    if (uploadError) {
      console.error("Upload error", uploadError);
      return errorHelper(error);
    }

    const imageUrl = `${process.env.SUPABASE_NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/uploads/${fileName}`;

    const donasi = new DonasiRequest();
    donasi.id_user = user.id;
    donasi.nominal = value.nominal;
    donasi.deskripsi = value.deskripsi;
    if (fileName) {
      donasi.gambar = imageUrl;
    }

    const data = await serviceDonasi.createDonasi(donasi);

    return NextResponse.json(
      AppResponse.success("create donasi success", data),
      { status: 200 }
    );
  } catch (error) {
    return errorHelper(error);
  }
}
