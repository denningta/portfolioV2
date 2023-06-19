import DarkModeButton from 'components/shared/DarkModeButton'
import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import { MenuItem } from 'types'

interface NavbarProps {
  menuItems?: MenuItem[]
}

export function Navbar({ menuItems }: NavbarProps) {

  return (
    <div
      className="sticky top-0 z-10 flex flex-wrap items-center gap-x-5 bg-white/80 dark:bg-neutral-900/80 px-4 py-4 backdrop-blur md:px-16 md:py-5 lg:px-32">
      {menuItems &&
        menuItems.map((menuItem, key) => {
          const href = resolveHref(menuItem?._type, menuItem?.slug)
          if (!href) {
            return null
          }
          return (
            <Link
              key={key}
              className={`text-lg hover:text-black dark:hover:text-blue-500 md:text-xl transition ease-in-out ${menuItem?._type === 'home'
                ? 'font-extrabold text-black dark:text-neutral-100'
                : 'text-gray-600 dark:text-neutral-100'
                }`}
              href={href}
            >
              {menuItem.title}
            </Link>
          )
        })}

      <DarkModeButton />
    </div>
  )
}
