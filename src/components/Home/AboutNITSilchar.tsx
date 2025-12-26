"use client";
import Image from "next/image";

export default function AboutNITSilchar() {
  return (
    <section
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dfugtz4v7/image/upload/bg_msvhy4.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="animate-cloud-infinite-left absolute top-0 left-0 z-10 flex w-[200%]">
        {[0, 1].map((i) => (
          <div key={i} className="flex w-1/2 shrink-0 justify-start">
            <div className="w-72 sm:w-56 md:w-64 lg:w-72 xl:w-80">
              <Image
                src="https://res.cloudinary.com/dfugtz4v7/image/upload/cloud_1_t7wfzz.webp"
                alt=""
                width={350}
                height={240}
                className="h-auto w-full"
                priority
              />
            </div>
          </div>
        ))}
      </div>

      <div className="animate-cloud-infinite-right absolute bottom-1/2 left-0 z-10 flex w-[200%] md:bottom-1/4">
        {[0, 1].map((i) => (
          <div key={i} className="flex w-1/2 shrink-0 justify-end">
            <div className="w-56 sm:w-44 md:w-52 lg:w-60 xl:w-64">
              <Image
                src="https://res.cloudinary.com/dfugtz4v7/image/upload/cloud_1_t7wfzz.webp"
                alt=""
                width={280}
                height={190}
                className="h-auto w-full"
                priority
              />
            </div>
          </div>
        ))}
      </div>

      <div
        className="animate-cloud-infinite-left absolute bottom-0 left-0 z-10 flex w-[200%]"
        style={{ animationDelay: "-20s" }}
      >
        {[0, 1].map((i) => (
          <div key={i} className="flex w-1/2 shrink-0 justify-end">
            <div className="w-80 sm:w-64 md:w-80 lg:w-96 xl:w-md">
              <Image
                src="https://res.cloudinary.com/dfugtz4v7/image/upload/cloud_2_punvi6.webp"
                alt=""
                width={450}
                height={300}
                className="h-auto w-full"
                priority
              />
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-20 flex w-full max-w-7xl flex-col items-center gap-6 px-6 md:flex-row md:items-center md:justify-between md:gap-12 lg:px-12">
        <h1 className="font-hitchcut text-center text-6xl leading-tight font-black text-[#520000] drop-shadow-lg sm:text-6xl md:text-left md:text-6xl lg:text-7xl xl:text-8xl">
          <span className="block text-[#8B4513]">About</span>
          <span className="block">NIT</span>
          <span className="block">Silchar</span>
        </h1>

        <p className="font-hitchcut max-w-md text-center text-xl leading-relaxed text-black sm:text-2xl md:max-w-lg md:text-left md:text-2xl lg:max-w-xl lg:text-3xl">
          <span className="font-bold text-[#008080]">
            NIT Silchar
          </span>, a hub of innovation in Northeast India, ranks 9th among NITs and 50th overall in NIRF 2025. With consistent growth, it stands in the <span className="font-bold text-[#008080]">
            801-1000
          </span> band of the 2025 THE World University Rankings.
        </p>
      </div>
    </section>
  );
}
