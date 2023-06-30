import { PortableText, PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { TimelineSection } from 'components/shared/TimelineSection'
import { Image } from 'sanity'
import InlineImage from './InlineImage'
import InlineCode from './InlineCode'
import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'

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
        return <div className='text-3xl font-extrabold mt-10 mb-6'>{children}</div>
      },
      h2: ({ children }) => {
        return <div className='text-3xl font-extrabold mt-10 mb-4'>{children}</div>
      },
      h3: ({ children }) => {
        return <div className='text-3xl font-extrabold'>{children}</div>
      },
    },
    list: {
      bullet: ({ children }) => {
        return <ul className={`${paragraphClasses} mt-3 list-disc`}>{children}</ul>
      }
    },
    listItem: {
      bullet: ({ children }) => <li className='mt-6'>{children}</li>

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
      internalLink: ({ children, value }) => {
        const href = resolveHref(value.refType, value.slug.current)
        if (href) {
          return (
            <Link
              className="underline transition hover:opacity-50"
              href={href}
            >
              {children}
            </Link>
          )
        }
        return <>{children}</>

      }
    },
    types: {
      image: ({
        value,
      }: {
        value: Image & { alt?: string; caption?: string }
      }) => {
        return (
          <div className="max-w-3xl my-12 mx-12 space-y-2">
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
      inlineCode: ({ value }) => {
        return <InlineCode value={value} />
      }
    },
  }

  return <PortableText components={components} value={value} />
}
