import './globals.css'
import { Inter } from 'next/font/google'
// import ThemeProviderComponent from './components/ThemeProvider'
import { ClerkProvider } from '@clerk/nextjs'
import NavLink from './components/NavBar'
import { dark } from '@clerk/themes'
import dbConnect from '@/utils/dbConnect'
import { ourFileRouter } from './api/uploadthing/core'
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  title: 'Blogify',
  description: 'The modern thoughts sharing platform',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <ClerkProvider appearance={{ baseTheme: dark }} >
        <body className={inter.className}>
          <NextSSRPlugin
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          <NavLink />
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  )
}
