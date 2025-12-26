"use client";
import React from "react";
import InfiniteScroller from "~/components/InfiniteScroller";
import GlobalScrollStyles from "~/components/GlobalScrollStyles_Sponsers";
import sponsorsData from "../../../public/data/sponsors.json";

export default function Sponsors() {
  const data = sponsorsData;

  return (
    <>
      <GlobalScrollStyles />
      {/* ---  SPONSORS --- */}
      <section
        id="sponsors"
        className="relative min-h-screen w-full snap-start bg-cover bg-center bg-no-repeat md:h-screen md:overflow-hidden"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dgechlqls/image/upload/v1766212699/BACKUP_SPONSORS_osnbmg.png')",
        }}
      >
        <div className="max-w-8xl font-hitchcut mx-auto flex h-full flex-col justify-center py-2 md:py-0 lg:px-10">
          {/* DESKTOP LAYOUT */}
          <div className="hidden h-full grid-cols-2 items-center gap-12 md:grid">
            {/* TEXT */}
            <div className="pr-8">
              <h1 className="mb-8 text-7xl font-black text-amber-900 drop-shadow-2xl">
                PREVIOUS SPONSORS
              </h1>
              <p className="text-3xl leading-relaxed font-medium text-[#000000]">
                NIT Silchar&apos;s cultural extravaganza invites you into a
                vibrant{" "}
                <span className="font-bold text-[#008080]">
                  Tribal Tapestry
                </span>
                —a journey woven with ancient rhythms, timeless traditions, and
                stories passed through generations, where heritage comes alive
                and brilliance shines from the roots.
              </p>
            </div>

            {/* SCROLLERS */}
            <div className="flex h-full gap-8 overflow-hidden">
              <div className="w-1/2">
                <InfiniteScroller direction="down" sponsors={data.column1} />
              </div>
              <div className="w-1/2">
                <InfiniteScroller direction="up" sponsors={data.column2} />
              </div>
            </div>
          </div>

          {/* MOBILE LAYOUT */}
          <div className="flex flex-col gap-8 px-4 py-12 pb-32 md:hidden">
            <h1 className="text-center text-5xl font-black text-[#520000]">
              PREVIOUS SPONSORS
            </h1>
            <p className="px-4 text-center text-xl text-[#000000]">
              NIT Silchar&apos;s cultural extravaganza invites you into a
              vibrant{" "}
              <span className="font-bold text-[#008080]">Tribal Tapestry</span>
              —a journey woven with ancient rhythms, timeless traditions, and
              stories passed through generations.
            </p>
            <div className="flex flex-col gap-6">
              <InfiniteScroller direction="left" sponsors={data.column1} />
              <InfiniteScroller direction="right" sponsors={data.column2} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
