"use client";

import { useState } from "react";
import Card from "./card";

interface Room {
  id: string;
  type: string;
  name: string;
  description: string;
  image: string;
  price: number;
  capacity: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  [key: string]: any;
}

export default function MainClient({ rooms }: { rooms: Room[] }) {
  const [selectedType, setSelectedType] = useState("all");

  const filteredRooms =
    selectedType === "all"
      ? rooms
      : rooms.filter((room) => room.type === selectedType);

  const uniqueTypes = [...new Set(rooms.map((room) => room.type))];

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-10 pb-10">
      {/* Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button
          onClick={() => setSelectedType("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm
            ${
              selectedType === "all"
                ? "bg-orange-500 text-white shadow-md scale-105"
                : "bg-orange-100 text-orange-600 hover:bg-orange-200"
            }`}
        >
          All Types
        </button>
        {uniqueTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm
              ${
                selectedType === type
                  ? "bg-orange-500 text-white shadow-md scale-105"
                  : "bg-orange-100 text-orange-600 hover:bg-orange-200"
              }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredRooms.map((room) => (
          <Card room={room} key={room.id} />
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <div className="text-center py-16 text-gray-600">
          <p className="text-lg font-medium">Tidak ada kamar untuk tipe ini.</p>
          <p className="mt-2 text-sm text-gray-500">
            Silakan pilih tipe lain atau cek kembali nanti.
          </p>
        </div>
      )}
    </div>
  );
}
