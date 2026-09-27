// ponytail: Vite configuration with React plugin and backend proxy.
// Upgrade path: add @stylexjs/rollup-plugin when StyleX build compilation is enabled.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The browser always talks to NUMM through its own origin. Vite proxies API
// requests in development; Nginx provides the same proxy in production.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
      },
    },
  },
});
