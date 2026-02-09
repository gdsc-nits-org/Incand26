import "~/styles/globals.css";
import "~/styles/landing.css";
import { type Metadata } from "next";
import localfont from "next/font/local";
import GlobalNavbar from "~/components/GlobalNavbar";
import { Toaster } from "sonner";
// Import the new wrapper instead of the button directly
import GlobalMusicPlayer from "~/components/GlobalMusicPlayer"; 

export const metadata: Metadata = {
  // ... (keep your existing metadata)
  title: {
    default: "Incandescence 2026 | NIT Silchar",
    template: "%s | Incandescence 2026",
  },
  description:
    "Incandescence is the annual cultural festival of NIT Silchar. Join us for a celebration of art, culture, and creativity.",
  keywords: [
    "Incandescence",
    "Incandescence 2026",
    "NIT Silchar",
    "Cultural Festival",
    "Fest",
    "NITS",
    "Assam",
    "Northeast India",
  ],
  authors: [{ name: "GDGC NITS" }],
  creator: "GDGC NITS",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://incand.in/",
    title: "Incandescence 2026 | NIT Silchar",
    description:
      "Incandescence is the annual cultural festival of NIT Silchar. Join us for a celebration of art, culture, and creativity.",
    siteName: "Incandescence 2026",
    images: [
      {
        url: "https://incand.in/og-image.png",
      },
    ],
  },

  icons: [{ rel: "icon", url: "/favicon.ico" }],
  // ...
};

const hitchcut = localfont({
  src: "../../public/fonts/Hitchcut-Regular.otf",
  variable: "--font-hitchcut",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
<html lang="en" className={hitchcut.variable}>
        <body className="relative">
        {/* Use the wrapper here. It handles the logic to hide itself on specific pages */}
        <GlobalMusicPlayer />
        
        <Toaster />
        {children}
        <GlobalNavbar />
      </body>
    </html>
  );  
}