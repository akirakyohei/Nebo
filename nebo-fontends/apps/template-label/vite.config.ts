import { defineConfig, normalizePath } from "vite";
import { createRequire } from "module";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";
const require = createRequire(import.meta.url);
const cMapsDir = normalizePath(
  path.join(path.dirname(require.resolve("pdfjs-dist/package.json")), "cmaps")
);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    viteStaticCopy({
      targets: [
        {
          src: cMapsDir,
          dest: "",
        },
      ],
    }),
  ],
  optimizeDeps: {
    // optimize for monorepo linked package see: https://v3.vitejs.dev/config/dep-optimization-options.html#optimizedeps-include
    // include: [],
    exclude: ["@mui/material/style", "@repo/web-builder"],
    esbuildOptions: {
      //ignore legalComments: This comment make CKEditor broken
      legalComments: "none",
    },
  },
  build: {
    manifest: true,
  },
  resolve: {
    mainFields: [],
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    cors: false,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
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
