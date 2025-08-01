import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";

export default function middleware(request: Request) {
  const bearerToken = request.headers.get("Authorization");

  if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Token not found" }, { status: 403 });
  }

  const token = bearerToken.split(" ")[1];

  try {
    const payload = verify(token, process.env.JWT_SECRET as string);

    const response = NextResponse.next();
    response.headers.set("x-User-Payload", JSON.stringify(payload));

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}

export const config = {
  matcher: "/api/:path*",
  middleware: true,
  exclude: ["/api/login", "/api/register"],
};
