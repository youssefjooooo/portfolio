'use client'

/**
 * RevealText — Scroll-triggered reveal.
 *
 * Fires when the element enters the viewport (useInView), not on mount.
 * This creates the claude.com-style "content materialises as you scroll" effect.
 */

import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

interface RevealTextProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  /** Disable blur — useful when the element has complex children */
  noBlur?: boolean
}

export default function RevealText({
  children,
  className = '',
  delay = 0,
  y = 22,
  noBlur = false,
}: RevealTextProps) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, ...(noBlur ? {} : { filter: 'blur(6px)' }) }}
      animate={inView
        ? { opacity: 1, y: 0, ...(noBlur ? {} : { filter: 'blur(0px)' }) }
        : {}
      }
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
