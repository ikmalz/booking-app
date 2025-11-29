"use client";

import React from "react";

interface RoomTypeSelectProps {
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string | string[];
}

const roomTypes = [
  "Single",
  "Standard",
  "Double",
  "Twin",
  "Suite",
  "Deluxe",
  "Family",
  "Presidential",
];

const RoomTypeSelect: React.FC<RoomTypeSelectProps> = ({
  name = "type",
  value = "",
  onChange,
  error,
}) => {
  return (
    <div className="mb-5">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="py-3 px-4 rounded-lg border border-gray-300 w-full text-gray-800 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
      >
        <option value="" disabled>
          Select Type...
        </option>
        {roomTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      {error &&
        (Array.isArray(error) ? (
          error.map((err, i) => (
            <span key={i} className="text-sm text-red-500 block mt-2">
              {err}
            </span>
          ))
        ) : (
          <span className="text-sm text-red-500 mt-2 block">{error}</span>
        ))}
    </div>
  );
};

export default RoomTypeSelect;
