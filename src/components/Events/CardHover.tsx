import React from "react";
import Image from "next/image";

interface CardHoverProps {
  upperImage: string;
  lowerImage: string;
  eventName: string;
  onClick?: () => void;
}

const CardHover = ({
  upperImage,
  lowerImage,
  eventName,
  onClick,
}: CardHoverProps) => {
  return (
    <div
      onClick={onClick}
      className="group relative h-72 w-full cursor-pointer overflow-hidden rounded-3xl border-6 border-[#000000] bg-white"
    >
      <div className="absolute inset-0 z-0 flex flex-col items-center justify-center text-center px-6 mt-4">
        {/* Event Name */}
        <h3 className="font-hitchcut transform text-2xl font-black tracking-widest text-black uppercase transition-all duration-500 ease-out group-hover:-translate-y-4 ">
          {eventName}
        </h3>

        {/* View Details  */}
        <div className="mt-1 -translate-y-4 text-lg font-medium tracking-wider text-black uppercase opacity-0 transition-all duration-500 ease-out group-hover:-translate-y-4 group-hover:opacity-100">
          View Details
        </div>
      </div>

      {/* UPPER IMAGE */}
      <div className="absolute top-0 right-0 left-0 z-10 h-1/2 overflow-hidden transition-transform duration-700 ease-in-out group-hover:-translate-y-full">
        <div className="relative h-full w-full">
          <Image
            src={upperImage}
            alt="Upper part"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* LOWER IMAGE */}
      <div className="absolute right-0 bottom-0 left-0 z-10 h-1/2 overflow-hidden transition-transform duration-700 ease-in-out group-hover:translate-y-full">
        <div className="relative h-full w-full">
          <Image
            src={lowerImage}
            alt="Lower part"
            fill
            className="object-cover"
            style={{ objectPosition: "bottom" }}
          />
        </div>
      </div>
    </div>
  );
};

export default CardHover;
