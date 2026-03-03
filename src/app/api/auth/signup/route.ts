import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const newUser = await request.json();
    const totalUsers = await prisma.user.findUnique({
      where: { login: newUser.login },
    });

    if (totalUsers) {
      return NextResponse.json(
        { message: "login already exists" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(newUser.password, 10);

    const user = await prisma.user.create({
      data: {
        login: newUser.login,
        password: hashedPassword,
      },
    });

    const { password, ...userWithoutPassword } = user;

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new SignJWT({ userId: user.id })
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
