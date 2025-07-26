import { useState } from 'react'
import type { PageProps } from '../types'
import helpData from '../data/helpInfo.json'

interface HelpPageProps extends PageProps { }

interface AccessibilityRoute {
  id: string
  name: string
  description: string
  waypoints: string[]
}

interface Contributor {
  name: string
  studentId: string
}

const HelpPage = ({ onNavigate: _ }: HelpPageProps) => {
  const [language, setLanguage] = useState<'en' | 'vi'>('en')
  const { accessibilityRoutes, emergencyContact, contributors } = helpData

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'vi' : 'en')
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="text-center py-8 relative">
        {/* Language Switch */}
        <div className="absolute top-8 right-8">
          <div className="flex items-center gap-3 bg-white rounded-lg shadow-sm p-2">
            <span className="text-sm font-medium text-gray-700">Language:</span>
            <button
              onClick={toggleLanguage}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
                language === 'en' ? 'bg-amber-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  language === 'en' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <div className="flex items-center gap-2 text-sm">
              <span className={`${language === 'en' ? 'font-semibold text-amber-600' : 'text-gray-500'}`}>
                EN
              </span>
              <span className="text-gray-400">|</span>
              <span className={`${language === 'vi' ? 'font-semibold text-amber-600' : 'text-gray-500'}`}>
                VI
              </span>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4 text-gray-900">
          Help & Support
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto px-6">
          Find accessibility information, emergency contacts, and support resources for your visit to My Son Sanctuary
        </p>
      </header>

      <div className="max-w-6xl mx-auto px-6 space-y-8">
        {/* Accessibility Routes Section */}
        <section className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-4 text-gray-900">
            <span className="text-3xl">♿</span>
            Accessibility Routes
          </h2>
          <p className="text-lg mb-8 text-gray-700">
            We provide multiple accessible routes to ensure all visitors can enjoy My Son Sanctuary comfortably and safely.
          </p>

          <div className="space-y-6">
            {accessibilityRoutes.map((route: AccessibilityRoute) => (
              <div key={route.id} className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  {route.name}
                </h3>
                <p className="text-gray-700 mb-4">
                  {route.description}
                </p>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-4">Route Waypoints:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {route.waypoints.map((waypoint, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className="bg-green-200 text-green-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{waypoint}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Emergency Contact Section */}
        <section className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-4 text-red-600">
            <span className="text-3xl">🚨</span>
            Emergency Contact
          </h2>
          <p className="text-lg mb-6 text-gray-700">
            In case of emergency or if you need immediate assistance, please contact our site administration.
          </p>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 text-red-800">
                {emergencyContact.name}
              </h3>
              <p className="text-lg mb-6 text-gray-700">
                {emergencyContact.role}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-2xl">📧</span>
                    <span className="font-semibold text-red-800">Email</span>
                  </div>
                  <p className="font-mono text-sm break-all text-gray-700">
                    {emergencyContact.email}
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-2xl">📞</span>
                    <span className="font-semibold text-red-800">Phone</span>
                  </div>
                  <p className="text-lg font-mono text-gray-700">
                    {emergencyContact.phone}
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> This contact is available 24/7 for emergencies and urgent assistance during your visit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contributors Information Section */}
        <section className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-4 text-amber-600">
            <span className="text-3xl">👥</span>
            Project Contributors
          </h2>
          <p className="text-lg mb-6 text-gray-700">
            This kiosk system was developed by a dedicated team of students as part of their academic project.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contributors.map((contributor: Contributor, index) => (
              <div key={index} className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-amber-700">👤</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-amber-800">
                  {contributor.name}
                </h3>
                <p className="font-mono text-sm bg-white px-3 py-1 rounded inline-block text-gray-700">
                  ID: {contributor.studentId}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gray-100 rounded-lg text-center">
            <p className="text-gray-600">
              <strong>Academic Institution:</strong> Swinburne University of Information Technology<br />
              <strong>Project:</strong> Digital Preservation of Champa Cultural and Architectural Heritage<br />
              <strong>Year:</strong> 2025
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HelpPage