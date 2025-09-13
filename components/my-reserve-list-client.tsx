"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { formatCurrency, formatDate } from "@/lib/utils";
import { differenceInCalendarDays } from "date-fns";
import Link from "next/link";

type Reservation = {
  id: string;
  price: number;
  startDate: Date;
  endDate: Date;
  Room: {
    name: string;
    image: string;
    price: number;
  };
  Payment: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    method: string | null;
    amount: number;
    status: string;
    reservationId: string;
  } | null;
  User: {
    name: string | null;
    email: string;
    phone: string | null;
  };
};

interface Props {
  reservations: Reservation[];
}

const ReservationListClient: React.FC<Props> = ({ reservations }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const perPage = 5;

  const filteredReservations = useMemo(() => {
    return reservations.filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.Room.name.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || item.Payment?.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [reservations, search, statusFilter]);

  const totalPages = Math.ceil(filteredReservations.length / perPage);
  const start = (currentPage - 1) * perPage;
  const currentData = filteredReservations.slice(start, start + perPage);

  return (
    <div className="space-y-6">
      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        {/* Search Bar */}
        <div className="w-full md:w-1/2 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); 
            }}
            placeholder="🔍 Search by ID or Room name..."
            className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
          />
        </div>

        {/* Filter */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1); 
          }}
          className="w-full md:w-auto px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
        >
          <option value="all">All Status</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      </div>

      {/* Reservation Cards */}
      {currentData.length > 0 ? (
        currentData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between bg-orange-50 px-4 py-3">
              <h1 className="text-sm font-semibold text-gray-800 truncate">
                Reservation ID: #{item.id}
              </h1>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">Status:</span>
                <span
                  className={`px-2 py-0.5 rounded-md text-xs font-bold uppercase ${
                    item.Payment?.status === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.Payment?.status}
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              <Image
                src={item.Room.image}
                width={500}
                height={300}
                alt="Room image"
                className="object-cover w-full h-60 md:h-auto md:w-1/3"
              />

              <div className="flex-1 px-4 py-4 flex flex-col justify-between">
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span className="font-medium">Price</span>
                    <span>{formatCurrency(item.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Arrival</span>
                    <span>{formatDate(item.startDate.toISOString())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Departure</span>
                    <span>{formatDate(item.endDate.toISOString())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Duration</span>
                    <span>
                      {differenceInCalendarDays(item.endDate, item.startDate)}{" "}
                      Night
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sub Total</span>
                    <span>
                      {item.Payment && formatCurrency(item.Payment.amount)}
                    </span>
                  </div>
                </div>

                {/* Action */}
                <div className="mt-4 flex justify-end">
                  {item.Payment?.status === "unpaid" ? (
                    <Link
                      href={`/checkout/${item.id}`}
                      className="px-5 py-2 text-sm rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
                    >
                      Pay Now
                    </Link>
                  ) : (
                    <Link
                      href={`/myreservation/${item.id}`}
                      className="px-5 py-2 text-sm rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
                    >
                      View Detail
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 mt-6">
          No reservations found.
        </p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {/* Prev button */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-md text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent transition"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 flex items-center justify-center rounded-md text-sm font-medium transition
          ${
            currentPage === page
              ? "bg-orange-500 text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-100"
          }`}
            >
              {page}
            </button>
          ))}

          {/* Next button */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 rounded-md text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ReservationListClient;
