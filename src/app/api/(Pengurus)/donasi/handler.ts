import DonasiRequest from "@/app/(Model)/(Request)/DonasiRequest";
import serviceDonasi from "@/app/(Service)/(Donasi)/service_donasi";
import { createDonasiValidation } from "@/app/(Validation)/donasi_validation";
import AppResponse from "@/lib/helper/app_response";
import { errorHelper } from "@/lib/helper/error_helper";
import { verifyToken } from "@/lib/helper/verify_token";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

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

    const body = {
      nominal,
      deskripsi,
    };

    const { error, value } = createDonasiValidation.validate(body);
    if (error) return errorHelper(error);

    let fileName = null;

    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Buat nama file unik (misal dengan timestamp)
      const timestamp = Date.now();
      fileName = `${timestamp}-${file.name}`;

      const uploadDir = path.join(process.cwd(), "public", "uploads");

      // Pastikan folder uploads ada
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);
    }

    const donasi = new DonasiRequest();
    donasi.id_user = user.id;
    donasi.nominal = value.nominal;
    donasi.deskripsi = value.deskripsi;
    if (fileName) {
      donasi.gambar = `${process.env.NEXT_PUBLIC_URL}/uploads/${fileName}`;
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
