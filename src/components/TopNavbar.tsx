"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface NavItem {
  id: string;
  icon: string;
  label: string;
}
//write the id for your page here
const navItems: NavItem[] = [
  {
    id: "home",
    icon: "https://res.cloudinary.com/dgechlqls/image/upload/v1766226889/Group_qp18l8.png",
    label: "Home",
  },
  {
    id: "about",
    icon: "https://res.cloudinary.com/dgechlqls/image/upload/v1766226895/Group_1_g5roxz.png",
    label: "About",
  },
  {
    id: "events",
    icon: "https://res.cloudinary.com/dgechlqls/image/upload/v1766226904/Group_2_ur19lj.png",
    label: "Events",
  },
  {
    id: "sponsors",
    icon: "newLanding/Group.png",
    label: "Team",
  },
  {
    id: "merch",
    icon: "https://res.cloudinary.com/dgechlqls/image/upload/v1766226912/Group_3_centwg.png",
    label: "Photo Gallery",
  },
];

const TopNavbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const observer = new IntersectionObserver(
      (entries) => {
        let anyIntersecting = false;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anyIntersecting = true;
            setActiveSection(entry.target.id);
          }
        });

        // If nothing is intersecting, user is on the first (landing) full-screen section
        if (!anyIntersecting) {
          setActiveSection("home");
        }
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
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    /* Hidden below xl */
    <div
      className={`fixed top-6 left-1/2 z-50 hidden w-full -translate-x-1/2 justify-center transition-opacity duration-700 xl:flex ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative flex w-full max-w-2xl items-center justify-center gap-10 px-4">
        {/* Background Line */}
        <div
          className={`absolute top-[40px] right-0 left-0 z-0 mx-6 h-3 -translate-y-1/2 rounded-full border-2 border-[#df972b] bg-[#361E1E] shadow-inner transition-all duration-1000 ease-out ${
            isLoaded ? "w-auto opacity-100" : "w-0 opacity-0"
          }`}
        />

        {navItems.map((item) => {
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              aria-label={item.label}
              className="group relative z-10 flex flex-col items-center justify-center focus:outline-none"
            >
              {/* Icon Circle */}
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

              {/* Hover Label */}
              <span className="absolute z-10 -translate-y-2 text-sm font-bold tracking-wider whitespace-nowrap text-[#361E1E] opacity-0 transition-all duration-500 ease-out group-hover:translate-y-12 group-hover:opacity-100">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TopNavbar;
