"use client";

import { useState } from "react";
import Card from "./card";
import { Room } from "@prisma/client";

const RoomList = ({ rooms }: { rooms: Room[] }) => {
  const [query, setQuery] = useState("");

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search room..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => <Card key={room.id} room={room} />)
        ) : (
          <p className="text-gray-500">No rooms found.</p>
        )}
      </div>
    </div>
  );
};

export default RoomList;
