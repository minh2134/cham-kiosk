import React, { useState, useEffect, useMemo } from 'react'
import { EventImage } from '../components/OptimizedImage'
import type { PageProps, Event } from '../types'
import eventsData from '../data/events.json'

interface EventCardProps {
  event: Event
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="aspect-video">
        <EventImage
          imageName={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded">
            {event.type}
          </span>
          <span className="text-sm text-gray-500">
            {formatDate(event.date)}
          </span>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>
        
        <p className="text-sm text-gray-600 line-clamp-3">
          {event.description}
        </p>
      </div>
    </div>
  )
}

const EventsPage: React.FC<PageProps> = ({ onNavigate: _ }) => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [sortType, setSortType] = useState<'date' | 'alphabetical'>('date')

  const typeFilters = [
    { value: 'all', label: 'All' },
    { value: 'festival', label: 'Festival' },
    { value: 'dance', label: 'Dance' },
    { value: 'ceremony', label: 'Ceremony' },
    { value: 'cultural', label: 'Cultural' }
  ]

  // Optimized filtering and sorting
  const filteredAndSortedEvents = useMemo(() => {
    let filtered = events

    if (selectedType !== 'all') {
      filtered = filtered.filter(event => event.type === selectedType)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query)
      )
    }

    return [...filtered].sort((a, b) => {
      if (sortType === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      return a.title.localeCompare(b.title)
    })
  }, [events, searchQuery, selectedType, sortType])

  useEffect(() => {
    setEvents(eventsData.events as Event[])
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Cultural Events
          </h1>
          <p className="text-gray-600">
            Discover the heritage of My Son Sanctuary
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Controls - Centered horizontally */}
        <div className="flex items-center justify-center gap-6 mb-8">
          {/* Event Type Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Type:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              {typeFilters.map(filter => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Sort:</span>
            <div className="flex rounded-lg border border-gray-300 overflow-hidden">
              <button
                onClick={() => setSortType('date')}
                className={`px-3 py-1 text-sm font-medium transition-colors ${
                  sortType === 'date'
                    ? 'bg-amber-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Date
              </button>
              <button
                onClick={() => setSortType('alphabetical')}
                className={`px-3 py-1 text-sm font-medium transition-colors ${
                  sortType === 'alphabetical'
                    ? 'bg-amber-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                A-Z
              </button>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-600">
            {filteredAndSortedEvents.length} event{filteredAndSortedEvents.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Events Grid */}
        {filteredAndSortedEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No events found</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedType('all')
              }}
              className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
            >
              Show All Events
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default EventsPage