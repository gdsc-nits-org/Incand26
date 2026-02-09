"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export function useGlobalBgm(src = "/bgm.mp3") {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const getAudio = useCallback((): HTMLAudioElement | null => {
    if (typeof document === "undefined") return null;
    return document.getElementById("bgm-audio") as HTMLAudioElement | null;
  }, []);

  const ensureInitialized = useCallback(() => {
    const audio = getAudio();
    if (!audio) return;
    if (!isInitialized) {
      audio.src = src;
      audio.load();
      setIsInitialized(true);
    }
  }, [getAudio, isInitialized, src]);

  const play = useCallback(async () => {
    const audio = getAudio();
    if (!audio) return;
    ensureInitialized();
    try {
      await audio.play();
      setIsPlaying(true);
    } catch (e) {
      console.error("Global BGM play failed", e);
      setIsPlaying(false);
    }
  }, [getAudio, ensureInitialized]);

  const pause = useCallback(() => {
    const audio = getAudio();
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }, [getAudio]);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else void play();
  }, [isPlaying, play, pause]);

  useEffect(() => {
    const audio = getAudio();
    if (!audio) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, [getAudio]);

  const api = useMemo(
    () => ({ isInitialized, isPlaying, play, pause, toggle }),
    [isInitialized, isPlaying, play, pause, toggle],
  );

  return api;
}

export default useGlobalBgm;
