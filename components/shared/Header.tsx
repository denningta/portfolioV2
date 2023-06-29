import { CustomPortableText } from 'components/shared/CustomPortableText'
import { urlForImage } from 'lib/sanity.image'
import type { Image as SanityImage } from 'sanity'
import Image from 'next/image'

interface HeaderProps {
  centered?: boolean
  description?: any[]
  title?: string
  image?: SanityImage
}
export function Header(props: HeaderProps) {
  const { title, description, centered = false, image } = props

  if (!description && !title) {
    return null
  }

  return (
    <div className={`flex flex-col md:flex-row justify-start md:space-x-10 ${centered ? 'text-center' : 'w-4/5 lg:w-4/5'}`}>

      {/* Image */}
      {image &&
        <div className='flex justify-center'>
          <Image
            src={urlForImage(image)?.width(800).height(800).url() ?? ''}
            alt=''
            width={300}
            height={300}
            className='rounded-full mb-6 border-8 border-black dark:border-white transition ease-in-out'
          />
        </div>
      }

      <div className={`flex flex-col justify-center ${centered ? 'items-center md:items-start' : 'items-start'}`}>
        {/* Title */}
        {title && (
          <div className="text-3xl font-extrabold tracking-tight md:text-5xl md:text-left">
            {title}
          </div>
        )}

        {/* Description */}
        {description && (
          <div className="mt-4 text-xl text-gray-400 md:text-2xl md:text-left">
            <CustomPortableText value={description} />
          </div>
        )}

      </div>
    </div>
  )
}
