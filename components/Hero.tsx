/**
 * Hero — Server Component
 *
 * Static shell server-rendered for optimal LCP and SEO.
 * Client sub-components (LetterReveal, RevealText, GlassButton, FloatingBadge)
 * hydrate for their animations without blocking first paint.
 */

import { getLocale, getTranslations } from "next-intl/server";
import LetterReveal from "@/components/LetterReveal";
import RevealText from "@/components/RevealText";
import GlassButton from "@/components/ui/GlassButton";
import { ArrowLeft } from "lucide-react";
const HERO_TECH = [
  "Next.js 15",
  "TypeScript",
  "Encore.ts",
  "PostgreSQL",
  "Tailwind CSS",
  "Framer Motion",
] as const;

export default async function Hero() {
  const t = await getTranslations("hero");
  const isEnglish = (await getLocale()) === "en";

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-20 text-center overflow-hidden">
      {/* ── Availability badge ───────────────────────── */}
      <RevealText delay={0} className="mb-10">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-surface text-xs text-white/40 tracking-[0.18em] uppercase">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/60 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white/80" />
          </span>
          {t("badge")}
        </div>
      </RevealText>

      {/* ── Name — letter stagger ───────────────────── */}
      <h1 className="mb-4" aria-label={`${t("name_1")} ${t("name_2")}`}>
        <div className="text-[clamp(3rem,9vw,7.5rem)] font-bold tracking-tighter leading-[0.88] scale-95">
          <LetterReveal text={t("name_1")} delay={0.1} className="text-white" />
        </div>
        <div className="text-[clamp(3rem,9vw,7.5rem)] font-bold tracking-tighter leading-[0.88]">
          <LetterReveal
            text={t("name_2")}
            delay={0.3}
            className="text-gradient"
          />
        </div>
      </h1>

      {/* ── Role tagline ─────────────────────────────── */}
      <RevealText
        delay={0.7}
        className="mb-6 md:mb-10 flex items-center justify-center">
        <div className="text-sm md:text-lg font-medium tracking-tight space-y-0.5 mt-4 md:mt-8 ">
          <div className="text-white/60">{t("tagline_1")}</div>
          <div className="text-white/30">{t("tagline_2")}</div>
        </div>
      </RevealText>

      {/* ── Body copy ───────────────────────────────── */}
      <RevealText
        delay={0.95}
        className="w-[90%] md:w-[60%] text-white/40 md:text-lg leading-relaxed mb-12 text-center flex items-center justify-center">
        <p className="text-center flex items-center justify-center">
          {t("body")}
        </p>
      </RevealText>

      {/* ── CTAs ────────────────────────────────────── */}
      <RevealText delay={1.15} className="flex flex-row items-center gap-3">
        <GlassButton variant="primary" href="#work">
          {t("cta_primary")}
        </GlassButton>
        <GlassButton variant="ghost" href="#contact">
          {t("cta_secondary")}{" "}
          <ArrowLeft size={16} className={`${isEnglish ? "rotate-180" : ""}`} />
        </GlassButton>
      </RevealText>

      {/* ── Inline Tech Stack ───────────────────────── */}
      <RevealText
        delay={1.35}
        className="mt-14 w-full max-w-2xl mx-auto hidden sm:block">
        <p className="text-[10px] text-center w-full flex items-center justify-center uppercase tracking-[0.2em] text-white/20 mb-4 select-none">
          Powered By
        </p>
        <div className="flex flex-wrap justify-center items-center gap-2.5">
          {HERO_TECH.map((tech) => (
            <span
              key={tech}
              className="px-3.5 py-1.5 rounded-lg border border-white/[0.04] bg-white/[0.02] text-white/40 text-[11px] font-medium tracking-wide hover:bg-white/[0.06] hover:text-white/70 hover:border-white/[0.08] transition-all duration-300 select-none cursor-default">
              {tech}
            </span>
          ))}
        </div>
      </RevealText>

      {/* ── Scroll indicator ─────────────────────────── */}
      {/* <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none">
        <span className="text-[10px] tracking-[0.22em] uppercase text-white/20">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
      </div> */}
    </section>
  );
}
