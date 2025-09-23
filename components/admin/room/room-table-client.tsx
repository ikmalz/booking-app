"use client";

import { useState, useMemo } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { formatDate, formatCurrency } from "@/lib/utils";
import { DeleteButton, EditButton } from "@/components/admin/room/button";

const ITEMS_PER_PAGE = 10;

export default function RoomTableClient({ rooms }: { rooms: any[] }) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const uniqueTypes = ["all", ...new Set(rooms.map((r) => r.type))];

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchesSearch =
        room.name.toLowerCase().includes(search.toLowerCase()) ||
        room.type.toLowerCase().includes(search.toLowerCase());
      const matchesType = filterType === "all" || room.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [rooms, search, filterType]);

  const totalPages = Math.ceil(filteredRooms.length / ITEMS_PER_PAGE);
  const paginatedRooms = filteredRooms.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-white p-6 mt-6 rounded-xl shadow-md border border-gray-100">
      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by room name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
        >
          {uniqueTypes.map((type) => (
            <option key={type} value={type}>
              {type === "all" ? "All Types" : type}
            </option>
          ))}
        </select>
      </div>

      {/* Tabel */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 w-32 text-xs font-semibold text-gray-600 uppercase text-left">
              Image
            </th>
            <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase text-left">
              Room Name
            </th>
            <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase text-left">
              Type
            </th>
            <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase text-left">
              Price
            </th>
            <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase text-left">
              Created At
            </th>
            <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase text-left">
              Updated At
            </th>
            <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase text-center">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {paginatedRooms.map((room) => (
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
              <td className="px-6 py-4 text-sm text-gray-700">{room.type}</td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {formatCurrency(room.price)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {formatDate(room.createdAt.toString())}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {formatDate(room.updatedAt.toString())}
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-lg border text-orange-500 border-orange-300 hover:bg-orange-50 disabled:opacity-50"
          >
            <FaChevronLeft />
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                currentPage === i + 1
                  ? "bg-orange-500 text-white"
                  : "border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-lg border text-orange-500 border-orange-300 hover:bg-orange-50 disabled:opacity-50"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
