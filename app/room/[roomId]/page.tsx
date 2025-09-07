import RoomDetail from "@/components/room-detail";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Room Detail",
};

const RoomDetailPage = async ({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) => {
  const roomId = (await params).roomId;

  return (
    <div className="mt-16">
      <Suspense fallback={<p className="mt-24">Loading...</p>}>
        <RoomDetail roomId={roomId} />  
      </Suspense>
    </div>
  );
};

export default RoomDetailPage;
