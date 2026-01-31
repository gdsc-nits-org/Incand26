import dynamic from "next/dynamic";

const Gallery = dynamic(() =>
  import("~/components/gallery").then((mod) => mod.Gallery),
);

export default function Page() {
  return <Gallery />;
}
