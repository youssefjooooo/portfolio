/**
 * Philosophy — Server Component shell
 *
 * "Systems Over Features" section.
 * Left: principles text. Right: animated architecture diagram (client).
 */

import { getTranslations } from "next-intl/server";
import RevealText from "@/components/RevealText";
import PhilosophyDiagram from "@/components/PhilosophyDiagram";

const PRINCIPLES = [
  { titleKey: "p1_title", bodyKey: "p1_body", icon: "⬡" },
  { titleKey: "p2_title", bodyKey: "p2_body", icon: "◎" },
  { titleKey: "p3_title", bodyKey: "p3_body", icon: "◈" },
] as const;

export default async function Philosophy() {
  const t = await getTranslations("philosophy");

  return (
    <section id="about" className="relative z-10 py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        {/* ── Section header ────────────────────────── */}
        <RevealText className="mb-16 text-center">
          <p className="eyebrow mb-3">{t("tag")}</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-gradient leading-tight py-2">
            {t("headline_1")}{" "}
            <span className="text-white/30">{t("headline_2")}</span>
          </h2>
        </RevealText>

        {/* ── Two-column split ──────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — text + principles ─────────────── */}
          <div className="space-y-10">
            <RevealText
              delay={0.1}
              className="text-lg text-white/40 leading-relaxed">
              {t("body")}
            </RevealText>

            {/* Principle cards */}
            <div className="space-y-4">
              {PRINCIPLES.map(({ titleKey, bodyKey, icon }, i) => (
                <RevealText key={titleKey} delay={0.2 + i * 0.1}>
                  <div className="flex gap-4 p-5 rounded-2xl glass-surface group hover:glass-dense transition-all duration-300">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg glass-surface text-white/50">
                      {icon}
                    </div>
                    <div>
                      <p className="font-semibold text-white/80 mb-1">
                        {t(titleKey)}
                      </p>
                      <p className="text-sm text-white/35 leading-relaxed">
                        {t(bodyKey)}
                      </p>
                    </div>
                  </div>
                </RevealText>
              ))}
            </div>
          </div>

          {/* Right — animated diagram ─────────────── */}
          <RevealText delay={0.15} className="relative">
            <div className="rounded-3xl p-6 md:p-10 glass-surface overflow-hidden">
              {/* Subtle corner glow */}
              <div
                aria-hidden="true"
                className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl opacity-10 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.5), transparent)",
                }}
              />
              <PhilosophyDiagram />
              <p className="text-center eyebrow mt-4 w-full flex items-center justify-center">
                System Architecture · Encore.ts + Next.js
              </p>
            </div>
          </RevealText>
        </div>
      </div>
    </section>
  );
}
