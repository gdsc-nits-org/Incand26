

"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

/* ================= LETTER COMPONENT ================= */

type LetterProps = {
  src: string;
  hoverSrc: string;
  alt: string;
  isLap: boolean;
  isIpad: boolean;
  isPhone: boolean;
  className?: string;
};

const Letter = ({
  src,
  hoverSrc,
  alt,
  isLap,
  isIpad,
  isPhone,
  className,
}: LetterProps) => {
  
  let sizeClass = "h-[16vh] w-[8vw]"; 

  if (isIpad) {
    sizeClass = "h-[6.5vh] w-[10vw]";
  }

  if (isPhone) {
    sizeClass = "h-[4.13vh] w-[9.5vw] scale-[1.1]";
  }

  return (
    <div
      className={`relative flex items-end justify-center ${
        isLap ? "group cursor-pointer" : ""
      } ${sizeClass}`}
    >
      
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        className={`absolute h-full w-auto transition-opacity duration-150 ${
          isLap ? "group-hover:opacity-0" : "opacity-100"
        } ${className ?? ""}`}
      />

      
      
        <Image
          src={hoverSrc}
          alt={`${alt} hover`}
          width={0}
          height={0}
          className="absolute h-full w-auto opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        />
      
    </div>
  );
};




export default function HornbillMiddle() {
    const eyeRef = useRef<HTMLDivElement>(null);
  const eyeSocketRef = useRef<HTMLDivElement>(null);

  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current || !eyeSocketRef.current) return;

      const socketRect = eyeSocketRef.current.getBoundingClientRect();

      
      const cx = socketRect.left + socketRect.width / 2;
      const cy = socketRect.top + socketRect.height / 2;

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      const distance = Math.sqrt(dx * dx + dy * dy);

      
      const radius = socketRect.width / 2;

      let moveX = 0;
      let moveY = 0;

      
      if (distance > radius) {
        const nx = dx / distance;
        const ny = dy / distance;

        const maxOffset = radius * 0.6; 
        moveX = nx * maxOffset;
        moveY = ny * maxOffset;
      }

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        eyeRef.current!.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const [isPhone, setIsPhone] = useState(false);
  const [isIpad, setIsIpad] = useState(false);
  const [isLap, setIsLap] = useState(false);

 
  useLayoutEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setIsPhone(w >= 320 && w <= 758);
      setIsIpad(w >= 759 && w <= 1300);
      setIsLap(w >= 1301);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  
  useEffect(() => {
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current || !eyeSocketRef.current) return;

      const rect = eyeSocketRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const radius = rect.width / 2;

      let x = 0;
      let y = 0;

      if (distance > radius) {
        const nx = dx / distance;
        const ny = dy / distance;
        const max = radius * 0.6;
        x = nx * max;
        y = ny * max;
      }

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        eyeRef.current!.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* ================= LAPTOP / DESKTOP ================= */}
      {isLap && (
        <section className="relative flex min-h-screen w-full justify-center overflow-x-hidden bg-[#f6eddc] py-14">
       {/* ===== ONE GLOBAL WRAPPER ===== */}
          <div className="relative top-[4vh] right-[2vw] flex scale-[0.9] flex-col items-center">
         {/* ================= Hornbill (TOP) ================= */}
            <div className="relative mb-[3vh]">
             <div className="relative -top-[9vh] left-[1.7vw] h-[20vh] w-[20vw]">
             <div
              ref={headRef}
              className="relative top-[1vh] right-[22vw] h-[40vh] w-[60vw] scale-[1.7]"
            >
              {/* Head cap */}
              <Image
                src="/Hornbill/part5.svg"
                alt="Hornbill cap"
                width={0}
                height={0}
                className="absolute top-[10.3vh] left-[20vw] z-20 h-[15vh] w-[50vw]"
              />

              {/* Eye socket */}
              <div
                ref={eyeSocketRef}
                className="absolute top-[18.6vh] left-[42.95vw] z-50 h-[0.7vw] w-[0.7vw]"
              >
                <div ref={eyeRef} className="absolute inset-0">
                  <Image
                    src="/Hornbill/part3.svg"
                    alt="Hornbill eye"
                    width={0}
                    height={0}
                    className="h-full w-full"
                  />
                </div>
              </div>
            </div>

            {/* Head */}
            <Image
              src="/Hornbill/part1.svg"
              alt="Hornbill head"
              width={0}
              height={0}
              className="absolute top-[18vh] left-[34.5vw] z-10 h-[10vh] w-[9vw]"
            />

            {/* Beak band */}
            <Image
              src="/Hornbill/part2.svg"
              alt="Hornbill beak band"
              width={0}
              height={0}
              className="absolute top-[10.5vh] left-[34.5vw] z-20 h-[10vh] w-[6.5vw]"
            />

            {/* Beak tip */}
            <Image
              src="/Hornbill/part4.svg"
              alt="Hornbill beak tip"
              width={0}
              height={0}
              className="absolute top-[14.5vh] left-[41.5vw] z-30 h-[6vh] w-[3vw]"
            />
          </div>
        </div>

        {/* ================= TEXT BLOCK ================= */}
        <div className="relative left-[0.5vw] flex items-start">
          {/* LEFT: INCAND */}
          <div className="flex flex-col gap-[3.2vh]">
            <div className="flex origin-left scale-[1] items-end gap-[0.3vw]">
              <div className="translate-x-[2vw]">
                <Letter
                  src="/Hornbill/I.svg"
                  hoverSrc="/Hornbill/Ihover.svg"
                  alt="I"
                  isLap={isLap}
                  isPhone={isPhone}
                  isIpad={isIpad}
                />
              </div>

              <Letter
                src="/Hornbill/N.svg"
                hoverSrc="/Hornbill/Nhover.svg"
                alt="N"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
              <Letter
                src="/Hornbill/C.svg"
                hoverSrc="/Hornbill/Chover.svg"
                alt="C"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
              <Letter
                src="/Hornbill/A.svg"
                hoverSrc="/Hornbill/Ahover.svg"
                alt="A"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
              <Letter
                src="/Hornbill/N2.svg"
                hoverSrc="/Hornbill/N2hover.svg"
                alt="N2"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
              <Letter
                src="/Hornbill/D.svg"
                hoverSrc="/Hornbill/Dhover.svg"
                alt="D"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
            </div>

            <div className="relative left-[4.7vw] flex origin-left scale-[0.775] items-end gap-1">
              <Letter
                src="/Hornbill/E.svg"
                hoverSrc="/Hornbill/Ehover.svg"
                alt="E"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
              <Letter
                src="/Hornbill/S.svg"
                hoverSrc="/Hornbill/Shover.svg"
                alt="S"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
              <Letter
                src="/Hornbill/C2.svg"
                hoverSrc="/Hornbill/C2hover.svg"
                alt="C2"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
              <Letter
                src="/Hornbill/E2.svg"
                hoverSrc="/Hornbill/E2hover.svg"
                alt="E2"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
              <Letter
                src="/Hornbill/N3.svg"
                hoverSrc="/Hornbill/N3hover.svg"
                alt="N3"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
              <Letter
                src="/Hornbill/C3.svg"
                hoverSrc="/Hornbill/C3hover.svg"
                alt="C3"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
              <Letter
                src="/Hornbill/E3.svg"
                hoverSrc="/Hornbill/E3hover.svg"
                alt="E3"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
            </div>
          </div>

          {/* RIGHT: 2026 */}
          <div className="group relative right-[6vw] cursor-pointer">
            {/* NORMAL 2026 */}
            <Image
              src="/Hornbill/title2.svg"
              alt="2026"
              width={0}
              height={0}
              className="h-[33.5vh] w-auto transition-all duration-200 group-hover:scale-[0.96] group-hover:opacity-0"
            />

            {/* ANIMATED 2026 (hover) */}
            <Image
              src="/Hornbill/title3.svg" 
              alt="2026 animated"
              width={0}
              height={0}
              className="absolute inset-0 h-[33.5vh] w-auto p-[0.6vh] opacity-0 transition-all duration-200 group-hover:scale-[0.98] group-hover:opacity-100"
            />
          </div>
        </div>

        {/* ================= OTHER BIRDS ================= */}
        <div className="relative w-full">
          {/* LEFT BIRDS (3) */}
          <div className="relative right-[1.5vw] bottom-[50vh] flex">
            <Image
              src="/Hornbill/bird2.svg"
              alt="Flying birds left 1"
              width={0}
              height={0}
              className="relative top-[6vh] h-[4vh] w-[4vw] translate-x-[1vw]"
            />
            <Image
              src="/Hornbill/bird1.svg"
              alt="Flying birds left 2"
              width={0}
              height={0}
              className="h-[5vh] w-[5vw]"
            />
            <Image
              src="/Hornbill/bird3.svg"
              alt="Flying birds left 3"
              width={0}
              height={0}
              className="h-[6vh] w-[6vw] -translate-x-[2vw] translate-y-[2vh]"
            />
          </div>

          {/* RIGHT BIRDS (2) */}
          <div className="relative top-[2vh] left-[57vw] flex gap-[0.5vw]">
            <Image
              src="/Hornbill/bird5.svg"
              alt="Flying birds right 1"
              width={0}
              height={0}
              className="h-[5vh] w-[5vw]"
            />
            <Image
              src="/Hornbill/bird4.svg"
              alt="Flying birds right 2"
              width={0}
              height={0}
              className="h-[6vh] w-[6vw] -translate-y-[8vh]"
            />
          </div>
        </div>
        {/* Tribal Tapestry */}
        <Image
          src="/Hornbill/title.svg"
          alt="Tribal Tapestry"
          width={0}
          height={0}
          className="relative bottom-[6vh] -left-[1vw] h-[10.5vh] w-[48vw]"
        />
      </div>
      
    </section>
      )}

      {/* ================= IPAD ================= */}
      {isIpad && (
        <section className="relative flex min-h-screen w-full justify-center overflow-x-hidden bg-[#f6eddc] py-14">
       {/* ===== ONE GLOBAL WRAPPER ===== */}
          <div className="relative top-[4vh] right-[2vw] flex scale-[0.9] flex-col items-center">
         {/* ================= Hornbill (TOP) ================= */}
            <div className="relative mb-[3vh]">
             <div className="relative -top-[9vh] -left-[3.8vw] h-[20vh] w-[20vw] scale-[1]">
             <div
              ref={headRef}
              className="relative top-[1vh] right-[22vw] h-[40vh] w-[60vw] scale-[1]"
            >
              {/* Head cap */}
              <Image
                src="/Hornbill/part5.svg"
                alt="Hornbill cap"
                width={0}
                height={0}
                className="absolute top-[28vh] left-[58.4vw] z-20 h-[12vh] w-[33vw]"
              />

              {/* Eye socket */}
              <div
                ref={eyeSocketRef}
                className="absolute top-[34.6vh] left-[68.3vw] z-50 h-[2vw] w-[5vw]"
              >
                <div ref={eyeRef} className="absolute inset-0">
                  <Image
                    src="/Hornbill/part3.svg"
                    alt="Hornbill eye"
                    width={0}
                    height={0}
                    className="h-full w-full"
                  />
                </div>
              </div>
            </div>

            {/* Head */}
            <Image
              src="/Hornbill/part1.svg"
              alt="Hornbill head"
              width={0}
              height={0}
              className="absolute top-[32.4vh] left-[54vw] z-10 h-[10vh] w-[12vw]"
            />

            {/* Beak band */}
            <Image
              src="/Hornbill/part2.svg"
              alt="Hornbill beak band"
              width={0}
              height={0}
              className="absolute top-[29.3vh] left-[54vw] z-20 h-[9vh] w-[9vw]"
            />

            {/* Beak tip */}
            <Image
              src="/Hornbill/part4.svg"
              alt="Hornbill beak tip"
              width={0}
              height={0}
              className="absolute top-[31.8vh] left-[63vw] z-30 h-[6vh] w-[4vw]"
            />
          </div>
       </div>

        {/* ================= TEXT BLOCK ================= */}
        <div className="relative -left-[0.5vw] flex items-start top-[10vh]">
          {/* LEFT: INCAND */}
          <div className="relative flex flex-col gap-[2.3vh] w-[90vw] -left-[2vw]">
            <div className="flex origin-left scale-[1.2] items-end gap-[1.1vw]">
              <div className="translate-x-[2vw]">
                <Letter
                  src="/Hornbill/I.svg"
                  hoverSrc="/Hornbill/Ihover.svg"
                  alt="I"
                  isLap={isLap}
                  isPhone={isPhone}
                  isIpad={isIpad}
                />
              </div>

              <Letter
                src="/Hornbill/N.svg"
                hoverSrc="/Hornbill/Nhover.svg"
                alt="N"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
              <Letter
                src="/Hornbill/C.svg"
                hoverSrc="/Hornbill/Chover.svg"
                alt="C"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
              <Letter
                src="/Hornbill/A.svg"
                hoverSrc="/Hornbill/Ahover.svg"
                alt="A"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
              <Letter
                src="/Hornbill/N2.svg"
                hoverSrc="/Hornbill/N2hover.svg"
                alt="N2"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
              <Letter
                src="/Hornbill/D.svg"
                hoverSrc="/Hornbill/Dhover.svg"
                alt="D"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
            </div>

            <div className="relative left-[6.4vw] flex origin-left scale-[1] items-end gap-1 w-[72vw]">
              <Letter
                src="/Hornbill/E.svg"
                hoverSrc="/Hornbill/Ehover.svg"
                alt="E"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
              <Letter
                src="/Hornbill/S.svg"
                hoverSrc="/Hornbill/Shover.svg"
                alt="S"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
              <Letter
                src="/Hornbill/C2.svg"
                hoverSrc="/Hornbill/C2hover.svg"
                alt="C2"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
              <Letter
                src="/Hornbill/E2.svg"
                hoverSrc="/Hornbill/E2hover.svg"
                alt="E2"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
              <Letter
                src="/Hornbill/N3.svg"
                hoverSrc="/Hornbill/N3hover.svg"
                alt="N3"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
              <Letter
                src="/Hornbill/C3.svg"
                hoverSrc="/Hornbill/C3hover.svg"
                alt="C3"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
              <Letter
                src="/Hornbill/E3.svg"
                hoverSrc="/Hornbill/E3hover.svg"
                alt="E3"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
            </div>
          </div>

          {/* RIGHT: 2026 */}
          <div className="group relative  left-[1vw] cursor-pointer scale-[0.72] bottom-[3.7vh]">
            {/* NORMAL 2026 */}
            <Image
              src="/Hornbill/title2.svg"
              alt="2026"
              width={0}
              height={0}
              className="h-[22vh] w-[50vw] transition-all duration-200 group-hover:scale-[0.52] group-hover:opacity-0"
            />

            {/* ANIMATED 2026 (hover) */}
            <Image
              src="/Hornbill/title3.svg" 
              alt="2026 animated"
              width={0}
              height={0}
              className="absolute inset-0 h-[33.5vh] w-auto p-[0.6vh] opacity-0 transition-all duration-200 group-hover:scale-[0.98] group-hover:opacity-100"
            />
          </div>
        </div>

        {/* ================= OTHER BIRDS ================= */}
        <div className="relative w-full">
          {/* LEFT BIRDS (3) */}
          <div className="relative right-[1vw] bottom-[20vh] flex scale-[1]">
            <Image
              src="/Hornbill/bird2.svg"
              alt="Flying birds left 1"
              width={0}
              height={0}
              className="relative top-[2.5vh] h-[3vh] w-[3vw] translate-x-[1vw]"
            />
            <Image
              src="/Hornbill/bird1.svg"
              alt="Flying birds left 2"
              width={0}
              height={0}
              className="h-[4vh] w-[4vw]"
            />
            <Image
              src="/Hornbill/bird3.svg"
              alt="Flying birds left 3"
              width={0}
              height={0}
              className="h-[4vh] w-[4vw]  translate-y-[1vh]"
            />
          </div>

          {/* RIGHT BIRDS (2) */}
          <div className="relative top-[6.5vh] left-[92.5vw] flex gap-[0.5vw] scale-[1]">
            <Image
              src="/Hornbill/bird5.svg"
              alt="Flying birds right 1"
              width={0}
              height={0}
              className="h-[5vh] w-[5vw] -translate-y-[4.5vh] -translate-x-[5vw]"
            />
            <Image
              src="/Hornbill/bird4.svg"
              alt="Flying birds right 2"
              width={0}
              height={0}
              className="h-[6vh] w-[6vw] -translate-y-[8.5vh]"
            />
          </div>
        </div>
        {/* Tribal Tapestry */}
        <Image
          src="/Hornbill/title.svg"
          alt="Tribal Tapestry"
          width={0}
          height={0}
          className="relative bottom-[6vh]  h-[10.5vh] w-[60vw]"
        />
      </div>
      {/* ===== END GLOBAL WRAPPER ===== */}
    </section>
      )}

      {/* ================= MOBILE ================= */}
      {isPhone && (
        <section className="relative flex min-h-screen w-full justify-center overflow-x-hidden bg-[#f6eddc] py-14">
       {/* ===== ONE GLOBAL WRAPPER ===== */}
          <div className="relative top-[4vh] right-[2vw] flex scale-[0.9] flex-col items-center">
         {/* ================= Hornbill (TOP) ================= */}
            <div className="relative mb-[3vh]">
             <div className="relative -top-[6vh] -left-[0.8vw] h-[20vh] w-[20vw] scale-[0.9]">
             <div
              ref={headRef}
              className="relative top-[1vh] right-[22vw] h-[40vh] w-[60vw] scale-[1]"
            >
              {/* Head cap */}
              <Image
                src="/Hornbill/part5.svg"
                alt="Hornbill cap"
                width={0}
                height={0}
                className="absolute top-[31vh] left-[59vw] z-20 h-[9vh] w-[27vw]"
              />

              {/* Eye socket */}
              <div
                ref={eyeSocketRef}
                className="absolute top-[35.9vh] left-[65.3vw] z-50 h-[2vw] w-[5vw]"
              >
                <div ref={eyeRef} className="absolute inset-0">
                  <Image
                    src="/Hornbill/part3.svg"
                    alt="Hornbill eye"
                    width={0}
                    height={0}
                    className="h-full w-full"
                  />
                </div>
              </div>
            </div>

            {/* Head */}
            <Image
              src="/Hornbill/part1.svg"
              alt="Hornbill head"
              width={0}
              height={0}
              className="absolute top-[32.5vh] left-[51.5vw] z-10 h-[10vh] w-[11vw]"
            />

            {/* Beak band */}
            <Image
              src="/Hornbill/part2.svg"
              alt="Hornbill beak band"
              width={0}
              height={0}
              className="absolute top-[30.5vh] left-[51.5vw] z-20 h-[10vh] w-[9vw]"
            />

            {/* Beak tip */}
            <Image
              src="/Hornbill/part4.svg"
              alt="Hornbill beak tip"
              width={0}
              height={0}
              className="absolute top-[33vh] left-[60.2vw] z-30 h-[6vh] w-[4vw]"
            />
          </div>
       </div>

        {/* ================= TEXT BLOCK ================= */}
        <div className="relative -left-[0.5vw] flex items-start top-[10vh]">
          {/* LEFT: INCAND */}
          <div className="relative flex flex-col gap-[2.3vh] w-[90vw] -left-[2vw]">
            <div className="flex origin-left scale-[1.2] items-end gap-[1.1vw]">
              <div className="translate-x-[2vw]">
                <Letter
                  src="/Hornbill/I.svg"
                  hoverSrc="/Hornbill/Ihover.svg"
                  alt="I"
                  isLap={isLap}
                  isPhone={isPhone}
                  isIpad={isIpad}
                />
              </div>

              <Letter
                src="/Hornbill/N.svg"
                hoverSrc="/Hornbill/Nhover.svg"
                alt="N"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
              <Letter
                src="/Hornbill/C.svg"
                hoverSrc="/Hornbill/Chover.svg"
                alt="C"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
              <Letter
                src="/Hornbill/A.svg"
                hoverSrc="/Hornbill/Ahover.svg"
                alt="A"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
              <Letter
                src="/Hornbill/N2.svg"
                hoverSrc="/Hornbill/N2hover.svg"
                alt="N2"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
              <Letter
                src="/Hornbill/D.svg"
                hoverSrc="/Hornbill/Dhover.svg"
                alt="D"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
            </div>

            <div className="relative left-[6.5vw] flex origin-left scale-[0.98] items-end gap-1 w-[70vw]">
              <Letter
                src="/Hornbill/E.svg"
                hoverSrc="/Hornbill/Ehover.svg"
                alt="E"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
              <Letter
                src="/Hornbill/S.svg"
                hoverSrc="/Hornbill/Shover.svg"
                alt="S"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
              <Letter
                src="/Hornbill/C2.svg"
                hoverSrc="/Hornbill/C2hover.svg"
                alt="C2"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
              <Letter
                src="/Hornbill/E2.svg"
                hoverSrc="/Hornbill/E2hover.svg"
                alt="E2"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
              <Letter
                src="/Hornbill/N3.svg"
                hoverSrc="/Hornbill/N3hover.svg"
                alt="N3"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
              <Letter
                src="/Hornbill/C3.svg"
                hoverSrc="/Hornbill/C3hover.svg"
                alt="C3"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
              <Letter
                src="/Hornbill/E3.svg"
                hoverSrc="/Hornbill/E3hover.svg"
                alt="E3"
                isLap={isLap}
                isPhone={isPhone}
                isIpad={isIpad}
              />
            </div>
          </div>

          {/* RIGHT: 2026 */}
          <div className="group relative  right-[1vw] cursor-pointer scale-[0.54] bottom-[6vh]">
            {/* NORMAL 2026 */}
            <Image
              src="/Hornbill/title2.svg"
              alt="2026"
              width={0}
              height={0}
              className="h-[22vh] w-[50vw] transition-all duration-200 group-hover:scale-[0.52] group-hover:opacity-0"
            />

            {/* ANIMATED 2026 (hover) */}
            <Image
              src="/Hornbill/title3.svg" 
              alt="2026 animated"
              width={0}
              height={0}
              className="absolute inset-0 h-[33.5vh] w-auto p-[0.6vh] opacity-0 transition-all duration-200 group-hover:scale-[0.98] group-hover:opacity-100"
            />
          </div>
        </div>

        {/* ================= OTHER BIRDS ================= */}
        <div className="relative w-full">
          {/* LEFT BIRDS (3) */}
          <div className="relative right-[10vw] bottom-[18vh] flex scale-[0.8]">
            <Image
              src="/Hornbill/bird2.svg"
              alt="Flying birds left 1"
              width={0}
              height={0}
              className="relative top-[2vh] h-[3vh] w-[3vw] translate-x-[1vw]"
            />
            <Image
              src="/Hornbill/bird1.svg"
              alt="Flying birds left 2"
              width={0}
              height={0}
              className="h-[4vh] w-[4vw]"
            />
            <Image
              src="/Hornbill/bird3.svg"
              alt="Flying birds left 3"
              width={0}
              height={0}
              className="h-[4vh] w-[4vw]  translate-y-[1vh]"
            />
          </div>

          {/* RIGHT BIRDS (2) */}
          <div className="relative top-[1.5vh] left-[90vw] flex gap-[0.5vw] scale-[1]">
            <Image
              src="/Hornbill/bird5.svg"
              alt="Flying birds right 1"
              width={0}
              height={0}
              className="h-[5vh] w-[5vw] -translate-y-[5.5vh] -translate-x-[5vw]"
            />
            <Image
              src="/Hornbill/bird4.svg"
              alt="Flying birds right 2"
              width={0}
              height={0}
              className="h-[6vh] w-[6vw] -translate-y-[8.5vh]"
            />
          </div>
        </div>
        {/* Tribal Tapestry */}
        <Image
          src="/Hornbill/title.svg"
          alt="Tribal Tapestry"
          width={0}
          height={0}
          className="relative bottom-[13vh] -left-[2vw] h-[10.5vh] w-[55vw]"
        />
      </div>
      {/* ===== END GLOBAL WRAPPER ===== */}
    </section>
      )}
    </>
  );
}
