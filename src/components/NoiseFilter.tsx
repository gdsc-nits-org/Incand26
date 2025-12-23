export const NoiseFilter = () => (
  <svg style={{ position: "absolute", height: 0, width: 0 }}>
    <defs>
      <filter id="textNoise" x="-2%" y="-2%" width="104%" height="104%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.4"
          numOctaves="6"
          result="rawNoise"
        />
        <feColorMatrix
          in="rawNoise"
          type="saturate"
          values="0"
          result="grayNoise"
        />
        <feComposite
          in="SourceGraphic"
          in2="grayNoise"
          operator="arithmetic"
          k1="0.4"
          k2="0.7"
          result="texturedColor"
        />
        <feComposite in="texturedColor" in2="SourceGraphic" operator="in" />
      </filter>
    </defs>
  </svg>
);
