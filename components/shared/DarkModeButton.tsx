'use client'

import { BsSunFill, BsFillMoonFill } from "react-icons/bs"
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useEffect, useState } from "react"

export interface DarkModeButtonProps {
}

const DarkModeButton = ({
}: DarkModeButtonProps) => {
  const { theme, setTheme } = useTheme()
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (!theme) setDarkMode(false)
    setDarkMode(theme === 'dark' ? true : false)
  }, [theme])

  const handleDarkModeClick = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 30
  };

  return (
    <div
      className={`
                rounded-full
                cursor-pointer
                bg-gradient-to-b
                ${darkMode ? 'from-black to-neutral-600' : 'from-neutral-400 to-white'}
            `}
      style={{
        height: 30,
        width: 70,
        padding: 1
      }}
      onClick={handleDarkModeClick}
    >
      <div
        className={`
                    flex items-center 
                    overflow-hidden h-full w-full rounded-full 
                    ${darkMode ? 'bg-neutral-900' : 'bg-neutral-200'} 
                    ${darkMode ? 'justify-end' : 'justify-start'} 
                `}
        style={{
          padding: 3,
          boxShadow: 'inset 0px 4px 4px 0px rgba(0,0,0, 0.46)'
        }}
      >
        <motion.div
          layout
          transition={spring}
          className={`
                        relative 
                        flex items-center justify-center 
                        p-[1px] 
                        rounded-full
                        ${darkMode
              ? 'bg-gradient-to-b from-neutral-500 via-neutral-800 to-neutral-900'
              : 'bg-gradient-to-b from-neutral-50 via-neutral-100 to-neutral-400'
            } 
                    `}
          style={{
            boxShadow: '0px 1px 1px 0px rgba(0,0,0, 0.46)',
            width: 24,
            height: 24
          }}
        >
          <div className="absolute -left-6 text-white">
            <BsFillMoonFill />
          </div>
          <div className="absolute left-8 text-neutral-900">
            <BsSunFill />
          </div>
          <div className={`
                        w-full h-full  
                        rounded-full
                        ${darkMode ? 'bg-neutral-800' : 'bg-neutral-100'} 
                    `}>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DarkModeButton
