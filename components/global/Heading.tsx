import React from "react"

export interface HeadingProps {
  children: React.ReactNode
  className?: string
}

const Heading = ({ children, className }: HeadingProps) => {
  return (
    <div className={className}>
      <div className={`text-xl w-fit mb-2`}>
        <div>
          {children}
        </div>
        <div className="h-[2px] opacity-50 bg-black dark:bg-white transition ease-in-out rounded-full"></div>
      </div>
    </div>
  )
}

export default Heading
