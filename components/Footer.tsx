import Image from 'next/image'
import { asset } from './asset'

export default function Footer() {
  return (
    <footer className="bg-space-navy/80 backdrop-blur-md border-t border-space-purple/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Image
              src={asset('/logo-transparent.png')}
              alt="Planetary Pioneers Logo"
              width={150}
              height={40}
              className="h-10 w-auto"
            />
          </div>
          <p className="text-gray-400">
            Exoplanet detection using machine learning
          </p>
        </div>
      </div>
    </footer>
  )
}
