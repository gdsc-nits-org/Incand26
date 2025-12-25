import "~/styles/globals.css";
import "~/styles/landing.css";
import { type Metadata } from "next";
import localfont from "next/font/local";

export const metadata: Metadata = {
  title: "Tribal Fest",
  description: "NIT Silchar",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const hitchcut = localfont({
  src: "../fonts/Hitchcut-Regular.otf",
  variable: "--font-hitchcut",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={hitchcut.variable}>
      <body className="relative">{children}</body>
    </html>
  );
}
