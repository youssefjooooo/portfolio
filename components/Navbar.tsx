"use client";

/**
 * Navbar — Full-screen overlay navigation.
 *
 * Desktop + Mobile: identical behaviour.
 *  – Minimal top bar: logo (left) + Menu icon (right)
 *  – Click Menu → full-screen black-glass overlay animates in
 *  – Overlay: numbered nav links (stagger), bottom bar with
 *    language switcher + social icons + hire CTA
 *  – Top bar gains a glass tint on scroll (scrolled > 20px)
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const GithubIcon = ({ size = 15 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const LinkedinIcon = ({ size = 15 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TwitterIcon = ({ size = 15 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import LocaleSwitcher from "@/components/ui/LocaleSwitcher";

const LINKS = [
  { key: "work", href: "#work", n: "01" },
  { key: "stack", href: "#stack", n: "02" },
  { key: "about", href: "#about", n: "03" },
  { key: "contact", href: "#contact", n: "04" },
] as const;

const itemV = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: 0.08 + i * 0.07,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: 16,
    transition: { duration: 0.25, delay: i * 0.03 },
  }),
};

const overlayV = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
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

  // Lock body scroll while nav is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* ── Top bar ─────────────────────────────────── */}
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 transition-all duration-500"
        style={
          scrolled && !open
            ? {
                background: "rgba(11,11,11,0.82)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }
            : {}
        }>
        <Link
          href={`/${locale}`}
          className="text-sm font-bold text-white/80 hover:text-white transition-colors duration-200 tracking-widest uppercase "
          onClick={close}>
          {`<Youssef Mahmoud />`}
        </Link>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-200 p-1"
          aria-label="Open navigation">
          <span className="text-xs tracking-widest uppercase text-white/30 hidden sm:block">
            Menu
          </span>
          <Menu size={18} />
        </button>
      </motion.header>

      {/* ── Full-screen overlay ─────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={overlayV}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[200] flex flex-col"
            style={{
              background: "rgba(8,8,8,0.97)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
            }}>
            {/* Dot grid inside overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            {/* Top row inside overlay */}
            <div className="relative flex items-center justify-between px-6 md:px-10 py-5">
              <Link
                href={`/${locale}`}
                className="text-sm font-bold text-white/60 hover:text-white transition-colors tracking-widest uppercase"
                onClick={close}>
                {`<YM />`}
              </Link>
              <button
                onClick={close}
                className="flex items-center gap-2 text-white/50 hover:text-white transition-colors p-1"
                aria-label="Close navigation">
                <span className="text-xs tracking-widest uppercase text-white/30 hidden sm:block">
                  Close
                </span>
                <X size={18} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="relative flex-1 flex flex-col justify-center px-8 md:px-14 lg:px-20 gap-1">
              {LINKS.map(({ key, href, n }, i) => (
                <motion.a
                  key={key}
                  href={href}
                  custom={i}
                  variants={itemV}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={close}
                  className="group flex items-baseline gap-5 py-2 md:py-3">
                  <span className="font-mono text-[11px] text-white/20 w-6 shrink-0 translate-y-[-2px]">
                    {n}
                  </span>
                  <span
                    className="
                      text-[clamp(2.5rem,7vw,6rem)] font-bold tracking-tighter leading-none
                      text-white/70 group-hover:text-white transition-colors duration-200
                    ">
                    {t(key)}
                  </span>
                  {/* Underline that grows on hover */}
                  <span className="flex-1 h-px bg-white/10 self-center hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.a>
              ))}
            </nav>

            {/* Bottom bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.35 }}
              className="relative flex items-center justify-between flex-wrap gap-4 px-8 md:px-14 lg:px-20 py-6 border-t border-white/[0.06]">
              <LocaleSwitcher />

              <div className="flex items-center gap-5">
                {[
                  {
                    Icon: GithubIcon,
                    href: "https://github.com",
                    label: "GitHub",
                  },
                  {
                    Icon: LinkedinIcon,
                    href: "https://linkedin.com",
                    label: "LinkedIn",
                  },
                  {
                    Icon: TwitterIcon,
                    href: "https://twitter.com",
                    label: "Twitter",
                  },
                ].map(({ Icon, href, label }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.42 + i * 0.05 }}
                    className="text-white/25 hover:text-white transition-colors duration-200"
                    aria-label={label}>
                    <Icon size={15} />
                  </motion.a>
                ))}

                <a
                  href="mailto:hello@youssefmahmoud.dev"
                  onClick={close}
                  className="
                    ml-1 px-4 py-2 rounded-lg border border-white/12 text-xs tracking-wide
                    text-white/50 hover:text-white hover:border-white/25
                    transition-all duration-200 uppercase
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
