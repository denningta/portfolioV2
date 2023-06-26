'use client'

import DarkModeButton from 'components/shared/DarkModeButton'
import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import { MenuItem } from 'types'
import MenuButton from './MenuButton'
import { motion } from 'framer-motion'
import { useState } from 'react'
import NavMenu from './NavMenu'

interface NavbarProps {
  menuItems?: MenuItem[]
}

export function Navbar({ menuItems }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }


  return (
    <>
      <div
        className="sticky top-0 z-10 flex flex-wrap items-center gap-x-5 bg-white/80 dark:bg-neutral-900/80 px-4 py-4 backdrop-blur md:px-16 md:py-5 lg:px-32 transition ease-in-out">

        {/* Menu Items */}
        {menuItems &&
          menuItems.map((menuItem, key) => {
            const href = resolveHref(menuItem?._type, menuItem?.slug ?? menuItem?.url)
            if (!href) {
              return null
            }
            return (
              <Link
                key={key}
                className={`text-lg hover:text-black dark:hover:text-blue-500 md:text-xl transition ease-in-out 
                  ${menuItem?._type === 'home'
                    ? 'font-extrabold text-black dark:text-neutral-100'
                    : 'text-gray-600 dark:text-neutral-100 hidden sm:block'
                  }
                `}
                href={href}
              >
                {menuItem.title}
              </Link>
            )
          })}

        <div className='grow' />

        {/* Dark Mode Button */}
        <div className='hidden sm:block'>
          <DarkModeButton />
        </div>

        {/* Mobile Menu Button */}
        <div className="static grow sm:hidden flex items-center justify-end mr-4">
          <motion.nav
            initial={false}
            animate={isMenuOpen ? 'open' : 'closed'}
            className='flex items-center'
          >
            <MenuButton
              toggle={handleToggleMenu}
            />
          </motion.nav>
        </div>


      </div>

      <motion.div
        initial={false}
        animate={isMenuOpen ? 'open' : 'closed'}
        className=''
      >
        <NavMenu menuItems={menuItems} />
      </motion.div>
    </>
  )
}
