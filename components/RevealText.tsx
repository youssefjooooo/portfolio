'use client'

/**
 * RevealText
 *
 * Block-level reveal: the whole element fades in from blur(10px) to blur(0).
 * Use for paragraphs, sub-headings, and CTA groups.
 * For letter-by-letter stagger on headings, use <LetterReveal />.
 */

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealTextProps {
  children: ReactNode
  className?: string
  /** Seconds before the animation starts */
  delay?: number
}

export default function RevealText({ children, className = '', delay = 0 }: RevealTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)', y: 16 }}
      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.16, 1, 0.3, 1], // custom spring-like ease
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
