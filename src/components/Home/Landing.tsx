"use client";
import { useEffect, useRef, useState } from "react";

// Define the shape of a trail segment
interface TrailSegment {
  id: number;
  x: number;
  y: number;
  rotation: number;
}

export default function Landing() {
  const boatRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(null);

  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const currentRotation = useRef(0);

  // Trail Logic
  const [trail, setTrail] = useState<TrailSegment[]>([]);
  const lastTrailPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    mousePos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    currentPos.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const moveSpeed = 0.02;
      const turnSpeed = 0.05;
      const targetX = mousePos.current.x;
      const targetY = mousePos.current.y;

      const dx = targetX - currentPos.current.x;
      const dy = targetY - currentPos.current.y;
      currentPos.current.x += dx * moveSpeed;
      currentPos.current.y += dy * moveSpeed;

      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        const targetRotation = Math.atan2(dy, dx) * (180 / Math.PI) + 180;
        let diff = targetRotation - currentRotation.current;
        while (diff > 180) diff -= 360;
        while (diff < -180) diff += 360;
        currentRotation.current += diff * turnSpeed;

        // --- TRAIL GENERATION LOGIC ---
        // Only spawn a trail if we've moved at least 15 pixels from the last trail spot
        const distSinceLastTrail = Math.hypot(
          currentPos.current.x - lastTrailPos.current.x,
          currentPos.current.y - lastTrailPos.current.y,
        );

        if (distSinceLastTrail > 15) {
          const newSegment = {
            id: Date.now(),
            x: currentPos.current.x,
            y: currentPos.current.y,
            rotation: currentRotation.current,
          };

          setTrail((prev) => [...prev.slice(-15), newSegment]); // Keep last 15 segments
          lastTrailPos.current = {
            x: currentPos.current.x,
            y: currentPos.current.y,
          };
        }
      }

      if (boatRef.current) {
        boatRef.current.style.left = `${currentPos.current.x}px`;
        boatRef.current.style.top = `${currentPos.current.y}px`;
        boatRef.current.style.transform = `translate(0, -50%) rotate(${currentRotation.current}deg)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Assets
  const bgImage =
    "https://res.cloudinary.com/dwzakk4bw/image/upload/v1766557234/image_10_uvobln.webp";
  const wave =
    "https://res.cloudinary.com/dwzakk4bw/image/upload/v1766544693/waveEffect_ompwn1.webp";
  const boat =
    "https://res.cloudinary.com/dwzakk4bw/image/upload/v1766563431/boat_ausf90.png";
  const incand =
    "https://res.cloudinary.com/dwzakk4bw/image/upload/v1766546238/Incand_jomks5.webp";
  const comingSoon =
    "https://res.cloudinary.com/dwzakk4bw/image/upload/v1766546242/Component_70_ulqr1o.webp";
  const decoration =
    "https://res.cloudinary.com/dwzakk4bw/image/upload/v1766546239/Frame_11_w666cw.webp";
  const ripple =
    "https://res.cloudinary.com/dwzakk4bw/video/upload/v1766579546/4_1_sv8giu.mp4";

  return (
    <main
      id="landing"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="pointer-events-none absolute inset-0 z-10 h-full w-full object-cover opacity-90 mix-blend-screen"
      >
        <source src={ripple} type="video/mp4" />
      </video>
      <div>
        <img
          src="/incandlogo.png"
          alt="Incandescence Logo"
          className="pointer-events-none absolute top-16 left-1/2 z-50 h-40 w-40 -translate-x-1/2 lg:top-8 xl:h-44 xl:w-44"
        />
      </div>

      {/* Render Trail Segments */}
      {trail.map((t, index) => (
        <div
          key={t.id}
          className="animate-wake-fade pointer-events-none absolute z-40"
          style={{
            left: t.x,
            top: t.y,
            transform: `translate(0, -50%) rotate(${t.rotation}deg)`,
            // Scale the trail down based on how old it is
            opacity: (index / trail.length) * 0.5,
          }}
        >
          {/* This is the "Blurry Portion" */}
          <div className="h-8 w-16 translate-x-12 rounded-full bg-white/20 blur-xl" />
        </div>
      ))}

      <div className="animate-wave-rise pointer-events-none absolute inset-0 z-20 flex h-[200%] w-full flex-col opacity-45">
        <div
          className="h-1/2 w-full bg-repeat"
          style={{
            backgroundImage: `url('${wave}')`,
            backgroundSize: "800px auto",
          }}
        />
        <div
          className="h-1/2 w-full bg-repeat"
          style={{
            backgroundImage: `url('${wave}')`,
            backgroundSize: "800px auto",
          }}
        />
      </div>

      <div className="relative z-30 flex w-full max-w-7xl flex-col items-center justify-center">
        <div className="relative flex w-full items-center justify-center">
          <img
            src={incand}
            alt="Incandescence"
            className="w-[95%] opacity-100 md:w-[85%] lg:w-[80%]"
          />
          <img
            src={comingSoon}
            alt="Coming Soon"
            className="animate-float-slow absolute top-1/2 left-1/2 w-[85%] -translate-x-1/2 -translate-y-1/2 md:w-[75%] lg:w-[70%]"
          />
        </div>
      </div>

      <div
        ref={boatRef}
        className="pointer-events-none absolute z-50"
        style={{
          left: "50%",
          top: "50%",
          transformOrigin: "left center",
          willChange: "left, top, transform",
        }}
      >
        <div className="w-32 max-w-none flex-none md:w-72 lg:w-56">
          <img
            src={boat}
            alt="Sailing Boat"
            className="animate-boat-rock h-auto w-full object-left"
          />
        </div>
      </div>
    </main>
  );
}
