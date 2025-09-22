import CreateForm from "@/components/admin/room/create-form";
import { getAmenities } from "@/lib/data";

const CreateRoom = async () => {
  const amenities = await getAmenities();
  if (!amenities) return null;

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-5">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
          Create New Room
        </h1>
        <p className="text-gray-600 mt-2">
          Fill in the details below to add a new room to the hotel system.
        </p>
      </div>

      {/* Create Form */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <CreateForm amenities={amenities} />
      </div>
    </div>
  );
};

export default CreateRoom;
