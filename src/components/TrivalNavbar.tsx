"use client";

import React from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

interface NavItem {
  id: string;
  icon: string;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  {
    id: "home",
    icon: "https://res.cloudinary.com/dgechlqls/image/upload/v1766226889/Group_qp18l8.png",
    label: "Home",
    path: "/",
  },
  {
    id: "events",
    icon: "https://res.cloudinary.com/dgechlqls/image/upload/v1766226895/Group_1_g5roxz.png",
    label: "Events",
    path: "/events",
  },
  {
    id: "sponsors",
    icon: "https://res.cloudinary.com/dgechlqls/image/upload/v1766226904/Group_2_ur19lj.png",
    label: "Sponsors",
    path: "/sponsors",
  },
  {
    id: "contact",
    icon: "https://res.cloudinary.com/dgechlqls/image/upload/v1766226912/Group_3_centwg.png",
    label: "Contact",
    path: "/contact",
  },
];

interface TribalNavbarProps {
  className?: string;
}

const TribalNavbar: React.FC<TribalNavbarProps> = ({ className = "" }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    // CHANGED: Added 'hidden md:flex' to hide on mobile and show on medium screens+
    <div
      className={`fixed bottom-6 left-1/2 z-50 hidden w-full -translate-x-1/2 justify-center md:flex ${className}`}
    >
      <div className="relative flex w-full max-w-lg items-center justify-between px-4">
        {/* Background Line */}
        <div className="absolute top-1/2 right-0 left-0 z-0 -mx-6 h-4 -translate-y-1/2 rounded-full border-3 border-[#df972b] bg-[#361E1E] shadow-inner" />

        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className="group relative z-10 flex flex-col items-center justify-center focus:outline-none"
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <div
                className={`relative flex h-16 w-16 items-center justify-center rounded-full border-3 shadow-2xl transition-all duration-300 ease-out md:h-20 md:w-20 ${
                  isActive
                    ? "border-[#FBB752] bg-white"
                    : "border-[#FBB752] bg-[#000000] hover:bg-[#FBB752]"
                }`}
              >
                <div className="relative h-3/5 w-3/5">
                  <Image
                    src={item.icon}
                    alt={item.label}
                    fill
                    className={`object-contain transition-all duration-300 ${
                      isActive ? "opacity-100" : "opacity-70 invert"
                    }`}
                    unoptimized
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TribalNavbar;
