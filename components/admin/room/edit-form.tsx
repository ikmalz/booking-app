"use client";
import { useRef, useState, useTransition } from "react";
import { useActionState } from "react";
import { updateRoom } from "@/lib/actions";
import { type PutBlobResult } from "@vercel/blob";
import { IoCloudUploadOutline, IoTrashOutline } from "react-icons/io5";
import Image from "next/image";
import { BarLoader } from "react-spinners";
import { Amenities } from "@prisma/client";
import { RoomProps } from "@/types/room";
import clsx from "clsx";
import RoomTypeSelect from "@/components/RoomTypeSelect";

const EditForm = ({
  amenities,
  room,
}: {
  amenities: Amenities[];
  room: RoomProps;
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState(room.image);
  const [message, setMessage] = useState("");
  const [pending, startTranition] = useTransition();
  const [roomType, setRoomType] = useState(room.type || "");

  const handleUpload = () => {
    if (!inputFileRef.current?.files) return null;
    const file = inputFileRef.current.files[0];
    const formData = new FormData();
    formData.set("file", file);
    startTranition(async () => {
      try {
        const response = await fetch("/api/upload", {
          method: "PUT",
          body: formData,
        });
        const data = await response.json();
        if (response.status !== 200) {
          setMessage(data.message);
        }
        const img = data as PutBlobResult;
        setImage(img.url);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const deleteImage = (image: string) => {
    startTranition(async () => {
      try {
        await fetch(`/api/upload/?imageUrl=${image}`, {
          method: "DELETE",
        });
        setImage("");
      } catch (error) {
        console.log(error);
      }
    });
  };

  const [state, formAction, isPending] = useActionState(
    updateRoom.bind(null, image, room.id),
    null
  );

  const checkedAmenities = room.RoomAmenities.map((item) => item.amenitiesId);

  return (
    <form action={formAction}>
      <div className="grid md:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="col-span-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          {/* Room Name */}
          <div className="mb-5">
            <input
              type="text"
              name="name"
              defaultValue={room.name}
              className="py-3 px-4 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Room Name"
            />
            <span className="text-sm text-red-500 mt-2 block">
              {state?.error?.name}
            </span>
          </div>

          {/* Description */}
          <div className="mb-5">
            <textarea
              rows={6}
              defaultValue={room.description}
              name="description"
              className="py-3 px-4 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Description..."
            ></textarea>
            <span className="text-sm text-red-500 mt-2 block">
              {state?.error?.description}
            </span>
          </div>

          {/* Amenities */}
          <div className="mb-5">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Amenities
            </h4>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {amenities.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <input
                    type="checkbox"
                    name="amenities"
                    defaultValue={item.id}
                    defaultChecked={checkedAmenities.includes(item.id)}
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-400"
                  />
                  <span className="capitalize">{item.name}</span>
                </label>
              ))}
            </div>
            <span className="text-sm text-red-500 mt-2 block">
              {state?.error?.amenities}
            </span>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          {/* Image Upload */}
          <label
            htmlFor="input-file"
            className="flex flex-col mb-5 items-center justify-center aspect-video border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 relative transition"
          >
            <div className="flex flex-col items-center justify-center text-gray-500 pt-5 pb-6 z-10">
              {pending ? <BarLoader /> : null}
              {image ? (
                <button
                  type="button"
                  onClick={() => deleteImage(image)}
                  className="flex items-center justify-center bg-red-500 hover:bg-red-600 size-7 absolute right-2 top-2 rounded-full text-white shadow-md"
                >
                  <IoTrashOutline className="size-4" />
                </button>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <IoCloudUploadOutline className="size-8 text-orange-400" />
                  <p className="mb-1 text-sm font-semibold text-gray-700">
                    Select Image
                  </p>
                  {message ? (
                    <p className="text-sm text-red-500">{message}</p>
                  ) : (
                    <p className="text-xs text-gray-500">
                      JPG, PNG, GIF (max: 4MB)
                    </p>
                  )}
                </div>
              )}
            </div>
            {!image ? (
              <input
                type="file"
                ref={inputFileRef}
                onChange={handleUpload}
                id="input-file"
                className="hidden"
              />
            ) : (
              <Image
                src={image}
                alt="image"
                width={640}
                height={360}
                className="rounded-lg absolute aspect-video object-cover"
              />
            )}
          </label>

          <RoomTypeSelect
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            error={state?.error?.type}
          />

          {/* Capacity */}
          <div className="mb-5">
            <input
              type="text"
              name="capacity"
              defaultValue={room.capacity}
              className="py-3 px-4 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Capacity..."
            />
            <span className="text-sm text-red-500 mt-2 block">
              {state?.error?.capacity}
            </span>
          </div>

          {/* Price */}
          <div className="mb-5">
            <input
              type="text"
              name="price"
              defaultValue={room.price}
              className="py-3 px-4 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Price..."
            />
            <span className="text-sm text-red-500 mt-2 block">
              {state?.error?.price}
            </span>
          </div>

          {/* General Message */}
          {state?.message && (
            <div className="mb-5 bg-red-100 border border-red-200 rounded-lg p-3 text-sm text-red-600">
              {state.message}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={clsx(
              "bg-gradient-to-r from-orange-400 to-orange-500 text-white w-full py-3 px-6 rounded-lg font-semibold text-lg shadow-sm hover:shadow-md hover:from-orange-500 hover:to-orange-600 transition",
              { "opacity-50 cursor-progress": isPending }
            )}
            disabled={isPending}
          >
            {isPending ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditForm;
