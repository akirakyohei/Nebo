import { RouteObject } from "react-router-dom";

export type RouteConfig = RouteObject & {
  permissions: string[];
  fallback?: React.ReactNode;
  children?: RouteConfig[];
  validateParams?: ValidateParam[];
};

export interface Validator {
  validate: (value?: any) => boolean;
}

export type ValidateParam = {
  name: string;
  validators: Validator[];
};
