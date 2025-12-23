

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

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [revealHome, setRevealHome] = useState(false);
  return (
    <>

      <main
        className={` ${
          revealHome ? "opacity-100 z-0" : "opacity-0"
        }`}
      >
        <HomeMerch />
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
