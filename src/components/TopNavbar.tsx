"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  route: string;
  icon: string;
  label: string;
}

const navItems: NavItem[] = [
  {
    route: "/",
    icon: "https://res.cloudinary.com/dgechlqls/image/upload/v1766226889/Group_qp18l8.png",
    label: "Home",
  },
  {
    route: "/events",
    icon: "https://res.cloudinary.com/dgechlqls/image/upload/v1766226904/Group_2_ur19lj.png",
    label: "Events",
  },
  {
    route: "/gallery",
    icon: "https://res.cloudinary.com/dgechlqls/image/upload/v1766226912/Group_3_centwg.png",
    label: "Photo Gallery",
  },
  {
    route: "/team",
    icon: "newLanding/Group.png",
    label: "Team",
  },
];

interface TopNavbarProps {
  fromLayout?: boolean;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ fromLayout = false }) => {
  const pathname = usePathname();
  const [isLoaded, setIsLoaded] = useState(false);
  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  if (fromLayout && pathname === "/") {
    return null;
  }

  return (
    <>
      {/* ========================================= */}
      {/* DESKTOP NAVBAR (Unchanged)                */}
      {/* ========================================= */}
      <div
        className={`fixed top-6 left-1/2 z-[1000000000000000] hidden w-full -translate-x-1/2 justify-center transition-opacity duration-700 xl:flex ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="relative flex w-full max-w-2xl items-center justify-center gap-10 px-4">
          {/* Background Line */}
          <div
            className={`absolute top-[40px] right-0 left-0 z-0 mx-14 h-3 -translate-y-1/2 rounded-full border-2 border-[#df972b] bg-[#361E1E] shadow-inner transition-all duration-1000 ease-out ${
              isLoaded ? "w-auto opacity-100" : "w-0 opacity-0"
            }`}
          />

          {navItems.map((item) => {
            const isActive = pathname === item.route;

            return (
              <Link
                key={item.route}
                href={item.route}
                aria-label={item.label}
                className="group relative z-10 flex flex-col items-center justify-center focus:outline-none"
              >
                <div
                  className={`relative z-20 flex h-20 w-20 scale-90 items-center justify-center rounded-full border-[3px] shadow-2xl transition-all duration-300 ease-out ${
                    isActive
                      ? "scale-90 border-[#FBB752] bg-white"
                      : "border-[#FBB752] bg-black hover:scale-95"
                  }`}
                >
                  <div className="relative h-3/5 w-3/5">
                    <Image
                      src={item.icon}
                      alt={item.label}
                      fill
                      unoptimized
                      className="object-contain opacity-100 transition-all duration-300"
                    />
                  </div>
                </div>

                <span
                  className={`absolute z-10 -translate-y-2 text-base font-bold tracking-wider whitespace-nowrap text-[#361E1E] transition-all duration-500 ease-out ${
                    isActive
                      ? "translate-y-12 opacity-100"
                      : "opacity-0 group-hover:translate-y-12 group-hover:opacity-100"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ========================================= */}
      {/* MOBILE HAMBURGER & MENU (New Addition)    */}
      {/* ========================================= */}

      {/* Hamburger Button (Visible only < xl) */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`fixed top-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#FBB752] bg-black text-[#FBB752] shadow-lg transition-all duration-500 xl:hidden ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Toggle Menu"
      >
        <div className="relative flex w-6 flex-col items-center gap-[5px]">
          <span
            className={`h-[2px] w-full bg-[#FBB752] transition-all duration-300 ${
              isMobileMenuOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[2px] w-full bg-[#FBB752] transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-[2px] w-full bg-[#FBB752] transition-all duration-300 ${
              isMobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm transition-all duration-500 xl:hidden ${
          isMobileMenuOpen
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {navItems.map((item, index) => {
            const isActive = pathname === item.route;
            return (
              <Link
                key={item.route}
                href={item.route}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`group flex flex-col items-center gap-3 transition-all duration-500 ${
                  isMobileMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Mobile Icon Circle */}
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    isActive
                      ? "border-[#FBB752] bg-white"
                      : "border-[#FBB752] bg-transparent"
                  }`}
                >
                  <div className="relative h-8 w-8">
                    <Image
                      src={item.icon}
                      alt={item.label}
                      fill
                      unoptimized
                      className="object-contain"
                    />
                  </div>
                </div>
                {/* Mobile Label */}
                <span
                  className={`text-lg font-bold tracking-widest ${isActive ? "text-[#FBB752]" : "text-white"}`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default TopNavbar;
