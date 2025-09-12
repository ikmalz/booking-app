"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { formatDate, formatCurrency } from "@/lib/utils";
import { reservationProps } from "@/types/reservation";
import { FaArrowLeft, FaArrowRight, FaChevronDown, FaSearchengin } from "react-icons/fa6";

const ITEMS_PER_PAGE = 10;

const ReservationTable = ({
  reservations,
}: {
  reservations: reservationProps[];
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState(reservations);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedFilters] = useState<string[]>([]);

  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    let data = [...reservations];
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      data = data.filter(
        (r) =>
          r.User.name?.toLowerCase().includes(lower) ||
          r.Room.name.toLowerCase().includes(lower) ||
          r.Payment?.status?.toLowerCase().includes(lower)
      );
    }
    if (arrivalDate) {
      data = data.filter(
        (r) => r.startDate.toISOString().split("T")[0] === arrivalDate
      );
    }
    if (departureDate) {
      data = data.filter(
        (r) => r.endDate.toISOString().split("T")[0] === departureDate
      );
    }
    if (selectedRoom) {
      data = data.filter((r) => r.Room.name === selectedRoom);
    }
    if (selectedStatus) {
      data = data.filter((r) => r.Payment?.status === selectedStatus);
    }
    selectedFilters.forEach((sortBy) => {
      switch (sortBy) {
        case "newest":
          data.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
          break;
        case "oldest":
          data.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
          break;
        case "name":
          data.sort((a, b) =>
            (a.User.name || "").localeCompare(b.User.name || "")
          );
          break;
        case "arrival":
          data.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
          break;
        case "departure":
          data.sort((a, b) => a.endDate.getTime() - b.endDate.getTime());
          break;
        case "room":
          data.sort((a, b) => a.Room.name.localeCompare(b.Room.name));
          break;
        case "status":
          data.sort((a, b) =>
            (a.Payment?.status || "").localeCompare(b.Payment?.status || "")
          );
          break;
      }
    });

    setFiltered(data);
    setCurrentPage(1);
  }, [
    searchTerm,
    reservations,
    selectedFilters,
    arrivalDate,
    departureDate,
    selectedRoom,
    selectedStatus,
  ]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages === 0 ? 1 : totalPages);
    }
  }, [filtered, totalPages, currentPage]);

  return (
    <div className="bg-white p-6 mt-6 shadow-xl rounded-xl overflow-hidden">
      <div className="p-6 mt-6 rounded-xl">
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          {/* 🔍 Search */}
          <div className="relative">
            <FaSearchengin
              className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search reservation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-72 pl-10 pr-4 py-2 border border-gray-200 rounded-xl shadow-sm 
             focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none 
             transition-all duration-200"
            />
          </div>

          <div>
            <input
              type="date"
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-xl shadow-sm
             focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
            />
          </div>

          <div>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-xl shadow-sm
             focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
            />
          </div>

          <div className="relative w-48">
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="px-3 py-2 w-full border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 
               focus:ring-2 focus:ring-orange-400 focus:border-orange-400 
               outline-none appearance-none cursor-pointer transition duration-200 ease-in-out 
               hover:border-orange-300"
            >
              <option className="text-gray-500">All Rooms</option>
              {[...new Set(reservations.map((r) => r.Room.name))].map(
                (room) => (
                  <option key={room} value={room} className="text-gray-700">
                    {room}
                  </option>
                )
              )}
            </select>
            {/* Icon */}
            <FaChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              size={14}
            />
          </div>

          <div className="relative w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 w-full border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 
               focus:ring-2 focus:ring-orange-400 focus:border-orange-400 
               outline-none appearance-none cursor-pointer transition duration-200 ease-in-out 
               hover:border-orange-300"
            >
              <option value="">All Status</option>
              <option value="unpaid">Unpaid</option>
              <option value="paid">Paid</option>
              <option value="failure">Failure</option>
            </select>
            {/* Icon */}
            <FaChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              size={14}
            />
          </div>
        </div>

        {/* 📋 Table */}
        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-[800px] w-full text-sm text-left border-collapse">
            <thead className="bg-orange-100">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-700 uppercase">
                  Image
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700 uppercase">
                  Name
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700 uppercase hidden sm:table-cell">
                  Room
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700 uppercase hidden md:table-cell">
                  Arrival
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700 uppercase hidden md:table-cell">
                  Departure
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700 uppercase hidden lg:table-cell">
                  Price
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700 uppercase hidden lg:table-cell">
                  Created At
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700 uppercase text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {currentData.length > 0 ? (
                currentData.map((reserve) => (
                  <tr
                    key={reserve.id}
                    className="hover:bg-orange-50 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <div className="h-14 w-20 relative rounded-lg overflow-hidden shadow-sm">
                        <Image
                          src={reserve.Room.image}
                          fill
                          sizes="20vw"
                          alt="room image"
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-4 font-medium">
                      {reserve.User.name}
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      {reserve.Room.name}
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      {formatDate(reserve.startDate.toISOString())}
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      {formatDate(reserve.endDate.toISOString())}
                    </td>
                    <td className="px-4 py-4 font-semibold text-gray-700 hidden lg:table-cell">
                      {formatCurrency(reserve.price)}
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      {formatDate(reserve.createdAt.toISOString())}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                          reserve.Payment?.status === "paid"
                            ? "bg-green-100 text-green-700"
                            : reserve.Payment?.status === "unpaid"
                            ? "bg-yellow-100 text-yellow-700"
                            : reserve.Payment?.status === "failure"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {reserve.Payment?.status || "unknown"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center text-gray-500 py-6">
                    No Reservation Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 
             disabled:opacity-40 disabled:cursor-not-allowed 
             hover:bg-gray-100 transition"
          >
            <FaArrowLeft size={10} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition 
          ${
            currentPage === i + 1
              ? "bg-gray-800 text-white shadow-md"
              : "text-gray-600 border border-gray-300 hover:bg-gray-100"
          }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 
             disabled:opacity-40 disabled:cursor-not-allowed 
             hover:bg-gray-100 transition"
          >
            <FaArrowRight size={10} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ReservationTable;
