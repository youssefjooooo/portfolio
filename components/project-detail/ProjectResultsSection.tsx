'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Metric {
  label: string
  value: number
  unit: string
}

interface Props {
  resultsLabel: string
  metrics: Metric[]
}

export default function ProjectResultsSection({ resultsLabel, metrics }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="relative z-10 px-4 md:px-8 lg:px-16 py-16 max-w-7xl mx-auto">
      <motion.p
        className="eyebrow mb-10"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        {resultsLabel}
      </motion.p>

      <motion.div
        ref={ref}
        className="relative rounded-3xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 glass-surface overflow-hidden"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-65 pointer-events-none animate-float-y"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.9), transparent 70%)' }}
        />

        {metrics.map((metric, i) => (
          <div key={i} className="relative space-y-3">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-ink-mid text-sm">{metric.label}</span>
              <span className="text-ink-strong text-2xl font-bold tabular-nums shrink-0 tracking-tight">
                {metric.value}{metric.unit}
              </span>
            </div>

            <div
              className="relative h-2 rounded-full overflow-hidden"
              style={{ background: 'rgba(11,16,32,0.08)' }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #4E7BFF 0%, #8B6BFF 100%)',
                  boxShadow: '0 0 12px rgba(78,123,255,0.45)',
                }}
                initial={{ width: '0%' }}
                animate={{ width: inView ? `${Math.min(metric.value, 100)}%` : '0%' }}
                transition={{
                  duration: 1.3,
                  delay: i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
