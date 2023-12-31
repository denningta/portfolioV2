import { CustomPortableText } from 'components/shared/CustomPortableText'
import { Header } from 'components/shared/Header'
import ImageBox from 'components/shared/ImageBox'
import ScrollUp from 'components/shared/ScrollUp'
import Skill from 'components/shared/Skills'
import Link from 'next/link'
import type { ProjectPayload } from 'types'

function removeHttps(url: string) {
  return url.replace(/^\/\/|^.*?:(\/\/)?/, '')
}

export function ProjectPage({ data }: { data: ProjectPayload }) {
  // Default to an empty object to allow previews on non-existent documents
  const {
    client,
    coverImage,
    description,
    duration,
    overview,
    site,
    repository,
    title,
    references
  } = data || {}

  const startYear = new Date(duration?.start!).getFullYear()
  const endYear = duration?.end ? new Date(duration?.end).getFullYear() : 'Now'

  return (
    <div>
      <div className="mb-20">
        {/* Header */}
        <Header title={title} description={overview} />

        <div className="my-12 rounded-md border bg-white drop-shadow-lg dark:bg-neutral-800 dark:border-neutral-700">
          {/* Image  */}
          <ImageBox
            image={coverImage}
            alt={`Cover image for ${title}`}
            classesWrapper="relative aspect-[16/9]"
          />

          <div
            className="
              divide-inherit 
              flex flex-col
              divide-y
              dark:bg-neutral-800 dark:divide-neutral-700 
              rounded-md
            "
          >
            {/* Duration */}
            {!!(startYear && endYear) && (
              <div className="p-3 lg:p-4">
                <div className="text-xs md:text-sm">Duration</div>
                <div className="text-md md:text-lg">{`${startYear} -  ${endYear}`}</div>
              </div>
            )}

            {/* Client */}
            {client && (
              <div className="p-3 lg:p-4">
                <div className="text-xs md:text-sm">Client</div>
                <div className="text-md md:text-lg">{client}</div>
              </div>
            )}

            {/* Site */}
            {site && (
              <div className="p-3 lg:p-4">
                <div className="text-xs md:text-sm">Site</div>
                {site && (
                  <Link
                    target="_blank"
                    className="text-md break-words md:text-lg"
                    href={site}
                  >
                    {removeHttps(site)}
                  </Link>
                )}
              </div>
            )}

            {/* Repository */}
            {repository &&
              <div className="p-3 lg:p-4">
                <div className="text-xs md:text-sm">Repository</div>
                {repository && (
                  <Link
                    target="_blank"
                    className="text-md break-words md:text-lg"
                    href={repository}
                  >
                    {removeHttps(repository)}
                  </Link>
                )}
              </div>
            }

            {/* Tags */}
            <div className="grow p-3 lg:p-4">
              <div className="text-xs md:text-sm">Skills</div>
              <div className="text-md flex flex-row flex-wrap md:text-lg gap-2">
                {references?.map((ref, key) => {
                  return <Skill skill={ref.skill} key={key} />
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {description && (
          <CustomPortableText
            paragraphClasses="text-xl text-gray-900 dark:text-neutral-100 tracking-normal leading-loose"
            value={description}
          />
        )}
        {/* Workaround: scroll to top on route change */}
        <ScrollUp />
      </div>
      <div className="absolute left-0 w-screen border-t dark:border-neutral-800" />
    </div>
  )
}
