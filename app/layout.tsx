/**
 * Root Layout — sets <html lang dir> and loads fonts.
 *
 * Fonts:
 *  · Cairo — bilingual sans-serif (EN + AR) for UI/body
 *  · Instrument Serif — editorial display font, used sparingly for impact
 */

import type { Metadata, Viewport } from "next";
import { Cairo, Instrument_Serif } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
  style: ["normal", "italic"],
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
  themeColor: "#FAFAF7",
  colorScheme: "light",
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
      className={`${cairo.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning>
      <body className="text-ink font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
