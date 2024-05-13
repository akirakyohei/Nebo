// vite.config.ts
import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as cloudflare
} from "file:///D:/do_an/Nebo/nebo-fontends/node_modules/@remix-run/dev/dist/index.js";
import { installGlobals } from "file:///D:/do_an/Nebo/nebo-fontends/node_modules/@remix-run/node/dist/index.js";
import { defineConfig } from "file:///D:/do_an/Nebo/nebo-fontends/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///D:/do_an/Nebo/nebo-fontends/node_modules/vite-tsconfig-paths/dist/index.mjs";

// app/remix.config.js
var remix_config_default = {
  routes(defineRoutes) {
    return defineRoutes((route) => {
      route("", "routes/_index.tsx", { index: true });
      route("users", "routes/users/_index.tsx", () => {
        route("login", "routes/users/login.tsx");
        route("signup", "routes/users/signup.tsx");
      });
      route("workspace", "routes/workspace/workspace.tsx", () => {
        route("", "routes/workspace/_index.tsx", { index: true });
        route("projects", "routes/workspace/projects.tsx");
        route("images", "routes/workspace/images.tsx");
        route("templates", "routes/workspace/templates.tsx");
      });
      route("documents", "routes/documents/_index.tsx", () => {
        route("editors", "routes/documents/editors/_index.tsx", () => {
          route("", "routes/documents/editors/manage.tsx", { index: true });
          route(":id", "routes/documents/editors/$id.tsx");
        });
      });
    });
  },
  ssr: false,
  manifest: true,
  serverDependenciesToBundle: []
};

