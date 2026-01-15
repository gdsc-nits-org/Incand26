
"use client";

import Image from "next/image";
import events from "../../../data/event.json";
import { useParams, useRouter } from "next/navigation";

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

export const runtime = 'edge';

export default function EventPoster() {
 const params = useParams();
const router = useRouter();

const eventId = Number(params.eventId);

const event = events.find(e => e.id === eventId);

if (!event) {
  return <div>Event not found</div>;
}

const currentIndex = events.findIndex(e => e.id === eventId);

if (currentIndex === -1) {
  return <div>Invalid event</div>;
}



 const dateObj = new Date(event.date);

const day = String(dateObj.getDate()).padStart(2, "0");
const month = String(dateObj.getMonth() + 1).padStart(2, "0");
const year = String(dateObj.getFullYear()).slice(-2);

  

const isAlternateTheme = event.id % 2 === 1;


  const goNext = () => {
  const nextIndex = (currentIndex + 1) % events.length;
  const nextId = events[nextIndex].id;
  router.push(`/event/${nextId}`);
};


  const goPrev = () => {
  const prevIndex = (currentIndex - 1 + events.length) % events.length;
  const prevId = events[prevIndex].id;
  router.push(`/event/${prevId}`);
};


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="grid h-[25rem] min-h-screen w-full max-w-[43.75rem] min-w-screen grid-cols-9 grid-rows-16 divide-x divide-y divide-black border border-black bg-[#fffffe] sm:h-[25rem] sm:grid-cols-21 sm:grid-rows-11">
        {Array.from({ length: 21 * 16 }).map((_, i) => {
          const src = images[i % images.length];

          return (
            <div
              key={i}
              className={`relative overflow-hidden border border-black transition-colors duration-300 ${
                isAlternateTheme ? "bg-[#4F2222]" : ""
              } `}
            >
              <Image
                src={src}
                fill
                className={`object-contain transition-all duration-300 ${
                  isAlternateTheme ? "opacity-30" : "opacity-50"
                }`}
                alt=""
              />
            </div>
          );
        })}

        <div className="relative col-span-7 col-start-2 row-span-7 row-start-2 overflow-hidden sm:col-span-8 sm:col-start-2 sm:row-span-8 sm:row-start-2">
          <Image
            src={event.image}
            alt="Event"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div
          className={`col-span-1 col-start-2 row-span-1 row-start-10 flex items-center justify-center text-xl font-bold transition-colors duration-300 sm:col-span-1 sm:col-start-11 sm:row-start-2 ${
            isAlternateTheme
              ? "bg-[#1E0C0C] text-white"
              : "bg-[#FFF8EC] text-black"
          } `}
        >
          {event.id}
        </div>

        <div
          className={`col-span-1 col-start-6 row-span-1 row-start-10 flex items-center justify-center text-xs font-semibold transition-colors duration-300 sm:col-span-1 sm:col-start-17 sm:row-start-2 sm:text-2xl md:text-xl ${
            isAlternateTheme
              ? "bg-[#1E0C0C] text-white"
              : "bg-[#FFF8EC] text-black"
          } `}
        >
          {day}
        </div>

        <div
          className={`col-span-1 col-start-7 row-span-1 row-start-10 flex items-center justify-center text-xs font-semibold transition-colors duration-300 sm:col-span-1 sm:col-start-18 sm:row-start-2 sm:text-2xl md:text-xl ${
            isAlternateTheme
              ? "bg-[#1E0C0C] text-white"
              : "bg-[#FFF8EC] text-black"
          } `}
        >
          {month}
        </div>

        <div
          className={`col-span-1 col-start-8 row-span-1 row-start-10 flex items-center justify-center text-xs font-semibold transition-colors duration-300 sm:col-span-1 sm:col-start-19 sm:row-start-2 sm:text-2xl md:text-xl ${
            isAlternateTheme
              ? "bg-[#1E0C0C] text-white"
              : "bg-[#FFF8EC] text-black"
          } `}
        >
          {year}
        </div>

        <div
          className={`col-span-7 col-start-2 row-span-1 row-start-11 flex items-center justify-center text-[15px] font-bold transition-colors duration-300 sm:col-span-7 sm:col-start-11 sm:row-start-4 sm:text-xl md:col-span-8 md:col-start-11 md:text-3xl md:leading-normal lg:col-span-6 lg:col-start-11 lg:text-3xl lg:leading-relaxed ${
            isAlternateTheme
              ? "bg-[#1E0C0C] text-white"
              : "bg-[#FFF8EC] text-black"
          } `}
        >
          {event.title}
        </div>

        <div
          className={`col-span-7 col-start-2 row-span-3 row-start-12 overflow-y-auto p-3 text-xs leading-tight transition-colors duration-300 sm:col-span-9 sm:col-start-11 sm:row-span-5 sm:row-start-5 sm:text-sm sm:leading-snug md:text-base md:leading-normal lg:text-xl lg:leading-relaxed ${
            isAlternateTheme
              ? "border border-white/30 bg-[#1E0C0C] text-white"
              : "bg-[#FFF8EC] text-black"
          } `}
        >
          {event.description}
        </div>

        <div className="col-span-2 col-start-2 row-span-1 row-start-16 flex items-center justify-center sm:col-span-3 sm:col-start-2 sm:row-start-11">
          <button
            onClick={goPrev}
            className={`h-10 w-24 rounded text-[10px] font-bold ring-2 ring-amber-950 sm:h-10 sm:w-24 sm:text-xs ${
              isAlternateTheme
                ? "bg-amber-950 text-white"
                : "bg-amber-600 text-white"
            }`}
          >
            PREVIOUS
          </button>
        </div>

        <div className="col-span-2 col-start-7 row-start-16 flex items-center justify-center sm:col-span-3 sm:col-start-18 sm:row-start-11">
          <button
            onClick={goNext}
            className={`h-10 w-24 rounded text-[10px] font-bold ring-2 ring-amber-950 sm:h-10 sm:w-24 sm:text-xs ${
              isAlternateTheme
                ? "bg-amber-950 text-white"
                : "bg-amber-600 text-white"
            }`}
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
}
