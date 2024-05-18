import { Navigate, RouteObject } from "react-router";
import { CustomizeRouteObject } from "./types";
import { store } from "../store/store";
import { Component, ReactNode, Suspense } from "react";
import { RootState } from "../store/store";
import AccessDeniedPage from "../features/layout/ErrorBoundary/AccessDeniedPage";

export const transformRouter = (
  customRoutes: CustomizeRouteObject[]
): RouteObject[] => {
  const routes: RouteObject[] = [];
  const rootState = store.getState();
  for (const route of customRoutes) {
    const element = renderComponent(route, rootState);
    routes.push({
      ...route,
      element: element,
      children: route.children ? transformRouter(route.children) : undefined,
    } as RouteObject);
  }
  return routes;
};

const renderComponent = (route: CustomizeRouteObject, state: RootState) => {
  let element = route.element;
  if (route.canActivate) {
    if (route.canActivate(route, state)) {
      const PComponent = route.Component;
      if (PComponent !== undefined && PComponent !== null) {
        element = <PComponent />;
      }
    } else {
      if (state.workspace.user.id === 0) {
        element = <Navigate to={"/users/login"} />;
      } else {
        element = <AccessDeniedPage />;
      }
    }
  } else {
    const PComponent = route.Component;
    if (PComponent !== undefined && PComponent !== null) {
      element = <PComponent />;
    }
  }

  if (route.fallback !== undefined && route.fallback) {
    return <Suspense fallback={route.fallback}>{element}</Suspense>;
  }
  return element;
};
