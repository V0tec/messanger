"use server";
import { prisma } from "../lib/prisma";

export async function createChannelAction(data: {
  name: string;
  avatar?: string;
}) {
  return await prisma.channel.create({ data });
}

export async function createMessageAction(data: {
  content: string;
  channelId: string;
}) {
  return await prisma.message.create({ data });
}
