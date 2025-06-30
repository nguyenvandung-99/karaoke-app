import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from 'vite-plugin-svgr' 
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  base: '/karaoke-app/',
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
    },
  },
});
