import { NextResponse } from "next/server";
import AppResponse from "./app_response";
import AppError from "./app_error";

export const errorHelper = (error: unknown) => {
  if (error instanceof AppError) {
    return NextResponse.json(AppResponse.error(`${error.message}`, error.status), {
      status: error.status,
    });
  }

  return NextResponse.json(AppResponse.error(`Server error : ${error}`), {
    status: 500,
  });
};
