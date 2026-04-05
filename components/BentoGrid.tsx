/**
 * BentoGrid — Server Component
 *
 * Static project data with getTranslations for localised content.
 * Each <ProjectCard /> is a Client Component that hydrates hover / 3D.
 */

import { getTranslations } from 'next-intl/server'
import ProjectCard, { type ProjectData } from '@/components/ProjectCard'

export default async function BentoGrid() {
  const t = await getTranslations('work')

  const PROJECTS: ProjectData[] = [
    {
      id: '1',
      title:       t('p1_title'),
      description: t('p1_desc'),
      tags:        t('p1_tags').split(','),
      category:    t('p1_cat') as ProjectData['category'],
      href: '#',
      year: '2024',
    },
    {
      id: '2',
      title:       t('p2_title'),
      description: t('p2_desc'),
      tags:        t('p2_tags').split(','),
      category:    t('p2_cat') as ProjectData['category'],
      href: '#',
      year: '2024',
    },
    {
      id: '3',
      title:       t('p3_title'),
      description: t('p3_desc'),
      tags:        t('p3_tags').split(','),
      category:    t('p3_cat') as ProjectData['category'],
      href: '#',
      year: '2023',
    },
    {
      id: '4',
      title:       t('p4_title'),
      description: t('p4_desc'),
      tags:        t('p4_tags').split(','),
      category:    t('p4_cat') as ProjectData['category'],
      href: '#',
      year: '2023',
    },
    {
      id: '5',
      title:       t('p5_title'),
      description: t('p5_desc'),
      tags:        t('p5_tags').split(','),
      category:    t('p5_cat') as ProjectData['category'],
      href: '#',
      year: '2023',
    },
  ]

  return (
    <section id="work" className="relative z-10 px-4 md:px-8 lg:px-16 py-24 max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-14">
        <p className="eyebrow mb-3">{t('tag')}</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white/80 tracking-tight leading-tight">
          {t('headline_1')}{' '}
          <span className="text-gradient">{t('headline_2')}</span>
        </h2>
      </div>

      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:auto-rows-fr">
        <div className="min-h-[290px] lg:col-span-2">
          <ProjectCard project={PROJECTS[0]} />
        </div>
        <div className="min-h-[290px]">
          <ProjectCard project={PROJECTS[1]} />
        </div>
        <div className="min-h-[250px]">
          <ProjectCard project={PROJECTS[2]} />
        </div>
        <div className="min-h-[250px]">
          <ProjectCard project={PROJECTS[3]} />
        </div>
        <div className="min-h-[250px]">
          <ProjectCard project={PROJECTS[4]} />
        </div>
      </div>
    </section>
  )
}
