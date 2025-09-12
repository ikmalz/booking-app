import { getReservations } from "@/lib/data";
import ReservationTable from "./reservation-table";

const ReservationList = async () => {
  const reservations = await getReservations();
  return <ReservationTable reservations={reservations ?? []} />;
};

export default ReservationList;
