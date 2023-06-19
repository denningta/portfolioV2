import { GiAstronautHelmet } from 'react-icons/gi'
import NavItem, { NavItemProps } from './Navitem'
import Link from 'next/link'
import MenuButton from './MenuButton'
import { motion, useCycle } from 'framer-motion'

export interface NavBarProps {
  darkModeButton: JSX.Element
  height: number
  navItems: NavItemProps[]
  isMenuOpen: boolean
  onMenuToggle?: () => void
}

const NavBar = ({
  navItems,
  darkModeButton,
  height,
  isMenuOpen,
  onMenuToggle = () => { }
}: NavBarProps) => {
  const name = 'Tim Denning'

  return (
    <div
      className={`
                max-w-3xl flex items-center w-full py-2 
                bg-neutral-100 
                dark:bg-neutral-900 
                backdrop-blur-sm transition ease-in-out
            `}
      style={{ height: height }}
    >
      <Link href="/" >
        <div className="flex items-center mx-2">
          <div className="flex items-center mx-2">
            <GiAstronautHelmet size={20} />
          </div>
          <div className="font-semibold text-xl">
            {name}
          </div>
        </div>
      </Link>
      <div className="hidden grow sm:flex mx-6">
        {navItems.map((navItemProps, i) =>
          <NavItem key={`navItem-${i}`} className="mr-3"  {...navItemProps} />
        )}
      </div>
      <div className="hidden sm:flex mr-4">
        {darkModeButton}
      </div>

      <div className="static grow sm:hidden flex items-center justify-end mr-4">
        <motion.nav
          initial={false}
          animate={isMenuOpen ? 'open' : 'closed'}
        >
          <MenuButton
            toggle={() => {
              onMenuToggle()
            }}
          />
        </motion.nav>
      </div >

    </div >
  )
}

export default NavBar
