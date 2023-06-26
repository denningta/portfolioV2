import DarkModeButton from "components/shared/DarkModeButton"
import { motion } from "framer-motion"
import MenuItem from "./MenuItem"
import type { MenuItem as MenuItemType } from "types"

export interface NavMenuProps {
  menuItems?: MenuItemType[]
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
              return (
                <div onClick={onClose} key={key}>
                  <MenuItem menuItem={menuItem} />
                </div>
              )
            })}

          <DarkModeButton />
        </div>

      </motion.div>
    </motion.div>
  )
}

export default NavMenu
