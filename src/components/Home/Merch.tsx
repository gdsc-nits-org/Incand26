"use client";

import { NoiseFilter } from "../NoiseFilter";
import { useEffect, useState } from "react";

export default function HomeMerch() {
  const [animate, setAnimate] = useState(false);
  

  useEffect(() => {
    const t = setTimeout(() => {
      setAnimate(true);
    }, 500);

    return () => clearTimeout(t);
  }, []);

  return (
    <>
    
    <main className="relative h-screen w-screen overflow-hidden bg-black">
      <NoiseFilter />
      {/* BACKGROUND IMAGE (SCALE ANIMATION) */}
      <div
        className={`absolute inset-0 z-10 transition-transform duration-1200 ease-in-out ${animate ? "scale-100" : "scale-[1.5]"} `}
      >
        <img
          src="https://res.cloudinary.com/dsaaxuphe/image/upload/v1766330345/Frame_48096196_bziwnx.webp"
          alt="Tapestry"
          className="h-full w-full"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
        <img
          src="https://res.cloudinary.com/dsaaxuphe/image/upload/v1766330329/36e3457304d265d12daff04034d952d55c27800a_gytzwf.webp"
          alt="T-shirt"
          className={`w-[13.75rem] transition-opacity duration-700 ease-in-out lg:w-[26.25rem] ${animate ? "opacity-0" : "opacity-100"} `}
        />
      </div>
      {/* CENTER TEXT */}
      <div
        className={`absolute inset-0 z-30 flex flex-col items-center justify-center text-center transition-all delay-300 duration-700 ease-in-out ${animate ? "visible scale-100 opacity-100" : "invisible scale-105 opacity-0"} `}
      >
        <h1
          className="font-hitchcut text-2xl font-bold text-[#A50001] lg:text-8xl"
          style={{ filter: "url(#textNoise)" }}
        >
          FEEL THE
        </h1>

        <h1
          className="font-hitchcut text-2xl font-bold text-[#008080] lg:text-8xl"
          style={{ filter: "url(#textNoise)" }}
        >
          TAPESTRY
        </h1>

        <h2 className="font-hitchcut mt-4 text-xl text-[#751313] lg:text-5xl">
          INCAND 26’
        </h2>

        <h2 className="font-hitchcut text-lg text-[#751313] lg:text-5xl">
          OFFICIAL MERCH
        </h2>
        <div>
          <img
            src="https://res.cloudinary.com/dsaaxuphe/image/upload/v1766329702/Vector_lak8vr.webp"
            className="mb:2 mt-2 h-[50%] md:h-[60%]"
          ></img>
        </div>
        <button className="relative top-[-1.25rem] flex animate-[wiggle_2.5s_ease-in-out_infinite] items-center justify-center overflow-hidden rounded-full border-3 border-black bg-[#6b1f1f] px-4 py-2 text-[0.125rem] tracking-widest text-[#fff2cc] shadow-lg hover:scale-105 lg:px-10 lg:py-4">
          {/* LEFT END DESIGN */}
          <div>
            <img
              src="https://res.cloudinary.com/dsaaxuphe/image/upload/v1766330315/Group_48096168_ufcdsb.webp"
              alt=""
              className="absolute top-[-0.125rem] left-[0.125rem] h-full rotate-180 opacity-90"
            />
          </div>

          {/* TEXT */}
          <span className="tracking-0.18em relative z-70 w-full text-lg">
            GET IT NOW
          </span>

          {/* RIGHT END DESIGN */}
          <div>
            <img
              src="https://res.cloudinary.com/dsaaxuphe/image/upload/v1766330315/Group_48096168_ufcdsb.webp"
              alt=""
              className="absolute top-[0.125rem] right-[-0.125rem] h-full"
            />
          </div>
        </button>
      </div>
    </main>
    </>
  );
}