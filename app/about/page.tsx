import Link from 'next/link'
import { ArrowLeft, Star, Search, Globe, Eye } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Background Stars */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full animate-pulse-slow"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-blue-300 rounded-full animate-pulse-slow"></div>
        <div className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-40 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-1/2 w-2 h-2 bg-purple-300 rounded-full animate-pulse-slow"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">What is an</span> <span className="text-gradient">Exoplanet</span>?
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Understanding the worlds beyond our solar system
          </p>
        </div>

        {/* Main Definition */}
        <div className="bg-space-navy/50 backdrop-blur-sm border border-space-purple/30 rounded-2xl p-8 mb-12">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-space-accent to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Definition</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                An <strong className="text-white">exoplanet</strong> (short for extrasolar planet) is a planet that orbits a star outside our Solar System.
              </p>
            </div>
          </div>
          
          <div className="bg-space-purple/20 rounded-lg p-6">
            <p className="text-lg text-center text-gray-200 font-medium">
              👉 <strong className="text-white">In simple terms:</strong> An exoplanet is any planet orbiting a star that is not the Sun.
            </p>
          </div>
        </div>

        {/* Key Points */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Key Points</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Location */}
            <div className="bg-space-navy/30 backdrop-blur-sm border border-space-purple/20 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Location</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Unlike the eight planets of our Solar System, exoplanets orbit other stars, often many light-years away.
              </p>
            </div>

            {/* Detection */}
            <div className="bg-space-navy/30 backdrop-blur-sm border border-space-purple/20 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Detection</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                They're usually found through methods like the transit method (a planet passing in front of its star, dimming its light) or the radial velocity method (detecting the star's wobble caused by the planet's gravity).
              </p>
            </div>

            {/* Diversity */}
            <div className="bg-space-navy/30 backdrop-blur-sm border border-space-purple/20 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <Search className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Diversity</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Exoplanets come in many forms — some are Earth-like rocky worlds, others are gas giants like Jupiter, and many don't resemble anything in our Solar System.
              </p>
            </div>

            {/* Significance */}
            <div className="bg-space-navy/30 backdrop-blur-sm border border-space-purple/20 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Significance</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Studying them helps scientists understand planet formation, the potential for habitable worlds, and the possibility of life elsewhere in the universe.
              </p>
            </div>
          </div>
        </div>

        {/* Why Detection Matters */}
        <div className="bg-gradient-to-r from-space-purple/20 to-pink-500/20 backdrop-blur-sm border border-space-purple/30 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Why Exoplanet Detection Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-space-accent to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                1
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Understanding Our Origins</h3>
              <p className="text-gray-300 text-sm">
                Learning how planets form helps us understand how our own solar system came to be.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                2
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Finding Habitable Worlds</h3>
              <p className="text-gray-300 text-sm">
                Discovering Earth-like planets increases our chances of finding life beyond Earth.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                3
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Advancing Technology</h3>
              <p className="text-gray-300 text-sm">
                Detection methods push the boundaries of astronomical observation and data analysis.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Ready to Explore?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Now that you understand what exoplanets are, dive into our detection platform to identify them yourself!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/detection" className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>Start Detection</span>
            </Link>
            <Link href="/database" className="btn-secondary text-lg px-8 py-4 flex items-center justify-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Explore Database</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
