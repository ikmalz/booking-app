"use client";

import Image from "next/image";
import Link from "next/link";
import Navlink from "@/components/navbar/navlink";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 w-full z-20 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md"
          : "bg-black/30 shadow-lg backdrop-blur-md"
      }`}
    >
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/star_hotel.png"
            width={50}
            height={28}
            alt="logo"
            priority
            className="rounded-full"
          />
          <span
            className={`font-bold text-xl scrolled ${
              scrolled
                ? "text-black"
                : "text-white"
            }
          `}
          >
            Star Hotel
          </span>
        </Link>

        {/* Navigation Links */}
        <Navlink />
      </div>
    </div>
  );
};

export default Navbar;
