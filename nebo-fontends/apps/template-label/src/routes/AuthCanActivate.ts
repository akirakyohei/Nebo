import { RootState } from "../store/store";
import { CanActivateFn, CustomizeRouteObject } from "./types";

export const AuthCanActivate =
  (): CanActivateFn => (route: CustomizeRouteObject, state: RootState) => {
    if (state.workspace.isLoading) return true;
    if (!route.permissions) {
      return state.workspace.user.id !== 0;
    }
    return state.workspace.user.permissions.some((permission) =>
      route.permissions?.includes(permission)
    );
  };
