import serviceAdmin from "@/app/(Service)/(Admin)/service_admin";
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
    verifyToken(request);

    const { id } = await params;

    if (!id) {
      throw new AppError("id not found", 404);
    }

    await serviceAdmin.deleteUserPengurusService(id);

    return NextResponse.json(AppResponse.success("delete user success"), {
      status: 200,
    });
  } catch (error) {
    return errorHelper(error);
  }
}

export async function ChangeActiveHandler(
  requset: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    verifyToken(requset);

    const { id } = await params;

    if (!id) {
      throw new AppError("id param not found", 404);
    }

    const data = await serviceAdmin.changeActiveUserPengurusService(id);

    return NextResponse.json(
      AppResponse.success("change status active user success", data),
      {
        status: 200,
      }
    );
  } catch (error) {
    return errorHelper(error);
  }
}
