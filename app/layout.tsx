'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CopyProtection from '@/components/CopyProtection'
import { LoadingProvider, useLoading } from '@/components/LoadingProvider'
import LoadingScreen from '@/components/LoadingScreen'
import { SupernovaProvider } from '@/components/SupernovaProvider'
import SupernovaEffects from '@/components/SupernovaEffects'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SupernovaProvider>
          <LoadingProvider>
            <CopyProtection />
            <div className="min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <LoadingScreenWrapper />
            <SupernovaEffects />
          </LoadingProvider>
        </SupernovaProvider>
      </body>
    </html>
  )
}

function LoadingScreenWrapper() {
  const { isLoading, stopLoading } = useLoading()
  
  return (
    <LoadingScreen 
      isLoading={isLoading} 
      onLoadingComplete={stopLoading} 
    />
  )
}
