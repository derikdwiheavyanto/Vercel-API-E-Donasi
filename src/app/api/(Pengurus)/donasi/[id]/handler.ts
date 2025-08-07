import DonasiRequest from "@/app/(Model)/(Request)/DonasiRequest";
import serviceDonasi from "@/app/(Service)/(Donasi)/service_donasi";
import { editDonasiValidation } from "@/app/(Validation)/donasi_validation";
import AppError from "@/lib/helper/app_error";
import AppResponse from "@/lib/helper/app_response";
import { errorHelper } from "@/lib/helper/error_helper";
import { verifyToken } from "@/lib/helper/verify_token";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function DELETEHandler(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = verifyToken(request);

    const { id } = await params;

    if (!id) {
      throw new AppError("id not found", 404);
    }

    const data = await serviceDonasi.deleteDonasi(id, user.id);

    return NextResponse.json(
      AppResponse.success("delete donasi success", data),
      {
        status: 200,
      }
    );
  } catch (error) {
    return errorHelper(error);
  }
}

export async function PATCHHandler(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = verifyToken(request);

    const { id } = await params;

    if (!id) {
      throw new AppError("id not found", 404);
    }

    const formData = await request.formData();

    const file = formData.get("gambar") as File | null;

    const body = {
      nominal: formData.get("nominal"),
      deskripsi: formData.get("deskripsi"),
    };

    const { error, value } = editDonasiValidation.validate(body);

    if (error) {
      return errorHelper(error);
    }

    const fileName = `${Date.now()}-${file?.name}`;
    const imageUrl = `${process.env.SUPABASE_NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/uploads/${fileName}`;

    let storage = null;

    if (file) {
      storage = await supabase.storage
        .from("uploads") // nama bucket
        .upload(fileName, file, {
          contentType: file.type,
        });
    }

    if (storage?.error) {
      console.error("Upload error", storage.error);
      return errorHelper(error);
    }

    const donasi = new DonasiRequest();
    donasi.id_user = user.id;
    donasi.nominal = value.nominal;
    donasi.deskripsi = value.deskripsi;
    if (storage?.data) {
      donasi.gambar = imageUrl;
    }

    const data = await serviceDonasi.editDonasi(id, donasi);

    return NextResponse.json(AppResponse.success("edit donasi success", data), {
      status: 200,
    });
  } catch (error) {
    return errorHelper(error);
  }
}

export async function GETHandler(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    verifyToken(request);

    const { id } = await params;

    if (!id) {
      throw new AppError("id not found", 404);
    }

    const data = await serviceDonasi.findDonasiById(id);

    return NextResponse.json(AppResponse.success("get donasi success", data), {
      status: 200,
    });
  } catch (error) {
    return errorHelper(error);
  }
}
