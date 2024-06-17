import { Navigate, Outlet, RouteObject } from "react-router";
import { CustomizeRouteObject } from "./types";
import { Component, ReactNode, Suspense } from "react";
import { AuthService } from "./AuthService";

export const transformRouter = (
  customRoutes: CustomizeRouteObject[]
): RouteObject[] => {
  const routes: RouteObject[] = [];

  for (const route of customRoutes) {
    const element = renderComponent(route);
    routes.push({
      ...route,
      element: element,
      children: route.children ? transformRouter(route.children) : undefined,
    } as RouteObject);
  }
  return routes;
};

const renderComponent = (route: CustomizeRouteObject) => {
  let element = route.element;
  const PComponent = route.component;
  if (PComponent !== undefined && PComponent !== null) {
    element = <PComponent />;
  }
  if (element === null || element === undefined) element = <Outlet />;
  if (route.canActivate) {
    element = (
      <AuthService canActivate={route.canActivate} route={route}>
        {element}
      </AuthService>
    );
  }
  if (route.fallback !== undefined && route.fallback) {
    return <Suspense fallback={route.fallback}>{element}</Suspense>;
  }
  return element;
};
