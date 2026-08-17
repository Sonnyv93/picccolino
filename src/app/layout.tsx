import type { Metadata, Viewport } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Piccolino Italian Kitchen — Toms River, NJ",
  description:
    "Family-owned Italian kitchen at the Jersey Shore. Fresh pasta, coastal seafood, and old-world hospitality. 1177 Fischer Blvd, Toms River, NJ.",
  openGraph: {
    title: "Piccolino Italian Kitchen",
    description:
      "Family-owned Italian kitchen at the Jersey Shore — Toms River, NJ.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0b09",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
