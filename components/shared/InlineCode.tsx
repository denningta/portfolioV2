'use client'

import { useTheme } from "next-themes"
import { tailwindColors } from "../../lib/tailwind-colors"
import SyntaxHighlighter from "react-syntax-highlighter"
import { docco, nightOwl } from "react-syntax-highlighter/dist/cjs/styles/hljs"

export interface InlineCodeProps {
  value: {
    code: string
    language: string
    _key: string
    _type: string
  }
}

const InlineCode = ({ value }: InlineCodeProps) => {
  const { theme } = useTheme()

  return (
    <div className="mt-4 ronded-lg overflow-hidden border-slate-300 text-xs sm:text-sm">
      <SyntaxHighlighter
        language={value.language}
        style={theme === 'dark' ? nightOwl : docco}
        customStyle={{
          borderRadius: '10px',
          padding: '20px',
          border: `1px solid ${theme === 'dark' ? tailwindColors.neutral['800'] : tailwindColors.neutral['300']}`,
        }}
      >
        {value.code}
      </SyntaxHighlighter>
    </div>
  )

}

export default InlineCode
