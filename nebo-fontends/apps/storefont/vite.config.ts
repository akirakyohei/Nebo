import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import remixConfig from "./app/remix.config";
import path from "path";

installGlobals();

export default defineConfig(({ mode }) => {
  return {
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode),
    },
    plugins: [remix(remixConfig), tsconfigPaths()],
    resolve: {
      alias: {
        app: path.resolve(__dirname, "app"),
      },
    },
    optimizeDeps: {
      // optimize for monorepo linked package see: https://v3.vitejs.dev/config/dep-optimization-options.html#optimizedeps-include
      include: [
        "@repo/web-builder",
        // "@emotion/react",
        // "@mui/material",
        // "react-redux",
        // "@mui/icons-material",
        // "react-hook-form",
        // "validator/lib/isEmpty",
        // "@reduxjs/toolkit/query/react",
        // "axios",
        // "@reduxjs/toolkit",
        // "@reduxjs/toolkit/query",
        // "notistack",
      ],
      exclude: ["@mui/material/style"],
      esbuildOptions: {
        //ignore legalComments: This comment make CKEditor broken
        legalComments: "none",
      },
    },
    server: {
      proxy: {
        "/api": {
          target: "http:nebo.com:8000",
          changeOrigin: true,
        },
      },
    },
  };
});
