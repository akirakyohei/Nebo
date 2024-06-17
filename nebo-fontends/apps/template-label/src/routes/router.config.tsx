import { lazy } from "react";
import { CustomizeRouteObject } from "./types";
import { WorkspacePageSkeleton } from "../features/workspaces/components/WorkspacePageSkeleton";
import { AnalyticsReportSkeleton } from "../features/analytics/components/AnalyticsReportSkeleton";
import { ApiKeySettingSkeleton } from "../features/settings/components/integration/ApiKeySettingSkeleton";
import { AccountSettingSkeleton } from "../features/settings/components/account/AccountSettingSkeleton";
import { CategoryTemplateSelect } from "../features/workspaces/components/CategoryTemplateSelect";
import { CategorySkeleton } from "../features/documents/components/category/CategorySkeleton";
import { MediaFileSkeleton } from "../features/documents/components/media_file/MediaFileSkeleton";
import { AuthCanActivate } from "./AuthCanActivate";

export const routes: CustomizeRouteObject[] = [
  {
    path: "/",
    component: lazy(() => import("../features/layout/Layout")),
    children: [
      {
        path: "",
        component: lazy(() => import("../features/home/HomePage")),
        index: true,
      },
      {
        path: "users",
        children: [
          {
            path: "login",
            component: lazy(() => import("../features/users/LoginPage")),
          },
          {
            path: "signup",
            component: lazy(() => import("../features/users/SignupPage")),
          },
        ],
      },
      {
        path: "documents",
        component: lazy(() => import("../features/documents/DocumentLayout")),
        canActivate: AuthCanActivate(),
        children: [
          {
            path: "",
            component: lazy(
              () => import("../features/documents/DashboardPage")
            ),
            index: true,
          },
          {
            path: "assets",
            fallback: <MediaFileSkeleton />,
            component: lazy(
              () => import("../features/documents/MediaFilePage")
            ),
          },
          {
            path: "categories",
            fallback: <CategorySkeleton />,
            component: lazy(() => import("../features/documents/CategoryPage")),
          },
          {
            path: "templates",
            fallback: <WorkspacePageSkeleton />,
            component: lazy(() => import("../features/documents/TemplatePage")),
          },
        ],
      },
      {
        path: "documents/templates",
        canActivate: AuthCanActivate(),
        children: [
          {
            path: ":id",
            fallback: <WorkspacePageSkeleton />,
            component: lazy(
              () => import("../features/workspaces/EditorManagePage")
            ),
          },
          {
            path: ":id/preview",
            fallback: <WorkspacePageSkeleton />,
            component: lazy(
              () => import("../features/workspaces/EditorManagePage")
            ),
          },
        ],
      },
      {
        path: "analytics",
        component: lazy(() => import("../features/documents/DocumentLayout")),
        canActivate: AuthCanActivate(),
        children: [
          {
            path: "",
            fallback: <AnalyticsReportSkeleton />,
            component: lazy(() => import("../features/analytics/AnalyticPage")),
          },
        ],
      },
      {
        path: "settings",
        component: lazy(() => import("../features/documents/DocumentLayout")),
        canActivate: AuthCanActivate(),
        children: [
          {
            path: "account",
            fallback: <AccountSettingSkeleton />,
            component: lazy(
              () => import("../features/settings/AccountSettingPage")
            ),
          },
          {
            path: "integration",
            fallback: <ApiKeySettingSkeleton />,
            component: lazy(
              () => import("../features/settings/IntegrationSettingPage")
            ),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    component: lazy(
      () => import("../features/layout/ErrorBoundary/NotFoundPage")
    ),
  },
];
