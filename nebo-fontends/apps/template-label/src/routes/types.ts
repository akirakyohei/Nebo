import { RouteObject } from "react-router";
import { RootState } from "../store/store";
import { ReactNode } from "react";

export type CustomizeRouteObject = RouteObject & {
  fallback?: React.ReactNode;
  canActivate?: CanActivateFn;
  children?: CustomizeRouteObject[];
  permissions?: string[];
  component?: React.ComponentType | null;
};

export type CanActivateFn = (
  route: CustomizeRouteObject,
  state: RootState
) => boolean;
