'use client'

import { usePreview } from 'lib/sanity.preview'
import { skillBySlugQuery } from 'lib/sanity.queries'

import { SkillPage } from './SkillPage'
import { SkillPayload } from 'types'

export function ProjectPreview({
  token,
  slug,
}: {
  token: null | string
  slug: string
}) {
  const project: SkillPayload = usePreview(token, skillBySlugQuery, {
    slug: slug,
  })

  return <SkillPage data={project} />
}
