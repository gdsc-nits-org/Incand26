
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import Loader from "~/components/Loader";

// import HomeMerch from "~/components/Home/Merch";

// export default function HomePage() {
//   const [isLoading, setIsLoading] = useState(true);

//   if (isLoading) {
//     return <Loader onComplete={() => setIsLoading(false)} />;
//   }

//   return (
//     <main>
//       <HomeMerch />
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import Loader from "~/components/Loader";
import HomeMerch from "~/components/Home/Merch";
import Sponsors from "~/components/Home/Sponsors";
import TribalTrackbar from "~/components/TrivalNavbar";
import { Footer } from "~/components/Footer";
import Landing from "~/components/Home/Landing";
import AboutNITSilchar from "~/components/Home/AboutNITSilchar";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [revealHome, setRevealHome] = useState(false);
  return (
    <>
      <main
        className={`h-screen w-full snap-y snap-mandatory overflow-y-scroll scroll-smooth bg-neutral-900 text-neutral-100 ${revealHome ? "z-0 opacity-100" : "opacity-0"
          }`}
      >
        {/* --- LANDING / HERO SECTION --- */}
        <section id="home" className="h-screen w-full snap-start">
          <Landing />
        </section>

        {/* --- ABOUT NIT SILCHAR SECTION --- */}
        <section id="about" className="h-screen w-full snap-start">
          <AboutNITSilchar />
        </section>

        {/* --- SPONSORS --- */}
        <Sponsors />

        {/* ---EVENTS --- */}
        <section
          id="events"
          className="flex h-screen w-full snap-start flex-col items-center justify-center bg-[#e8dfc5] px-4 text-center"
        >
          <h1 className="font-hitchcut text-5xl font-black text-[#520000] drop-shadow-lg sm:text-6xl md:text-7xl lg:text-8xl">
            EVENTS
          </h1>
        </section>
        {/* --- HOME --- */}
        <section id="merch" className="h-screen w-full snap-start">
          <HomeMerch />
        </section>

        {/* --- CONTACT --- */}
        {/* Footer section */}
        <section id="footer" className="w-full snap-start">
          <Footer />
        </section>

        {!loading && <TribalTrackbar />}
      </main>
      {loading && (
        <Loader
          onTilesStart={() => setRevealHome(true)}
          onComplete={() => setLoading(false)}
        />
      )}
    </>
  );
}
