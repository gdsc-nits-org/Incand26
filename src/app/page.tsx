"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setAnimate(true);
    }, 500);

    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black">
      {/* BACKGROUND IMAGE (SCALE ANIMATION) */}
      <div
        className={`absolute inset-0 z-10 transition-transform duration-1200 ease-in-out ${animate ? "scale-100" : "scale-[1.5]"} `}
      >
        <img src="/Frame.png" alt="Tapestry" className="h-full w-full" />
      </div>

      {/* CENTER T-SHIRT */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
        <img
          src="/Tshirt.png"
          alt="T-shirt"
          className={`w-[220px] transition-opacity duration-700 ease-in-out lg:w-[420px] ${animate ? "opacity-0" : "opacity-100"} `}
        />
      </div>
      {/* CENTER TEXT */}
      <div
        className={`absolute inset-0 z-30 flex flex-col items-center justify-center text-center transition-all delay-300 duration-700 ease-in-out ${animate ? "visible scale-100 opacity-100" : "invisible scale-105 opacity-0"} `}
      >
        <h1 className="font-hitchcut text-2xl font-bold text-[#A50001] lg:text-8xl">
          FEEL THE
        </h1>

        <h1 className="font-hitchcut text-2xl font-bold text-[#008080] lg:text-8xl">
          TAPESTRY
        </h1>

        <h2 className="font-hitchcut mt-4 text-xl text-[#751313] lg:text-5xl">
          INCAND 26’
        </h2>

        <h2 className="font-hitchcut text-lg text-[#751313] lg:text-5xl">
          OFFICIAL MERCH
        </h2>
        <div>
          <img src="/Vector.png" className="mb:2 mt-2 h-[50%] md:h-[60%]"></img>
        </div>
        <button className="relative top-[-20px] flex animate-[wiggle_2.5s_ease-in-out_infinite] items-center justify-center overflow-hidden rounded-full border-3 border-black bg-[#6b1f1f] px-4 py-2 text-[2px] tracking-widest text-[#fff2cc] shadow-lg hover:scale-105 lg:px-10 lg:py-4">
          {/* LEFT END DESIGN */}
          <div>
            <img
              src="/design.png"
              alt=""
              className="absolute top-[-4px] left-[2px] h-full rotate-180 opacity-90"
            />
          </div>

          {/* TEXT */}
          <span className="tracking-0.18em relative z-70 w-full text-lg">
            GET IT NOW
          </span>

          {/* RIGHT END DESIGN */}
          <div>
            <img
              src="/design.png"
              alt=""
              className="absolute top-[5px] right-[-2px] h-full"
            />
          </div>
        </button>
      </div>
    </main>
  );
}
