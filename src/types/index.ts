// Core navigation and page types
export type Page = 'home' | 'map' | 'events' | 'help'

// Map-related types
export interface MapMarker {
  id: string
  name: string
  position: { x: number; y: number }
  image: string
  description: string
}

export interface MapData {
  backgroundImage: string
  markers: MapMarker[]
  dimensions: {
    width: number
    height: number
  }
}

// Event-related types
export interface Event {
  id: string
  title: string
  date: string // ISO date string
  description: string
  type: 'festival' | 'dance' | 'ceremony' | 'cultural'
  image: string
}

export interface EventsData {
  events: Event[]
  categories: string[]
}

// Site information types
export interface SiteInfo {
  name: string
  overview: string
  history: string
  champaInfo: {
    title: string
    description: string
    culturalAspects: string[]
  }
  images: {
    hero: string[]
    gallery: string[]
  }
}

// Help page types
export interface AccessibilityRoute {
  id: string
  name: string
  description: string
  waypoints: string[]
}

export interface EmergencyContact {
  name: string
  email: string
  phone: string
  role: string
}

export interface Contributor {
  name: string
  studentId: string
}

export interface HelpData {
  accessibilityRoutes: AccessibilityRoute[]
  emergencyContact: EmergencyContact
  contributors: Contributor[]
}

// Component prop types
export interface NavigationProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

export interface PageProps {
  onNavigate: (page: Page) => void
}

export interface MarkerPopupProps {
  marker: MapMarker
  isVisible: boolean
  onClose: () => void
  onNavigateHome: () => void
}

export interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder: string
}

export interface SortControlsProps {
  onSort: (type: 'date' | 'alphabetical') => void
  currentSort: 'date' | 'alphabetical'
}

// App state types
export interface AppState {
  currentPage: Page
}

// Loading component types
export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export interface SkeletonLoaderProps {
  variant?: 'text' | 'card' | 'image' | 'button'
  lines?: number
  className?: string
}

export interface PageLoaderProps {
  message?: string
  className?: string
}

export interface LoadingWrapperProps {
  isLoading: boolean
  children: React.ReactNode
  loadingType?: 'spinner' | 'skeleton'
  skeletonVariant?: 'text' | 'card' | 'image' | 'button'
  skeletonLines?: number
  className?: string
  loadingMessage?: string
}

// Error boundary types
export interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

export interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export interface ErrorFallbackProps {
  error?: Error
  resetError?: () => void
  title?: string
  message?: string
  showRetry?: boolean
  className?: string
}

export interface ErrorState {
  hasError: boolean
  error: Error | null
  errorMessage: string
}

export interface UseErrorHandlerReturn {
  errorState: ErrorState
  handleError: (error: Error | string) => void
  clearError: () => void
  resetError: () => void
}

export interface WithErrorBoundaryOptions {
  fallback?: React.ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  errorTitle?: string
  errorMessage?: string
}

export interface ErrorLogEntry {
  timestamp: string
  error: Error
  context?: string
  userAgent?: string
  url?: string
  userId?: string
}