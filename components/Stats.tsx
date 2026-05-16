'use client'

/**
 * Stats — Editorial data display.
 * One large glass panel divided into 4 vertical slices.
 * Numbers count up; subtle separators between cells.
 */

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'

function useCountUp(target: number, duration = 1400, active: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active || target === 0) return
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setCount(Math.round(eased * target))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target, duration])

  return count
}

interface StatCellProps {
  value: string
  label: string
  index: number
  active: boolean
  isLast: boolean
}

function StatCell({ value, label, index, active, isLast }: StatCellProps) {
  const numeric = parseInt(value.replace(/\D/g, ''), 10) || 0
  const suffix  = value.replace(/[0-9]/g, '')
  const count   = useCountUp(numeric, 1400, active)
  const display = active && numeric > 0 ? `${count}${suffix}` : value

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
      animate={active ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex flex-col items-center gap-2 py-10 px-4 text-center ${
        !isLast ? 'md:border-r md:border-ink/8' : ''
      }`}
    >
      <span className="text-5xl md:text-6xl font-bold tracking-tighter tabular-nums text-ink-strong leading-none">
        {display}
      </span>
      <span className="serif-italic text-sm text-ink-mid mt-1">{label}</span>
    </motion.div>
  )
}

export default function Stats() {
  const t     = useTranslations('stats')
  const ref   = useRef<HTMLDivElement>(null)
  const inView= useInView(ref, { once: true, margin: '-80px' })

  const items = [
    { value: t('v1'), label: t('l1') },
    { value: t('v2'), label: t('l2') },
    { value: t('v3'), label: t('l3') },
    { value: t('v4'), label: t('l4') },
  ]

  return (
    <section className="relative z-10 px-4 md:px-8 lg:px-16 py-16 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glass-surface rounded-3xl grid grid-cols-2 md:grid-cols-4 overflow-hidden"
      >
        {items.map((item, i) => (
          <StatCell key={i} value={item.value} label={item.label} index={i} active={inView} isLast={i === items.length - 1} />
        ))}
      </motion.div>
    </section>
  )
}
