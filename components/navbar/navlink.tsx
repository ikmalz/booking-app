"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { useSession, signOut } from "next-auth/react";
import clsx from "clsx";
import Image from "next/image";

const Navlink = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const baseLink =
    "relative block py-2 px-3 md:p-0 text-sm font-medium transition-all duration-300 " +
    "before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-orange-400" +
    "before:transition-all before:duration-300 hover:before:w-full";

  const scrolledStyle = isScrolled
    ? "text-gray-800 hover:text-orange-500"
    : "text-white hover:text-orange-300";

  return (
    <>
      {session?.user && (
        <div className="flex items-center justify-end md:order-2">
          <div className="hidden md:block">
            <Image
              src={session.user.image || "/star_hotel.png"}
              width={40}
              height={40}
              alt="avatar"
              className="rounded-full object-cover size-8 border"
            />
          </div>
          <div className="hidden md:block ml-3">
            <button
              onClick={() => signOut()}
              className={`py-2.5 px-5 text-sm font-medium border-2 rounded-lg shadow-sm active:scale-95 transition duration-200
                ${
                  isScrolled
                    ? "text-black border-red-400 hover:bg-red-500 hover:text-white"
                    : "text-white border-red-400 hover:bg-red-600"
                }`}
            >
              Sign Out
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center p-2 justify-center text-sm text-gray-600 rounded-md md:hidden hover:bg-gray-100"
      >
        {!open ? <IoMenu className="size-7" /> : <IoClose className="size-7" />}
      </button>
      <div
        className={clsx(
          "w-full md:block md:w-auto transition-all duration-300",
          {
            hidden: !open,
          }
        )}
      >
        <ul className="flex flex-col font-semibold text-sm uppercase p-4 mt-4 rounded-md md:flex-row md:items-center md:space-x-8 md:p-0 md:mt-0 md:border-0 md:bg-transparent">
          <li>
            <Link
              href="/"
              onClick={handleClose}
              className={`${baseLink} text-gray-800 ${scrolledStyle}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              onClick={handleClose}
              className={`${baseLink} text-gray-800 ${scrolledStyle}`}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/room"
              onClick={handleClose}
              className={`${baseLink} text-gray-800 ${scrolledStyle}`}
            >
              Rooms
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              onClick={handleClose}
              className={`${baseLink} text-gray-800 ${scrolledStyle}`}
            >
              Contact
            </Link>
          </li>

          {session && (
            <>
              <li>
                <Link
                  href="/myreservation"
                  onClick={handleClose}
                  className={`${baseLink} text-gray-800 ${scrolledStyle}`}
                >
                  My Reservation
                </Link>
              </li>
              {session.user.role === "admin" && (
                <>
                  <li>
                    <Link
                      href="/admin/dashboard"
                      onClick={handleClose}
                      className={`${baseLink} text-gray-800 ${scrolledStyle}`}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/room"
                      onClick={handleClose}
                      className={`${baseLink} text-gray-800 ${scrolledStyle}`}
                    >
                      Manage Room
                    </Link>
                  </li>
                </>
              )}
            </>
          )}

          {session ? (
            <li className="pt-2 md:hidden">
              <button
                onClick={() => {
                  signOut();
                  handleClose();
                }}
                className="w-full py-2.5 px-4 bg-red-500 text-white hover:bg-red-600 rounded-sm cursor-pointer"
              >
                Sign Out
              </button>
            </li>
          ) : (
            <li className="pt-2 md:pt-0">
              <Link
                href="/signin"
                onClick={handleClose}
                className="py-2.5 px-6 bg-orange-400 text-white hover:bg-orange-500 rounded-sm block text-center"
              >
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navlink;
