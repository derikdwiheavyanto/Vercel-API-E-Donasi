import DonasiRequest from "@/app/(Model)/(Request)/DonasiRequest";
import serviceDonasi from "@/app/(Service)/(Donasi)/service_donasi";
import { editDonasiValidation } from "@/app/(Validation)/donasi_validation";
import AppError from "@/lib/helper/app_error";
import AppResponse from "@/lib/helper/app_response";
import { errorHelper } from "@/lib/helper/error_helper";
import { verifyToken } from "@/lib/helper/verify_token";
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

    const body = {
      nominal: formData.get("nominal"),
      deskripsi: formData.get("deskripsi"),
    };

    const { error, value } = editDonasiValidation.validate(body);

    if (error) {
      return errorHelper(error);
    }

    const donasi = new DonasiRequest();
    donasi.id_user = user.id;
    donasi.nominal = value.nominal;
    donasi.deskripsi = value.deskripsi;

    const data = await serviceDonasi.editDonasi(id, donasi);

    return NextResponse.json(AppResponse.success("edit donasi success", data), {
      status: 200,
    });
  } catch (error) {
    return errorHelper(error);
  }
}
