import Hero from '@/components/Hero'
import BentoGrid from '@/components/BentoGrid'
import TechStack from '@/components/TechStack'

/* Server Component — contributes to LCP & SEO */
export default function Home() {
  return (
    <>
      <Hero />
      <BentoGrid />
      <TechStack />

      {/* ── Contact Stub ───────────────────────────── */}
      <section
        id="contact"
        className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-32 text-center"
      >
        <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">Get in touch</p>
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
          Let&apos;s build something{' '}
          <span className="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
            remarkable
          </span>
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto mb-10 text-lg leading-relaxed">
          Open to senior frontend roles, creative engineering projects, and design-system
          collaborations.
        </p>
        <a
          href="mailto:hello@example.com"
          className="
            relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl
            glass-surface text-white font-medium text-sm
            hover:glass-dense transition-all duration-500
            hover:shadow-chroma-sky group overflow-hidden
          "
        >
          <span className="relative z-10">hello@example.com</span>
          <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-200">
            →
          </span>
          {/* shimmer */}
          <span
            aria-hidden="true"
            className="absolute inset-0 -skew-x-12 animate-shimmer pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
              width: '40%',
            }}
          />
        </a>
      </section>

      {/* ── Footer ─────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/[0.06] py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-slate-600 text-sm font-mono">&lt;YK /&gt;</span>
          <p className="text-slate-600 text-xs">
            Built with Next.js 15 · Tailwind · Framer Motion
          </p>
        </div>
      </footer>
    </>
  )
}
