import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CopyProtection from '@/components/CopyProtection'
import { LoadingProvider } from '@/components/LoadingProvider'
import LoadingScreenWrapper from '@/components/LoadingScreenWrapper'
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
      <body className={`${inter.className} antialiased text-gray-100`}>
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
