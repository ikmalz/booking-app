import { Metadata } from "next";
import HeaderSection from "@/components/header-section";
import {
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline,
} from "react-icons/io5";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
};

const ContactPage = () => {
  return (
    <div className="bg-gray-100">
      <HeaderSection
        title="Contact Us"
        subTitle="Discover the ultimate in comfort in every room. Choose according to your needs and experience a modern stay with premium amenities."
      />
      <div className="max-w-screen-xl mx-auto py-20 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="">
            <h1 className="text-lg text-gray-500 mb-3">Contact Us</h1>
            <h1 className="text-5xl font-semibold text-gray-900 mb-4">
              Get In Touch Today
            </h1>
            <p className="text-gray-700">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum ex
              perspiciatis suscipit repellendus atque culpa?
            </p>
            <ul className="list-item space-y-6 pt-8">
              <li className="flex gap-5">
                <div className="flex-none bg-gray-300 p-3 shadow-sm rounded-lg">
                  <IoMailOutline className="size-7 m-0.5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">Email :</h4>
                  <p>email-us@example.com</p>
                </div>
              </li>
              <li className="flex gap-5">
                <div className="flex-none bg-gray-300 p-3 shadow-sm rounded-lg">
                  <IoCallOutline className="size-7 m-0.5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">Phone Number :</h4>
                  <p>+99762 7226 2626, +8768 9162 6372</p>
                </div>
              </li>
              <li className="flex gap-5">
                <div className="flex-none bg-gray-300 p-3 shadow-sm rounded-lg">
                  <IoLocationOutline className="size-7 m-0.5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">Address :</h4>
                  <p>Coderx Street Road 2025</p>
                </div>
              </li>
            </ul>
          </div>
          {/* Contact Form */}
          <ContactForm/>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
