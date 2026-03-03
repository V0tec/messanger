import { prisma } from "@/src/lib/prisma";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { login, password } = await req.json();

  const hachedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { login, password: hachedPassword },
  });

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ userId: user.id })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(secret);

  (await cookies()).set("session", token, {
    httpOnly: true,
    secure: true,
    path: "/",
  });

  return NextResponse.json({ ok: true });
}
