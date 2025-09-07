"use client";
import { useState, useActionState } from "react";
import { addDays } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createReserve } from "@/lib/actions";
import { RoomDetailProps, DisabledDateProps } from "@/types/room";
import clsx from "clsx";

type FormState =
  | { error?: { name?: string[]; phone?: string[] }; messageDate?: never }
  | { error?: never; messageDate: string }
  | null;

const ReserveForm = ({
  room,
  disableDate,
}: {
  room: RoomDetailProps;
  disableDate: DisabledDateProps[];
}) => {
  const StartDate = new Date();
  const EndDate = addDays(StartDate, 1);

  const [startDate, setStartDate] = useState<Date | null>(StartDate);
  const [endDate, setEndDate] = useState<Date | null>(EndDate);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const [state, formAction, isPending] = useActionState(
    async (prevState: FormState, formData: FormData) => {
      if (!startDate || !endDate) {
        return { messageDate: "Harap pilih tanggal mulai dan selesai" };
      }
      return createReserve(
        room.id,
        room.price,
        startDate,
        endDate,
        prevState,
        formData
      );
    },
    null
  );

  const excludeDates = disableDate.map((item) => ({
    start: new Date(item.startDate),
    end: new Date(item.endDate),
  }));

  return (
    <div>
      <form action={formAction}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Arrival - Departure
          </label>
          <DatePicker
            selected={startDate}
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            selectsRange={true}
            onChange={handleDateChange}
            excludeDateIntervals={excludeDates}
            dateFormat="dd-MM-yyyy"
            wrapperClassName="w-full"
            className="py-2 px-4 rounded-md border border-gray-300 w-full"
          />
          <div aria-live="polite" aria-atomic="true">
            <p className="text-sm text-red-500 mt-2">{state?.messageDate}</p>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            className="py-2 px-4 rounded-md border border-gray-300 w-full"
            placeholder="Full Name..."
          />
          <div aria-live="polite" aria-atomic="true">
            <p className="text-sm text-red-500 mt-2">
              {state && "error" in state && state.error?.name?.join(", ")}
            </p>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            className="py-2 px-4 rounded-md border border-gray-300 w-full"
            placeholder="Phone Number..."
          />
          <div aria-live="polite" aria-atomic="true">
            <p className="text-sm text-red-500 mt-2">
              {state && "error" in state && state.error?.phone?.join(", ")}
            </p>
          </div>
        </div>
        <button
          type="submit"
          className={clsx(
            "px-10 py-3 text-center font-semibold text-white w-full bg-orange-400 rounded-sm cursor-pointer hover:bg-orange-500",
            {
              "opacity-50 cursor-progress": isPending,
            }
          )}
          disabled={isPending || !startDate || !endDate}
        >
          {isPending ? "Loading..." : "Reserve"}
        </button>
      </form>
    </div>
  );
};

export default ReserveForm;
