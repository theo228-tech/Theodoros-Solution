/*import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'El Theodoros Solutions',
        short_name: 'Theodoros',
        description: 'Application de gestion offline-first',
        theme_color: '#0f172a',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
*/

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        short_name: 'Theodoros',
        name: 'El Theodoros Solution',
        icons: [
          { src: 'logos.png', sizes: '192x192', type: 'image/png' },
          { src: 'logos.png', sizes: '512x512', type: 'image/png' }
        ],
        start_url: '.',
        display: 'standalone',
        theme_color: '#4CAF50',
        background_color: '#ffffff'
      }
    })
  ]
})
