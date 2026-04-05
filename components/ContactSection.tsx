/**
 * ContactSection — Server Component (Dark Monochromatic)
 *
 * Full-width CTA with white headline + email button.
 * Footer with large "YOUSSEF MAHMOUD" watermark at ~4% opacity.
 */

import { getLocale, getTranslations } from "next-intl/server";
import RevealText from "@/components/RevealText";
import GlassButton from "@/components/ui/GlassButton";
import RandomFooterMessage from "@/components/RandomFooterMessage";
import { ArrowLeft } from "lucide-react";

export default async function ContactSection() {
  const t = await getTranslations("contact");
  const tf = await getTranslations("footer");

  const isEnglish = (await getLocale()) === "en";

  return (
    <>
      <section id="contact" className="relative z-10 py-32 px-4">
        {/* Subtle white center glow */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none">
          <div
            className="w-[500px] h-[250px] rounded-full blur-[120px] opacity-[0.06]"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,1), transparent)",
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <RevealText className="mb-4">
            <p className="eyebrow">{t("tag")}</p>
          </RevealText>

          <RevealText delay={0.1} className="mb-6">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
              <span className="text-white/80">{t("headline_1")}</span>{" "}
              <br className="hidden sm:block" />
              <span className="text-gradient">{t("headline_2")}</span>
            </h2>
          </RevealText>

          <RevealText delay={0.2} className="mb-12">
            <p className="text-white/35 text-lg max-w-md mx-auto leading-relaxed">
              {t("body")}
            </p>
          </RevealText>

          <RevealText
            delay={0.3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GlassButton
              variant="primary"
              href={`mailto:${t("email")}`}
              external>
              {t("email")}
            </GlassButton>
            <GlassButton variant="ghost" href="https://github.com" external>
              {t("cta_secondary")}{" "}
              <ArrowLeft
                size={16}
                className={`${isEnglish ? "rotate-180" : ""}`}
              />
            </GlassButton>
          </RevealText>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/[0.06] overflow-hidden h-[50vh] flex items-end justify-center gap-6">
        {/* Large watermark name */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-start justify-center pointer-events-none select-none overflow-hidden mt-20 ">
          <span
            className="text-[clamp(4rem,14vw,12rem)] font-bold tracking-tighter whitespace-nowrap text-white leading-none"
            style={{ opacity: 0.03 }}>
            YOUSSEF <br className="md:hidden block" /> MAHMOUD
          </span>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12 flex flex-wrap h-fit  items-end justify-between md:gap-10 gap-3 self-end">
          <span className="text-sm font-bold font-mono text-white/30">
            &lt;Youssef Mahmoud /&gt;
          </span>
          <RandomFooterMessage
            messages={tf.raw("built_messages") as string[]}
          />
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} {tf("copy")}
          </p>
        </div>
      </footer>
    </>
  );
}
