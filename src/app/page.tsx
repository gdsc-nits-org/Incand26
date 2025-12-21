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
    <main className="relative w-screen h-screen overflow-hidden bg-black">

      {/* BACKGROUND IMAGE (SCALE ANIMATION) */}
      <div
        className={`
          absolute inset-0 z-10
          transition-transform duration-1200 ease-in-out
          ${animate ? "scale-100" : "scale-[1.5]"}
        `}
      >
        <img
          src="/Frame.png"
          alt="Tapestry"
          className="w-full h-full "
        />
      </div>

      {/* CENTER T-SHIRT */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <img
          src="/Tshirt.png"
          alt="T-shirt"
          className={`
            w-[220px]
            lg:w-[420px]
            transition-opacity duration-700 ease-in-out
            ${animate ? "opacity-0" : "opacity-100"}
          `}
        />
      </div>
   {/* CENTER TEXT */}
<div className={`
    absolute inset-0 z-30
    flex flex-col items-center justify-center text-center
    transition-all duration-700 ease-in-out delay-300
    ${animate ? "opacity-100 scale-100 visible" : "opacity-0 scale-105 invisible"}
  `}>
  <h1 className="font-hitchcut text-2xl lg:text-8xl text-[#A50001] font-bold">
    FEEL THE
  </h1>

  <h1 className="font-hitchcut text-2xl lg:text-8xl text-[#008080] font-bold">
    TAPESTRY
  </h1>

  <h2 className="font-hitchcut text-xl lg:text-5xl text-[#751313] mt-4">
    INCAND 26’
  </h2>

  <h2 className="font-hitchcut text-lg lg:text-5xl text-[#751313]">
    OFFICIAL MERCH
  </h2>
  <div >
    <img src="/Vector.png" className=" h-[50%] md:h-[60%] mt-2 mb:2" >
    </img>

  </div>
 <button
  className="
    relative
    flex items-center justify-center
    top-[-20px]
    px-4 py-2
    lg:px-10 
    lg:py-4
    rounded-full
    overflow-hidden
    border-3
    border-black
    bg-[#6b1f1f]
    text-[#fff2cc]
    text-[2px]

    tracking-widest
    shadow-lg
    animate-[wiggle_2.5s_ease-in-out_infinite]
    
    hover:scale-105
    
  "
>
  {/* LEFT END DESIGN */}
  <div>
  <img
    src="/design.png"
    alt=""
    className="
      absolute
      left-[2px]
      top-[-4px]
       h-full
      opacity-90
       rotate-180
       
    "
  />
  </div>

  {/* TEXT */}
  <span className="relative w-full z-70 text-lg tracking-0.18em" >
  GET IT NOW
  </span>

  {/* RIGHT END DESIGN */}
  <div>
  <img
    src="/design.png"
    alt=""
    className="
      absolute
      right-[-2px]
      top-[5px]
    
       h-full
     
    "
  />
  </div>
</button>
</div>


    </main>
  );
}