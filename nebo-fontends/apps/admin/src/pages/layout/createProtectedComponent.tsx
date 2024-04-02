import { ComponentType } from "react";
import { RouteConfig } from "./types";

export const createProtectedComponent =
  (Component: ComponentType) =>
  ({ ...metaRoute }: RouteConfig) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <Component {...metaRoute} />;
  };
