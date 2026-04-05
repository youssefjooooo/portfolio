/**
 * About — Server Component (Dark Monochromatic)
 *
 * "The Human Behind the Terminal" — personal bio section.
 *
 * Layout:
 *  Left  — abstract glass avatar card with initials "YM" + location chip
 *  Right — headline, bio, interest chips, social links
 */

import { getTranslations } from 'next-intl/server'
import RevealText          from '@/components/RevealText'

const INTERESTS = [
  { key: 'interest_ui_design',   icon: '✨' },
  { key: 'interest_ux_research', icon: '🔍' },
  { key: 'interest_animations',  icon: '⚡' },
  { key: 'interest_aesthetics',  icon: '🎨' },
] as const

const SOCIALS = [
  { label: 'GitHub',   href: '#', icon: '◈' },
  { label: 'LinkedIn', href: '#', icon: '⬡' },
  { label: 'Twitter',  href: '#', icon: '◇' },
]

export default async function About() {
  const t = await getTranslations('about')

  return (
    <section id="about-bio" className="relative z-10 py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">

        <RevealText className="mb-14">
          <p className="eyebrow mb-3">{t('tag')}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white/80 tracking-tight leading-tight">
            {t('headline')}
          </h2>
        </RevealText>

        {/* Two-column — reverses order in RTL via flex-row-reverse */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center rtl:md:[direction:rtl]">

          {/* Avatar card */}
          <RevealText delay={0.1}>
            <div className="relative mx-auto max-w-[320px] md:max-w-none">
              {/* Subtle outer glow */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-3xl blur-2xl opacity-10 scale-105 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.5), transparent)' }}
              />
              {/* Card border */}
              <div className="relative rounded-3xl p-px glass-surface overflow-hidden">
                <div className="relative rounded-[calc(1.5rem-1px)] overflow-hidden glass-surface p-12 flex flex-col items-center gap-6">
                  {/* Avatar initials */}
                  <div
                    className="w-28 h-28 rounded-2xl flex items-center justify-center text-white/70 text-4xl font-bold tracking-tight select-none glass-surface"
                  >
                    YM
                  </div>

                  <div className="text-center">
                    <p className="text-xl font-bold text-white/80 tracking-tight">Youssef Mahmoud</p>
                    <p className="text-sm text-white/35 mt-0.5">Fullstack Engineer</p>
                  </div>

                  {/* Location & status chips */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium glass-surface text-white/40">
                      💡 {t('location')}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium glass-surface text-white/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
                      {t('status')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </RevealText>

          {/* Text content */}
          <div className="space-y-8">
            <RevealText delay={0.2} className="text-white/40 leading-relaxed text-lg">
              {t('body')}
            </RevealText>

            <RevealText delay={0.3}>
              <p className="eyebrow mb-4">When not coding</p>
              <div className="flex flex-wrap gap-2.5">
                {INTERESTS.map(({ key, icon }) => (
                  <span
                    key={key}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass-surface text-sm font-medium text-white/50 hover:glass-dense hover:text-white/70 transition-all duration-300 cursor-default"
                  >
                    <span className="text-base">{icon}</span>
                    {t(key)}
                  </span>
                ))}
              </div>
            </RevealText>

            <RevealText delay={0.4} className="flex items-center gap-3 pt-2">
              {SOCIALS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white/35 glass-surface hover:text-white/70 hover:glass-dense transition-all duration-300"
                >
                  <span>{icon}</span>
                  {label}
                </a>
              ))}
            </RevealText>
          </div>
        </div>
      </div>
    </section>
  )
}
