import RevealText from '@/components/RevealText'

interface Props {
  overviewLabel: string
  challengeLabel: string
  featuresLabel: string
  overview: string
  problem: string
  features: string[]
}

export default function ProjectFeaturesSection({
  overviewLabel,
  challengeLabel,
  featuresLabel,
  overview,
  problem,
  features,
}: Props) {
  return (
    <section className="relative z-10 px-4 md:px-8 lg:px-16 py-16 max-w-7xl mx-auto">
      <RevealText y={28} noBlur>
        <div className="relative rounded-3xl p-8 md:p-12 glass-surface overflow-hidden">
          {/* corner highlight */}
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-60 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.9), transparent 70%)' }}
          />
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Overview + Challenge */}
            <div>
              <RevealText delay={0.05}>
                <p className="eyebrow mb-5">{overviewLabel}</p>
                <p className="text-ink-mid text-base leading-relaxed mb-6">{overview}</p>
              </RevealText>
              <RevealText delay={0.12}>
                <p className="eyebrow mb-3">{challengeLabel}</p>
                <p className="text-ink-mid text-base leading-relaxed">{problem}</p>
              </RevealText>
            </div>

            {/* Key Features */}
            <div>
              <RevealText delay={0.1}>
                <p className="eyebrow mb-5">{featuresLabel}</p>
              </RevealText>
              <ul className="space-y-3">
                {features.map((feature, i) => (
                  <RevealText key={i} delay={0.15 + i * 0.07} y={14}>
                    <li className="flex items-start gap-3 p-3 rounded-2xl glass-light hover:bg-white/85 transition-all duration-300">
                      <span className="mt-0.5 text-accent text-sm shrink-0">◆</span>
                      <span className="text-ink-strong text-sm leading-relaxed">{feature}</span>
                    </li>
                  </RevealText>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </RevealText>
    </section>
  )
}
