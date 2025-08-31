import DashboardCards from "@/components/admin/dashboard-cards";
import { Suspense } from "react";
import { Metadata } from "next";
import ReservationList from "@/components/admin/reservation-list";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardPage = () => {
  return (
    <div className="max-w-screen-xl px-4 py-16 mt-10 mx-auto">
      <h1 className="text-4xl text-gray-800 font-bold">Dashboard</h1>
      <Suspense fallback={<p>Loading cards...</p>}>
        <DashboardCards />
      </Suspense>
      <Suspense fallback={<p>Loading reservation...</p>}>
        <ReservationList />
      </Suspense>
    </div>
  );
};

export default DashboardPage;
