import { NextRequest, NextResponse } from "next/server";
import AppResponse from "../helper/app_response";
import { verifyToken } from "../helper/verify_token";

export function WithRole<TArgs extends [NextRequest, ...unknown[]], TReturn>(
  handler: (...args: TArgs) => Promise<TReturn>,
  allowedRoles: string[]
): (...args: TArgs) => Promise<TReturn> {
  return async (...args: TArgs): Promise<TReturn> => {
    const req = args[0];

    if (!(req instanceof NextRequest)) {
      return NextResponse.json(
        AppResponse.error("Instaceof first args must be NextRequest", 500),
        { status: 500 }
      ) as TReturn;
    }

    const user = verifyToken(req);

    if (!allowedRoles.includes(user.role.name)) {
      return NextResponse.json(
        AppResponse.error("You don't have permission to access this API", 401),
        { status: 401 }
      ) as TReturn;
    }

    return await handler(...args);
  };
}
