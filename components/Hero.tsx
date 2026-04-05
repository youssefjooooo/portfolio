/**
 * Hero — Server Component
 *
 * Static shell is server-rendered for optimal LCP and SEO.
 * Interactive/animated children (<LetterReveal />, <RevealText />, <GlassButton />)
 * are Client Components that hydrate after the initial paint.
 *
 * The actual text content is present in the SSR HTML, so search engines
 * and LCP metrics see it immediately.
 */

import LetterReveal from '@/components/LetterReveal'
import RevealText from '@/components/RevealText'
import GlassButton from '@/components/ui/GlassButton'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-20 text-center overflow-hidden">

      {/* ── Availability badge ───────────────────────── */}
      <RevealText delay={0} className="mb-10">
        <div
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs text-slate-400 tracking-[0.18em] uppercase glass-surface"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
          </span>
          Available for projects
        </div>
      </RevealText>

      {/* ── Heading — letter stagger ─────────────────── */}
      <div className="space-y-0 mb-10" aria-label="Creative Technologist & Engineer">
        {/* Line 1 */}
        <div className="text-[clamp(2.75rem,8vw,6.5rem)] font-bold tracking-tighter leading-[0.92] text-white">
          <LetterReveal text="Creative" delay={0.08} />
        </div>
        {/* Line 2 — gradient */}
        <div className="text-[clamp(2.75rem,8vw,6.5rem)] font-bold tracking-tighter leading-[0.92]">
          <LetterReveal
            text="Technologist"
            delay={0.28}
            className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent"
          />
        </div>
        {/* Line 3 — muted */}
        <div className="text-[clamp(2.75rem,8vw,6.5rem)] font-bold tracking-tighter leading-[0.92] text-white/25">
          <LetterReveal text="& Engineer" delay={0.5} />
        </div>
      </div>

      {/* ── Sub-heading ──────────────────────────────── */}
      <RevealText
        delay={0.82}
        className="max-w-[520px] text-slate-400 text-lg md:text-xl leading-relaxed mb-12"
      >
        <p>
          Building pixel-perfect, performant interfaces where{' '}
          <em className="not-italic text-white/70">design meets engineering precision</em>.
        </p>
      </RevealText>

      {/* ── CTAs ─────────────────────────────────────── */}
      <RevealText delay={1.05} className="flex flex-col sm:flex-row items-center gap-3">
        <GlassButton variant="primary" href="#work">
          View my work
        </GlassButton>
        <GlassButton variant="ghost" href="#contact">
          Let&apos;s connect →
        </GlassButton>
      </RevealText>

      {/* ── Scroll indicator ─────────────────────────── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none">
        <span className="text-[10px] tracking-[0.2em] uppercase text-slate-600">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/10 to-transparent" />
      </div>

      {/* ── Decorative chroma blur behind heading ────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/3 -translate-y-1/2 flex justify-center"
      >
        <div
          className="w-[700px] h-[300px] blur-[120px] opacity-[0.06] rounded-full"
          style={{
            background: 'linear-gradient(90deg, #38bdf8 0%, #4ade80 100%)',
          }}
        />
      </div>
    </section>
  )
}
