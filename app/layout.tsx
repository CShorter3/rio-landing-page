import type { Metadata } from "next";
import localFont from "next/font/local";

import { ReservationProvider } from "@/components/reservation/ReservationProvider";
import "./globals.css";

const displayFont = localFont({
  src: [
    { path: "./fonts/cormorant-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/cormorant-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/cormorant-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

const bodyFont = localFont({
  src: [
    { path: "./fonts/manrope-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/manrope-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/manrope-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-manrope",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const isLaunchReady = process.env.NEXT_PUBLIC_SITE_ENV === "production";

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: "Sofound Brazil — Rio & Bahia",
  description:
    "A small, founder-hosted Brazil journey through Rio de Janeiro and an optional deeper continuation in Salvador, Bahia, November 12–21, 2026.",
  ...(siteUrl ? { alternates: { canonical: siteUrl } } : {}),
  openGraph: {
    title: "Sofound Brazil — Rio & Bahia",
    description:
      "Rio brings the energy. Bahia brings you closer. Choose a five- or nine-night founder-hosted Brazil journey.",
    type: "website",
    ...(siteUrl
      ? {
          url: siteUrl,
          images: [
            {
              url: "/images/sofound-hero-desktop.webp",
              width: 1448,
              height: 1086,
              alt: "Sofound Brazil journey artwork at sunset",
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "Sofound Brazil — Rio & Bahia",
    description:
      "A small, founder-hosted Brazil journey with two ways to experience it.",
    ...(siteUrl ? { images: ["/images/sofound-hero-desktop.webp"] } : {}),
  },
  robots: {
    index: isLaunchReady,
    follow: isLaunchReady,
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <ReservationProvider>{children}</ReservationProvider>
      </body>
    </html>
  );
}
