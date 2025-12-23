"use client";

import React from "react";

interface MountainVectorProps {
  src: string; // The original src path, e.g., "/mountain-right-vector-5.svg"
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
}

export const MountainVector: React.FC<MountainVectorProps> = ({
  src,
  className,
  style,
  alt,
}) => {
  // Extract filename from src
  const fileName = src.split("/").pop();

  // Build the path to the asset in public folder
  const assetPath = `/footer-assets/laptop/mountains/${fileName}`;

  return (
    <img
      src={assetPath}
      alt={alt ?? "Mountain element"}
      draggable={false}
      className={`${className ?? ""} select-none`}
      style={style}
    />
  );
};
