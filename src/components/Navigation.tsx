import type { NavigationProps, Page } from '../types'

const Navigation = ({ currentPage, onNavigate }: NavigationProps) => {
  const navItems: Array<{ id: Page; label: string; icon: string; ariaLabel: string }> = [
    { id: 'home', label: 'Home', icon: '🏠', ariaLabel: 'Navigate to Home page' },
    { id: 'map', label: 'Map', icon: '🗺️', ariaLabel: 'Navigate to Interactive Map' },
    { id: 'events', label: 'Events', icon: '📅', ariaLabel: 'Navigate to Events page' },
    { id: 'help', label: 'Help', icon: '❓', ariaLabel: 'Navigate to Help page' }
  ]

  return (
    <nav 
      className="fixed bottom-0 left-48 right-48 z-50 bg-white/95 backdrop-blur-sm shadow-xl border-t-2 border-gray-200 md:left-48 md:right-48 max-md:left-24 max-md:right-24 max-sm:left-12 max-sm:right-12"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-around py-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 min-h-12 min-w-12 ${
                currentPage === item.id
                  ? 'bg-amber-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-amber-700'
              }`}
              aria-label={item.ariaLabel}
              aria-current={currentPage === item.id ? 'page' : undefined}
            >
              <span className="text-2xl mb-1" role="img" aria-hidden="true">
                {item.icon}
              </span>
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navigation 