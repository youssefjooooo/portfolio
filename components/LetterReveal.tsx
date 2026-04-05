'use client'

/**
 * LetterReveal
 *
 * Letter-by-letter stagger animation: each character fades from
 * blur(10px) → blur(0) with a subtle upward translate.
 *
 * Used for hero headings to create a typographic "materialise" effect.
 * Respects prefers-reduced-motion by collapsing to a single fade.
 */

import { motion, useReducedMotion, type Variants } from 'framer-motion'

interface LetterRevealProps {
  /** Plain string — gets split into individual characters */
  text: string
  className?: string
  /** Delay before the stagger starts (seconds) */
  delay?: number
}

const containerVariants: Variants = {
  hidden: {},
  visible: (delayChildren: number) => ({
    transition: {
      staggerChildren: 0.028,
      delayChildren,
    },
  }),
}

const charVariants: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)', y: 12 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
}

const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

export default function LetterReveal({ text, className = '', delay = 0 }: LetterRevealProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return (
      <motion.span
        variants={reducedVariants}
        initial="hidden"
        animate="visible"
        className={className}
      >
        {text}
      </motion.span>
    )
  }

  return (
    // aria-label ensures screen readers announce the full word, not individual letters
    <motion.span
      aria-label={text}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      custom={delay}
      className={`inline-block ${className}`}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          variants={charVariants}
          className="inline-block"
          // Non-breaking space keeps word spacing
          style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}
