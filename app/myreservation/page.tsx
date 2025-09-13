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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-slate-50">
      <div className="max-w-5xl mx-auto py-24 px-4 lg:px-6">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-8 mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome back,{" "}
            <span className="text-orange-600">{session.user.name}</span> 👋
          </h1>
          <p className="mt-3 text-gray-600 text-base">
            Here&rsquo;s your latest{" "}
            <span className="font-medium text-gray-800">
              reservation history
            </span>
            . Keep track of your bookings easily.
          </p>
        </div>

        {/* Reservation List */}
        <MyReserveList />
      </div>
    </div>
  );
};

export default MyReservationPage;
