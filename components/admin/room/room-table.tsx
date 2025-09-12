import { getRooms } from "@/lib/data";
import Image from "next/image";
import { formatDate, formatCurrency } from "@/lib/utils";
import { DeleteButton, EditButton } from "@/components/admin/room/button";

const RoomTable = async () => {
  const rooms = await getRooms();
  if (!rooms?.length) return <p className="text-gray-500">No Room Found</p>;

  return (
    <div className="bg-white p-6 mt-6 rounded-xl shadow-md border border-gray-100">
      <table className="w-full border-collapse">
        {/* Header */}
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 w-32 text-xs font-semibold text-gray-600 uppercase text-left">
              Image
            </th>
            <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase text-left">
              Room Name
            </th>
            <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase text-left">
              Price
            </th>
            <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase text-left">
              Created At
            </th>
            <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase text-center">
              Action
            </th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {rooms.map((room) => (
            <tr
              key={room.id}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <td className="px-6 py-4">
                <div className="h-20 w-32 relative rounded-lg overflow-hidden shadow-sm">
                  <Image
                    src={room.image}
                    fill
                    sizes="20vw"
                    alt="room image"
                    className="object-cover"
                  />
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">{room.name}</td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {formatCurrency(room.price)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {formatDate(room.createdAt.toString())}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                  <EditButton id={room.id} />
                  <DeleteButton id={room.id} image={room.image} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomTable;
