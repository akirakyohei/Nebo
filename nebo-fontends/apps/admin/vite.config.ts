import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: env.SERVER_PROXY_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    optimizeDeps: {
      // optimize for monorepo linked package see: https://v3.vitejs.dev/config/dep-optimization-options.html#optimizedeps-include
      include: ["@repo/web-builder"],
      esbuildOptions: {
        //ignore legalComments: This comment make CKEditor broken
        legalComments: "none",
      },
    },
    resolve: {
      alias: {
        src: path.resolve(__dirname, "src"),
      },
    },
  };
});