// vite.config.ts
import path from "path";
var __vite_injected_original_dirname = "D:\\do_an\\Nebo\\nebo-fontends\\apps\\storefont";
installGlobals();
var vite_config_default = defineConfig({
  plugins: [remix(remix_config_default), cloudflare(), tsconfigPaths()],
  resolve: {
    alias: {
      app: path.resolve(__vite_injected_original_dirname, "app")
    }
  },
  optimizeDeps: {
    // optimize for monorepo linked package see: https://v3.vitejs.dev/config/dep-optimization-options.html#optimizedeps-include
    include: ["@repo/web-builder"],
    exclude: ["@mui/material/style"],
    esbuildOptions: {
      //ignore legalComments: This comment make CKEditor broken
      legalComments: "none"
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http:nebo.com:8000",
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/api/, "")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYXBwL3JlbWl4LmNvbmZpZy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGRvX2FuXFxcXE5lYm9cXFxcbmViby1mb250ZW5kc1xcXFxhcHBzXFxcXHN0b3JlZm9udFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcZG9fYW5cXFxcTmVib1xcXFxuZWJvLWZvbnRlbmRzXFxcXGFwcHNcXFxcc3RvcmVmb250XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9kb19hbi9OZWJvL25lYm8tZm9udGVuZHMvYXBwcy9zdG9yZWZvbnQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQge1xuICB2aXRlUGx1Z2luIGFzIHJlbWl4LFxuICBjbG91ZGZsYXJlRGV2UHJveHlWaXRlUGx1Z2luIGFzIGNsb3VkZmxhcmUsXG59IGZyb20gXCJAcmVtaXgtcnVuL2RldlwiO1xuaW1wb3J0IHsgaW5zdGFsbEdsb2JhbHMgfSBmcm9tIFwiQHJlbWl4LXJ1bi9ub2RlXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcbmltcG9ydCByZW1peENvbmZpZyBmcm9tIFwiLi9hcHAvcmVtaXguY29uZmlnXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5pbnN0YWxsR2xvYmFscygpO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVtaXgocmVtaXhDb25maWcpLCBjbG91ZGZsYXJlKCksIHRzY29uZmlnUGF0aHMoKV0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgYXBwOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcImFwcFwiKSxcbiAgICB9LFxuICB9LFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICAvLyBvcHRpbWl6ZSBmb3IgbW9ub3JlcG8gbGlua2VkIHBhY2thZ2Ugc2VlOiBodHRwczovL3YzLnZpdGVqcy5kZXYvY29uZmlnL2RlcC1vcHRpbWl6YXRpb24tb3B0aW9ucy5odG1sI29wdGltaXplZGVwcy1pbmNsdWRlXG4gICAgaW5jbHVkZTogW1wiQHJlcG8vd2ViLWJ1aWxkZXJcIl0sXG4gICAgZXhjbHVkZTogW1wiQG11aS9tYXRlcmlhbC9zdHlsZVwiXSxcbiAgICBlc2J1aWxkT3B0aW9uczoge1xuICAgICAgLy9pZ25vcmUgbGVnYWxDb21tZW50czogVGhpcyBjb21tZW50IG1ha2UgQ0tFZGl0b3IgYnJva2VuXG4gICAgICBsZWdhbENvbW1lbnRzOiBcIm5vbmVcIixcbiAgICB9LFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBwcm94eToge1xuICAgICAgXCIvYXBpXCI6IHtcbiAgICAgICAgdGFyZ2V0OiBcImh0dHA6bmViby5jb206ODAwMFwiLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCBcIlwiKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxkb19hblxcXFxOZWJvXFxcXG5lYm8tZm9udGVuZHNcXFxcYXBwc1xcXFxzdG9yZWZvbnRcXFxcYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxkb19hblxcXFxOZWJvXFxcXG5lYm8tZm9udGVuZHNcXFxcYXBwc1xcXFxzdG9yZWZvbnRcXFxcYXBwXFxcXHJlbWl4LmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovZG9fYW4vTmViby9uZWJvLWZvbnRlbmRzL2FwcHMvc3RvcmVmb250L2FwcC9yZW1peC5jb25maWcuanNcIjsvKiogQHR5cGUge2ltcG9ydCgnQHJlbWl4LXJ1bi9kZXYnKS5WaXRlUGx1Z2luQ29uZmlnfSAqL1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgcm91dGVzKGRlZmluZVJvdXRlcykge1xyXG4gICAgcmV0dXJuIGRlZmluZVJvdXRlcygocm91dGUpID0+IHtcclxuICAgICAgcm91dGUoXCJcIiwgXCJyb3V0ZXMvX2luZGV4LnRzeFwiLCB7IGluZGV4OiB0cnVlIH0pO1xyXG4gICAgICByb3V0ZShcInVzZXJzXCIsIFwicm91dGVzL3VzZXJzL19pbmRleC50c3hcIiwgKCkgPT4ge1xyXG4gICAgICAgIHJvdXRlKFwibG9naW5cIiwgXCJyb3V0ZXMvdXNlcnMvbG9naW4udHN4XCIpO1xyXG4gICAgICAgIHJvdXRlKFwic2lnbnVwXCIsIFwicm91dGVzL3VzZXJzL3NpZ251cC50c3hcIik7XHJcbiAgICAgIH0pO1xyXG4gICAgICByb3V0ZShcIndvcmtzcGFjZVwiLCBcInJvdXRlcy93b3Jrc3BhY2Uvd29ya3NwYWNlLnRzeFwiLCAoKSA9PiB7XHJcbiAgICAgICAgcm91dGUoXCJcIiwgXCJyb3V0ZXMvd29ya3NwYWNlL19pbmRleC50c3hcIiwgeyBpbmRleDogdHJ1ZSB9KTtcclxuICAgICAgICByb3V0ZShcInByb2plY3RzXCIsIFwicm91dGVzL3dvcmtzcGFjZS9wcm9qZWN0cy50c3hcIik7XHJcbiAgICAgICAgcm91dGUoXCJpbWFnZXNcIiwgXCJyb3V0ZXMvd29ya3NwYWNlL2ltYWdlcy50c3hcIik7XHJcbiAgICAgICAgcm91dGUoXCJ0ZW1wbGF0ZXNcIiwgXCJyb3V0ZXMvd29ya3NwYWNlL3RlbXBsYXRlcy50c3hcIik7XHJcbiAgICAgIH0pO1xyXG4gICAgICByb3V0ZShcImRvY3VtZW50c1wiLCBcInJvdXRlcy9kb2N1bWVudHMvX2luZGV4LnRzeFwiLCAoKSA9PiB7XHJcbiAgICAgICAgcm91dGUoXCJlZGl0b3JzXCIsIFwicm91dGVzL2RvY3VtZW50cy9lZGl0b3JzL19pbmRleC50c3hcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgcm91dGUoXCJcIiwgXCJyb3V0ZXMvZG9jdW1lbnRzL2VkaXRvcnMvbWFuYWdlLnRzeFwiLCB7IGluZGV4OiB0cnVlIH0pO1xyXG4gICAgICAgICAgcm91dGUoXCI6aWRcIiwgXCJyb3V0ZXMvZG9jdW1lbnRzL2VkaXRvcnMvJGlkLnRzeFwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIHNzcjogZmFsc2UsXHJcbiAgbWFuaWZlc3Q6IHRydWUsXHJcbiAgc2VydmVyRGVwZW5kZW5jaWVzVG9CdW5kbGU6IFtdLFxyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRUO0FBQUEsRUFDMVQsY0FBYztBQUFBLEVBQ2QsZ0NBQWdDO0FBQUEsT0FDM0I7QUFDUCxTQUFTLHNCQUFzQjtBQUMvQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLG1CQUFtQjs7O0FDTDFCLElBQU8sdUJBQVE7QUFBQSxFQUNiLE9BQU8sY0FBYztBQUNuQixXQUFPLGFBQWEsQ0FBQyxVQUFVO0FBQzdCLFlBQU0sSUFBSSxxQkFBcUIsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUM5QyxZQUFNLFNBQVMsMkJBQTJCLE1BQU07QUFDOUMsY0FBTSxTQUFTLHdCQUF3QjtBQUN2QyxjQUFNLFVBQVUseUJBQXlCO0FBQUEsTUFDM0MsQ0FBQztBQUNELFlBQU0sYUFBYSxrQ0FBa0MsTUFBTTtBQUN6RCxjQUFNLElBQUksK0JBQStCLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDeEQsY0FBTSxZQUFZLCtCQUErQjtBQUNqRCxjQUFNLFVBQVUsNkJBQTZCO0FBQzdDLGNBQU0sYUFBYSxnQ0FBZ0M7QUFBQSxNQUNyRCxDQUFDO0FBQ0QsWUFBTSxhQUFhLCtCQUErQixNQUFNO0FBQ3RELGNBQU0sV0FBVyx1Q0FBdUMsTUFBTTtBQUM1RCxnQkFBTSxJQUFJLHVDQUF1QyxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQ2hFLGdCQUFNLE9BQU8sa0NBQWtDO0FBQUEsUUFDakQsQ0FBQztBQUFBLE1BQ0gsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLEtBQUs7QUFBQSxFQUNMLFVBQVU7QUFBQSxFQUNWLDRCQUE0QixDQUFDO0FBQy9COzs7QURsQkEsT0FBTyxVQUFVO0FBUmpCLElBQU0sbUNBQW1DO0FBVXpDLGVBQWU7QUFFZixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxvQkFBVyxHQUFHLFdBQVcsR0FBRyxjQUFjLENBQUM7QUFBQSxFQUMzRCxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsSUFDcEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxjQUFjO0FBQUE7QUFBQSxJQUVaLFNBQVMsQ0FBQyxtQkFBbUI7QUFBQSxJQUM3QixTQUFTLENBQUMscUJBQXFCO0FBQUEsSUFDL0IsZ0JBQWdCO0FBQUE7QUFBQSxNQUVkLGVBQWU7QUFBQSxJQUNqQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxRQUNOLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFNBQVMsQ0FBQ0EsVUFBU0EsTUFBSyxRQUFRLFVBQVUsRUFBRTtBQUFBLE1BQzlDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
