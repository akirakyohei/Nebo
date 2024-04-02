import { lazy } from "react";
import { RouteConfig } from "./layout/types";

export const routes: RouteConfig[] = [
  {
    path: "/",
    Component: lazy(() => import("./auth/SignupPage")),
    permissions: [],
  },
  {
    path: "/signin",
    Component: lazy(() => import("./auth/SigninPage")),
    permissions: [],
  },
  {
    path: "/signup",
    Component: lazy(() => import("./auth/SignupPage")),
    permissions: [],
  },
];
