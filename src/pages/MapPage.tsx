import { useState, useEffect } from 'react'
import { MapImage, SiteImage } from '../components/OptimizedImage'
import type { PageProps, MapData, MapMarker } from '../types'
import mapDataJson from '../data/mapData.json'

interface MapPageProps extends PageProps {}

const MapPage = ({ onNavigate }: MapPageProps) => {
  const [mapData, setMapData] = useState<MapData | null>(null)
  const [hoveredMarker, setHoveredMarker] = useState<MapMarker | null>(null)

  useEffect(() => {
    // Load map data
    setMapData(mapDataJson as MapData)
  }, [])

  if (!mapData) {
    return (
      <div className="kiosk-loading kiosk-page">
        <div className="text-center">
          <div className="kiosk-spinner-large mx-auto mb-touch-lg"></div>
          <p className="kiosk-body-large text-kiosk-text-secondary">Loading interactive map...</p>
        </div>
      </div>
    )
  }

  const handleMarkerHover = (marker: MapMarker) => {
    setHoveredMarker(marker)
  }

  const handleMarkerLeave = () => {
    setHoveredMarker(null)
  }

  const handleMarkerClick = (_marker: MapMarker) => {
    onNavigate('home')
  }

  return (
    <div className="kiosk-page">
      {/* Interactive Map Container */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background Map Image */}
        <div className="relative w-full h-full">
          <MapImage
            imageName={mapData.backgroundImage}
            alt="My Son Sanctuary Interactive Map"
            className="w-full h-full bg-champa-50"
            loading="eager"
          />
          
          {/* Interactive Markers */}
          {mapData.markers.map((marker) => {
            // Calculate percentage positions based on map dimensions
            const leftPercent = (marker.position.x / mapData.dimensions.width) * 100
            const topPercent = (marker.position.y / mapData.dimensions.height) * 100
            
            return (
              <button
                key={marker.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
                style={{ 
                  left: `${leftPercent}%`, 
                  top: `${topPercent}%`
                }}
                onMouseEnter={() => handleMarkerHover(marker)}
                onMouseLeave={handleMarkerLeave}
                onFocus={() => handleMarkerHover(marker)}
                onBlur={handleMarkerLeave}
                onClick={() => handleMarkerClick(marker)}
                aria-label={`View details for ${marker.name}`}
              >
                {/* Marker Point */}
                <div className="relative">
                  {/* Pulsing animation ring */}
                  <div className="absolute inset-0 w-6 h-6 bg-champa-400 rounded-full animate-pulse-slow opacity-75"></div>
                  
                  {/* Main marker */}
                  <div className="kiosk-map-marker">
                    <div className="w-2 h-2 bg-kiosk-bg-primary rounded-full"></div>
                  </div>
                  
                  {/* Marker label */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-medium text-gray-800 whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    {marker.name}
                  </div>
                </div>
              </button>
            )
          })}
          
          {/* Popup Component for Site Details */}
          {hoveredMarker && (
            <div 
              className="kiosk-map-popup absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-full"
              style={{
                left: `${(hoveredMarker.position.x / mapData.dimensions.width) * 100}%`,
                top: `${(hoveredMarker.position.y / mapData.dimensions.height) * 100}%`,
                marginTop: '-20px'
              }}
            >
              {/* Popup arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
              
              {/* Popup content */}
              <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs">
                <div className="mb-3">
                  <SiteImage
                    imageName={hoveredMarker.image}
                    alt={hoveredMarker.name}
                    className="w-full h-32 rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm">
                    {hoveredMarker.name}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">
                    {hoveredMarker.description}
                  </p>
                </div>
                <div className="text-xs text-amber-600 font-medium">
                  Click to learn more →
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Map Instructions */}
        <div className="absolute top-touch-lg left-touch-lg kiosk-card max-w-sm">
          <h3 className="kiosk-heading-3 mb-touch-sm">Interactive Map</h3>
          <p className="kiosk-body mb-touch-sm">
            Hover over the markers to see site details and images.
          </p>
          <p className="kiosk-body-small text-champa-600">
            Click any marker for more details
          </p>
        </div>
      </div>
    </div>
  )
}

export default MapPage