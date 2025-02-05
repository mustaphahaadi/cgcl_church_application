import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    allowedHosts: [
      'cgclchurchapplication-production-261d.up.railway.app'
    ],
    host:"0.0.0.0",
    port:5173
  }
})
