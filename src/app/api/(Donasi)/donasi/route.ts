import DonasiRequest from "@/app/(Model)/(Request)/DonasiRequest";
import serviceDonasi from "@/app/(Service)/(Donasi)/service_donasi";
import { createDonasiValidation } from "@/app/(Validation)/donasi_validation";
import AppResponse from "@/lib/helper/app_response";
import { errorHelper } from "@/lib/helper/error_helper";
import { verifyToken } from "@/lib/helper/verify_token";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
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

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);

    const formData = await request.formData();

    const body = {
      nominal: formData.get("nominal"),
      deskripsi: formData.get("deskripsi"),
    };

    const { error, value } = createDonasiValidation.validate(body);

    if (error) {
      return errorHelper(error);
    }

    const donasi = new DonasiRequest();
    donasi.id_user = user.id;
    donasi.nominal = value.nominal;
    donasi.deskripsi = value.deskripsi;

    const data = await serviceDonasi.createDonasi(donasi);

    return NextResponse.json(
      AppResponse.success("create donasi success", data),
      {
        status: 200,
      }
    );
  } catch (error) {
    return errorHelper(error);
  }
}





