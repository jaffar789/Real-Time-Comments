import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/socket.io': {
        target: 'http://localhost:5000', // Backend server address
        ws: true, // Enable WebSocket proxying
        changeOrigin: true // Change the origin of the host header to the target URL
      }
    }
  }
})
