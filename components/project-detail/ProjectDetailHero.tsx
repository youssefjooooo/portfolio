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
    <section className="relative z-10 px-4 md:px-8 lg:px-16 pt-36 pb-20 max-w-7xl mx-auto overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 left-1/4 w-[50vw] h-[35vw] rounded-full opacity-65 blur-3xl animate-[float-y_8s_ease-in-out_infinite]"
          style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.95), transparent 70%)" }}
        />
      </div>

      <RevealText delay={0} y={12}>
        <Link
          href={`/${locale}#work`}
          className="inline-flex items-center gap-2 px-4 py-2 glass-pill text-sm text-ink-mid hover:text-ink-strong transition-colors duration-300 mb-14 group"
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

      <RevealText delay={0.05} y={16}>
        <p className="eyebrow mb-5">{category} · {year}</p>
      </RevealText>

      <RevealText delay={0.12} y={24}>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.92] mb-8 max-w-4xl">
          {(() => {
            const words = title.split(' ')
            const last = words.pop() ?? ''
            return (
              <>
                <span className="text-ink-strong">{words.join(' ')}</span>{' '}
                <span className="serif-italic font-normal text-gradient">{last}</span>
              </>
            )
          })()}
        </h1>
      </RevealText>

      <RevealText delay={0.2} y={18}>
        <p className="text-ink-mid text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
          {description}
        </p>
      </RevealText>

      <RevealText delay={0.28} y={14} noBlur>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3.5 py-1.5 glass-pill text-xs font-semibold text-ink-mid"
            >
              {tag}
            </span>
          ))}
        </div>
      </RevealText>
    </section>
  )
}
