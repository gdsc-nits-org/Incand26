"use client";

import { useLayoutEffect, useState } from "react";

import Image from "next/image";

export function Gallery() {
  const [isPhone, setIsPhone] = useState(false);
  const [isIpad, setIsIpad] = useState(false);
  const [isLap, setIsLap] = useState(false);
  const [mounted, setMounted] = useState(false);
  

  useLayoutEffect(() => {
    setMounted(true);

    const setDevice = () => {
      const w = window.innerWidth;
      setIsPhone(w >= 320 && w <= 758);
      setIsIpad(w >= 759 && w <= 1024);
      setIsLap(w >= 1025);
    };

    setDevice();
    window.addEventListener("resize", setDevice);
    return () => window.removeEventListener("resize", setDevice);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* ================= LAPTOP VIEW ================= */}
      {isLap && (
        <div className="relative min-h-screen w-full overflow-hidden bg-amber-50">
          {/* Background */}
          <div className="absolute inset-0 opacity-40">
            <Image
              src="/Gallery/backgroundgallery.svg"
              alt="Background"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* ================= LEFT DECORATIONS (TOPMOST) ================= */}
          {/* ================= TOP DECORATIONS ================= */}

          {/* TOP RING — ALWAYS ABOVE */}
          <div className="pointer-events-none absolute inset-0 z-50">
            <img
              src="/Gallery/circulartopring.svg"
              alt="Top Ring"
              className="absolute top-[0vh] left-[8vw] w-[30vw]"
            />
          </div>

          {/* TOP RIBBON — RIVER FLOW, STARTS AFTER RING */}
          <div className="pointer-events-none absolute inset-0 z-40">
  <div className="absolute top-[0vh] left-[30vw] h-[20vh] w-[calc(100vw-30vw)] translate-y-[1px] overflow-hidden">

    <div
      className="ribbon-flow-right absolute inset-0 bg-repeat-x bg-top"
      style={{
        backgroundImage: "url('/Gallery/ribbonupper.svg')",
        backgroundSize: "auto 100%",
      }}
    />

    <div
      className="ribbon-flow-right ribbon-flow-right-2 absolute inset-0 bg-repeat-x bg-top"
      style={{
        backgroundImage: "url('/Gallery/ribbonupper.svg')",
        backgroundSize: "auto 100%",
      }}
    />

  </div>
</div>



          {/* ================= LEFT BOARD (SEPARATE LAYER) ================= */}
          <div className="pointer-events-none absolute inset-0 z-60 flex items-center px-8">
            <img
              src="/Gallery/board1.svg"
              alt="Board 1"
              className="board-two-phase relative -left-[12vw] h-[100vh] w-[80vw]"
            />
          </div>

          {/* ================= CENTER BANNERS (BELOW RIBBON) ================= */}
          <div className="pointer-events-none relative z-30 flex h-screen items-center justify-center">
            <div className="banner-group banner-two-phase-vertical relative bottom-[38vh] left-[20vw] aspect-[3/2] w-[55vw] max-w-[900px]">
              {/* STICK / HOLDER */}
              <div className="absolute inset-0 z-20">
                <Image
                  src="/Gallery/board2part1.svg"
                  alt="Stick"
                  width={600}
                  height={200}
                  className="absolute top-[33%] left-[3%] h-auto w-[90%]"
                  priority
                />
              </div>

              {/* BANNER PART (FLOATING ABOVE RIBBON) */}
              <div className="banner-z-jump absolute inset-0 z-30">
                <Image
                  src="/Gallery/board2part2.svg"
                  alt="Banner"
                  width={600}
                  height={200}
                  className="absolute bottom-[0%] left-[20%] h-auto w-[60%]"
                  priority
                />
              </div>
            </div>
          </div>

          {/* ================= BOTTOM DECORATIONS ================= */}
          <div className="pointer-events-none absolute inset-0 z-20">
            {/* ================= BOTTOM DECORATIONS ================= */}
            <div className="pointer-events-none absolute inset-0 z-10">
              {/* ================= WHITE BOARDS (BEHIND RIBBON & RING) ================= */}
              <div className="relative top-[100vh] left-[2vw] mt-[6vh] scale-[0.98]">
                {/* LEFT BOARD */}
                <div className="white-board white-left absolute -top-[1vw] left-[9vw] z-10 w-[29vw] opacity-0">
                  <img
                    src="/Gallery/whiteboard.svg"
                    alt="White board"
                    className="h-auto w-full"
                  />
                </div>

                {/* MIDDLE BOARD */}
                <div className="white-board white-middle absolute -top-[5vh] left-[37vw] z-20 w-[35vw] opacity-0">
                  <img
                    src="/Gallery/whiteboard.svg"
                    alt="White board"
                    className="h-auto w-full"
                  />
                </div>

                {/* RIGHT BOARD */}
                <div className="white-board white-right absolute -bottom-[72vh] left-[68vw] z-10 w-[29vw] opacity-0">
                  <img
                    src="/Gallery/whiteboard.svg"
                    alt="White board"
                    className="h-auto w-full"
                  />
                </div>
              </div>

              {/* ================= END RING (TOPMOST) ================= */}
              <div className="relative top-[38vh] z-50 w-[50vw] h-auto">
                <img
                  src="/Gallery/bottomring1.svg"
                  alt="Bottom Ring 1"
                  className="absolute right-[37vw] w-[23vw] h-auto rotate-ccw"
                />

                <img
                  src="/Gallery/bottomring2.svg"
                  alt="Bottom Ring 2"
                  className="absolute top-[24vh] right-[30vw] w-[25vw] h-auto rotate-cw"
                />
              </div>


              {/* ================= BOTTOM RIBBON (COVERS WHITE BOARDS) ================= */}
              <div className="relative -bottom-[76vh] left-[8vw] z-40 h-[20vh] w-full overflow-hidden">
                <div
                  className="ribbon-flow-bottom absolute inset-0 bg-bottom bg-repeat-x"
                  style={{
                    backgroundImage: "url('/Gallery/ribbonbottom.svg')",
                    backgroundSize: "auto 100%",
                  }}
                />
                <div
                  className="ribbon-flow-bottom absolute inset-0 bg-bottom bg-repeat-x"
                  style={{
                    backgroundImage: "url('/Gallery/ribbonbottom.svg')",
                    backgroundSize: "auto 100%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= IPAD VIEW ================= */}
      {/* ================= IPAD VIEW ================= */}
      {isIpad && (
        <div className="relative h-screen w-full overflow-hidden bg-amber-50">
          {/* ================= BACKGROUND ================= */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/Gallery/backgroundmobile.svg"
              alt="Gallery Background"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* ================= TOP RIBBON ================= */}
          {/* ================= TOP RIBBON (FLOWING) ================= */}
          <div className="pointer-events-none absolute -top-[2vh] left-0 z-10 h-[12vh] w-[110vw] overflow-hidden">
            <div className="ribbon-flow-right flex h-full">
              <img src="/Gallery/ribbonupper.svg" className="ribbon-img" />
              <img src="/Gallery/ribbonupper.svg" className="ribbon-img" />
            </div>
          </div>

          {/* ================= TOP RING ================= */}
          <div className="absolute top-[0vh] left-[50vw] z-20 w-full max-w-[68vw]">
            <Image
              src="/Gallery/topringmobile.svg"
              alt="Top Ring"
              width={0}
              height={0}
              className="h-auto w-full"
              priority
            />
          </div>

          {/* ================= WHITE BANNERS ================= */}
          <div className="pointer-events-none absolute inset-0 z-[1]">
            {/* TOP WHITE */}
            <img
              src="/Gallery/whitebannermobiletop.svg"
              className="white-banner white-top absolute left-[35vw] w-[50vw] opacity-0"
              alt=""
            />

            {/* MIDDLE WHITE */}
            <img
              src="/Gallery/whitebannermobilemiddle.svg"
              className="white-banner-middle absolute top-[15vh] left-[30vw] w-[55vw] opacity-0"
              alt=""
            />

            {/* BOTTOM WHITE */}
            <img
              src="/Gallery/whitebannermobilebottom.svg"
              className="white-banner white-bottom absolute top-[37vh] left-[37vw] w-[48vw] opacity-0"
              alt=""
            />
          </div>

          {/* ================= MIDDLE PHOTO / GALLERY BANNERS ================= */}
          <div className="ipad-banner-layer pointer-events-none absolute inset-0 z-[5] flex items-center justify-center">
            <div className="ipad-banner-anim relative -top-[5vh] mt-[6vh] flex flex-col items-center gap-[4vh]">
              {/* PHOTO BANNER */}
              <Image
                src="/Gallery/photobannermobile.svg"
                alt="Photo Banner"
                width={0}
                height={0}
                className="absolute -top-[60vh] z-10 h-auto w-[75vw] max-w-[75vw]"
                priority
              />

              {/* GALLERY BANNER */}
              <Image
                src="/Gallery/gallerybannermobile.svg"
                alt="Gallery Banner"
                width={0}
                height={0}
                className=" gallery-settle-ipad absolute -top-[22vh] -right-[40vw] z-0 h-auto w-[72vw] max-w-[75vw]"
                priority
              />
            </div>
          </div>

          {/* ================= BOTTOM RIBBON ================= */}
          {/* ================= BOTTOM RIBBON (FLOWING) ================= */}
          <div className="pointer-events-none absolute top-[89vh] left-[2vw] z-10 h-[12vh] w-[100vw] overflow-hidden">
            <div
              className="ribbon-flow-bottom absolute inset-0 bg-bottom bg-repeat-x"
              style={{
                backgroundImage: "url('/Gallery/ribbonbottom.svg')",
                backgroundSize: "auto 100%",
              }}
            />
            <div
              className="ribbon-flow-bottom absolute inset-0 bg-bottom bg-repeat-x"
              style={{
                backgroundImage: "url('/Gallery/ribbonbottom.svg')",
                backgroundSize: "auto 100%",
              }}
            />
          </div>

          {/* ================= BOTTOM RING ================= */}
          <div className="absolute top-[64vh] z-20  max-w-[100vw] relative">

            {/* Bottom Ring – clockwise */}
            <Image
              src="/Gallery/bottomring1.svg"
              alt="Bottom Ring"
              width={0}
              height={0}
              className="absolute  -top-[2vh] right-[70vw] h-auto w-[50vw] rotate-ccw"
              priority
            />

            {/* Bottom Ring 1 – anti-clockwise */}
            <Image
              src="/Gallery/bottomring2.svg"
              alt="Bottom Ring 1"
              width={0}
              height={0}
              className="absolute right-[59vw] top-[15vh] h-auto w-[53vw] rotate-cw"
              priority
            />

          </div>

        </div>
      )}

      {/* ================= MOBILE VIEW ================= */}
      {/* ================= PHONE VIEW ================= */}
      {isPhone && (
        <div className="relative h-screen w-full overflow-hidden bg-amber-50">
          {/* BACKGROUND */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/Gallery/backgroundmobile.svg"
              alt="Gallery Background"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* TOP RIBBON */}
          <div className="pointer-events-none absolute bottom-[92vh] left-0 z-10 h-[10vh] w-[120vw] overflow-hidden">
            <div className="ribbon-flow-right flex h-full">
              <img src="/Gallery/ribbonupper.svg" className="ribbon-img" />
              <img src="/Gallery/ribbonupper.svg" className="ribbon-img" />
            </div>
          </div>

          {/* TOP RING */}
          <div className="absolute top-[0vh] left-[52vw] z-20 w-[70vw]">
            <Image
              src="/Gallery/topringmobile.svg"
              alt="Top Ring"
              width={0}
              height={0}
              className="h-auto w-full"
              priority
            />
          </div>

          {/* ================= WHITE BANNERS (PHONE) ================= */}
          <div className="pointer-events-none absolute inset-0 z-[1]">
            <img
              src="/Gallery/whitebannermobiletop.svg"
              className="phone-white phone-white-top absolute top-[0vh] left-[21vw] w-[71vw] opacity-0"
              alt=""
            />

            <img
              src="/Gallery/whitebannermobilemiddle.svg"
              className="phone-white-middle absolute top-[15vh] left-[12vw] w-[80vw] opacity-0"
              alt=""
            />

            <img
              src="/Gallery/whitebannermobilebottom.svg"
              className="phone-white phone-white-bottom absolute top-[38vh] left-[24vw] w-[68vw] opacity-0"
              alt=""
            />
          </div>

          {/* ================= CENTER PHOTO / GALLERY (BELOW RIBBON) ================= */}
          {/* ================= CENTER PHOTO / GALLERY (PHONE) ================= */}
          <div className="phone-banner-layer pointer-events-none relative z-[5] flex h-screen items-center justify-center">
            {/* MOVING ELEMENT */}
            <div className="photo-gallery-group phone-banner-anim relative bottom-[40vh] left-[28vw] aspect-[3/2] w-[95vw] max-w-[1200px]">
              {/* PHOTO */}
              <div className="absolute inset-0 z-30">
                <Image
                  src="/Gallery/photobannermobile.svg"
                  alt="Photo Banner"
                  width={0}
                  height={0}
                  className="absolute top-[10%] right-[30%] h-auto w-[120%]"
                  priority
                />
              </div>

              {/* GALLERY */}
              <div className="absolute inset-0 z-20">
                <Image
                  src="/Gallery/gallerybannermobile.svg"
                  alt="Gallery Banner"
                  width={0}
                  height={0}
                  className="gallery-settle absolute top-[120%] right-[30%] h-auto w-[100%]"
                  priority
                />
              </div>
            </div>
          </div>

          {/* BOTTOM RIBBON */}
          <div className="pointer-events-none absolute top-[91vh] left-0 z-10 h-[10vh] w-[110vw] overflow-hidden">
            <div
              className="ribbon-flow-bottom absolute inset-0 bg-bottom bg-repeat-x"
              style={{
                backgroundImage: "url('/Gallery/ribbonbottom.svg')",
                backgroundSize: "auto 100%",
              }}
            />
            <div
              className="ribbon-flow-bottom absolute inset-0 bg-bottom bg-repeat-x"
              style={{
                backgroundImage: "url('/Gallery/ribbonbottom.svg')",
                backgroundSize: "auto 100%",
              }}
            />
          </div>

          {/* BOTTOM RING */}
          {/* BOTTOM RING (MOBILE) */}
<div className="pointer-events-none absolute  left-0 right-0 z-30 flex items-center justify-center relative">

  {/* Ring 1 – anti-clockwise */}
  <Image
    src="/Gallery/bottomring1.svg"
    alt="Bottom Ring 1"
    width={0}
    height={0}
    className="absolute -top-[33vh] right-[70vw] h-auto w-[60vw] rotate-ccw"
    priority
  />

  {/* Ring 2 – clockwise */}
  <Image
    src="/Gallery/bottomring2.svg"
    alt="Bottom Ring 2"
    width={0}
    height={0}
    className="absolute -top-[18vh] right-[50vw] h-auto w-[65vw] rotate-cw"
    priority
  />

</div>

        </div>
      )}
    </>
  );
}
