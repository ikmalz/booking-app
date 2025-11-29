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
        subTitle="Temukan kenyamanan terbaik di setiap kamar. Pilih sesuai kebutuhan Anda dan rasakan pengalaman menginap modern dengan fasilitas premium."
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
