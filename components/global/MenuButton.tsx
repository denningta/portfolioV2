import { motion } from "framer-motion"

export interface MenuButtonProps {
  toggle: () => void
  width?: number
  height?: number
}

const MenuButton = ({ toggle, width = 35, height = 35 }: MenuButtonProps) => {

  return (
    <>
      <button
        onClick={toggle}
        style={{ width: width, height: height }}
        type="button"
      >
        <svg width={width} height={height}>
          <Path variants={{
            closed: { d: `M 5 ${height * 1 / 4} L ${width - 5} ${height * 1 / 4}` },
            open: { d: `M 10 ${height - 10} L ${width - 10} 10` }
          }} />
          <Path
            d={`M 5 ${height * 1 / 2} L ${width - 5} ${height * 1 / 2}`}
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 }
            }}
          />
          <Path variants={{
            closed: { d: `M 5 ${height * 3 / 4} L ${width - 5} ${height * 3 / 4}` },
            open: { d: `M 10 10 L ${width - 10} ${height - 10}` }
          }} />
        </svg>
      </button>
    </>
  )

}

const Path = (props: React.ComponentProps<typeof motion.path>) => {

  return (
    <motion.path
      fill="transparent"
      className='stroke-black dark:stroke-white'
      strokeWidth={3}
      strokeLinecap="round"
      {...props}
    />
  )
}

export default MenuButton
