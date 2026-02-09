"use client";
import React from "react";
import dynamic from "next/dynamic";

const Mask = dynamic(() => import("~/components/Events/Mask"));
const DayEvents = dynamic(() => import("~/components/Events/DayEvents"));
export default function Page() {
  return (
    <main className="relative block min-h-screen w-full overflow-x-hidden bg-[url('https://res.cloudinary.com/dig1vxljf/image/upload/v1768227886/test_2_bsqq4s.webp')] bg-cover bg-center">
      <section className="relative z-10 flex min-h-screen w-full scale-102 items-center justify-center bg-[url('https://res.cloudinary.com/dig1vxljf/image/upload/v1768136260/48d59871a50ab21d20693571408aa20b_1_1_yvzfga.webp')] bg-cover bg-center px-4 text-center sm:bg-[url('https://res.cloudinary.com/dig1vxljf/image/upload/v1768026543/events-main_hdqtxj.webp')]">
        <div className="z-10 mt-40 flex flex-col items-center gap-4 sm:mt-0">
          <h1 className="font-hitchcut text-outline-thick text-shadow text-7xl text-white sm:text-7xl md:text-8xl lg:text-9xl">
            EVENTS
          </h1>
          <h2 className="font-hitchcut text-outline text-shadow block text-4xl sm:hidden">
            <span className="text-[#D2AC1D]"> Of InCaNdeScenCe</span>{" "}
            <span className="text-[#D2AC1D]">2026</span>
          </h2>
          <h2 className="font-hitchcut text-outline text-shadow hidden text-white sm:block sm:text-3xl md:text-4xl lg:text-5xl">
            Of InCaNd 2026
          </h2>
          <h3 className="font-hitchcut text-shadow mt-10 text-3xl tracking-widest text-white sm:mt-0 sm:text-2xl">
            SCROLL DOWN
          </h3>
        </div>
      </section>
      <Mask />
      <DayEvents />
    </main>
  );
}
