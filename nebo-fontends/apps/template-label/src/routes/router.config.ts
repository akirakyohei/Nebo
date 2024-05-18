import { lazy } from "react";
import { CustomizeRouteObject } from "./types";

export const routes: CustomizeRouteObject[] = [
  {
    path: "/",
    Component: lazy(() => import("../features/layout/Layout")),
    children: [
      {
        path: "",
        Component: lazy(() => import("../features/dashboard/DashboardPage")),
        index: true,
      },
      {
        path: "users",
        children: [
          {
            path: "login",
            Component: lazy(() => import("../features/users/LoginPage")),
          },
          {
            path: "signup",
            Component: lazy(() => import("../features/users/SignupPage")),
          },
        ],
      },
      {
        path: "documents",
        Component: lazy(() => import("../features/documents/DocumentLayout")),
        children: [
          {
            path: "",
            Component: lazy(
              () => import("../features/documents/DashboardPage")
            ),
            index: true,
          },
          {
            path: "projects",
            Component: lazy(() => import("../features/documents/ProjectPage")),
          },
          {
            path: "media_files",
            Component: lazy(
              () => import("../features/documents/MediaFilePage")
            ),
          },
          {
            path: "templates",
            Component: lazy(() => import("../features/documents/TemplatePage")),
          },
        ],
      },
      {
        path: "/workspaces",
        Component: lazy(
          () => import("../features/workspaces//EditorManagePage")
        ),
      },
    ],
  },
  {
    path: "*",
    Component: lazy(
      () => import("../features/layout/ErrorBoundary/NotFoundPage")
    ),
  },
];
