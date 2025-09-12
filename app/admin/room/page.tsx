import Link from "next/link";
import RoomTable from "@/components/admin/room/room-table";
import { Suspense } from "react";

const RoomPage = () => {
  return (
    <div className="max-w-screen-xl px-6 py-20 mt-10 mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
          Room List
        </h1>
        <Link
          href="/admin/room/create"
          className="bg-orange-500 px-5 py-2.5 rounded-xl text-white font-medium shadow-sm hover:bg-orange-600 transition duration-200"
        >
          + Create New
        </Link>
      </div>

      <Suspense
        fallback={
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-16 w-full bg-gray-200 animate-pulse rounded-lg"
              />
            ))}
          </div>
        }
      >
        <RoomTable />
      </Suspense>
    </div>
  );
};

export default RoomPage;
