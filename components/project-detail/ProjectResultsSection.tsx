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
        className="rounded-2xl p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        style={{
          backgroundColor: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      >
        {metrics.map((metric, i) => (
          <div key={i} className="space-y-3">
            {/* Label + Value row */}
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-white/40 text-sm">{metric.label}</span>
              <span className="text-white/80 text-xl font-bold tabular-nums shrink-0">
                {metric.value}{metric.unit}
              </span>
            </div>

            {/* Bar track */}
            <div
              className="relative h-1.5 rounded-full overflow-hidden"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ backgroundColor: 'rgba(255,255,255,0.28)' }}
                initial={{ width: '0%' }}
                animate={{ width: inView ? `${Math.min(metric.value, 100)}%` : '0%' }}
                transition={{
                  duration: 1.2,
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
