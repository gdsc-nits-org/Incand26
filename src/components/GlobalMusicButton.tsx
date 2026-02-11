"use client";

import { usePathname } from "next/navigation"; // 1. Import usePathname
import { Play, Pause } from "lucide-react";
import useGlobalBgm from "@/hooks/useGlobalBgm";
import { cn } from "@/lib/utils";

// 2. Renamed the component to GlobalMusicButton
export default function GlobalMusicButton({ className }: { className?: string }) {
  const pathname = usePathname();
  const { isPlaying, toggle } = useGlobalBgm("/bgm.mp3");

  // 3. Customize pages to hide the button here
  const hiddenRoutes = ["/carpediem", "/dj"]; 

  // If the current page is in the hidden list, return null (don't render anything)
  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  return (
    <>
      <audio id="bgm-audio" loop hidden />
      <button
        onClick={toggle}
        className={cn(
          "flex cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/50 p-3 backdrop-blur-md transition-all hover:bg-black/70 active:scale-95",
          isPlaying && "animate-music-glow",
          className,
        )}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <Pause className="h-6 w-6 text-white" />
        ) : (
          <Play className="h-6 w-6 text-white" />
        )}
      </button>
    </>
  );
}