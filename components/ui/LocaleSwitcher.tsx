"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggle = () => {
    const next = locale === "en" ? "ar" : "en";
    const newPath = pathname.replace(/^\/(en|ar)/, `/${next}`);

    // Next.js App Router does not re-render the root layout's <html> tag
    // during a soft client-side navigation. So we manually apply dir and lang.
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = next;

    router.push(newPath);
  };

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${locale === "en" ? "Arabic" : "English"}`}
      className="
        relative flex items-center gap-2.5 h-8 px-3 rounded-full overflow-hidden
        glass-surface text-[11px] font-semibold tracking-widest uppercase
        hover:glass-dense transition-all duration-300
        focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30
      ">
      <Globe size={12} strokeWidth={1.5} className="text-white/40" />

      <span className={locale === "en" ? "text-white" : "text-white/35"}>
        EN
      </span>
      <span className="text-white/20">·</span>
      <span className={locale === "ar" ? "text-white" : "text-white/35"}>
        AR
      </span>

      {/* Sliding indicator */}
      {/* <motion.span
        layout
        animate={{ x: locale === "en" ? -16 : 16, opacity: 0.12 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="absolute inset-0 rounded-full bg-white pointer-events-none w-full"
      /> */}
    </button>
  );
}
