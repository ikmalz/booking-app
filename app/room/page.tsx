import { Metadata } from "next";
import { Suspense } from "react";
import HeaderSection from "@/components/header-section";
import Main from "@/components/main";
import RoomSkeleton from "@/components/skeletons/room-skeleton";

export const metadata: Metadata = {
  title: "Rooms & Rates",
  description: "Discover our curated selection of rooms with the best rates",
};

const RoomPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <HeaderSection
        title="Rooms & Rates"
        subTitle="Discover the ultimate in comfort in every room. Choose according to your needs and experience a modern stay with premium amenities."
      />

      <div className="mt-12 px-4 md:px-10 lg:px-20">
        <Suspense fallback={<RoomSkeleton />}>
          <Main />
        </Suspense>
      </div>
    </div>
  );
};

export default RoomPage;
