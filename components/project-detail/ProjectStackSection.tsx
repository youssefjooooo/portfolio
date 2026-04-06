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
    <section className="relative z-10 px-4 md:px-8 lg:px-16 py-8 max-w-7xl mx-auto">
      <RevealText y={16}>
        <p className="eyebrow mb-8">{stackLabel}</p>
      </RevealText>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map(({ tech, explanation }, i) => (
          <RevealText key={tech} delay={0.05 + i * 0.07} y={20} noBlur>
            <div
              className="rounded-xl p-5 h-full"
              style={{
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <span
                className="inline-block px-2.5 py-1 rounded-lg text-[11px] mb-3"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  color: 'rgba(255,255,255,0.55)',
                }}
              >
                {tech}
              </span>
              <p className="text-white/35 text-sm leading-relaxed">{explanation}</p>
            </div>
          </RevealText>
        ))}
      </div>
    </section>
  )
}
