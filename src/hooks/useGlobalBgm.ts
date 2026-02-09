"use client";

import { createContext, useContext, useState, useRef, useEffect } from "react";

// Define the shape of the context
type BGMContextType = {
  isPlaying: boolean;
  toggleBgm: () => void;
  // Add other properties if your MusicButton expects them
};

// Create the context
export const BGMContext = createContext<BGMContextType | undefined>(undefined);

// The Hook function that MusicButton is trying to import
export const useGlobalBgm = () => {
  const context = useContext(BGMContext);
  
  // Fallback to prevent crash if Provider is missing
  if (!context) {
    return {
      isPlaying: false,
      toggleBgm: () => console.log("BGM Provider not found"),
    };
  }
  
  return context;
};