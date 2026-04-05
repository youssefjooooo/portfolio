/**
 * TechStack — Server Component
 */

import { getTranslations } from 'next-intl/server'
import InfiniteScroll, { type Technology } from '@/components/InfiniteScroll'

const TECHNOLOGIES: Technology[] = [
  { name: 'Next.js 15'    },
  { name: 'TypeScript'    },
  { name: 'React 19'      },
  { name: 'Encore.ts'     },
  { name: 'Tailwind CSS'  },
  { name: 'Framer Motion' },
  { name: 'Node.js'       },
  { name: 'PostgreSQL'    },
  { name: 'Redis'         },
  { name: 'Docker'        },
  { name: 'Figma'         },
  { name: 'Three.js'      },
  { name: 'Prisma'        },
  { name: 'GraphQL'       },
]

export default async function TechStack() {
  const t = await getTranslations('stack')

  return (
    <section id="stack" className="relative z-10 py-24 overflow-hidden">

      {/* Header */}
      <div className="px-4 md:px-8 lg:px-16 mb-12 max-w-7xl mx-auto">
        <p className="eyebrow mb-3">{t('tag')}</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white/80 tracking-tight leading-tight">
          {t('headline_1')}{' '}
          <span className="text-gradient">{t('headline_2')}</span>
        </h2>
      </div>

      {/* Infinite scroll ticker */}
      <InfiniteScroll technologies={TECHNOLOGIES} />

      {/* Divider */}
      <div className="mt-20 mx-4 md:mx-8 lg:mx-16 border-t border-white/[0.06]" />
    </section>
  )
}
