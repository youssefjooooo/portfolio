/**
 * Hero — Editorial Apple Liquid Glass.
 *
 * Massive editorial type: "Youssef" bold sans, "Mahmoud" italic serif.
 * Minimal chrome, generous space, one CTA.
 */

import { getLocale, getTranslations } from "next-intl/server";
import LetterReveal from "@/components/LetterReveal";
import RevealText from "@/components/RevealText";
import GlassButton from "@/components/ui/GlassButton";
import { ArrowLeft, ArrowDown } from "lucide-react";

const HERO_TECH = [
  "Next.js",
  "TypeScript",
  "Encore.ts",
  "PostgreSQL",
  "Tailwind",
  "Framer Motion",
] as const;

export default async function Hero() {
  const t = await getTranslations("hero");
  const isEnglish = (await getLocale()) === "en";

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-36 pb-24 text-center overflow-hidden">

      {/* Soft monochrome luminance behind the type */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] rounded-full opacity-70 animate-[float-y_8s_ease-in-out_infinite]"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.85), transparent 60%)" }}
        />
      </div>

      {/* ── Availability tag ─────────────────────────── */}
      <RevealText delay={0} className="mb-12">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 glass-pill text-[10px] text-ink-mid tracking-[0.28em] uppercase font-bold">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-pulse-soft absolute inline-flex h-full w-full rounded-full bg-accent" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
          </span>
          {t("badge")}
        </div>
      </RevealText>

      {/* ── Editorial name ───────────────────────────── */}
      <h1
        className="relative mb-8 leading-[0.88] tracking-tighter"
        aria-label={`${t("name_1")} ${t("name_2")}`}
      >
        <span className="block text-[clamp(3.2rem,11vw,11rem)] font-bold text-ink-strong">
          <LetterReveal text={t("name_1")} delay={0.1} />
        </span>
        <RevealText delay={0.55} y={14}>
          <span className="block text-[clamp(3.6rem,12vw,12rem)] font-normal serif-italic text-gradient">
            {t("name_2")}
          </span>
        </RevealText>
      </h1>

      {/* ── Editorial tagline ────────────────────────── */}
      <RevealText delay={0.85} className="mb-10 max-w-2xl">
        <p className="text-lg md:text-xl text-ink-mid leading-snug tracking-tight">
          {t("tagline_1")}{" "}
          <span className="serif-italic text-ink-strong">{t("tagline_2").replace(/\.$/, "")}</span>
          <span className="text-ink-strong">.</span>
        </p>
      </RevealText>

      {/* ── Body copy — quieter, supporting role ─────── */}
      <RevealText
        delay={1.05}
        className="w-full max-w-xl text-ink-muted text-[15px] leading-relaxed mb-12 text-center">
        <p>{t("body")}</p>
      </RevealText>

      {/* ── CTAs ─────────────────────────────────────── */}
      <RevealText delay={1.25} className="flex flex-row items-center gap-3">
        <GlassButton variant="primary" href="#work">
          {t("cta_primary")}
        </GlassButton>
        <GlassButton variant="ghost" href="#contact">
          {t("cta_secondary")}{" "}
          <ArrowLeft size={16} className={`${isEnglish ? "rotate-180" : ""}`} />
        </GlassButton>
      </RevealText>

      {/* ── Tech badges ──────────────────────────────── */}
      <RevealText
        delay={1.45}
        className="mt-16 w-full max-w-2xl mx-auto hidden sm:block">
        <p className="eyebrow mb-4 text-center">Built with</p>
        <div className="flex flex-wrap justify-center items-center gap-2">
          {HERO_TECH.map((tech, i) => (
            <span
              key={tech}
              className="px-3.5 py-1.5 glass-pill text-ink-mid text-[11px] font-semibold tracking-wide hover:text-ink-strong hover:bg-white/85 transition-all duration-300 select-none cursor-default animate-[float-y_6s_ease-in-out_infinite]"
              style={{ animationDelay: `${i * 0.35}s` }}
            >
              {tech}
            </span>
          ))}
        </div>
      </RevealText>

      {/* ── Scroll indicator ─────────────────────────── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none">
        <span className="eyebrow">Scroll</span>
        <ArrowDown size={14} className="text-ink-muted animate-[float-y_2.2s_ease-in-out_infinite]" />
      </div>
    </section>
  );
}
