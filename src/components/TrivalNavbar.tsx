"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
interface NavItem {
  id: string;
  icon: string;
  label: string;
}

const navItems: NavItem[] = [
  {
    id: "landing",
    icon: "https://res.cloudinary.com/dgechlqls/image/upload/v1766226912/Group_3_centwg.png",
    label: "Landing",
  },
  {
    id: "about",
    icon: "https://res.cloudinary.com/dgechlqls/image/upload/v1766226904/Group_2_ur19lj.png",
    label: "About",
  },
  {
    id: "sponsors",
    icon: "https://res.cloudinary.com/dgechlqls/image/upload/v1766226895/Group_1_g5roxz.png",
    label: "Sponsors",
  },
  {
    id: "merch",
    icon: "https://res.cloudinary.com/dgechlqls/image/upload/v1766226889/Group_qp18l8.png",
    label: "Merch",
  },
];

const TribalTrackbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState("landing");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      },
    );
    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []); // run once on mount

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 z-50 hidden w-full -translate-x-1/2 justify-center md:flex">
      <div className="relative flex w-full max-w-lg items-center justify-between px-4">
        {/* Background Line */}
        <div className="absolute top-1/2 right-0 left-0 z-0 -mx-6 h-4 -translate-y-1/2 rounded-full border-3 border-[#df972b] bg-[#361E1E] shadow-inner" />

        {navItems.map((item) => {
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="group relative z-10 flex cursor-pointer flex-col items-center justify-center focus:outline-none"
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <div
                className={`relative flex h-16 w-16 items-center justify-center rounded-full border-3 shadow-2xl transition-all duration-500 ease-out md:h-20 md:w-20 ${
                  isActive
                    ? "scale-110 border-[#FBB752] bg-white"
                    : "border-[#FBB752] bg-[#000000] hover:scale-105 hover:bg-[#FBB752]"
                }`}
              >
                <div className="relative h-3/5 w-3/5">
                  <Image
                    src={item.icon}
                    alt={item.label}
                    fill
                    className={`object-contain transition-all duration-500 ${
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

export default TribalTrackbar;
