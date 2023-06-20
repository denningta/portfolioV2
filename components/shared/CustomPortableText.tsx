import { PortableText, PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import ImageBox from 'components/shared/ImageBox'
import { TimelineSection } from 'components/shared/TimelineSection'
import { Image } from 'sanity'
import InlineImage from './InlineImage'

export function CustomPortableText({
  paragraphClasses,
  value,
}: {
  paragraphClasses?: string
  value: PortableTextBlock[]
}) {

  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return <p className={`${paragraphClasses}`}>{children}</p>
      },
      h1: ({ children }) => {
        return <div className='text-3xl font-extrabold'>{children}</div>
      },
      h2: ({ children }) => {
        return <div className='text-3xl font-extrabold'>{children}</div>
      },
      h3: ({ children }) => {
        return <div className='text-3xl font-extrabold'>{children}</div>
      },
    },
    list: {
      bullet: ({ children }) => {
        return <ul className={`${paragraphClasses} space-y-3 mt-3`}>{children}</ul>
      }
    },
    listItem: {
      bullet: ({ children }) => <li className='' style={{ listStyleType: 'disclosure-closed' }}>{children}</li>

    },
    marks: {
      link: ({ children, value }) => {
        return (
          <a
            className="underline transition hover:opacity-50"
            href={value?.href}
            rel="noreferrer noopener"
          >
            {children}
          </a>
        )
      },
    },
    types: {
      image: ({
        value,
      }: {
        value: Image & { alt?: string; caption?: string }
      }) => {
        return (
          <div className="my-6 space-y-2">
            <InlineImage image={value} />
            {value?.caption && (
              <div className="font-sans text-sm text-gray-600">
                {value.caption}
              </div>
            )}
          </div>
        )
      },
      timeline: ({ value }) => {
        const { items } = value || {}
        return <TimelineSection timelines={items} />
      },
    },
  }

  return <PortableText components={components} value={value} />
}
