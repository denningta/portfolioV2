'use client'

import { CircularProgress } from "@mui/material"
import Link from "next/link"
import { DetailedHTMLProps, ButtonHTMLAttributes, useRef } from "react"

type CustomButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  children: React.ReactNode
  isLoading?: boolean
  href?: string
}
export default function CustomButton(props: CustomButtonProps) {
  const { children, isLoading, href, ...buttonProps } = props

  const button =
    <button
      {...buttonProps}
      className={`
        transition ease-in-out
        text-white
        bg-blue-600 px-5 py-2 rounded
        hover:bg-blue-700
        disabled:bg-gray-500 disabled:cursor-not-allowed
        drop-shadow
        cursor-pointer
        flex items-center justify-center
        ${props.className}
      `}
    >
      {!isLoading && children}
      {isLoading &&
        <CircularProgress color="inherit" size={20} />
      }
    </button>

  if (href) return (
    <Link href={href}>
      {button}
    </Link>
  )

  return button

}
