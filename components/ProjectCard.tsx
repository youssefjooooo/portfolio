'use client'

/**
 * ProjectCard — Editorial liquid glass card.
 *
 *  · featured  → tall, large title, gradient artwork area
 *  · standard  → compact, title + description + tags
 *
 * Pointer-driven tilt + a refraction spotlight that follows the cursor.
 */

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useState, type MouseEvent } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ArrowLeft } from 'lucide-react'

export type ProjectCategory = 'frontend' | 'backend' | 'fullstack' | 'creative'

export interface ProjectData {
  id: string
  title: string
  description: string
  tags: string[]
  category: ProjectCategory
  href?: string
  year?: string
}

const GRADIENTS: string[] = [
  'linear-gradient(135deg, #DCD7F7 0%, #F7D9E6 50%, #FFE9CC 100%)',
  'linear-gradient(135deg, #CDE3FF 0%, #E9DBFF 60%, #FFD9EC 100%)',
  'linear-gradient(135deg, #FFE2CC 0%, #FFCEDB 50%, #E2C7FF 100%)',
  'linear-gradient(135deg, #D5EBFF 0%, #C9F4E1 100%)',
  'linear-gradient(135deg, #FFE7BF 0%, #FFCDDC 100%)',
]

export default function ProjectCard({
  project,
  variant = 'standard',
  index = 0,
}: {
  project: ProjectData
  variant?: 'featured' | 'standard'
  index?: number
}) {
  const locale = useLocale()
  const isEnglish = locale === 'en'
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useTransform(my, [0, 1], [3.5, -3.5])
  const rotateY = useTransform(mx, [0, 1], [-3.5, 3.5])
  const rxSpring = useSpring(rotateX, { stiffness: 240, damping: 22 })
  const rySpring = useSpring(rotateY, { stiffness: 240, damping: 22 })
  const spotX = useTransform(mx, v => `${v * 100}%`)
  const spotY = useTransform(my, v => `${v * 100}%`)

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top)  / rect.height)
  }
  const onMouseLeave = () => {
    setHovered(false)
    mx.set(0.5); my.set(0.5)
  }

  const gradient = GRADIENTS[index % GRADIENTS.length]
  const isFeatured = variant === 'featured'

  const CardInner = (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX: rxSpring,
        rotateY: rySpring,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      className="h-full"
    >
      <div
        className={`relative h-full rounded-3xl overflow-hidden glass-surface group transition-[background] duration-500 ${
          isFeatured ? 'min-h-[420px]' : 'min-h-[280px]'
        }`}
        style={{ background: hovered ? 'rgba(255,255,255,0.78)' : 'rgba(255,255,255,0.55)' }}
      >
        {/* Cursor spotlight */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(280px circle at ${spotX.get()} ${spotY.get()}, rgba(91,126,255,0.18) 0%, transparent 60%)`,
          }}
        />

        <div
          className={`relative z-10 h-full flex ${isFeatured ? 'flex-col md:flex-row items-stretch' : 'flex-col'}`}
          style={{ transform: 'translateZ(20px)' }}
        >
          {/* Artwork swatch */}
          <div
            className={`relative overflow-hidden ${
              isFeatured
                ? 'h-56 md:h-auto md:w-[46%] m-4 rounded-2xl'
                : 'h-32 m-3 rounded-2xl'
            }`}
            style={{ background: gradient }}
          >
            {/* Inner glass highlight */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, transparent 35%, transparent 65%, rgba(255,255,255,0.25) 100%)' }}
            />
            {/* Floating noise grain */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none opacity-50 mix-blend-soft-light"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
              }}
            />
            {/* Big serif index */}
            <span
              className={`absolute ${isFeatured ? 'bottom-4 right-5 text-7xl md:text-8xl' : 'bottom-2 right-3 text-5xl'} serif-italic text-ink-strong leading-none select-none`}
              style={{ opacity: 0.42 }}
            >
              {String(parseInt(project.id, 10)).padStart(2, '0')}
            </span>
          </div>

          {/* Body */}
          <div className={`flex-1 flex flex-col ${isFeatured ? 'p-7 md:p-9' : 'px-6 pb-6 pt-2'}`}>
            <div className="flex items-center gap-3 mb-3">
              <span className="eyebrow">{project.category}</span>
              {project.year && (
                <>
                  <span className="text-ink-faint">·</span>
                  <span className="eyebrow">{project.year}</span>
                </>
              )}
            </div>

            <h3
              className={`font-bold tracking-tighter text-ink-strong leading-tight mb-3 ${
                isFeatured ? 'text-3xl md:text-5xl' : 'text-xl md:text-2xl'
              }`}
            >
              {isFeatured ? (
                <>
                  {project.title.split(' ').slice(0, -1).join(' ')}{' '}
                  <span className="serif-italic font-normal text-gradient">
                    {project.title.split(' ').slice(-1)}
                  </span>
                </>
              ) : (
                project.title
              )}
            </h3>

            <p className={`text-ink-mid leading-relaxed flex-1 ${isFeatured ? 'text-base max-w-xl' : 'text-sm'}`}>
              {project.description}
            </p>

            <div className="flex items-end justify-between mt-5 gap-4 flex-wrap">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.slice(0, isFeatured ? 5 : 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full text-[11px] glass-light text-ink-strong font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.href && (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-strong shrink-0">
                  <span className="link-underline">View project</span>
                  <ArrowLeft
                    size={13}
                    className={`${isEnglish ? 'rotate-180' : ''} transition-transform duration-300 ${
                      hovered ? (isEnglish ? 'translate-x-0.5' : '-translate-x-0.5') : ''
                    }`}
                  />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )

  return project.href ? <Link href={project.href} className="block h-full">{CardInner}</Link> : CardInner
}
