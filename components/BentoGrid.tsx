/**
 * BentoGrid — Server Component
 *
 * Static project data lives here; server-renders the grid shell for SEO & LCP.
 * Each <ProjectCard /> is a Client Component that hydrates its hover / 3D logic.
 *
 * Layout:
 *  Desktop (lg):  [featured ×2cols] [regular ×1col]   — row 1
 *                 [card] [card] [card]                  — row 2
 *  Tablet (md):   2-col auto
 *  Mobile:        single-column flex with increased spacing
 */

import ProjectCard, { type ProjectData } from '@/components/ProjectCard'

/* ── Project data ───────────────────────────────── */
const PROJECTS: ProjectData[] = [
  {
    id: '1',
    title: 'Luminary Design System',
    description:
      'A comprehensive design system with 80+ accessible components built for scale. Zero runtime overhead via compile-time CSS-in-JS and Radix primitives.',
    tags: ['React', 'TypeScript', 'Radix UI', 'Storybook', 'Chromatic'],
    category: 'frontend',
    href: '#',
    year: '2024',
  },
  {
    id: '2',
    title: 'Neuroquant API',
    description:
      'Real-time ML inference API serving 50 M predictions/day with sub-2 ms p99 latency, built on Rust + Node.js with gRPC streaming.',
    tags: ['Node.js', 'Rust', 'Redis', 'gRPC', 'Kubernetes'],
    category: 'backend',
    href: '#',
    year: '2024',
  },
  {
    id: '3',
    title: 'Prism Commerce',
    description:
      'Headless e-commerce platform with real-time inventory sync, AI-powered product recommendations, and a sub-second TTFB.',
    tags: ['Next.js', 'Shopify', 'Stripe', 'Prisma', 'Edge Runtime'],
    category: 'fullstack',
    href: '#',
    year: '2023',
  },
  {
    id: '4',
    title: 'Depth WebGL',
    description:
      'Interactive 3D data-visualisation engine for financial analytics. Custom GLSL shaders render 1 M data points at 60 fps.',
    tags: ['Three.js', 'WebGL', 'GLSL', 'D3.js', 'TypeScript'],
    category: 'creative',
    href: '#',
    year: '2023',
  },
  {
    id: '5',
    title: 'Velocity CI/CD',
    description:
      'Zero-config deployment pipeline that cut release cycles from days to minutes via ephemeral preview environments and smart caching.',
    tags: ['GitHub Actions', 'Docker', 'Terraform', 'AWS'],
    category: 'backend',
    href: '#',
    year: '2023',
  },
]

/* ── Component ──────────────────────────────────── */
export default function BentoGrid() {
  return (
    <section id="work" className="relative z-10 px-4 md:px-8 lg:px-16 py-24 max-w-7xl mx-auto">

      {/* Section header */}
      <div className="mb-14">
        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-3">
          Selected Work
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
          Projects that{' '}
          <span className="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
            push boundaries
          </span>
        </h2>
      </div>

      {/*
        Bento grid:
        Mobile  → 1 col flex (space-y-4)
        Tablet  → 2 col grid
        Desktop → 3 col grid with featured spanning 2 cols
      */}
      <div className="
        flex flex-col gap-4
        md:grid md:grid-cols-2
        lg:grid lg:grid-cols-3
        md:auto-rows-fr
      ">
        {/* ── Featured — spans 2 cols on lg ─────────── */}
        <div className="min-h-[280px] lg:col-span-2">
          <ProjectCard project={PROJECTS[0]} />
        </div>

        {/* ── Standard cards ────────────────────────── */}
        <div className="min-h-[280px]">
          <ProjectCard project={PROJECTS[1]} />
        </div>
        <div className="min-h-[240px]">
          <ProjectCard project={PROJECTS[2]} />
        </div>
        <div className="min-h-[240px]">
          <ProjectCard project={PROJECTS[3]} />
        </div>
        <div className="min-h-[240px]">
          <ProjectCard project={PROJECTS[4]} />
        </div>
      </div>
    </section>
  )
}
