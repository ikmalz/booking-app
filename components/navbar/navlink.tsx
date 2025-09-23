"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { useSession, signOut } from "next-auth/react";
import clsx from "clsx";
import Image from "next/image";

const Navlink = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // dropdown user
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // close dropdown kalau klik di luar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const baseLink =
    "relative block py-2 px-3 md:px-4 text-sm md:text-[15px] font-semibold tracking-wide transition-colors duration-300 " +
    "before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-gradient-to-r before:from-orange-400 before:to-orange-600 " +
    "before:rounded-full before:transition-all before:duration-300 hover:before:w-full";

  const scrolledStyle = isScrolled
    ? "text-gray-800 hover:text-orange-500"
    : "text-white hover:text-orange-300";

  const activeLink = "text-orange-500 before:w-full font-bold";

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Rooms", href: "/room" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {session?.user && (
        <div
          className="relative flex items-center justify-end md:order-2"
          ref={menuRef}
        >
          {/* Avatar */}
          <div
            className="hidden md:block cursor-pointer"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <Image
              src={session.user.image || "/star_hotel.png"}
              width={40}
              height={40}
              alt="avatar"
              className="rounded-full object-cover size-9 border-2 border-orange-400 shadow-sm hover:scale-105 transition"
            />
          </div>

          {/* Dropdown user info */}
          {showUserMenu && (
            <div className="absolute right-0 top-12 w-72 bg-white border border-gray-200 rounded-xl shadow-lg z-50 animate-fade-in">
              <div className="flex flex-col items-center p-5 border-b border-gray-100">
                <Image
                  src={session.user.image || "/star_hotel.png"}
                  width={40}
                  height={40}
                  alt="avatar"
                  className="rounded-full object-cover size-9 border border-gray-300 shadow-sm cursor-pointer hover:ring-2 hover:ring-orange-400 transition"
                />

                <p className="mt-3 font-semibold text-gray-900">
                  {session.user.name}
                </p>
                <p className="text-xs text-gray-500">{session.user.email}</p>
                {session.user.role === "admin" && (
                  <p className="text-xs mt-1 text-red-500 font-medium">
                    Role: Admin
                  </p>
                )}
              </div>

              {/* Menu actions */}
              <div className="p-3 space-y-2">
                <button
                  onClick={() => signOut()}
                  className="w-full py-2.5 bg-red-500 text-white hover:bg-red-600 rounded-lg text-sm font-medium transition"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center p-2 justify-center text-sm text-gray-600 rounded-md md:hidden hover:bg-gray-100"
      >
        {!open ? <IoMenu className="size-7" /> : <IoClose className="size-7" />}
      </button>

      {/* nav links */}
      <div
        className={clsx(
          "w-full md:block md:w-auto transition-all duration-300",
          {
            hidden: !open,
          }
        )}
      >
        <ul className="flex flex-col font-medium text-sm md:text-base p-4 mt-4 rounded-md md:flex-row md:items-center md:space-x-6 md:p-0 md:mt-0">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={handleClose}
                className={clsx(
                  baseLink,
                  scrolledStyle,
                  pathname === item.href && activeLink
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}

          {session && (
            <>
              <li>
                <Link
                  href="/myreservation"
                  onClick={handleClose}
                  className={clsx(
                    baseLink,
                    scrolledStyle,
                    pathname === "/myreservation" && activeLink
                  )}
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
                      className={clsx(
                        baseLink,
                        scrolledStyle,
                        pathname === "/admin/dashboard" && activeLink
                      )}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/room"
                      onClick={handleClose}
                      className={clsx(
                        baseLink,
                        scrolledStyle,
                        pathname === "/admin/room" && activeLink
                      )}
                    >
                      Manage Room
                    </Link>
                  </li>
                </>
              )}
            </>
          )}

          {/* sign in/out mobile */}
          {session ? (
            <li className="pt-3 md:hidden">
              <button
                onClick={() => {
                  signOut();
                  handleClose();
                }}
                className="w-full py-2.5 px-4 bg-red-500 text-white hover:bg-red-600 rounded-md shadow-sm"
              >
                Sign Out
              </button>
            </li>
          ) : (
            <li className="pt-3 md:pt-0">
              <Link
                href="/signin"
                onClick={handleClose}
                className="py-2.5 px-6 bg-orange-500 text-white hover:bg-orange-600 rounded-md shadow-sm block text-center"
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
