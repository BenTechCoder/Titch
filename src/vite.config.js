import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  root: 'src',
  build: {
    outDir:'../dist',
    emptyOutDir: true
  },
    plugins: [
         VitePWA({ registerType: 'autoUpdate' })
       ]
})