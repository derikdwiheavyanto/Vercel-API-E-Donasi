import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/api/login", "/api/register"];

export function middleware(request: NextRequest) {
  try {
    if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
      return NextResponse.next();
    }

    const bearerToken = request.headers.get("Authorization");

    if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Token not found" }, { status: 403 });
    }

    const token = bearerToken.split(" ")[1];

    const response = NextResponse.next();
    response.headers.set("X-User-Token", token);

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}

export const config = {
  matcher: ["/api/:path*"],
};
