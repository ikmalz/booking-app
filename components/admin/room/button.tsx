import { deleteRoom } from "@/lib/actions";
import Link from "next/link";
import { IoPencil, IoTrashOutline } from "react-icons/io5";

export const EditButton = ({ id }: { id: string }) => {
  return (
    <Link
      href={`/admin/room/edit/${id}`}
      className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-blue-50 text-blue-600  shadow-sm transition-colors duration-200"
    >
      <IoPencil className="size-5" />
    </Link>
  );
};

export const DeleteButton = ({ id, image }: { id: string; image: string }) => {
  const DeleteRoomWithId = deleteRoom.bind(null, id, image);
  return (
    <form action={DeleteRoomWithId} className="inline-block">
      <button
        type="submit"
        className="inline-flex items-center justify-center w-9 h-9 rounded-full  bg-gray-100 hover:bg-red-50 text-red-600 shadow-sm transition-colors duration-200"
      >
        <IoTrashOutline className="size-5" />
      </button>
    </form>
  );
};
