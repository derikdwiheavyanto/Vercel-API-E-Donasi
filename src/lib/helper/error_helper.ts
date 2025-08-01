import { NextResponse } from "next/server";
import AppResponse from "./app_response";
import AppError from "./app_error";
import Joi from "joi";

export const errorHelper = (error: unknown) => {
  if (error instanceof AppError) {
    return NextResponse.json(
      AppResponse.error(`${error.message}`, error.status),
      {
        status: error.status,
      }
    );
  }

  if (error instanceof Joi.ValidationError) {
    return NextResponse.json(AppResponse.validationError(error.message), {
      status: 400,
    });
  }

  return NextResponse.json(AppResponse.error(`Server error : ${error}`), {
    status: 500,
  });
};
