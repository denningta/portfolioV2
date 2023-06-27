'use client'

import DarkModeButton from 'components/shared/DarkModeButton'
import type { MenuItem as MenuItemType } from 'types'
import MenuButton from './MenuButton'
import { motion } from 'framer-motion'
import { useState } from 'react'
import NavMenu from './NavMenu'
import MenuItem from './MenuItem'

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
        className="sticky top-0 z-10 flex flex-wrap items-center gap-x-5 bg-white dark:bg-neutral-900 px-4 py-4  md:px-16 md:py-5 lg:px-32 transition ease-in-out">

        {/* Menu Items */}
        {menuItems &&
          menuItems.map((menuItem, key) => {
            return (
              <div
                key={key}
                className={menuItem._type === 'home' ? 'block' : 'hidden sm:block'}
              >
                <MenuItem menuItem={menuItem} />
              </div>
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
        <NavMenu menuItems={menuItems} onClose={closeMenu} />
      </motion.div>
    </>
  )
}
