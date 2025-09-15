import Card from "@/components/card";
import { getRooms } from "@/lib/data";
import { notFound } from "next/navigation";

const Main = async () => {
  const rooms = await getRooms();
  if (!rooms) return notFound();

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-10 py-10">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <Card room={room} key={room.id} />
        ))}
      </div>

      {rooms.length === 0 && (
        <div className="text-center py-16 text-gray-600">
          <p className="text-lg font-medium">Belum ada kamar tersedia saat ini.</p>
          <p className="mt-2 text-sm text-gray-500">
            Silakan cek kembali nanti untuk penawaran terbaru.
          </p>
        </div>
      )}
    </div>
  );
};

export default Main;
