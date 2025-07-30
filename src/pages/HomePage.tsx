import { useEffect, useState } from 'react'
import ImageCarousel from '../components/ImageCarousel'
import type { PageProps, SiteInfo } from '../types'
import siteInfoData from '../data/siteInfo.json'

interface HomePageProps extends PageProps {}

const HomePage = ({ onNavigate: _onNavigate }: HomePageProps) => {
  const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load data directly from import instead of fetch to avoid network delay
    setSiteInfo(siteInfoData as SiteInfo)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
      </div>
    )
  }

  if (!siteInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">Failed to load sanctuary information</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section with Image Carousel */}
      <section className="relative h-96 md:h-[500px] lg:h-[600px]">
        <ImageCarousel 
          images={siteInfo.images.hero}
          className="h-full"
        />
        
        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center" style={{pointerEvents: "none"}}>
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="relative text-center text-white px-6 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {siteInfo.name}
            </h1>
            <p className="text-xl">
              Ancient Champa Kingdom Heritage Site
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Overview Section */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
              Sanctuary Overview
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              {siteInfo.overview}
            </p>
          </div>
        </section>

        {/* History Section */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
              Historical Significance
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              {siteInfo.history}
            </p>
          </div>
        </section>

        {/* Champa Culture Section */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
              {siteInfo.champaInfo.title}
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-8">
              {siteInfo.champaInfo.description}
            </p>
            
            <h3 className="text-xl font-semibold mb-6 text-gray-900">
              Cultural Aspects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {siteInfo.champaInfo.culturalAspects.map((aspect, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-3 p-4 bg-amber-50 rounded-lg border border-amber-200"
                >
                  <div className="flex-shrink-0 w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">
                    {aspect}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HomePage 
