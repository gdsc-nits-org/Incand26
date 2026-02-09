"use client";

import { Play, Pause } from "lucide-react";
import useGlobalBgm from "@/hooks/useGlobalBgm";
import { cn } from "@/lib/utils";

interface MusicButtonProps {
  className?: string;
  primary?: boolean; // New prop
}

export default function MusicButton({ className, primary = false }: MusicButtonProps) {
  const { isPlaying, toggle } = useGlobalBgm("/bgm.mp3");

  return (
    <>
      {/* Only the Layout button renders the audio tag */}
      {primary && <audio id="bgm-audio" loop hidden />}
      
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

