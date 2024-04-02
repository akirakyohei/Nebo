import { RouteObject } from "react-router-dom";
import { RouteConfig } from "./types";
import ForbiddenPage from "../../components/ErrorBoundary/ForbiddenPage";
import { validateParams } from "./validateParams";
import NotFoundPage from "../../components/ErrorBoundary/NotFoundPage";
import { Suspense } from "react";
import { createProtectedComponent } from "./createProtectedComponent";

export const createReactRouter = (routes: RouteConfig[]): RouteObject[] => {
  return routes.map((route) => {
    const canActive = true;
    let component: React.ReactNode = null;
    if (!canActive) component = <ForbiddenPage />;
    if (route.validateParams && !validateParams(route.validateParams))
      component = <NotFoundPage />;
    if (route.Component) {
      const ProtectedComponent = createProtectedComponent(route.Component);
      if (route.fallback)
        component = (
          <Suspense fallback={route.fallback}>
            <ProtectedComponent {...route} />
          </Suspense>
        );
      else component = <ProtectedComponent {...route} />;
    } else {
      component = route.element;
    }
    return {
      ...route,
      element: component,
      Component: null,
      children: route?.children ? createReactRouter(route.children) : undefined,
    } as RouteObject;
  });
};
