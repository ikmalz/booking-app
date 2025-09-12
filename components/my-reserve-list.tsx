import { getReservationByUserId } from "@/lib/data";
import { notFound } from "next/navigation";
import ReservationListClient from "./my-reserve-list-client";

const MyReserveList = async () => {
  const reservation = await getReservationByUserId();
  if (!reservation) return notFound();

  return <ReservationListClient reservations={reservation} />;
};

export default MyReserveList;
