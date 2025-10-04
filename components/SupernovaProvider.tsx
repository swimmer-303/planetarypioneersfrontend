'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface SupernovaContextType {
  isSupernova: boolean
  setIsSupernova: (value: boolean) => void
  spaceDust: Array<{id: number, x: number, y: number, size: number, color: string}>
  setSpaceDust: (dust: Array<{id: number, x: number, y: number, size: number, color: string}>) => void
}

const SupernovaContext = createContext<SupernovaContextType | undefined>(undefined)

export function SupernovaProvider({ children }: { children: ReactNode }) {
  const [isSupernova, setIsSupernova] = useState(false)
  const [spaceDust, setSpaceDust] = useState<Array<{id: number, x: number, y: number, size: number, color: string}>>([])

  return (
    <SupernovaContext.Provider value={{ isSupernova, setIsSupernova, spaceDust, setSpaceDust }}>
      {children}
    </SupernovaContext.Provider>
  )
}

export function useSupernova() {
  const context = useContext(SupernovaContext)
  if (context === undefined) {
    throw new Error('useSupernova must be used within a SupernovaProvider')
  }
  return context
}
