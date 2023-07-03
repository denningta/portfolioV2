'use client'

import { CustomPortableText } from 'components/shared/CustomPortableText'
import { Header } from 'components/shared/Header'
import ImageBox from 'components/shared/ImageBox'
import ScrollUp from 'components/shared/ScrollUp'
import type { EmploymentPayload } from 'types'
import { ProjectListItem } from '../home/ProjectListItem'

export function EmploymentPage({ data }: { data: EmploymentPayload }) {
  // Default to an empty object to allow previews on non-existent documents
  const {
    coverImage,
    description,
    overview,
    title,
    years,
    projects,
    start,
    end
  } = data || {}


  return (
    <div>
      <div className="mb-20">
        {/* Header */}
        <Header title={title} description={overview} centered />

        <div className="my-12 rounded-md overflow-hidden border bg-white drop-shadow-lg dark:bg-neutral-800 dark:border-neutral-700">
          {/* Image  */}
          <ImageBox
            image={coverImage}
            alt={`Cover image for ${title}`}
            classesWrapper="relative aspect-[16/9]"
          />

          <div
            className="
              divide-inherit 
              flex flex-col md:flex-row
              divide-y 
              lg:divide-x lg:divide-y-0
              dark:bg-neutral-800 dark:divide-neutral-700 
              rounded-md
            "
          >

            {start && end &&
              <div className='flex p-3 lg:p-4 space-x-2'>
                <div>
                  {new Date(start).toLocaleDateString('en-US', {
                    year: 'numeric',
                  })}
                </div>

                <div>-</div>

                <div>
                  {new Date(end).toLocaleDateString('en-US', {
                    year: 'numeric',
                  })}
                </div>
              </div>
            }

            {/* Years Experience */}
            {years &&
              <div className='p-3 lg:p-4'>
                {years} year{years > 1 && 's'} experience
              </div>
            }

          </div>
        </div>

        {/* Description */}
        {description && (
          <CustomPortableText
            paragraphClasses="text-xl text-gray-900 dark:text-neutral-100 tracking-normal leading-loose"
            value={description}
          />
        )}


        {/* Project List*/}
        <div className='my-12'>
          <div className='mb-6 text-3xl font-bold'>
            Projects
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            {projects && projects.map((project, key) => {
              return <ProjectListItem project={project} key={key} />
            })


            }
          </div>
        </div>


        {/* Workaround: scroll to top on route change */}
        <ScrollUp />
      </div>
      <div className="absolute left-0 w-screen border-t dark:border-neutral-800" />
    </div>
  )
}
