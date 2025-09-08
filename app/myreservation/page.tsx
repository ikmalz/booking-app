import { auth } from "@/auth";
import { Metadata } from "next";
import MyReserveList from "@/components/my-reserve-list";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "My Reservation",
};

const MyReservationPage = async () => {
  const session = await auth();
  if (!session || !session.user) redirect("/signin");

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto py-28 px-4 lg:px-6">
        <div className="bg-orange-50 rounded-xl p-6 mb-10 border border-orange-100">
          <h3 className="text-2xl font-bold text-gray-800">
            Hi, <span className="text-orange-600">{session.user.name}</span>
          </h3>
          <p className="mt-2 text-gray-600">
            Here&apos;s your booking history:
          </p>
        </div>
        <MyReserveList />
      </div>
    </div>
  );
};

export default MyReservationPage;
