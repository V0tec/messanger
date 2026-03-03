import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const messages = await prisma.message.findMany({
    where: { channelId: id },
    include: { author: { select: { login: true } } },
  });

  return NextResponse.json(messages);
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    console.log("TOKEN FROM COOKIES:", token);
    if (!token)
      return NextResponse.json({ message: "no login" }, { status: 401 });
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const authorId = payload.userId;

    const { id } = await context.params;
    const data = await request.json();
    console.log("DATA FROM FRONT:", data);
    const newMessage = await prisma.message.create({
      data: {
        content: data.content,
        channelId: id,
        authorId: authorId as string,
      },
      include: { author: { select: { login: true } } },
    });
    return NextResponse.json(newMessage);
  } catch (error) {
    console.error("JWT ERROR:", error); // ОЦЕ ТОБІ ВСЕ РОЗКАЖЕ
    return NextResponse.json({ message: "invalid token" }, { status: 401 });
  }
}
