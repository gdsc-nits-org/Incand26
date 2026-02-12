"use client";
import { useState, useEffect } from "react";

const CLOUDINARY_LINKS = [
  "https://res.cloudinary.com/dustrkqlj/image/upload/v1769534469/1st_j36lep.webp",
  "https://res.cloudinary.com/dustrkqlj/image/upload/v1769534471/2nd_dg8uah.webp",
  "https://res.cloudinary.com/dustrkqlj/image/upload/v1769534468/3rd_v5plhc.webp",
  "https://res.cloudinary.com/dustrkqlj/image/upload/v1769534468/4th_t8jnji.webp",
  "https://res.cloudinary.com/dustrkqlj/image/upload/v1769534472/5ht_wybnhu.webp",
  "https://res.cloudinary.com/dustrkqlj/image/upload/v1769534467/6th_l6jxqe.webp",
];

const Slideshow = () => {
  const [activeFrame, setActiveFrame] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveFrame((prev) => (prev + 1) % CLOUDINARY_LINKS.length);
    }, 1200);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {CLOUDINARY_LINKS.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 h-full w-full transition-opacity duration-300 ease-in-out ${
            index === activeFrame ? "z-10 opacity-100" : "z-0 opacity-0"
          }`}
        >
          <img
            src={src}
            alt={`Godless slide ${index + 1}`}
            className="h-full w-full object-fill"
          />
        </div>
      ))}
    </div>
  );
};

export default Slideshow;
