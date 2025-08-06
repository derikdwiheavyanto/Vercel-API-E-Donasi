import authValidation from "@/app/(Validation)/auth_validation";
import { NextRequest, NextResponse } from "next/server";
import service from "../../../(Service)/(Auth)/service_auth";
import AppResponse from "@/lib/helper/app_response";
import { errorHelper } from "@/lib/helper/error_helper";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const body = {
      username: formData.get("username") ?? "",
      password: formData.get("password") ?? "",
    };

    const { error, value } = authValidation.loginValidation.validate(body);

    if (error) {
      return errorHelper(error);
    }

    const checkLogin = await service.loginService(
      value.username,
      value.password
    );

    if (!checkLogin) {
      return NextResponse.json(
        AppResponse.error("Invalid username or password", 401),
        { status: 401 }
      );
    }

    return NextResponse.json(
      AppResponse.success("Login success", {
        id: checkLogin.payload.id,
        name: checkLogin.payload.name,
        username: checkLogin.payload.username,
        role: checkLogin.payload.role,
        token: checkLogin.token,
      }),
      { status: 200 }
    );
  } catch (error) {
    return errorHelper(error);
  }
}
