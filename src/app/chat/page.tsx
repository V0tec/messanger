import { prisma } from "@/src/lib/prisma";
import MainApp from "@/src/features/app/MainApp";

export default async function ChatPage() {
  const channels = await prisma.channel.findMany();

  return <MainApp initialChannels={channels} />;
}
