/** @type {import('@remix-run/dev').VitePluginConfig} */
export default {
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
};
