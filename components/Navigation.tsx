'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { asset } from './asset'
import { Menu, X, Space, Brain, Database, Info, LucideIcon } from 'lucide-react'
import { useLoading } from './LoadingProvider'

type NavItem = {
  name: string
  href: string
  icon: LucideIcon | (() => JSX.Element)
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { startLoading } = useLoading()

  const handleNavigation = () => {
    startLoading()
    setIsOpen(false) // Close mobile menu if open
  }

  const navItems: NavItem[] = [
    { 
      name: 'Home', 
      href: '/', 
      icon: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M21.4498 10.275L11.9998 3.1875L2.5498 10.275L2.9998 11.625H3.7498V20.25H20.2498V11.625H20.9998L21.4498 10.275ZM5.2498 18.75V10.125L11.9998 5.0625L18.7498 10.125V18.75H14.9999V14.3333L14.2499 13.5833H9.74988L8.99988 14.3333V18.75H5.2498ZM10.4999 18.75H13.4999V15.0833H10.4999V18.75Z" fill="currentColor"/>
        </svg>
      )
    },
    { name: 'Detection', href: '/detection', icon: Brain },
    { name: 'Database', href: '/database', icon: Database },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Documentation', href: '/documentation', icon: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 2.75h7.5L18.5 7.75V21.25a.75.75 0 0 1-.75.75H6.75A.75.75 0 0 1 6 21.25V2.75z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M13.5 2.75v4.5h5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8.75 12h6.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8.75 15.5h6.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ) },
  ]

  return (
    <nav className="bg-space-navy/80 backdrop-blur-md border-b border-space-purple/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center" onClick={handleNavigation}>
            <Image
              src={asset('/logo-transparent.png')}
              alt="Planetary Pioneers Logo"
              width={120}
              height={32}
              className="h-8 w-30 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
                  onClick={handleNavigation}
                >
                  {typeof Icon === 'function' && !('displayName' in Icon) ? <Icon /> : <Icon className="w-4 h-4" />}
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-space-navy/90 rounded-lg mt-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-space-purple/30 rounded-md transition-colors duration-200"
                    onClick={handleNavigation}
                  >
                    {typeof Icon === 'function' && !('displayName' in Icon) ? <Icon /> : <Icon className="w-4 h-4" />}
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}