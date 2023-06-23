import { toPlainText } from '@portabletext/react'
import { SiteMeta } from 'components/global/SiteMeta'
import { getHomePageTitle, getSkillBySlug } from 'lib/sanity.client'
import { getPreviewToken } from 'lib/sanity.server.preview'

export default async function SkillPageHead({
  params,
}: {
  params: { slug: string }
}) {
  const token = getPreviewToken()

  const [homePageTitle, skill] = await Promise.all([
    getHomePageTitle({ token }),
    getSkillBySlug({ slug: params.slug, token }),
  ])

  return (
    <SiteMeta
      baseTitle={homePageTitle}
      description={skill?.overview ? toPlainText(skill.overview) : ''}
      image={skill?.coverImage}
      title={skill?.title}
    />
  )
}
