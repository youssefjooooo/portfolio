"use client";

/**
 * Navbar — Apple Liquid Glass · 3-island layout.
 *
 *  ┌─[Logo]─────────[ Work · Stack · About · Contact ]──────[EN·AR]─[Hire]─┐
 *
 * Three discrete floating glass elements, not a single bar.
 * Each one is its own glass pill — hovers with a soft lift.
 * Mobile: logo + locale + menu trigger only (full-screen overlay).
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const GithubIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const LinkedinIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TwitterIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import LocaleSwitcher from "@/components/ui/LocaleSwitcher";

const NAV_KEYS = [
  { key: "work",    n: "01", href: (locale: string) => `/${locale}/work` },
  { key: "stack",   n: "02", href: (locale: string) => `/${locale}#stack` },
  { key: "about",   n: "03", href: (locale: string) => `/${locale}#about` },
  { key: "contact", n: "04", href: (locale: string) => `/${locale}#contact` },
] as const;

const itemV = {
  hidden: { opacity: 0, y: 32, filter: "blur(10px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.7, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
  exit: (i: number) => ({
    opacity: 0, y: 18, filter: "blur(6px)",
    transition: { duration: 0.3, delay: i * 0.03 },
  }),
};

const islandV = {
  hidden:  { opacity: 0, y: -16, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.7, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const onScroll = useCallback(() => setScrolled(window.scrollY > 20), []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* ── 3-island floating navbar ─────────────────── */}
      <header
        className="fixed top-5 inset-x-0 z-50 flex items-center px-5 md:px-8 pointer-events-none"
        aria-label="Primary"
      >
        {/* ── Left section ───────────────────────────── */}
        <div className="flex-1 flex justify-start">
          <motion.div
            custom={0}
            variants={islandV}
            initial="hidden"
            animate="visible"
            className="pointer-events-auto"
          >
            <Link
              href={`/${locale}`}
              onClick={close}
              className="flex items-center gap-2 h-11 px-4 glass-pill text-[12px] font-bold text-ink-strong tracking-wider transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-accent animate-pulse-soft" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="font-mono">{`<YM />`}</span>
            </Link>
          </motion.div>
        </div>

        {/* ── Center section: nav links (desktop) ───── */}
        <motion.nav
          custom={1}
          variants={islandV}
          initial="hidden"
          animate="visible"
          className="pointer-events-auto hidden md:flex items-center h-11 px-1.5 glass-pill flex-shrink-0"
        >
          {NAV_KEYS.map(({ key, href }) => (
            <Link
              key={key}
              href={href(locale)}
              className="relative px-4 py-1.5 rounded-full text-[12px] font-medium text-ink-mid hover:text-ink-strong transition-colors group"
            >
              <span className="relative z-10 capitalize">{t(key)}</span>
              <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/70 transition-colors duration-300" />
            </Link>
          ))}
        </motion.nav>

        {/* ── Right section ──────────────────────────── */}
        <div className="flex-1 flex justify-end">
          <motion.div
            custom={2}
            variants={islandV}
            initial="hidden"
            animate="visible"
            className="pointer-events-auto flex items-center gap-2"
          >
            <LocaleSwitcher />

            <Link
              href={`/${locale}#contact`}
              onClick={close}
              className="hidden md:inline-flex items-center gap-1.5 h-11 px-5 rounded-full text-[12px] font-semibold bg-ink text-white tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1A2138] shadow-[0_8px_22px_-6px_rgba(11,16,32,0.45)] hover:shadow-[0_12px_28px_-6px_rgba(78,123,255,0.55)]"
            >
              {t("hire")}
              <ArrowUpRight
                size={14}
                strokeWidth={2.5}
                className={locale === "ar" ? "-scale-x-100" : ""}
              />
            </Link>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
              className="md:hidden flex items-center justify-center h-11 w-11 glass-pill text-ink-mid hover:text-ink-strong transition-colors"
            >
              <Menu size={17} />
            </button>
          </motion.div>
        </div>

        {/* Subtle scroll glass strip behind everything */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 top-[-20px] h-20 -z-10 pointer-events-none"
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background:
              "linear-gradient(to bottom, rgba(244,246,251,0.7) 0%, rgba(244,246,251,0) 100%)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            maskImage:
              "linear-gradient(to bottom, #000 0%, #000 70%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, #000 70%, transparent 100%)",
          }}
        />
      </header>

      {/* ── Full-screen overlay (mobile menu) ────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[200] flex flex-col"
            style={{
              background: "rgba(244,246,251,0.78)",
              WebkitBackdropFilter: "blur(36px) saturate(180%)",
              backdropFilter: "blur(36px) saturate(180%)",
            }}>

            {/* Monochrome luminance */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] rounded-full opacity-60 animate-float-y"
                style={{ background: "radial-gradient(circle, rgba(255,255,255,0.85), transparent 70%)" }} />
              <div className="absolute bottom-[-15%] right-[-5%] w-[40vw] h-[40vw] rounded-full opacity-40 animate-float-x"
                style={{ background: "radial-gradient(circle, rgba(11,16,32,0.06), transparent 70%)" }} />
            </div>

            {/* Top row */}
            <div className="relative flex items-center justify-between px-6 md:px-10 py-5">
              <Link
                href={`/${locale}`}
                className="flex items-center gap-2 h-11 px-4 glass-pill text-xs font-bold text-ink-strong tracking-widest"
                onClick={close}>
                <span className="font-mono">{`<YM />`}</span>
              </Link>
              <button
                onClick={close}
                className="flex items-center gap-2 h-11 px-4 glass-pill text-xs text-ink-mid hover:text-ink-strong transition-colors"
                aria-label="Close navigation">
                <span className="text-[11px] tracking-widest uppercase hidden sm:block">Close</span>
                <X size={16} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="relative flex-1 flex flex-col justify-center px-8 md:px-14 lg:px-20 gap-1">
              {NAV_KEYS.map(({ key, n, href }, i) => (
                <motion.a
                  key={key}
                  href={href(locale)}
                  custom={i}
                  variants={itemV}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={close}
                  className="group flex items-baseline gap-5 py-2 md:py-3 relative">
                  <span className="font-mono text-[11px] text-ink-muted w-6 shrink-0 translate-y-[-2px]">{n}</span>
                  <span
                    className="
                      text-[clamp(2.5rem,8vw,6.5rem)] font-bold tracking-tighter leading-none capitalize
                      bg-clip-text text-transparent transition-all duration-500
                    "
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, rgba(11,16,32,0.85) 0%, rgba(11,16,32,0.5) 100%)",
                    }}>
                    {t(key)}
                  </span>
                  <span className="flex-1 h-px bg-gradient-to-r from-ink/15 to-transparent self-center hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.a>
              ))}
            </nav>

            {/* Bottom bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
              className="relative flex items-center justify-between flex-wrap gap-4 px-8 md:px-14 lg:px-20 py-6">
              <LocaleSwitcher />

              <div className="flex items-center gap-3">
                {[
                  { Icon: GithubIcon,   href: "https://github.com",   label: "GitHub"   },
                  { Icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
                  { Icon: TwitterIcon,  href: "https://twitter.com",  label: "Twitter"  },
                ].map(({ Icon, href, label }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.06 }}
                    className="h-9 w-9 rounded-full glass-pill flex items-center justify-center text-ink-mid hover:text-ink-strong transition-colors"
                    aria-label={label}>
                    <Icon size={14} />
                  </motion.a>
                ))}

                <a
                  href="mailto:hello@youssefmahmoud.dev"
                  onClick={close}
                  className="
                    ml-1 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide
                    bg-ink text-white hover:bg-ink-strong transition-all duration-200 uppercase
                    shadow-[0_6px_20px_-4px_rgba(11,16,32,0.45)]
                  ">
                  {t("hire")}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
