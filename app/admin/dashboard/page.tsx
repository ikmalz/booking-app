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
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight mb-6 flex items-center gap-3">
        <span className="relative">Dashboard</span>
      </h1>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-32 rounded-xl bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        }
      >
        <DashboardCards />
      </Suspense>

      <Suspense
        fallback={
          <div className="mt-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-28 rounded-lg bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        }
      >
        <ReservationList />
      </Suspense>
    </div>
  );
};

export default DashboardPage;
