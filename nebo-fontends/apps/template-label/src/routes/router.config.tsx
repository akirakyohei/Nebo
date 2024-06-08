import { lazy } from "react";
import { CustomizeRouteObject } from "./types";
import { WorkspacePageSkeleton } from "../features/workspaces/components/WorkspacePageSkeleton";
import { AnalyticsReportSkeleton } from "../features/analytics/components/AnalyticsReportSkeleton";
import { ApiKeySettingSkeleton } from "../features/settings/components/integration/ApiKeySettingSkeleton";
import { AccountSettingSkeleton } from "../features/settings/components/account/AccountSettingSkeleton";
import { CategoryTemplateSelect } from "../features/workspaces/components/CategoryTemplateSelect";
import { CategorySkeleton } from "../features/documents/components/category/CategorySkeleton";
import { MediaFileSkeleton } from "../features/documents/components/media_file/MediaFileSkeleton";

export const routes: CustomizeRouteObject[] = [
  {
    path: "/",
    Component: lazy(() => import("../features/layout/Layout")),
    children: [
      {
        path: "",
        Component: lazy(() => import("../features/home/HomePage")),
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
            fallback: <MediaFileSkeleton />,
            Component: lazy(
              () => import("../features/documents/MediaFilePage")
            ),
          },
          {
            path: "categories",
            fallback: <CategorySkeleton />,
            Component: lazy(() => import("../features/documents/CategoryPage")),
          },
          {
            path: "templates",
            fallback: <WorkspacePageSkeleton />,
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
            fallback: <AnalyticsReportSkeleton />,
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
            fallback: <AccountSettingSkeleton />,
            Component: lazy(
              () => import("../features/settings/AccountSettingPage")
            ),
          },
          {
            path: "integration",
            fallback: <ApiKeySettingSkeleton />,
            Component: lazy(
              () => import("../features/settings/IntegrationSettingPage")
            ),
          },
        ],
      },
      {
        path: "workspaces",
        children: [
          {
            path: ":id",
            fallback: <WorkspacePageSkeleton />,
            Component: lazy(
              () => import("../features/workspaces/EditorManagePage")
            ),
          },
          {
            path: "",
            Component: lazy(
              () => import("../features/layout/ErrorBoundary/NotFoundPage")
            ),
          },
          {
            path: "*",
            Component: lazy(
              () => import("../features/layout/ErrorBoundary/NotFoundPage")
            ),
          },
        ],
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
