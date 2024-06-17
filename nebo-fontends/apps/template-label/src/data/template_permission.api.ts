import {
  EvaluateTemplatePermission,
  ListResponse,
  Template,
  TemplateAppPermission,
  TemplateAppPermissionRequest,
  TemplateFilterRequest,
  TemplateRequest,
  TemplateResponse,
  TemplateUserPermission,
  TemplateUserPermissionFilterRequest,
  TemplateUserPermissionRequest,
} from "../types";
import { storefontApi, transformAxiosErrorResponse } from "./api";
import { toQueryString } from "../utils/url";

const templatePermissionApi = storefontApi.injectEndpoints({
  endpoints: (builder) => ({
    shareTemplate: builder.mutation<
      Template,
      { id: number; request: TemplateUserPermissionRequest }
    >({
      query: (q) => {
        return {
          url: `/api/templates/${q.id}/share`,
          body: { template_user_permission: q.request },
          method: "POST",
        };
      },
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (res: TemplateResponse) => res.template,
      invalidatesTags: (result, _error) => (result ? ["template"] : []),
    }),
    getTemplateUserPermissions: builder.query<
      ListResponse<TemplateUserPermission>,
      {
        id: number;
        filter: TemplateUserPermissionFilterRequest;
      }
    >({
      query: (q) =>
        `/api/templates/${q.id}/permissions${toQueryString(q.filter)}`,
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (res: {
        template_user_permissions: ListResponse<TemplateUserPermission>;
      }) => res.template_user_permissions,
      providesTags: (result, _error) => (result ? ["template"] : []),
    }),
    evaluateTemplateUserPermissions: builder.query<
      EvaluateTemplatePermission[],
      number[]
    >({
      query: (q) =>
        `/api/templates/evaluate_permissions?template_ids=${q.join(",")}`,
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (res: EvaluateTemplatePermission[]) => res,
      providesTags: (result, _error) => (result ? ["template"] : []),
    }),
    shareTemplateAppPermission: builder.mutation<
      TemplateAppPermission,
      TemplateAppPermissionRequest
    >({
      query: (q) => {
        return {
          url: `/api/templates/app_permissions`,
          body: { template_app_permission: q },
          method: "POST",
        };
      },
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (res: {
        template_app_permission: TemplateAppPermission;
      }) => res.template_app_permission,
      invalidatesTags: (result, _error) =>
        result ? ["template", "api_key"] : [],
    }),
    getTemplateAppPermission: builder.query<TemplateAppPermission, number>({
      query: (q) => `/api/templates/app_permissions/app_id/${q}`,
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (res: {
        template_app_permission: TemplateAppPermission;
      }) => res.template_app_permission,
      providesTags: (result, _error) => (result ? ["template", "api_key"] : []),
    }),
  }),
});

export const {
  useShareTemplateMutation,
  useGetTemplateUserPermissionsQuery,
  useGetTemplateAppPermissionQuery,
  useEvaluateTemplateUserPermissionsQuery,
  useShareTemplateAppPermissionMutation,
} = templatePermissionApi;
