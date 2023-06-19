import 'tailwindcss/tailwind.css'

import { Providers } from './providers'
import { mono, sans, serif } from 'lib/fonts'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${mono.variable} ${sans.variable} ${serif.variable}`}
      suppressHydrationWarning={true}
    >
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
