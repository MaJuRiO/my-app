// app/layout.tsx
'use client'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from "next-auth/react"
import { Nav } from './components/Nav'

export default function RootLayout({ children, session }: { children: React.ReactNode, session: any }) {
  return (
    <html lang='en'>
      <title>PEA</title>
      <body>
        <CacheProvider>
          <ChakraProvider>
            <SessionProvider session={session}>
              <Nav/>
              {children}
            </SessionProvider>
          </ChakraProvider>
        </CacheProvider >
      </body>
    </html>
  )
}