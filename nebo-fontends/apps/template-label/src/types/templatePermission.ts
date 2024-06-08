import { PageFilterRequest } from "./common";
import { SharedStatus } from "./template";

export type EvaluateTemplatePermission = {
  template_id: number;
  owner_id: number;
  permissions: string[];
};

export type TemplateUserPermissionFilterRequest = PageFilterRequest & {
  query?: string;
  shared_user_ids?: number;
};

export type UserPermissionRequest = {
  user_id: number;
  permissions: string[];
};

export type TemplateUserPermissionRequest = {
  template_id: number;
  shared_status: SharedStatus;
  putUsers: UserPermissionRequest[];
  removeUsers: number[];
};

export type TemplateUserPermission = {
  id: number;
  template_id: number;
  owner_user_id: number;
  shared_user_id: number;
  permissions: string[];
  created_at: string;
  updated_at: string;
};

export type TemplateAppPermission = {
  id: number;
  user_id: number;
  app_id: number;
  template_ids: number[];
  created_at: string;
  updated_at: string;
};

export type TemplateAppPermissionRequest = {
  app_id: number;
  template_ids: number[];
};
