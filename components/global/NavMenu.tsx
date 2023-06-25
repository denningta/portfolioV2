import DarkModeButton from "components/shared/DarkModeButton"
import { motion } from "framer-motion"
import { resolveHref } from "lib/sanity.links"
import Link from "next/link"
import { MenuItem } from "types"

export interface NavMenuProps {
  menuItems?: MenuItem[]
  isOpen?: boolean
  onClose?: () => void
  darkModeButton?: JSX.Element
}

const NavMenu = ({ menuItems = [], onClose = () => { }, darkModeButton }: NavMenuProps) => {

  return (
    <motion.div
      className="z-50 fixed top-[67px] left-0 w-full h-full flex justify-end"
      variants={{
        open: {
          display: 'flex'
        },
        closed: {
          display: 'none',
          transition: { delay: 0.2 }
        }
      }}
    >
      <motion.div
        className="z-40 fixed top-[67px] left-0 w-full h-full bg-black bg-opacity-30 backdrop-blur text-xl"
        onClick={onClose}
        variants={{
          open: {
            opacity: 1
          },
          closed: {
            opacity: 0
          }
        }}
        transition={{ duration: 0.2 }}

      />
      <motion.div
        className="z-50 fixed flex flex-col h-full items-center p-5 bg-neutral-100 dark:bg-neutral-900 w-2/3"
        variants={{
          open: {
            x: 0
          },
          closed: {
            x: 500
          }
        }}
        transition={{ duration: 0.2 }}
      >


        {/* Menu Items */}
        <div className="flex flex-col mt-10 space-y-10 items-center">
          {menuItems &&
            menuItems.map((menuItem, key) => {
              const href = resolveHref(menuItem?._type, menuItem?.slug ?? menuItem?.url)
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

      </motion.div>
    </motion.div>
  )
}

export default NavMenu
