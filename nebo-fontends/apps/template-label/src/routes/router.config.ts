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
            path: "assets",
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
        path: "analytics",
        Component: lazy(() => import("../features/documents/DocumentLayout")),
        children: [
          {
            path: "",
            Component: lazy(() => import("../features/analytics/AnalyticPage")),
          },
        ],
      },
      {
        path: "settings",
        Component: lazy(() => import("../features/documents/DocumentLayout")),
        children: [
          {
            path: "account",
            Component: lazy(
              () => import("../features/settings/AccountSettingPage")
            ),
          },
          {
            path: "integration",
            Component: lazy(
              () => import("../features/settings/IntegrationSettingPage")
            ),
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
