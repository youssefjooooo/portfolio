"use client";

/**
 * BuildingNow — Editorial two-card lab (Apple Liquid Glass).
 * Left: agency, with progress + bullets.
 * Right: R&D, with light terminal.
 */

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { Hexagon, Activity } from "lucide-react";

const TERMINAL_LINES = [
  { text: "$ encore run",                 color: "rgba(10,14,31,0.85)",   delay: 0    },
  { text: "  Starting services...",       color: "rgba(10,14,31,0.45)",   delay: 600  },
  { text: "  ✓ auth-svc   ready :4000",   color: "rgba(46,140,90,0.85)",  delay: 1200 },
  { text: "  ✓ api-svc    ready :4001",   color: "rgba(46,140,90,0.85)",  delay: 1700 },
  { text: "  ✓ frontend   ready :3000",   color: "rgba(46,140,90,0.85)",  delay: 2200 },
  { text: "  Service mesh initialized",   color: "rgba(10,14,31,0.55)",   delay: 2800 },
  { text: "  🚀 Ready in 1.18s",          color: "rgba(91,126,255,0.95)", delay: 3200 },
];

function TerminalLine({ text, color, active }: { text: string; color: string; active: boolean }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!active) { setDisplayed(""); return; }
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
      className="rounded-2xl overflow-hidden glass-light"
      style={{
        background: 'rgba(255,255,255,0.55)',
        boxShadow: '0 8px 28px -8px rgba(10,14,31,0.18), 0 1px 0 rgba(255,255,255,0.9) inset',
      }}>
      <div className="flex w-full items-center gap-1.5 px-4 py-3 border-b border-ink/8" style={{ background: 'rgba(255,255,255,0.4)' }}>
        <span className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#FEBC2E' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
        <span className="ml-3 text-[11px] text-ink-muted font-mono">
          {t("rd_tag")} · Encore.ts
        </span>
      </div>
      <div className="px-5 py-5 space-y-1 min-h-[200px]" style={{ background: 'rgba(250,250,247,0.65)' }}>
        {TERMINAL_LINES.map((line, i) => (
          <TerminalLine key={i} text={line.text} color={line.color} active={activeIndex >= i} />
        ))}
        {activeIndex >= TERMINAL_LINES.length - 1 && (
          <div className="font-mono text-[13px] text-ink-mid mt-2">
            {"$ "}
            <span className="inline-block w-1.5 h-3.5 bg-ink/55 animate-blink align-middle ml-px" />
          </div>
        )}
      </div>
    </div>
  );
}

const AGENCY_BULLETS = [
  "Design + Engineering + SEO",
  "High-quality web products",
  "End-to-end delivery",
];

export default function BuildingNow() {
  const t = useTranslations("building");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const cardV = {
    hidden: { opacity: 0, y: 36, filter: "blur(10px)", scale: 0.97 },
    visible: (i: number) => ({
      opacity: 1, y: 0, filter: "blur(0px)", scale: 1,
      transition: { duration: 0.8, delay: i * 0.16, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <section id="building" className="relative z-10 py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="mb-14 max-w-3xl">
          <p className="eyebrow mb-4">{t("tag")}</p>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.92]">
            <span className="serif-italic text-gradient">{t("headline")}</span>
          </h2>
        </div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Agency */}
          <motion.div custom={0} variants={cardV} className="h-full">
            <div className="relative h-full p-8 md:p-10 rounded-3xl glass-surface flex flex-col gap-6 hover:bg-[rgba(255,255,255,0.78)] transition-all duration-500">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="eyebrow">{t("agency_tag")}</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-widest glass-light text-ink-strong">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inset-0 rounded-full bg-accent animate-pulse-soft" />
                        <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
                      </span>
                      {t("live")}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-ink-strong leading-tight tracking-tighter">
                    {t("agency_title").split(' ').slice(0, -1).join(' ')}{' '}
                    <span className="serif-italic font-normal text-gradient">
                      {t("agency_title").split(' ').slice(-1)}
                    </span>
                  </h3>
                </div>
                <span className="w-11 h-11 rounded-2xl glass-light flex-shrink-0 flex items-center justify-center text-ink-strong">
                  <Hexagon size={18} strokeWidth={1.8} />
                </span>
              </div>

              <p className="text-ink-mid leading-relaxed text-[15px]">
                {t("agency_body")}
              </p>

              <ul className="space-y-2">
                {AGENCY_BULLETS.map((text) => (
                  <li key={text} className="flex items-center gap-3 text-sm text-ink-mid">
                    <span className="serif-italic text-ink-muted">—</span>
                    {text}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-2">
                <div className="flex justify-between text-[11px] text-ink-muted font-semibold mb-2 tracking-wider uppercase">
                  <span>Scaling</span>
                  <span className="tabular-nums">78%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(10,14,31,0.08)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, #5B7EFF 0%, #A07BFF 100%)',
                      boxShadow: '0 0 12px rgba(91,126,255,0.5)',
                    }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: "78%" } : {}}
                    transition={{ duration: 1.3, delay: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* R&D */}
          <motion.div custom={1} variants={cardV} className="h-full">
            <div className="relative h-full p-8 md:p-10 rounded-3xl glass-surface flex flex-col gap-5 hover:bg-[rgba(255,255,255,0.78)] transition-all duration-500">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="eyebrow block mb-3">{t("rd_tag")}</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-ink-strong leading-tight tracking-tighter">
                    {t("rd_title").split(' ').slice(0, -1).join(' ')}{' '}
                    <span className="serif-italic font-normal text-gradient">
                      {t("rd_title").split(' ').slice(-1)}
                    </span>
                  </h3>
                </div>
                <span className="w-11 h-11 rounded-2xl glass-light flex-shrink-0 flex items-center justify-center text-ink-strong">
                  <Activity size={18} strokeWidth={1.8} />
                </span>
              </div>

              <p className="text-ink-mid leading-relaxed text-[15px]">
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
