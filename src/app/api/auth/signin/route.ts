import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const totalUser = await request.json();
    const totalUsers = await prisma.user.findUnique({
      where: { login: totalUser.login },
    });

    if (!totalUsers) {
      return NextResponse.json({ message: "unknown user" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(
      totalUser.password,
      totalUsers.password,
    );

    if (!isMatch) {
      return NextResponse.json({ message: "failed password" }, { status: 401 });
    }

    const { password, ...userWithoutPassword } = totalUsers;

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new SignJWT({ userId: totalUsers.id })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(secret);

    (await cookies()).set("session", token, {
      httpOnly: true,
      secure: true,
      path: "/",
    });

    return NextResponse.json(userWithoutPassword);
  } catch {
    return NextResponse.json({ message: "fatal error" }, { status: 500 });
  }
}
