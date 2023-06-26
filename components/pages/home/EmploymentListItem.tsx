'use client'

import type { PortableTextBlock } from '@portabletext/types'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import ImageBox from 'components/shared/ImageBox'
import Link from 'next/link'
import { useState } from 'react'
import type { EmploymentPayload } from 'types'

interface EmploymentProps {
  employment: EmploymentPayload
}

export function EmploymentListItem(props: EmploymentProps) {
  const { employment } = props
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
      <Link href={`/employment/${employment.slug?.current}`} className='p-2'>
        <div className={`relative w-full filter-none ${hover ? 'opacity-100' : 'sm:opacity-60 opacity-100'} transition ease-in-out`}>
          <ImageBox
            image={employment.coverImage}
            alt={`Cover image from ${employment.title}`}
            classesWrapper="relative aspect-[16/9]"
          />
        </div>
        <div className="flex">
          <TextBox employment={employment} />
        </div>
      </Link>
    </div>
  )
}

function TextBox({ employment }: { employment: EmploymentPayload }) {
  return (
    <div className="relative mt-2 flex w-full flex-col justify-between p-3">
      <div>

        {/* Title */}
        <div className="mb-1 text-xl font-extrabold tracking-tight md:text-2xl hover:text-blue-500">
          {employment.title}
        </div>

        {/* Duration */}
        {employment.start && employment.end &&
          <div className='flex p-3 lg:p-4 space-x-2'>
            <div>
              {new Date(employment.start).toLocaleDateString('en-US', {
                year: 'numeric',
              })}
            </div>

            <div>-</div>

            <div>
              {new Date(employment.end).toLocaleDateString('en-US', {
                year: 'numeric',
              })}
            </div>
          </div>
        }

        {/* Years Experience */}
        {employment.years &&
          <div className='mb-2 text-sm text-gray-400'>
            {employment.years} year{employment.years > 1 && 's'} experience
          </div>
        }

        {/* Overview  */}
        <div className="text-gray-500 dark:text-gray-200">
          <CustomPortableText value={employment.overview as PortableTextBlock[]} />
        </div>
      </div>
    </div>
  )
}
