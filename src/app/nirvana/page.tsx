"use client";
import React, { useState } from "react";
import Image from "next/image";
import RamanText from "~/components/Nirvana/raman";

const Nirvana = () => {
  const [active, setActive] = useState(false);
  const [showGif, setShowGif] = useState(false);

  const handleClick = () => {
    setActive(true);
    setTimeout(() => {
      setShowGif(true);
    }, 1800);
  };

  return (
    <div className="relative flex h-screen w-full overflow-hidden">
      <div
        className="relative z-40 w-1/2 cursor-pointer overflow-hidden shadow-2xl"
        onClick={handleClick}
      >
        <Image
          src="https://res.cloudinary.com/dig1vxljf/image/upload/v1769695216/Taba_chake_ordmix.png"
          alt="Base"
          fill
          className="object-cover"
        />

        {/* Cloud */}
        <div
          className={`pointer-events-none absolute -top-[1%] w-[60%] transition-all duration-1200 ease-out ${
            active
              ? "left-[45%] z-50 scale-150 opacity-100"
              : "left-[164%] z-50 scale-100 opacity-0"
          }`}
        >
          <Image
            src="https://res.cloudinary.com/dig1vxljf/image/upload/v1769696035/CITYPNG.COM_HD_Real_White_Cloud_Smoke_Transparent_PNG_-_8000x8000_1_1_s7jzyr.png"
            alt="Cloud"
            width={1200}
            height={1200}
            className="object-contain"
          />
        </div>

        {showGif && (
          <div className="animate-slide-down pointer-events-none absolute top-[5%] -left-[15%] z-30 w-[160%]">
            <Image
              src="./gif/raman.gif"
              alt="Effect"
              width={2000}
              height={2000}
              className="object-contain"
              unoptimized // Important for GIFs to animate
            />
          </div>
        )}
      </div>

      {/* man - made smaller */}
      <div
        className={`pointer-events-none absolute bottom-0 left-0 z-20 w-[55%] origin-bottom transition-all duration-1200 ease-out ${
          active
            ? "translate-x-[70%] scale-110 opacity-100"
            : "translate-x-[-20%] scale-100 opacity-0"
        }`}
      >
        <Image
          src="https://res.cloudinary.com/dig1vxljf/image/upload/v1769696116/Gemini_Generated_Image_ifti9hifti9hifti_3_dhieez.png"
          alt="Man"
          width={1200}
          height={1400}
          className="object-contain object-bottom"
        />
      </div>

      {/* RamanText - positioned above the man */}
      {showGif && (
        <div className="animate-slide-down absolute top-[10%] right-[20%] z-50 w-[25%]">
          <RamanText />
        </div>
      )}

      {/* Right Section */}
      <div className="relative z-10 w-1/2 overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dig1vxljf/image/upload/v1769695510/raman_negi_ijhgrd.png"
          alt="Right"
          fill
          className="object-full"
        />
      </div>
    </div>
  );
};

export default Nirvana;
