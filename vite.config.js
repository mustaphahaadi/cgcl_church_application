import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss"; // Change this import

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    allowedHosts: [
      "cgclchurchapplication-production.up.railway.app",
      "cgclchurchapplication-production-0aa2.up.railway.app",
    ],
    host: "0.0.0.0",
    port: 5173,
    hmr: {
      clientPort: 5173,
      host: "localhost",
    },
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/"),
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:5173",
          "Access-Control-Allow-Credentials": "true",
        },
      },
    },
  },
});
