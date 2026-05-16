import RevealText from '@/components/RevealText'

interface StackItem {
  tech: string
  explanation: string
}

interface Props {
  stackLabel: string
  items: StackItem[]
}

export default function ProjectStackSection({ stackLabel, items }: Props) {
  return (
    <section className="relative z-10 px-4 md:px-8 lg:px-16 py-12 max-w-7xl mx-auto">
      <RevealText y={16}>
        <p className="eyebrow mb-8">{stackLabel}</p>
      </RevealText>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map(({ tech, explanation }, i) => (
          <RevealText key={tech} delay={0.05 + i * 0.07} y={20} noBlur>
            <div className="rounded-2xl p-5 h-full glass-surface hover:bg-[rgba(255,255,255,0.78)] transition-all duration-500 hover:-translate-y-0.5">
              <span className="inline-block px-2.5 py-1 glass-pill text-[11px] font-bold text-ink-strong mb-3">
                {tech}
              </span>
              <p className="text-ink-mid text-sm leading-relaxed">{explanation}</p>
            </div>
          </RevealText>
        ))}
      </div>
    </section>
  )
}
