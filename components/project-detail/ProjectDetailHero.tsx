import Link from 'next/link'
import RevealText from '@/components/RevealText'
import { ArrowLeft } from 'lucide-react'

interface Props {
  locale: string
  backLabel: string
  title: string
  description: string
  category: string
  year: string
  tags: string[]
}

export default function ProjectDetailHero({
  locale,
  backLabel,
  title,
  description,
  category,
  year,
  tags,
}: Props) {
  const isEnglish = locale === 'en'

  return (
    <section className="relative z-10 px-4 md:px-8 lg:px-16 pt-28 pb-20 max-w-7xl mx-auto">
      {/* Back button — sits just below the fixed navbar */}
      <RevealText delay={0} y={12}>
        <Link
          href={`/${locale}#work`}
          className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white/60 transition-colors duration-200 mb-12 group"
        >
          <ArrowLeft
            size={14}
            className={`transition-transform duration-200 ${
              isEnglish
                ? 'group-hover:-translate-x-0.5'
                : 'rotate-180 group-hover:translate-x-0.5'
            }`}
          />
          {backLabel}
        </Link>
      </RevealText>

      {/* Eyebrow */}
      <RevealText delay={0.05} y={16}>
        <p className="eyebrow mb-4">{category} · {year}</p>
      </RevealText>

      {/* Title */}
      <RevealText delay={0.12} y={24}>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6 max-w-3xl">
          <span className="text-gradient">{title}</span>
        </h1>
      </RevealText>

      {/* Description */}
      <RevealText delay={0.2} y={18}>
        <p className="text-white/50 text-lg leading-relaxed max-w-2xl mb-8">
          {description}
        </p>
      </RevealText>

      {/* Tags */}
      <RevealText delay={0.28} y={14} noBlur>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-lg text-xs"
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.09)',
                color: 'rgba(255,255,255,0.35)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </RevealText>
    </section>
  )
}
