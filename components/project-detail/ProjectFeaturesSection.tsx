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
        <div
          className="rounded-2xl p-8 md:p-10"
          style={{
            backgroundColor: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Overview + Challenge */}
            <div>
              <RevealText delay={0.05}>
                <p className="eyebrow mb-5">{overviewLabel}</p>
                <p className="text-white/55 text-sm leading-relaxed mb-6">{overview}</p>
              </RevealText>
              <RevealText delay={0.12}>
                <p className="eyebrow mb-3" style={{ color: 'rgba(255,255,255,0.15)' }}>
                  {challengeLabel}
                </p>
                <p className="text-white/40 text-sm leading-relaxed">{problem}</p>
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
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 text-white/20 text-xs shrink-0">◆</span>
                      <span className="text-white/65 text-sm leading-relaxed">{feature}</span>
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
