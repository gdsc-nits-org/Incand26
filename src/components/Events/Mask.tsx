"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Mask = () => {
  return (
    <section className="relative z-20 -mt-48 w-full px-4 pt-48 pb-20 sm:-mt-60 sm:pt-16 sm:pb-32">
      {/* Mobile Background */}
      <div className="absolute inset-0 z-0 -translate-y-12 sm:hidden">
        <Image
          src="https://res.cloudinary.com/dig1vxljf/image/upload/v1768143790/test_1_zqbexs.png"
          alt="Mobile Background"
          fill
          className="object-cover"
        />
      </div>

      {/* Desktop Background */}
      <div className="absolute inset-0 z-0 hidden sm:block">
        <Image
          src="https://res.cloudinary.com/dig1vxljf/image/upload/v1768141246/Group_1171279537_dk7vpc.png"
          alt="Desktop Background"
          fill
          className="object-cover"
        />
      </div>
      <div className="relative z-10 mx-auto mt-16 flex max-w-360 flex-col items-center justify-center gap-16 sm:gap-1">
        {/* First Row - Original 3 buttons */}
        <div className="flex w-full flex-col items-center justify-center gap-16 md:flex-row md:items-start md:justify-between md:gap-4 lg:gap-12">
          <Link
            href="/nirvana"
            className="group relative h-80 w-full cursor-pointer overflow-visible transition-all md:mt-64 md:h-90 md:w-[24%]"
          >
            <div className="absolute -top-12 left-1/2 z-0 -translate-x-1/2 opacity-100 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] md:translate-y-24 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
              <button className="font-hitchcut relative h-20 w-56 overflow-hidden font-bold text-[#4F2222]">
                <Image
                  src="https://res.cloudinary.com/dig1vxljf/image/upload/v1768035036/button_lwvvpx.png"
                  alt="Button Background"
                  fill
                  className="object-contain"
                />
                <span className="relative z-10">NIRVANA</span>
              </button>
            </div>

            <div className="relative z-10 h-full w-full overflow-hidden transition-transform duration-500 ease-out group-hover:scale-95">
              <Image
                src="https://res.cloudinary.com/dig1vxljf/image/upload/v1768035189/Component_100_gi5otv.png"
                alt="Event 1"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          <Link href="/carpediem" className="group relative order-first h-125 w-full cursor-pointer overflow-visible transition-all md:order-0 md:h-200 md:w-[45%]">
            <div className="absolute top-4 left-1/2 z-0 -translate-x-1/2 opacity-100 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] md:top-20 md:translate-y-24 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
              <button className="font-hitchcut relative h-24 w-64 overflow-hidden font-bold text-[#4F2222]">
                <Image
                  src="https://res.cloudinary.com/dig1vxljf/image/upload/v1768035036/button_lwvvpx.png"
                  alt="Button Background"
                  fill
                  className="object-contain"
                />
                <span className="relative z-10 text-lg">CARPEDIEM</span>
              </button>
            </div>
            <div className="relative z-10 h-full w-full overflow-hidden transition-transform duration-500 ease-out group-hover:scale-95">
              <Image
                src="https://res.cloudinary.com/dig1vxljf/image/upload/v1768035147/Component_99_yxajjl.png"
                alt="Main Event big"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          <Link href="/thundermarch" className="group relative h-80 w-full cursor-pointer overflow-visible transition-all md:mt-64 md:h-90 md:w-[24%]">
            <div className="absolute -top-12 left-1/2 z-0 -translate-x-1/2 opacity-100 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] md:translate-y-24 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
              <button className="font-hitchcut relative h-20 w-56 overflow-hidden font-bold text-[#4F2222]">
                <Image
                  src="https://res.cloudinary.com/dig1vxljf/image/upload/v1768035036/button_lwvvpx.png"
                  alt="Button Background"
                  fill
                  className="object-contain"
                />
                <span className="relative z-10">THUNDERMARCH</span>
              </button>
            </div>

            <div className="relative z-10 h-full w-full overflow-hidden transition-transform duration-500 ease-out group-hover:scale-95">
              <Image
                src="https://res.cloudinary.com/dig1vxljf/image/upload/v1768035189/Component_100_gi5otv.png"
                alt="Event 3"
                fill
                className="object-contain"
              />
            </div>
          </Link>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-16 md:flex-row md:gap-8 lg:gap-12">
          <Link
            href="/komedi"
            className="group relative h-80 w-full cursor-pointer overflow-visible transition-all md:h-90 md:w-[30%]"
          >
            <div className="absolute -top-12 left-1/2 z-0 -translate-x-1/2 opacity-100 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] md:translate-y-24 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
              <button className="font-hitchcut relative h-20 w-56 overflow-hidden font-bold text-[#4F2222]">
                <Image
                  src="https://res.cloudinary.com/dig1vxljf/image/upload/v1768035036/button_lwvvpx.png"
                  alt="Button Background"
                  fill
                  className="object-contain"
                />
                <span className="relative z-10">KOMEDI KNIGHT</span>
              </button>
            </div>

            <div className="relative z-10 h-full w-full overflow-hidden transition-transform duration-500 ease-out group-hover:scale-95">
              <Image
                src="https://res.cloudinary.com/dig1vxljf/image/upload/v1768035189/Component_100_gi5otv.png"
                alt="Event 4"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          <Link
            href="/dj"
            className="group relative h-80 w-full cursor-pointer overflow-visible transition-all md:h-90 md:w-[30%]"
          >
            <div className="absolute -top-12 left-1/2 z-0 -translate-x-1/2 opacity-100 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] md:translate-y-24 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
              <button className="font-hitchcut relative h-20 w-56 overflow-hidden font-bold text-[#4F2222]">
                <Image
                  src="https://res.cloudinary.com/dig1vxljf/image/upload/v1768035036/button_lwvvpx.png"
                  alt="Button Background"
                  fill
                  className="object-contain"
                />
                <span className="relative z-10">DJ NIGHT</span>
              </button>
            </div>

            <div className="relative z-10 h-full w-full overflow-hidden transition-transform duration-500 ease-out group-hover:scale-95">
              <Image
                src="https://res.cloudinary.com/dig1vxljf/image/upload/v1768035189/Component_100_gi5otv.png"
                alt="Event 5"
                fill
                className="object-contain"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Mask;
