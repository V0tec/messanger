import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ messageId: string }> },
) {
  try {
    const { messageId } = await context.params;

    await prisma.message.delete({
      where: { id: messageId },
    });

    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Fail" }, { status: 500 });
  }
}
