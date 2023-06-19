import type { PortableTextBlock } from '@portabletext/types'
import { CustomPortableText } from 'components/shared/CustomPortableText'

export function Footer({ footer }: { footer: PortableTextBlock[] }) {
  return (
    <footer className="bottom-0 w-full bg-white dark:bg-neutral-900 py-12 text-center md:py-20 mt-16">
      {footer && (
        <CustomPortableText
          paragraphClasses="text-md md:text-xl"
          value={footer}
        />
      )}
    </footer>
  )
}
