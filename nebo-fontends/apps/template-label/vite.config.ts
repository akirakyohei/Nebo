import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  optimizeDeps: {
    // optimize for monorepo linked package see: https://v3.vitejs.dev/config/dep-optimization-options.html#optimizedeps-include
    include: ["@repo/web-builder"],
    exclude: ["@mui/material/style"],
    esbuildOptions: {
      //ignore legalComments: This comment make CKEditor broken
      legalComments: "none",
    },
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    cors: false,
    proxy: {
      "/api": {
        target: "http://nebo.com:8000",
        changeOrigin: true,
        secure: true,
        configure(proxy, _options) {
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            if (req.headers.cookie)
              proxyReq.setHeader("cookie", req.headers.cookie);
          });
          proxy.on("proxyRes", (proxyRes, _req, res) => {
            if (proxyRes.headers.cookie)
              res.setHeader("cookie", proxyRes.headers.cookie);
          });
        },
      },
    },
  },
});
