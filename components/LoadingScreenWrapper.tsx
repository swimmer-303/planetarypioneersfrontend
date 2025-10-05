'use client'

import LoadingScreen from '@/components/LoadingScreen'
import { useLoading } from '@/components/LoadingProvider'

export default function LoadingScreenWrapper() {
  const { isLoading, stopLoading } = useLoading()

  return (
    <LoadingScreen 
      isLoading={isLoading} 
      onLoadingComplete={stopLoading} 
    />
  )
}


