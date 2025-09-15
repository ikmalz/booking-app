import Hero from "@/components/hero";
import Main from "@/components/main";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      <Hero />
      <div className="mt-20 px-4 md:px-10 lg:px-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-800">
            Rooms & Rates
          </h1>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            Enjoy a selection of rooms with modern designs, great prices, and
            premium amenities designed for your comfort. Choose the room that
            best suits your needs and embark on an unforgettable stay.
          </p>
          <div className="mt-6 flex justify-center">
            <span className="inline-block w-24 h-1 bg-orange-500 rounded-full"></span>
          </div>
        </div>
        <div className="mt-14">
          <Main />
        </div>
      </div>
    </div>
  );
}
