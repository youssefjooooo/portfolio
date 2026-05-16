"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggle = () => {
    const next = locale === "en" ? "ar" : "en";
    const newPath = pathname.replace(/^\/(en|ar)/, `/${next}`);
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = next;
    router.push(newPath);
  };

  const isEn = locale === "en";

  return (
    <button
      onClick={toggle}
      dir="ltr"
      aria-label={`Switch to ${isEn ? "Arabic" : "English"}`}
      className="
        relative inline-flex items-center h-11 glass-pill
        font-bold tracking-[0.16em] uppercase
        transition-transform duration-300 hover:-translate-y-0.5
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50
      ">
      <div className="relative flex items-center px-1">
        {/* Sliding ink pill */}
        <motion.span
          aria-hidden="true"
          className="absolute top-0 bottom-0 w-[42px] rounded-full bg-ink"
          animate={{ x: isEn ? 0 : 42 }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
        <span
          className={`relative z-10 inline-flex items-center justify-center w-[42px] h-9 text-[11px] transition-colors duration-300 ${
            isEn ? "text-white" : "text-ink-mid"
          }`}
        >
          EN
        </span>
        <span
          className={`relative z-10 inline-flex items-center justify-center w-[42px] h-9 text-[11px] transition-colors duration-300 ${
            !isEn ? "text-white" : "text-ink-mid"
          }`}
        >
          AR
        </span>
      </div>
    </button>
  );
}
