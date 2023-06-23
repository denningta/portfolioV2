'use client'

import type { PortableTextBlock } from '@portabletext/types'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import ImageBox from 'components/shared/ImageBox'
import Link from 'next/link'
import { useState } from 'react'
import type { SkillPayload } from 'types'

interface SkillProps {
  skill: SkillPayload
}

export function SkillListItem(props: SkillProps) {
  const { skill } = props
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
      <Link href={`/skills/${skill.slug?.current}`} className='p-2'>
        <div className={`relative w-full filter-none ${hover ? 'opacity-100' : 'opacity-60'} transition ease-in-out`}>
          <ImageBox
            image={skill.coverImage}
            alt={`Cover image from ${skill.title}`}
            classesWrapper="relative aspect-[16/9]"
          />
        </div>
        <div className="flex">
          <TextBox skill={skill} />
        </div>
      </Link>
    </div>
  )
}

function TextBox({ skill }: { skill: SkillPayload }) {
  return (
    <div className="relative mt-2 flex w-full flex-col justify-between p-3">
      <div>

        {/* Title */}
        <div className="mb-1 text-xl font-extrabold tracking-tight md:text-2xl hover:text-blue-500">
          {skill.title}
        </div>

        {/* Years Experience */}
        {skill.years &&
          <div className='mb-2 text-sm text-gray-400'>
            {skill.years} year{skill.years > 1 && 's'} experience
          </div>
        }

        {/* Overview  */}
        <div className="text-gray-500 dark:text-gray-200">
          <CustomPortableText value={skill.overview as PortableTextBlock[]} />
        </div>
      </div>
    </div>
  )
}
