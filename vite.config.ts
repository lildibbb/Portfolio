import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import path from "node:path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [viteReact(), TanStackRouterVite()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0", // Allows connections from any IP
    port: 5173, // Ensure this matches your Nginx proxy_pass
    strictPort: true,
    cors: true, // Allow cross-origin requests
    allowedHosts: ["adibasyraaf.me", "www.adibasyraaf.me"], // Allow your domain
  },
});
