'use client'

/**
 * LetterReveal — Per-character stagger animation for hero headings.
 *
 * ARABIC FIX: Arabic script requires that characters remain connected
 * (Unicode bidirectional + ligatures). Splitting into individual
 * <span> elements with display:inline-block destroys ligature rendering.
 *
 * Detection: if the text contains Arabic Unicode codepoints, the
 * component falls back to a whole-word fade+blur reveal instead of
 * letter-by-letter stagger.
 */

import { motion, useReducedMotion, type Variants } from 'framer-motion'

// Arabic Unicode ranges (covering all Arabic blocks)
const ARABIC_RE = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/

interface LetterRevealProps {
  text: string
  className?: string
  delay?: number
}

const container: Variants = {
  hidden: {},
  visible: (d: number) => ({
    transition: { staggerChildren: 0.026, delayChildren: d },
  }),
}

const char: Variants = {
  hidden:  { opacity: 0, filter: 'blur(8px)', y: 10 },
  visible: { opacity: 1, filter: 'blur(0px)', y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

const whole: Variants = {
  hidden:  { opacity: 0, filter: 'blur(8px)' },
  visible: (d: number) => ({
    opacity: 1, filter: 'blur(0px)',
    transition: { duration: 0.65, delay: d, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function LetterReveal({ text, className = '', delay = 0 }: LetterRevealProps) {
  const reduced   = useReducedMotion()
  const hasArabic = ARABIC_RE.test(text)

  // For Arabic OR reduced motion — reveal as one unit to preserve ligatures
  if (hasArabic || reduced) {
    return (
      <motion.span
        aria-label={text}
        variants={whole}
        initial="hidden"
        animate="visible"
        custom={delay}
        // Keep as inline so Arabic bidi algorithm works naturally
        className={`inline ${className}`}
      >
        {text}
      </motion.span>
    )
  }

  // Latin — letter-by-letter stagger
  return (
    <motion.span
      aria-label={text}
      variants={container}
      initial="hidden"
      animate="visible"
      custom={delay}
      className={`inline-block`}
    >
      {text.split('').map((c, i) => (
        <motion.span
          key={i}
          variants={char}
          className={`inline-block ${className}`}
          style={{ whiteSpace: c === ' ' ? 'pre' : undefined }}
        >
          {c === ' ' ? '\u00A0' : c}
        </motion.span>
      ))}
    </motion.span>
  )
}
