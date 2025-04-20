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
    ],
    host: true,
    port: 5173,
    hmr: {
      clientPort: 5173,
      host: "localhost",
    },
  },
});
