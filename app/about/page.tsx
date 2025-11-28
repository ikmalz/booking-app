import HeaderSection from "@/components/header-section";
import {
  IoEyeOutline,
  IoRocketOutline,
  IoShieldCheckmarkOutline,
  IoHeartOutline,
} from "react-icons/io5";
import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const AboutPage = () => {
  return (
    <div className={`${poppins.className} bg-white min-h-screen`}>
      <HeaderSection
        title="About Us"
        subTitle="Discover luxury and comfort in the heart of Jakarta&apos;s vibrant cityscape."
      />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 lg:mb-24">
          {/* Image Section */}
          <div className="order-2 lg:order-1">
            <div className="relative group">
              <Image
                src="/hotell.jpeg"
                width={600}
                height={500}
                alt="Luxury Hotel Jakarta"
                className="w-full rounded-2xl shadow-lg object-cover aspect-[4/3] group-hover:shadow-xl transition duration-300"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Who We Are
              </h1>
              <div className="h-1 w-16 bg-orange-500 rounded-full"></div>
            </div>

            <p className="text-gray-700 leading-relaxed text-sm lg:text-lg">
              Nestled in the dynamic heart of Jakarta, our premium hotel
              represents the perfect fusion of contemporary luxury and authentic
              Indonesian hospitality.
            </p>

            <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
              Every corner of our hotel is thoughtfully designed to provide
              guests with an extraordinary experience, from elegantly appointed
              rooms to world-class amenities.
            </p>
          </div>
        </div>

        {/* Vision & Mission Section */}
        <div className="mb-16 lg:mb-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Our Foundation
            </h2>
            <p className="text-gray-600 text-sm lg:text-base max-w-2xl mx-auto">
              Built on principles of excellence, innovation, and genuine care
              for every guest
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Vision */}
            <div className="bg-orange-50 rounded-2xl p-6 lg:p-8 border border-orange-100">
              <div className="flex items-start gap-4 lg:gap-6">
                <div className="flex-none p-3 bg-orange-500 rounded-xl text-white">
                  <IoEyeOutline className="size-6" />
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl font-semibold mb-3 text-gray-900">
                    Our Vision
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-justify text-sm lg:text-base">
                    To be Jakarta&apos;s most distinguished hotel destination,
                    setting new standards for luxury hospitality while
                    celebrating Indonesia&apos;s rich cultural heritage.
                  </p>
                </div>
              </div>
            </div>

            {/* Mission */}
            <div className="bg-blue-50 rounded-2xl p-6 lg:p-8 border border-blue-100">
              <div className="flex items-start gap-4 lg:gap-6">
                <div className="flex-none p-3 bg-blue-500 rounded-xl text-white">
                  <IoRocketOutline className="size-6" />
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl font-semibold mb-3 text-gray-900">
                    Our Mission
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm lg:text-base text-justify">
                    To deliver exceptional hospitality experiences through
                    personalized service, innovative amenities, and attention to
                    every detail.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16 lg:mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Our Core Values
            </h2>
            <p className="text-gray-600 text-sm lg:text-base max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition duration-200">
              <div className="p-3 bg-green-500 rounded-xl text-white w-fit mb-4">
                <IoShieldCheckmarkOutline className="size-6" />
              </div>
              <h4 className="text-lg lg:text-xl font-semibold mb-3 text-gray-900">
                Excellence
              </h4>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base text-justify">
                We pursue excellence in every aspect of our service, ensuring
                the highest standards of quality and comfort.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition duration-200">
              <div className="p-3 bg-pink-500 rounded-xl text-white w-fit mb-4">
                <IoHeartOutline className="size-6" />
              </div>
              <h4 className="text-lg lg:text-xl font-semibold mb-3 text-gray-900">
                Genuine Care
              </h4>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base text-justify">
                Our warm, authentic hospitality reflects the spirit of
                Indonesia, making every guest feel valued and at home.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition duration-200 sm:col-span-2 lg:col-span-1">
              <div className="p-3 bg-purple-500 rounded-xl text-white w-fit mb-4">
                <IoRocketOutline className="size-6" />
              </div>
              <h4 className="text-lg lg:text-xl font-semibold mb-3 text-gray-900">
                Innovation
              </h4>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base text-justify">
                We continuously embrace new technologies to enhance guest
                experiences while maintaining timeless hospitality values.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 lg:p-12 text-center text-white">
          <h3 className="text-xl lg:text-2xl font-bold mb-4">
            Experience Jakarta Like Never Before
          </h3>
          <p className="text-sm lg:text-base opacity-90 mb-6 lg:mb-8 max-w-2xl mx-auto">
            Book your stay with us and Discover why we&apos;re the preferred choice
            for discerning travelers seeking luxury and comfort.
          </p>
          <button className="bg-white text-orange-600 font-semibold py-3 px-6 lg:py-4 lg:px-8 rounded-full hover:shadow-lg transform hover:scale-105 transition duration-200 text-sm lg:text-base">
            Book Your Stay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
