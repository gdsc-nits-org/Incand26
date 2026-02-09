"use client";

import { usePathname } from "next/navigation";
import MusicButton from "~/components/MusicButton";

export default function GlobalMusicPlayer() {
  const pathname = usePathname();

  // Add the path of your artist page here
  const isArtistPage = pathname === "/carpediemartist"; 

  return (
    <div className={`fixed right-8 bottom-4 z-[100] ${isArtistPage ? "hidden" : ""}`}>
      {/* primary={true} ensures the <audio> tag is mounted here */}
      <MusicButton primary={true} />
    </div>
  );
}