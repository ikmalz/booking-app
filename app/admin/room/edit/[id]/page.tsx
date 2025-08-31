import { notFound } from "next/navigation";
import EditRoom from "@/components/admin/room/edit-room";
import { Suspense } from "react";

const UpdateRoompage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const roomId = (await params).id;
  if (!roomId) return notFound();

  return (
    <div className="max-w-screen-xl px-16 py-16 mx-auto mt-10">
      <Suspense fallback={<p>Loading...</p>}>
        <EditRoom roomId={roomId} />
      </Suspense>
    </div>
  );
};

export default UpdateRoompage;
