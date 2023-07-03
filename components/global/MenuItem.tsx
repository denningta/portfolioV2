import InlineSvg from "components/shared/InlineSvg"
import { resolveHref } from "lib/sanity.links"
import Link from "next/link"
import { MenuItem } from "types"

interface MenuItemProps {
  menuItem: MenuItem
}


export default function MenuItem({ menuItem }: MenuItemProps) {
  const href = resolveHref(menuItem?._type, menuItem?.slug ?? menuItem?.url)

  if (!href) return null

  return (
    <Link
      className={`hover:text-black dark:hover:text-blue-500 md:text-xl transition ease-in-out flex items-center
        ${menuItem?._type === 'home'
          ? 'text-lg md:text-xl font-extrabold text-black dark:text-neutral-100'
          : 'text-xl text-gray-600 dark:text-neutral-100'
        }
                `}
      href={href}
      target={menuItem?._type === 'externalLink' ? 'blank' : undefined}
    >
      {menuItem.title}
    </Link>
  )
}
