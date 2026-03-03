import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  if (
    !token &&
    (request.nextUrl.pathname === "/" ||
      request.nextUrl.pathname.startsWith("/chat"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    if (token) {
      await jwtVerify(token, secret);
      return NextResponse.next();
    }
  } catch (err) {
    return NextResponse.redirect(new URL("login", request.url));
  }
}

export const config = {
  matсher: ["/", "/chat/:path*", "/profile/:path*"],
};
