"use client";

import Link from "next/link";
import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { useSession, signOut } from "next-auth/react";
import clsx from "clsx";
import Image from "next/image";

const Navlink = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  // helper biar nggak nulis panjang2
  const handleClose = () => setOpen(false);

  return (
    <>
      {session?.user ? (
        <div className="flex items-center justify-end md:order-2">
          <div className="hidden text-sm bg-gray-50 border rounded-full md:me-0 md:block focus:ring-4 focus:ring-gray-300">
            <Image
              src={session.user.image || "/star_hotel.png"}
              width={64}
              height={64}
              alt="avatar"
              className="rounded-full object-cover size-8"
            />
          </div>
          <div className="flex items-center">
            <button
              onClick={() => signOut()}
              className="md:block hidden py-2 px-4 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-sm cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : null}

      {/* Toggle menu */}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center p-2 justify-center text-sm text-gray-500 rounded-md md:hidden hover:bg-gray-100"
      >
        {!open ? <IoMenu className="size-8" /> : <IoClose className="size-8" />}
      </button>

      {/* Mobile menu */}
      <div
        className={clsx("w-full md:block md:w-auto", {
          hidden: !open,
        })}
      >
        <ul className="flex flex-col font-semibold text-sm uppercase p-4 mt-4 rounded-sm bg-gray-50 md:flex-row md:items-center md:space-x-10 md:p-0 md:mt-0 md:border-0 md:bg-white ">
          <li>
            <Link
              href="/"
              onClick={handleClose}
              className="relative block py-2 px-3 text-gray-800 transition-all duration-300 md:p-0 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-orange-400 before:transition-all before:duration-300 hover:before:w-full hover:text-orange-500"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              onClick={handleClose}
              className="relative block py-2 px-3 text-gray-800 transition-all duration-300 md:p-0 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-orange-400 before:transition-all before:duration-300 hover:before:w-full hover:text-orange-500"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/room"
              onClick={handleClose}
              className="relative block py-2 px-3 text-gray-800 transition-all duration-300 md:p-0 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-orange-400 before:transition-all before:duration-300 hover:before:w-full hover:text-orange-500"
            >
              Rooms
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              onClick={handleClose}
              className="relative block py-2 px-3 text-gray-800 transition-all duration-300 md:p-0 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-orange-400 before:transition-all before:duration-300 hover:before:w-full hover:text-orange-500"
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
                  className="relative block py-2 px-3 text-gray-800 transition-all duration-300 md:p-0 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-orange-400 before:transition-all before:duration-300 hover:before:w-full hover:text-orange-500"
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
                      className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/room"
                      onClick={handleClose}
                      className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0"
                    >
                      Manage Room
                    </Link>
                  </li>
                </>
              )}
            </>
          )}

          {session ? (
            <li className="pt-2 md:pt-0">
              <button
                onClick={() => {
                  signOut();
                  handleClose();
                }}
                className="md:hidden py-2.5 px-4 bg-red-400 text-white hover:bg-red-600 rounded-sm cursor-pointer"
              >
                Sign Out
              </button>
            </li>
          ) : (
            <li className="pt-2 md:pt-0">
              <Link
                href="/signin"
                onClick={handleClose}
                className="py-2.5 px-6 bg-orange-400 text-white hover:bg-orange-500 rounded-sm"
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
