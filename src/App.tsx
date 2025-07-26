import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import { LazyHomePage, LazyMapPage, LazyEventsPage, LazyHelpPage } from './components/LazyPages'
import { addResourceHints, registerServiceWorker } from './utils/performanceOptimizations'
import type { Page } from './types'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  const handleNavigation = (page: Page) => {
    setCurrentPage(page)
  }

  // Performance optimizations on app initialization
  useEffect(() => {
    addResourceHints()
    registerServiceWorker()
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LazyHomePage onNavigate={handleNavigation} />
      case 'map':
        return <LazyMapPage onNavigate={handleNavigation} />
      case 'events':
        return <LazyEventsPage onNavigate={handleNavigation} />
      case 'help':
        return <LazyHelpPage onNavigate={handleNavigation} />
      default:
        return <LazyHomePage onNavigate={handleNavigation} />
    }
  }

  return (
    <div className="vertical-layout">
      {/* Left black bar */}
      <div className="side-bar"></div>
      
      {/* Main content area */}
      <div className="main-content">
        <Navigation currentPage={currentPage} onNavigate={handleNavigation} />
        {renderPage()}
      </div>
      
      {/* Right black bar */}
      <div className="side-bar"></div>
    </div>
  )
}

export default App
