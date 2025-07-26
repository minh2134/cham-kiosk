/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Champa-inspired palette
        'champa': {
          50: '#FDF8F3',
          100: '#FAF0E6',
          200: '#F4E4D1',
          300: '#EDD5B7',
          400: '#E4C29A',
          500: '#DAA520', // Primary gold
          600: '#B8941B',
          700: '#967A16',
          800: '#745F11',
          900: '#52440C',
        },
        'terracotta': {
          50: '#FDF6F3',
          100: '#FAEDE6',
          200: '#F2D8CC',
          300: '#E8C0B0',
          400: '#DCA690',
          500: '#CD8B6E', // Primary terracotta
          600: '#B8734F',
          700: '#8B4513', // Darker brown
          800: '#6B3410',
          900: '#4A240B',
        },
        'sanctuary': {
          50: '#F0F9F4',
          100: '#DCF2E8',
          200: '#BBE5D1',
          300: '#86D3B0',
          400: '#4ABA87',
          500: '#22A06B', // Nature green
          600: '#1A8355',
          700: '#166A46',
          800: '#145539',
          900: '#124630',
        },
        // High contrast colors for accessibility
        'kiosk': {
          'text-primary': '#1F2937', // Very dark gray
          'text-secondary': '#4B5563', // Medium gray
          'text-light': '#FFFFFF',
          'bg-primary': '#FFFFFF',
          'bg-secondary': '#F9FAFB',
          'bg-accent': '#FEF3C7',
          'border': '#E5E7EB',
          'error': '#DC2626',
          'success': '#059669',
          'warning': '#D97706',
        }
      },
      fontFamily: {
        'display': ['Georgia', 'Times New Roman', 'serif'],
        'body': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      fontSize: {
        // Kiosk-optimized font sizes (larger for viewing distance)
        'kiosk-xs': ['16px', { lineHeight: '24px' }],
        'kiosk-sm': ['18px', { lineHeight: '28px' }],
        'kiosk-base': ['20px', { lineHeight: '32px' }],
        'kiosk-lg': ['24px', { lineHeight: '36px' }],
        'kiosk-xl': ['28px', { lineHeight: '40px' }],
        'kiosk-2xl': ['32px', { lineHeight: '44px' }],
        'kiosk-3xl': ['40px', { lineHeight: '52px' }],
        'kiosk-4xl': ['48px', { lineHeight: '60px' }],
        'kiosk-5xl': ['56px', { lineHeight: '68px' }],
        'kiosk-6xl': ['64px', { lineHeight: '76px' }],
      },
      spacing: {
        // Touch-friendly spacing
        'touch-sm': '12px',
        'touch-md': '16px',
        'touch-lg': '24px',
        'touch-xl': '32px',
        'touch-2xl': '48px',
      },
      minHeight: {
        'touch': '44px', // Minimum touch target size
        'touch-lg': '56px',
      },
      minWidth: {
        'touch': '44px', // Minimum touch target size
        'touch-lg': '56px',
      },
      boxShadow: {
        'kiosk': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'kiosk-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'kiosk-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'kiosk': '12px',
        'kiosk-lg': '16px',
        'kiosk-xl': '20px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-gentle': 'bounce 2s infinite',
      }
    },
  },
  plugins: [],
} 