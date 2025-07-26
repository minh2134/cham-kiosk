import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          vendor: ['react', 'react-dom'],
          // Separate data chunks
          data: ['./src/data/siteInfo.json', './src/data/mapData.json', './src/data/events.json', './src/data/helpInfo.json']
        }
      }
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable minification
    minify: true
  },
  // Optimize dev server
  server: {
    hmr: {
      overlay: false
    }
  },
  // Asset optimization
  assetsInclude: ['**/*.svg'],
  // Preload optimization
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
})
