"use client";
import Image from "next/image";
import { useState } from "react";
import events from "../../data/event.json";



const images = [
  "/image/Vector1.png",
  "/image/Vector2.png",
  "/image/Group.png",
  "/image/Group1.png",
  "/image/Vector1.png",
  "/image/Vector2.png",
  "/image/Group.png",
  "/image/Group1.png",
];

export default function EventPoster() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const isOddHovered = hoveredIndex !== null && hoveredIndex % 2 === 1;
  const [currentIndex, setCurrentIndex] = useState(0);
const event = events[currentIndex];
const goNext = () => {
  setCurrentIndex((prev) => (prev + 1) % events.length);
};

const goPrev = () => {
  setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
};



  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      {/* GRID CONTAINER */}
      <div
        className="
        min-h-screen min-w-screen
          grid
          grid-cols-9 grid-rows-15
          sm:grid-cols-21 sm:grid-rows-11
          w-full max-w-[700px]
          h-[400px] sm:h-[400px] 
          bg-[#fffffe]
          border border-black
          divide-x divide-y divide-black
        "
      >

        {/* BACKGROUND GRID */}
        {Array.from({ length: 21 * 11 }).map((_, i) => {
          const src = images[i % images.length];
          const isOddCell = i % 2 === 1;

          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onTouchStart={() => setHoveredIndex(i)}
               onTouchEnd={() => setHoveredIndex(null)}
              className={`relative overflow-hidden border border-black transition-colors duration-300
                ${
                  isOddHovered
                    ? "bg-[#4F2222]"
                    : isOddCell
                    ? "hover:bg-[#4F2222]"
                    : ""
                }
              `}
            >
              <Image
                src={src}
                fill
                className="object-contain opacity-50 transition-all duration-300"
                alt=""
              />
            </div>
          );
        })}

        {/* MAIN IMAGE */}
        <div
          className="
            col-span-5 row-span-7 col-start-3 row-start-2
            sm:col-span-8 sm:row-span-8 sm:col-start-2 sm:row-start-2
            relative overflow-hidden
          "
        >
          <Image src={event.image} alt="Event" fill className="object-cover" priority />
        </div>

        {/* NUMBER */}
        <div
          className={`
            col-span-1 row-span-1 col-start-3 row-start-9
            sm:col-span-1 sm:col-start-12 sm:row-start-2
            text-xl font-bold flex justify-center items-center transition-colors duration-300
            ${isOddHovered ? "bg-[#2f200c] text-white" : "bg-[#fffac5] text-black"}
          `}
        >
          {event.number}

        </div>

        {/* DATE */}
        <div
          className={`
            col-span-2 row-span-1 row-start-9 col-start-6
            sm:col-span-3 sm:col-start-17 sm:row-start-2 
            md:col-span-3 md:col-start-17 md:row-start-2 
            text-xs sm:text-4xl  md:text-xl font-semibold flex items-center justify-center transition-colors duration-300
            ${isOddHovered ? "bg-[#2f200c] text-white" : "bg-amber-100 text-black"}
          `}
        >
          {event.date}

        </div>

        {/* TITLE */}
        <div
          className={`
            col-span-2 row-span-1 row-start-10 col-start-3 text-[15px]
            sm:col-span-4 sm:col-start-11 sm:row-start-4  sm:text-6xl md:text-3xl
            font-bold flex justify-center items-center transition-colors duration-300
            ${isOddHovered ? "bg-[#2f200c] text-white" : "bg-amber-100 text-black"}
          `}
        >
          {event.title}

        </div>

        {/* DESCRIPTION */}
      <div
  className={`
    col-span-5 row-span-4 row-start-11 col-start-3
    sm:col-span-9 sm:row-span-5 sm:col-start-11 sm:row-start-5

    p-3

    text-xs
    sm:text-base
    md:text-lg
    lg:text-3xl

    leading-snug sm:leading-normal lg:leading-relaxed

    overflow-y-auto
    transition-colors duration-300

    ${isOddHovered ? "bg-[#2f200c] text-white" : "bg-amber-100 text-black"}
  `}
>
  {event.description}
</div>


        {/* PREVIOUS BUTTON */}
        
        <div
          className="
            col-span-1 row-span-1 row-start-15 col-start-3 
            sm:col-span-3 sm:col-start-2 sm:row-start-11
            flex justify-center items-center 
            
          "
        >
          <button onClick={goPrev} className={` rounded w-15 h-10 text-[7px] lg:w-25 lg:h-10 border border-amber-950 ${isOddHovered ? "text-white bg-amber-950" : "bg-amber-600 text-white"}`}>
            PREVIOUS
          </button>
        </div>

        {/* NEXT BUTTON */}
        <div
          className="
            col-span-1 row-start-15 col-start-7
            sm:col-span-3 sm:col-start-18 sm:row-start-11
            flex justify-center items-center
            
          "
        >
          <button onClick={goNext} className={` rounded w-25 h-10 text-[7px] border border-amber-950 ${isOddHovered ? "text-white bg-amber-950" : "bg-amber-600 text-white"}`}>
            NEXT
          </button>
        </div>

      </div>
    </div>
  );
}
