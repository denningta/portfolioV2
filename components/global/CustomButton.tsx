'use client'

import { CircularProgress } from "@mui/material"
import { DetailedHTMLProps, ButtonHTMLAttributes, useRef } from "react"

type CustomButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  children: React.ReactNode
  isLoading?: boolean
}
export default function CustomButton(props: CustomButtonProps) {
  const { children, isLoading, ...buttonProps } = props

  return (
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
  )

}
