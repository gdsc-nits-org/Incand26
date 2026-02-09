"use client";

import { usePathname } from "next/navigation";
import TopNavbar from "@/components/TopNavbar";

export default function GlobalNavbar() {
  const pathname = usePathname();

  if (pathname === "/" || pathname === "/carpediem" ) {
    return null;
  }

  return <TopNavbar />;
}
