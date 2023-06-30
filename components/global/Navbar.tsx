'use client'

import DarkModeButton from 'components/shared/DarkModeButton'
import type { MenuItem as MenuItemType } from 'types'
import MenuButton from './MenuButton'
import { motion } from 'framer-motion'
import { useState } from 'react'
import NavMenu from './NavMenu'
import MenuItem from './MenuItem'
import InlineSvg from 'components/shared/InlineSvg'
import { useTheme } from 'next-themes'
import Link from 'next/link'

interface NavbarProps {
  menuItems?: MenuItemType[]
}

export function Navbar({ menuItems }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <div
        className="sticky top-0 z-10 max-h-[70px] flex flex-wrap items-center gap-y-2 gap-x-5 bg-white dark:bg-neutral-900 px-4 py-4  md:px-16 md:py-5 lg:px-32 transition ease-in-out">

        <Link href='/' className="h-[30px] w-[30px] min-w-[30px]">
          <InlineSvg src="/logo.svg" height={30} className="fill-black dark:fill-white hover:fill-blue-500 transition ease-in-out" />
        </Link>

        {/* Menu Items */}
        {menuItems &&
          menuItems.map((menuItem, key) => {
            return (
              <div
                key={key}
                className={menuItem._type === 'home' ? 'block' : 'hidden md:block'}
              >

                {menuItem._type === 'home'
                  ? <InlineSvg src={menuItem.icon?.svg || ''} fontSize={20} />
                  : <MenuItem menuItem={menuItem} />
                }
              </div>
            )
          })}

        {/* Dark Mode Button */}
        <div className='hidden grow md:flex justify-end'>
          <DarkModeButton />
        </div>

        {/* Mobile Menu Button */}
        <div className="static grow md:hidden flex flex-wrap items-center justify-end mr-4">
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
        <NavMenu menuItems={menuItems} onClose={closeMenu} />
      </motion.div>
    </>
  )
}
