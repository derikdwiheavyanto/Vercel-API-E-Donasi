import { UserRequest } from "@/app/(Model)/(Request)/UserRequest";
import serviceAdmin from "@/app/(Service)/(Admin)/service_admin";
import { registerValidation } from "@/app/(Validation)/auth_validation";
import AppError from "@/lib/helper/app_error";
import AppResponse from "@/lib/helper/app_response";
import { errorHelper } from "@/lib/helper/error_helper";
import { verifyToken } from "@/lib/helper/verify_token";
import { NextRequest, NextResponse } from "next/server";

export async function GETHandler(request: NextRequest) {
  try {
    verifyToken(request);

    const data = await serviceAdmin.getAllUserPengurusService();

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
    verifyToken(request);

    const formData = await request.formData();

    const body = {
      name: formData.get("name"),
      username: formData.get("username"),
      password: formData.get("password"),
    };

    const { error, value } = registerValidation.validate(body);

    if (error) {
      return errorHelper(error);
    }

    const usermodel = new UserRequest();
    usermodel.name = value.name;
    usermodel.username = value.username;
    usermodel.password = value.password;

    const result = await serviceAdmin
      .createUserPengurusService(usermodel)
      .catch((error) => {
        if (error.code === "P2002") {
          throw new AppError("User already exists", 400);
        }
      });

    return NextResponse.json(
      AppResponse.success("create user pengurus success", result),
      { status: 200 }
    );
  } catch (error) {
    return errorHelper(error);
  }
}
