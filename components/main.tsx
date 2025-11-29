import { getRooms } from "@/lib/data";
import { notFound } from "next/navigation";
import MainClient from "@/components/main-client";

export default async function Page() {
  const rooms = await getRooms();
  if (!rooms) return notFound();

  return <MainClient rooms={rooms} />;
}
