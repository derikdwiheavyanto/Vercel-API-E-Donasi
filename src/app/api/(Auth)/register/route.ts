import { UserRequest } from "@/app/(Model)/(Request)/UserRequest";
import serviceAuth from "@/app/(Service)/(Auth)/service_auth";
import { registerValidation } from "@/app/(Validation)/auth_validation";
import AppError from "@/lib/helper/app_error";
import AppResponse from "@/lib/helper/app_response";
import { errorHelper } from "@/lib/helper/error_helper";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
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

    const result = await serviceAuth.registerService(usermodel);

    if (!result) {
      throw new AppError("User already exists", 400);
    }

    return NextResponse.json(
      AppResponse.success("Register success", {
        id: result.id,
        name: result.name,
        username: result.username,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return errorHelper(error);
  }
}
