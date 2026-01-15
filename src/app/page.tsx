"use client";

import { useState } from "react";
import Loader from "~/components/Loader";
import HomeMerch from "~/components/Home/Merch";
import Sponsors from "~/components/Home/Sponsors";
import TribalTrackbar from "~/components/TrivalNavbar";
import { Footer } from "~/components/Home/Footer";
import Landing from "~/components/Home/Landing";
import AboutIncandResponsive from "~/components/Home/AboutIncandResponsive";
import AboutNITSilchar from "~/components/Home/AboutNITSilchar";
import TopNavbar from "~/components/TopNavbar";
import NewLanding from "~/components/Home/newLanding";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [revealHome, setRevealHome] = useState(false);
  return (
    <>
      <main
        className={`h-screen w-full snap-y snap-mandatory overflow-y-scroll scroll-smooth bg-neutral-900 text-neutral-100 ${
          revealHome ? "z-0 opacity-100" : "opacity-0"
        }`}
      >
        {/* --- LANDING / HERO SECTION --- */}
        <section id="home" className="h-screen w-full snap-start">
          <NewLanding />
        </section>

        {/* --- ABOUT Incand SECTION --- */}
        <section id="about" className="h-screen w-full snap-start">
          <AboutIncandResponsive />
        </section>

        {/* --- ABOUT NIT SILCHAR SECTION --- */}
        <section id="aboutNITSilchar" className="h-screen w-full snap-start">
          <AboutNITSilchar />
        </section>

        {/* --- SPONSORS --- */}
        <div id="sponsors" className="min-h-screen w-full snap-start">
          <Sponsors />
        </div>
        {/* --- HOME --- */}
        <section id="merch" className="h-screen w-full snap-start">
          <HomeMerch />
        </section>
        {/* Footer section */}
        <section id="footer" className="w-full snap-start">
          <Footer />
        </section>

        {!loading && <TopNavbar />}
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
