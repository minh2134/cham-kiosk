import React, { Suspense } from 'react';
import LoadingSpinner from './LoadingSpinner';
import type { Page } from '../types';

// Lazy load page components for code splitting
const HomePage = React.lazy(() => import('../pages/HomePage'));
const MapPage = React.lazy(() => import('../pages/MapPage'));
const EventsPage = React.lazy(() => import('../pages/EventsPage'));
const HelpPage = React.lazy(() => import('../pages/HelpPage'));

// Simple loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
    <div className="text-center">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-lg text-gray-600">Loading...</p>
    </div>
  </div>
);

// Lazy page components
export const LazyHomePage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => (
  <Suspense fallback={<LoadingFallback />}>
    <HomePage onNavigate={onNavigate} />
  </Suspense>
);

export const LazyMapPage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => (
  <Suspense fallback={<LoadingFallback />}>
    <MapPage onNavigate={onNavigate} />
  </Suspense>
);

export const LazyEventsPage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => (
  <Suspense fallback={<LoadingFallback />}>
    <EventsPage onNavigate={onNavigate} />
  </Suspense>
);

export const LazyHelpPage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => (
  <Suspense fallback={<LoadingFallback />}>
    <HelpPage onNavigate={onNavigate} />
  </Suspense>
);