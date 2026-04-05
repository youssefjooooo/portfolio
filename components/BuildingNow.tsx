"use client";

/**
 * BuildingNow — Client Component (Dark Monochromatic)
 *
 * "What I'm Building Now" — two glass cards side by side.
 * Left (Agency): Static content with LIVE badge + bullet list.
 * Right (R&D): Animated terminal window typewriter effect.
 */

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

const TERMINAL_LINES = [
  { text: "$ encore run", color: "rgba(255,255,255,0.35)", delay: 0 },
  {
    text: "  Starting services...",
    color: "rgba(255,255,255,0.20)",
    delay: 600,
  },
  {
    text: "  ✓ auth-svc   ready :4000",
    color: "rgba(255,255,255,0.55)",
    delay: 1200,
  },
  {
    text: "  ✓ api-svc    ready :4001",
    color: "rgba(255,255,255,0.55)",
    delay: 1700,
  },
  {
    text: "  ✓ frontend   ready :3000",
    color: "rgba(255,255,255,0.55)",
    delay: 2200,
  },
  {
    text: "  Service mesh initialized",
    color: "rgba(255,255,255,0.25)",
    delay: 2800,
  },
  { text: "  🚀 Ready in 1.18s", color: "rgba(255,255,255,0.70)", delay: 3200 },
];

function TerminalLine({
  text,
  color,
  active,
}: {
  text: string;
  color: string;
  active: boolean;
}) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!active) {
      setDisplayed("");
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 28);
    return () => clearInterval(interval);
  }, [active, text]);

  return (
    <div className="min-h-[1.4em] font-mono text-[13px]" style={{ color }}>
      {displayed}
      {displayed.length < text.length && active && (
        <span className="inline-block w-1.5 h-3.5 bg-current animate-blink ml-px align-middle" />
      )}
    </div>
  );
}

function Terminal() {
  const t = useTranslations("building");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    TERMINAL_LINES.forEach((line, i) => {
      setTimeout(() => setActiveIndex(i), line.delay);
    });
  }, [inView]);

  return (
    <div
      dir="ltr"
      ref={ref}
      className="rounded-2xl overflow-hidden"
      style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.5)" }}>
      {/* Traffic lights bar */}
      <div className="flex w-full items-center gap-1.5 px-4 py-3 bg-[rgba(255,255,255,0.04)] border-b border-white/[0.06]">
        <span className="w-3 h-3 rounded-full bg-white/20" />
        <span className="w-3 h-3 rounded-full bg-white/20" />
        <span className="w-3 h-3 rounded-full bg-white/20" />
        <span className="ml-3 text-[11px] text-white/25 font-mono justify-self-start">
          {t("rd_tag")} · Encore.ts
        </span>
      </div>
      {/* Terminal body */}
      <div className="bg-[rgba(0,0,0,0.60)] px-5 py-5 space-y-1 min-h-[200px]">
        {TERMINAL_LINES.map((line, i) => (
          <TerminalLine
            key={i}
            text={line.text}
            color={line.color}
            active={activeIndex >= i}
          />
        ))}
        {activeIndex >= TERMINAL_LINES.length - 1 && (
          <div className="font-mono text-[13px] text-white/20 mt-2">
            {"$ "}
            <span className="inline-block w-1.5 h-3.5 bg-white/30 animate-blink align-middle ml-px" />
          </div>
        )}
      </div>
    </div>
  );
}

const AGENCY_BULLETS = [
  { icon: "⬡", text: "Design + Engineering + SEO" },
  { icon: "◎", text: "High-quality web products" },
  { icon: "◈", text: "End-to-end delivery" },
];

export default function BuildingNow() {
  const t = useTranslations("building");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const cardVariants = {
    hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.75, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <section id="building" className="relative z-10 py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div className="mb-12">
          <p className="eyebrow mb-3">{t("tag")}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white/80 tracking-tight">
            {t("headline")}
          </h2>
        </div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ── Agency card ─────────────────────────── */}
          <motion.div custom={0} variants={cardVariants} className="h-full">
            <div className="h-full p-8 rounded-3xl glass-surface flex flex-col gap-6 group hover:glass-dense transition-all duration-300">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="eyebrow">{t("agency_tag")}</span>
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/[0.06] text-white/50 border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
                      {t("live")}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white/80 leading-tight">
                    {t("agency_title")}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-2xl glass-surface flex-shrink-0 flex items-center justify-center text-white/50 text-xl">
                  ⬡
                </div>
              </div>

              <p className="text-white/35 leading-relaxed text-sm flex-1">
                {t("agency_body")}
              </p>

              <div className="space-y-2.5">
                {AGENCY_BULLETS.map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <span className="text-white/30 text-sm">{icon}</span>
                    <span className="text-sm text-white/45">{text}</span>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-[11px] text-white/25 mb-1.5">
                  <span>Scaling</span>
                  <span>78%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-white/25"
                    initial={{ width: 0 }}
                    animate={inView ? { width: "78%" } : {}}
                    transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── R&D card ────────────────────────────── */}
          <motion.div custom={1} variants={cardVariants} className="h-full">
            <div className="h-full p-8 rounded-3xl glass-surface flex flex-col gap-5 hover:glass-dense transition-all duration-300">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="eyebrow block mb-2">{t("rd_tag")}</span>
                  <h3 className="text-xl font-bold text-white/80 leading-tight">
                    {t("rd_title")}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-2xl glass-surface flex-shrink-0 flex items-center justify-center text-white/50 text-xl">
                  ◎
                </div>
              </div>

              <p className="text-white/35 leading-relaxed text-sm">
                {t("rd_body")}
              </p>

              <Terminal />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
