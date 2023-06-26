import { toPlainText } from '@portabletext/react'
import { SiteMeta } from 'components/global/SiteMeta'
import { getEmploymentBySlug, getHomePageTitle } from 'lib/sanity.client'
import { getPreviewToken } from 'lib/sanity.server.preview'

export default async function EmploymentPageHead({
  params,
}: {
  params: { slug: string }
}) {
  const token = getPreviewToken()

  const [homePageTitle, skill] = await Promise.all([
    getHomePageTitle({ token }),
    getEmploymentBySlug({ slug: params.slug, token }),
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
