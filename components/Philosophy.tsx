/**
 * Philosophy — Editorial spread (Apple Liquid Glass · Light)
 * Big serif headline with italic accent, numbered principles, diagram on right.
 */

import { getTranslations } from "next-intl/server";
import { Target, Layers, Rocket } from "lucide-react";
import RevealText from "@/components/RevealText";
import PhilosophyDiagram from "@/components/PhilosophyDiagram";

const PRINCIPLES = [
  { titleKey: "p1_title", bodyKey: "p1_body", Icon: Target, n: "01" },
  { titleKey: "p2_title", bodyKey: "p2_body", Icon: Layers, n: "02" },
  { titleKey: "p3_title", bodyKey: "p3_body", Icon: Rocket, n: "03" },
] as const;

export default async function Philosophy() {
  const t = await getTranslations("philosophy");

  return (
    <section id="about" className="relative z-10 py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">

        {/* ── Editorial header ──────────────────────── */}
        <RevealText className="mb-20 max-w-4xl">
          <p className="eyebrow mb-4">{t("tag")}</p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.92]">
            <span className="text-ink-strong">{t("headline_1")}</span>
            <br />
            <span className="serif-italic text-gradient">{t("headline_2")}</span>
          </h2>
        </RevealText>

        {/* ── Two-column split ──────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left — principles */}
          <div className="lg:col-span-7 space-y-6">
            <RevealText delay={0.1} className="text-lg text-ink-mid leading-relaxed max-w-xl">
              {t("body")}
            </RevealText>

            <div className="grid grid-cols-1 gap-3 pt-4">
              {PRINCIPLES.map(({ titleKey, bodyKey, Icon, n }, i) => (
                <RevealText key={titleKey} delay={0.2 + i * 0.1}>
                  <div className="group relative flex gap-5 p-6 rounded-2xl glass-surface hover:bg-glass-strong transition-all duration-500 hover:-translate-y-0.5">
                    <span className="serif-italic text-2xl text-ink-muted shrink-0 w-10 leading-none pt-1">{n}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2.5 mb-2">
                        <Icon size={15} strokeWidth={1.8} className="text-ink-strong" />
                        <p className="font-semibold text-ink-strong tracking-tight">{t(titleKey)}</p>
                      </div>
                      <p className="text-sm text-ink-mid leading-relaxed">{t(bodyKey)}</p>
                    </div>
                  </div>
                </RevealText>
              ))}
            </div>
          </div>

          {/* Right — diagram, sticky on desktop */}
          <RevealText delay={0.15} className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="rounded-3xl p-6 md:p-10 glass-surface overflow-hidden relative">
              <PhilosophyDiagram />
              <p className="text-center eyebrow mt-4">
                Encore.ts · Next.js
              </p>
            </div>
          </RevealText>
        </div>
      </div>
    </section>
  );
}
