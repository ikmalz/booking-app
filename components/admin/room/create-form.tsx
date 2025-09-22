"use client";
import { useRef, useState, useTransition } from "react";
import { useActionState } from "react";
import { saveRoom } from "@/lib/actions";
import { type PutBlobResult } from "@vercel/blob";
import { IoCloudUploadOutline, IoTrashOutline } from "react-icons/io5";
import Image from "next/image";
import { BarLoader } from "react-spinners";
import { Amenities } from "@prisma/client";
import clsx from "clsx";
import RoomTypeSelect from "@/components/RoomTypeSelect";

const CreateForm = ({ amenities }: { amenities: Amenities[] }) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [pending, startTranition] = useTransition();
  const [roomType, setRoomType] = useState("");

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
    saveRoom.bind(null, image),
    null
  );

  return (
    <form action={formAction} className="space-y-8">
      <div className="grid md:grid-cols-12 gap-8">
        {/* Left Section */}
        <div className="col-span-8 bg-white p-6 rounded-xl shadow-sm space-y-6">
          {/* Room Name */}
          <div>
            <input
              type="text"
              name="name"
              className="py-3 px-4 rounded-lg border border-gray-300 w-full text-gray-800 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none placeholder:text-gray-400"
              placeholder="Room Name..."
            />
            <div aria-live="polite" aria-atomic="true">
              <span className="text-sm text-red-500">{state?.error?.name}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <textarea
              rows={8}
              name="description"
              className="py-3 px-4 rounded-lg border border-gray-300 w-full text-gray-800 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none placeholder:text-gray-400"
              placeholder="Description..."
            ></textarea>
            <div aria-live="polite" aria-atomic="true">
              <span className="text-sm text-red-500">
                {state?.error?.description}
              </span>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Amenities
            </p>
            <div className="grid md:grid-cols-3 gap-3">
              {amenities.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name="amenities"
                    defaultValue={item.id}
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-400"
                  />
                  <span className="capitalize">{item.name}</span>
                </label>
              ))}
            </div>
            <div aria-live="polite" aria-atomic="true">
              <span className="text-sm text-red-500">
                {state?.error?.amenities}
              </span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-span-4 bg-white p-6 rounded-xl shadow-sm space-y-6">
          {/* Image Upload */}
          <label
            htmlFor="input-file"
            className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 relative overflow-hidden"
          >
            <div className="flex flex-col items-center justify-center text-gray-500 z-10 text-center p-4">
              {pending ? (
                <BarLoader />
              ) : image ? (
                <button
                  type="button"
                  onClick={() => deleteImage(image)}
                  className="flex items-center justify-center bg-red-500 size-7 absolute right-2 top-2 rounded-full shadow hover:bg-red-600"
                >
                  <IoTrashOutline className="size-4 text-white" />
                </button>
              ) : (
                <>
                  <IoCloudUploadOutline className="size-10 mb-2 text-orange-400" />
                  <p className="text-sm font-semibold">Select Image</p>
                  {message ? (
                    <p className="text-xs text-red-500">{message}</p>
                  ) : (
                    <p className="text-xs text-gray-500">
                      JPG, PNG, GIF (max: 4MB)
                    </p>
                  )}
                </>
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
                className="absolute inset-0 object-cover w-full h-full rounded-lg"
              />
            )}
          </label>

          {/* Type Room */}
          <RoomTypeSelect
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            error={state?.error?.type}
          />
          
          {/* Capacity */}
          <div>
            <input
              type="text"
              name="capacity"
              className="py-3 px-4 rounded-lg border border-gray-300 w-full text-gray-800 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none placeholder:text-gray-400"
              placeholder="Capacity..."
            />
            <div aria-live="polite" aria-atomic="true">
              <span className="text-sm text-red-500">
                {state?.error?.capacity}
              </span>
            </div>
          </div>

          {/* Price */}
          <div>
            <input
              type="text"
              name="price"
              className="py-3 px-4 rounded-lg border border-gray-300 w-full text-gray-800 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none placeholder:text-gray-400"
              placeholder="Price..."
            />
            <div aria-live="polite" aria-atomic="true">
              <span className="text-sm text-red-500">
                {state?.error?.price}
              </span>
            </div>
          </div>

          {/* General Message */}
          {state?.message && (
            <div className="bg-red-100 p-3 rounded-lg">
              <span className="text-sm text-red-600">{state.message}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={clsx(
              "w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 px-6 text-lg font-semibold rounded-lg shadow hover:from-orange-500 hover:to-orange-600 transition",
              {
                "opacity-50 cursor-progress": isPending,
              }
            )}
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateForm;
