import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: ["portfolio-frontend-3dkb.onrender.com"],
    proxy: {
      "/api": {
        target: "https://portfolio-backend-0rld.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
