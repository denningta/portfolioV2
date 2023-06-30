'use client'

import type { PortableTextBlock } from '@portabletext/types'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import ImageBox from 'components/shared/ImageBox'
import Skill from 'components/shared/Skills'
import Link from 'next/link'
import { useState } from 'react'
import type { ProjectPayload } from 'types'

interface ProjectProps {
  project: ProjectPayload
}

export function ProjectListItem(props: ProjectProps) {
  const { project } = props
  const [hover, setHover] = useState(false)

  const handleMouseEnter = () => {
    setHover(true)
  }

  const handleMouseLeave = () => {
    setHover(false)
  }


  return (
    <div
      className={`flex flex-col w-full border bg-white drop-shadow-lg dark:filter-none dark:border-neutral-700 rounded overflow-hidden gap-x-5 transition dark:bg-neutral-800`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/projects/${project.slug.current}`} className='p-2'>
        <div className={`relative w-full filter-none ${hover ? 'opacity-100' : 'sm:opacity-60 opacity-100'} transition ease-in-out`}>
          <ImageBox
            image={project.coverImage}
            alt={`Cover image from ${project.title}`}
            classesWrapper="relative aspect-[16/9]"
          />
        </div>
        <div className="flex">
          <TextBox project={project} />
        </div>
      </Link>
    </div>
  )
}

function TextBox({ project }: { project: ProjectPayload }) {

  return (
    <div className="relative mt-2 flex w-full flex-col justify-between p-3">
      <div>

        {/* Title */}
        <div className="mb-1 text-xl font-extrabold tracking-tight md:text-2xl hover:text-blue-500">
          {project.title}
        </div>

        {/* Overview  */}
        <div className="text-gray-500 dark:text-gray-200">
          <CustomPortableText value={project.overview as PortableTextBlock[]} />
        </div>
      </div>

      {/* Skills */}
      <div className='mt-4 flex flex-wrap gap-x-2 gap-y-2'>
        {project.references && project.references.map((ref, key) => {
          return (
            <Skill skill={ref.skill} key={key} />
          )
        }
        )}
      </div>

    </div>
  )
}
