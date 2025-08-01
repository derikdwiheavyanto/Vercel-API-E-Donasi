import jwt from "jsonwebtoken";
import AppError from "./app_error";
import { NextRequest } from "next/server";
import { UserResponse } from "@/app/(Model)/(Response)/UserResponse";

export const verifyToken = (request: NextRequest) => {
  try {
    const token = request.headers.get("X-User-Token") as string;
    if (!token) throw new AppError("Token not found", 401);

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);

    const payload =
      typeof decodedToken === "string"
        ? JSON.parse(decodedToken)
        : decodedToken;

    const user = new UserResponse(payload);

    return user;
  } catch (error) {
    console.log(error);
    throw new AppError(`${error}`, 500);
  }
};
