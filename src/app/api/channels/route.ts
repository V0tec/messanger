import { NextResponse } from "next/server";
import { Channel } from "@/src/features/channels/channelsSlice";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
  return NextResponse.json(await prisma.channel.findMany());
}

export async function POST(request: Request) {
  const newChannel = await request.json();
  const createdChannel = await prisma.channel.create({ data: newChannel });
  return NextResponse.json(createdChannel);
}
