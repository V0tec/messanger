import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function GET() {
  const token = (await cookies()).get("session")?.value;
  if (!token) return NextResponse.json(null, { status: 401 });

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(token, secret);

  return NextResponse.json({ id: payload.userId });
}
