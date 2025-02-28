import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss"; // Change this import

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()], // Add this configuration
    },
  },
  server: {
    allowedHosts: ["cgclchurchapplication-production.up.railway.app"],
    host: "0.0.0.0",
    port: 5173,
  },
});
