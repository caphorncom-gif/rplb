import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { join } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-htaccess',
      closeBundle() {
        // Copier .htaccess après le build
        try {
          copyFileSync(
            join(__dirname, 'public', '.htaccess'),
            join(__dirname, 'dist', '.htaccess')
          )
          console.log('✅ .htaccess copié dans dist/')
        } catch (error) {
          console.warn('⚠️  Impossible de copier .htaccess:', error)
        }
      }
    }
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Séparer les dépendances lourdes
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'supabase': ['@supabase/supabase-js'],
          'icons': ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
})
