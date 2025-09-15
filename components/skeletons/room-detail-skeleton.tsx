const RoomDetailSkeleton = () => {
  return (
    <div className="max-w-screen-xl py-16 px-4 grid lg:grid-cols-12 gap-8 mx-auto animate-pulse">
      <div className="md:col-span-8">
        <div className="w-full h-[430px] bg-gray-300 rounded-lg mb-8" />
        <div className="h-10 w-2/3 bg-gray-300 rounded mb-6" />
        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 rounded" />
          <div className="h-4 w-4/6 bg-gray-200 rounded" />
        </div>
        <div className="h-6 w-1/3 bg-gray-300 rounded mt-8 mb-4" />
        <div className="grid md:grid-cols-3 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-5 w-5 bg-gray-300 rounded" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>

      <div className="md:col-span-4">
        <div className="border-2 border-gray-200 border-dashed px-3 py-5 bg-slate-50 rounded-md">
          <div className="flex items-center justify-between mb-8">
            <div className="h-4 w-20 bg-gray-300 rounded" />
            <div className="h-6 w-28 bg-gray-300 rounded" />
          </div>
          <div className="space-y-4">
            <div className="h-10 w-full bg-gray-200 rounded" />
            <div className="h-10 w-full bg-gray-200 rounded" />
            <div className="h-12 w-full bg-gray-300 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailSkeleton;
