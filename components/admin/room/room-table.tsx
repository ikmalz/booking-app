import { getRooms } from "@/lib/data";
import RoomTableClient from "./room-table-client";

const RoomTable = async () => {
  const rooms = await getRooms();
  if (!rooms?.length) return <p className="text-gray-500">No Room Found</p>;

  return <RoomTableClient rooms={rooms} />;
};

export default RoomTable;
