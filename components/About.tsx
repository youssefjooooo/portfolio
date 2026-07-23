/**
 * About — Editorial bento (Apple Liquid Glass · Light)
 *
 * Bento grid with refined cards: identity (tall), bio (wide),
 * location, languages, interests, socials.
 */

import { getTranslations, getLocale } from 'next-intl/server'
import RevealText from '@/components/RevealText'
import {
  Sparkles,
  Search,
  Zap,
  Palette,
  MapPin,
  Clock,
  Languages,
  Mail,
  ArrowUpRight,
} from 'lucide-react'

const INTERESTS = [
  { key: 'interest_ui_design',   Icon: Sparkles },
  { key: 'interest_ux_research', Icon: Search   },
  { key: 'interest_animations',  Icon: Zap      },
  { key: 'interest_aesthetics',  Icon: Palette  },
] as const

const GithubIcon = (p: { size?: number }) => (
  <svg width={p.size ?? 16} height={p.size ?? 16} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
)
const LinkedinIcon = (p: { size?: number }) => (
  <svg width={p.size ?? 16} height={p.size ?? 16} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)
const TwitterIcon = (p: { size?: number }) => (
  <svg width={p.size ?? 16} height={p.size ?? 16} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const SOCIALS = [
  { label: 'GitHub',   href: '#', Icon: GithubIcon   },
  { label: 'LinkedIn', href: '#', Icon: LinkedinIcon },
  { label: 'Twitter',  href: '#', Icon: TwitterIcon  },
] as const

export default async function About() {
  const t = await getTranslations('about')
  const locale = await getLocale()
  const isAr = locale === 'ar'

  return (
    <section id="about-bio" className="relative z-10 py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">

        <RevealText className="mb-14 max-w-4xl">
          <p className="eyebrow mb-4">{t('tag')}</p>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.92]">
            <span className="text-ink-strong">The Human</span>{' '}
            <br className="hidden md:block" />
            <span className="serif-italic text-gradient">{t('headline').toLowerCase().includes('terminal') ? 'behind the terminal' : t('headline')}</span>
          </h2>
        </RevealText>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-[minmax(140px,auto)]">

          {/* Identity — tall portrait */}
          <RevealText delay={0.05} className="md:row-span-2">
            <div className="relative h-full p-8 rounded-3xl glass-surface flex flex-col items-center justify-center text-center overflow-hidden gap-5 hover:bg-glass-strong transition-all duration-500">
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(60% 60% at 50% 10%, rgba(255,255,255,0.85), transparent 70%)' }}
              />
              <div className="relative">
                <div aria-hidden="true" className="absolute inset-[-14px] rounded-[2rem] border border-dashed border-ink/12 animate-spin-slow" />
                <div className="relative w-28 h-28 rounded-3xl glass-dense flex items-center justify-center text-ink-strong text-4xl font-bold tracking-tighter">
                  YM
                </div>
              </div>
              <div className="relative">
                <p className="text-2xl font-bold text-ink-strong tracking-tighter">
                  Youssef <span className="serif-italic font-normal text-gradient">Mahmoud</span>
                </p>
                <p className="serif-italic text-ink-mid mt-1">Fullstack Engineer</p>
              </div>
              <a
                href="#contact"
                className="relative inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-ink text-canvas text-xs font-semibold tracking-wide hover:-translate-y-0.5 transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(88,120,255,0.45)]"
              >
                Get in touch
                <ArrowUpRight size={13} strokeWidth={2.5} className={isAr ? '-scale-x-100' : ''} />
              </a>
            </div>
          </RevealText>

          {/* Currently — wide quote-style */}
          <RevealText delay={0.1} className="md:col-span-2">
            <div className="relative h-full p-8 rounded-3xl glass-surface hover:bg-glass-strong transition-all duration-500">
              <div className="flex items-center justify-between mb-4">
                <p className="eyebrow">Currently</p>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold glass-light text-ink-strong tracking-widest">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inset-0 rounded-full bg-accent animate-pulse-soft" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  AVAILABLE
                </span>
              </div>
              <p className="text-2xl md:text-3xl text-ink-strong leading-tight tracking-tight font-medium">
                Building <span className="serif-italic font-normal text-gradient">scalable web products</span> for ambitious teams — open to a few new collaborations.
              </p>
            </div>
          </RevealText>

          {/* Location */}
          <RevealText delay={0.15}>
            <div className="h-full p-6 rounded-3xl glass-surface flex flex-col gap-3 hover:bg-glass-strong transition-all duration-500">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl glass-light flex items-center justify-center text-ink-strong">
                  <MapPin size={16} strokeWidth={1.8} />
                </span>
                <p className="eyebrow">Based In</p>
              </div>
              <p className="text-ink-strong text-xl font-semibold tracking-tight">
                Cairo, <span className="serif-italic font-normal text-ink-mid">Egypt</span>
              </p>
              <div className="flex items-center gap-1.5 text-xs text-ink-mid">
                <Clock size={12} strokeWidth={1.8} />
                <span>GMT+2 · Mostly responsive</span>
              </div>
            </div>
          </RevealText>

          {/* Languages */}
          <RevealText delay={0.2}>
            <div className="h-full p-6 rounded-3xl glass-surface flex flex-col gap-3 hover:bg-glass-strong transition-all duration-500">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl glass-light flex items-center justify-center text-ink-strong">
                  <Languages size={16} strokeWidth={1.8} />
                </span>
                <p className="eyebrow">Languages</p>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1">
                <span className="px-3 py-1.5 rounded-full text-xs glass-light text-ink-strong font-semibold">English</span>
                <span className="px-3 py-1.5 rounded-full text-xs glass-light text-ink-strong font-semibold">Arabic</span>
              </div>
            </div>
          </RevealText>

          {/* Socials */}
          <RevealText delay={0.25}>
            <div className="h-full p-6 rounded-3xl glass-surface flex flex-col gap-3 hover:bg-glass-strong transition-all duration-500">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl glass-light flex items-center justify-center text-ink-strong">
                  <Mail size={16} strokeWidth={1.8} />
                </span>
                <p className="eyebrow">Connect</p>
              </div>
              <div className="flex gap-2 mt-1">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl glass-light text-ink-strong hover:bg-glass-strong hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </RevealText>

          {/* Bio — wide */}
          <RevealText delay={0.3} className="md:col-span-2">
            <div className="h-full p-8 rounded-3xl glass-surface hover:bg-glass-strong transition-all duration-500">
              <p className="eyebrow mb-4">The Story</p>
              <p className="text-ink-mid leading-relaxed text-[15px]">
                {t('body')}
              </p>
            </div>
          </RevealText>

          {/* Interests — wide */}
          <RevealText delay={0.35} className="md:col-span-3">
            <div className="h-full p-8 rounded-3xl glass-surface hover:bg-glass-strong transition-all duration-500">
              <p className="eyebrow mb-5">When Not Coding</p>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map(({ key, Icon }) => (
                  <span
                    key={key}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl glass-light text-sm font-semibold text-ink-strong hover:bg-glass-strong transition-all duration-300 cursor-default"
                  >
                    <Icon size={14} strokeWidth={1.8} />
                    {t(key)}
                  </span>
                ))}
              </div>
            </div>
          </RevealText>

        </div>
      </div>
    </section>
  )
}
