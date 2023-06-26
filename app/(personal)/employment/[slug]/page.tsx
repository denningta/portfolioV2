import { EmploymentPage } from 'components/pages/employment/EmploymentPage'
import { ProjectPreview } from 'components/pages/project/ProjectPreview'
import { PreviewSuspense } from 'components/preview/PreviewSuspense'
import { PreviewWrapper } from 'components/preview/PreviewWrapper'
import { getEmploymentBySlug } from 'lib/sanity.client'
import { getPreviewToken } from 'lib/sanity.server.preview'
import { notFound } from 'next/navigation'

export default async function EmploymentSlugRoute({
  params,
}: {
  params: { slug: string }
}) {
  const token = getPreviewToken()
  const data = await getEmploymentBySlug({ slug: params.slug })

  if (!data && !token) {
    notFound()
  }

  return (
    <>
      {token ? (
        <PreviewSuspense
          fallback={
            <PreviewWrapper>
              <EmploymentPage data={data!} />
            </PreviewWrapper>
          }
        >
          <ProjectPreview token={token} slug={params.slug} />
        </PreviewSuspense>
      ) : (
        <EmploymentPage data={data!} />
      )}
    </>
  )
}
