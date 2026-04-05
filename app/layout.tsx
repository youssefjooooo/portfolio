/**
 * Root Layout — sets <html lang dir> and loads fonts.
 * Fonts: Comfortaa (English) + Cairo (Arabic).
 * Both are loaded as CSS variables so CSS and Tailwind can reference them.
 */

import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Youssef Mahmoud — Fullstack Engineer",
    template: "%s | Youssef Mahmoud",
  },
  description:
    "I build fast, scalable web applications where clean architecture meets intentional design.",
  authors: [{ name: "Youssef Mahmoud" }],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    title: "Youssef Mahmoud — Fullstack Engineer & Performance-Driven Builder",
    description: "Building scalable digital products engineered to convert.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0B",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${cairo.variable}`}
      suppressHydrationWarning>
      <body className="bg-[#0B0B0B] text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
