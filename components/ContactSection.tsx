/**
 * ContactSection — Editorial closing + footer.
 *
 * Massive serif headline, single primary CTA, ghost secondary,
 * watermark name in the footer.
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
      <section id="contact" className="relative z-10 py-32 px-4 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vw] rounded-full opacity-70 blur-3xl animate-[float-y_8s_ease-in-out_infinite]"
            style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.95), transparent 70%)" }} />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <RevealText className="mb-6">
            <p className="eyebrow">{t("tag")}</p>
          </RevealText>

          <RevealText delay={0.1} className="mb-8">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.92]">
              <span className="text-ink-strong">{t("headline_1")}</span>
              <br />
              <span className="serif-italic text-gradient">{t("headline_2")}</span>
            </h2>
          </RevealText>

          <RevealText delay={0.2} className="mb-14">
            <p className="text-ink-mid text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
              {t("body")}
            </p>
          </RevealText>

          <RevealText
            delay={0.3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GlassButton variant="primary" href={`mailto:${t("email")}`} external>
              {t("email")}
            </GlassButton>
            <GlassButton variant="ghost" href="https://github.com" external>
              {t("cta_secondary")}{" "}
              <ArrowLeft size={16} className={`${isEnglish ? "rotate-180" : ""}`} />
            </GlassButton>
          </RevealText>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────── */}
      <footer className="relative z-10 overflow-hidden flex items-end justify-center border-t border-ink/8 min-h-[55vh]">
        {/* Watermark name */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-start justify-center pointer-events-none select-none overflow-hidden pt-12">
          <span
            className="text-[clamp(4rem,16vw,14rem)] serif-italic tracking-tighter whitespace-nowrap leading-none text-gradient"
            style={{ opacity: 0.18 }}>
            Youssef <br className="md:hidden block" /> Mahmoud
          </span>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-10 flex flex-wrap items-end justify-between md:gap-10 gap-3 w-full">
          <span className="text-sm font-bold font-mono text-ink-mid">
            &lt;Youssef Mahmoud /&gt;
          </span>
          <RandomFooterMessage messages={tf.raw("built_messages") as string[]} />
          <p className="text-xs text-ink-muted">
            © {new Date().getFullYear()} {tf("copy")}
          </p>
        </div>
      </footer>
    </>
  );
}
