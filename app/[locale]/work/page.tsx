import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import ProjectCard, { type ProjectData } from '@/components/ProjectCard'
import ContactSection from '@/components/ContactSection'

type Props = { params: Promise<{ locale: string }> }

export async function generateStaticParams() {
  return ['en', 'ar'].map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('work')
  return { title: t('tag') }
}

export default async function WorkPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('work')

  const PROJECTS: ProjectData[] = [
    { id: '1', title: t('p1_title'), description: t('p1_desc'), tags: t('p1_tags').split(','), category: t('p1_cat') as ProjectData['category'], href: `/${locale}/projects/1`, year: '2024' },
    { id: '2', title: t('p2_title'), description: t('p2_desc'), tags: t('p2_tags').split(','), category: t('p2_cat') as ProjectData['category'], href: `/${locale}/projects/2`, year: '2024' },
    { id: '3', title: t('p3_title'), description: t('p3_desc'), tags: t('p3_tags').split(','), category: t('p3_cat') as ProjectData['category'], href: `/${locale}/projects/3`, year: '2023' },
    { id: '4', title: t('p4_title'), description: t('p4_desc'), tags: t('p4_tags').split(','), category: t('p4_cat') as ProjectData['category'], href: `/${locale}/projects/4`, year: '2023' },
    { id: '5', title: t('p5_title'), description: t('p5_desc'), tags: t('p5_tags').split(','), category: t('p5_cat') as ProjectData['category'], href: `/${locale}/projects/5`, year: '2023' },
  ]

  return (
    <>
      <section className="relative z-10 px-4 md:px-8 lg:px-16 pt-40 pb-24 max-w-7xl mx-auto">
        <div className="mb-16 max-w-4xl">
          <p className="eyebrow mb-4">{t('tag')}</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.92]">
            <span className="text-ink-strong">{t('headline_1')}</span>{' '}
            <span className="serif-italic text-gradient">{t('headline_2')}</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          <div className="md:col-span-2">
            <ProjectCard project={PROJECTS[0]} variant="featured" index={0} />
          </div>
          <ProjectCard project={PROJECTS[1]} variant="standard" index={1} />
          <ProjectCard project={PROJECTS[2]} variant="standard" index={2} />
          <ProjectCard project={PROJECTS[3]} variant="standard" index={3} />
          <ProjectCard project={PROJECTS[4]} variant="standard" index={4} />
        </div>
      </section>

      <ContactSection />
    </>
  )
}
