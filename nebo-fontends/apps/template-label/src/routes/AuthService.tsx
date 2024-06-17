import { ReactNode, useMemo } from "react";
import { Navigate } from "react-router";
import AccessDeniedPage from "../features/layout/ErrorBoundary/AccessDeniedPage";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { CanActivateFn, CustomizeRouteObject } from "./types";

interface Props {
  children: ReactNode | ReactNode[];
  canActivate: CanActivateFn;
  route: CustomizeRouteObject;
}

export const AuthService = ({ canActivate, route, children }: Props) => {
  const rootState = useSelector<RootState, RootState>((state) => state);

  if (!canActivate(route, rootState)) {
    if (rootState.workspace.user.id === 0) {
      return <Navigate to={"/users/login"} />;
    } else {
      return <AccessDeniedPage />;
    }
  }
  return <>{children}</>;
};
