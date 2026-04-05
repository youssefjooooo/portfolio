'use client'

/**
 * Stats — Client Component
 *
 * Four animated stat cards. Numbers count-up from 0 when the section
 * enters the viewport (IntersectionObserver + rAF).
 * Triggers once only (once: true).
 */

import { useEffect, useRef, useState } from 'react'
import { motion, useInView }           from 'framer-motion'
import { useTranslations }             from 'next-intl'

function useCountUp(target: number, duration = 1200, active: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active || target === 0) return
    const start = performance.now()
    const raf = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [active, target, duration])

  return count
}

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
}

interface StatCardProps {
  value: string
  label: string
  index: number
  active: boolean
}

function StatCard({ value, label, index, active }: StatCardProps) {
  const numeric = parseInt(value.replace(/\D/g, ''), 10) || 0
  const suffix  = value.replace(/[0-9]/g, '')
  const count   = useCountUp(numeric, 1400, active)

  const displayValue = active && numeric > 0 ? `${count}${suffix}` : value

  return (
    <motion.div
      custom={index}
      variants={CARD_VARIANTS}
      className="flex flex-col items-center gap-2 px-8 py-8 rounded-2xl glass-surface text-center group hover:glass-dense transition-all duration-300"
    >
      <span className="text-4xl md:text-5xl font-bold tracking-tighter tabular-nums text-white">
        {displayValue}
      </span>
      <span className="text-sm text-white/35 font-medium leading-tight">{label}</span>
      <div className="w-8 h-px rounded-full mt-1 bg-white/15 group-hover:bg-white/30 transition-colors duration-300" />
    </motion.div>
  )
}

export default function Stats() {
  const t       = useTranslations('stats')
  const ref     = useRef<HTMLDivElement>(null)
  const inView  = useInView(ref, { once: true, margin: '-80px' })

  const items = [
    { value: t('v1'), label: t('l1') },
    { value: t('v2'), label: t('l2') },
    { value: t('v3'), label: t('l3') },
    { value: t('v4'), label: t('l4') },
  ]

  return (
    <section ref={ref} className="relative z-10 px-4 md:px-8 lg:px-16 py-16 max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {items.map((item, i) => (
          <StatCard key={i} value={item.value} label={item.label} index={i} active={inView} />
        ))}
      </motion.div>
    </section>
  )
}
