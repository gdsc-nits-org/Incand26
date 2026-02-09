"use client";

import { usePathname } from "next/navigation";
import MusicButton from "~/components/MusicButton";

export default function GlobalMusicPlayer() {
  const pathname = usePathname();

  const isArtistPage = pathname === "/carpediemartist";

  return (
    <div
      className={`fixed right-8 bottom-4 z-[100] ${isArtistPage ? "hidden" : ""}`}
    >
      {/* ensures the <audio> tag is mounted here */}
      {/* @ts-expect-error: MusicButton definition needs to be updated to accept 'primary' */}
      <MusicButton primary={true} />
    </div>
  );
}