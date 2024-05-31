import { request } from "http";
import {
  ApiKey,
  ApiKeyDetail,
  ApiKeyFilterRequest,
  ApiKeyRequest,
} from "../types/apiKey";
import { storefontApi, transformAxiosErrorResponse } from "./api";
import { ListResponse } from "../types";
import { toQueryString } from "../utils/url";

export const apiKeyApi = storefontApi.injectEndpoints({
  endpoints: (builder) => ({
    createApiKey: builder.mutation<ApiKeyDetail, ApiKeyRequest>({
      query: (q) => {
        return {
          url: `/api/api_apps`,
          method: "POST",
          body: { api_key: q },
        };
      },
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (response: { api_key: ApiKeyDetail }) =>
        response.api_key,
      invalidatesTags: (result, _error) => (result ? ["api_key"] : []),
    }),
    updateApiKey: builder.mutation<
      ApiKeyDetail,
      { id: number; request: ApiKeyRequest }
    >({
      query: (q) => {
        return {
          url: `/api/api_apps/${q.id}`,
          method: "PUT",
          body: { api_key: q.request },
        };
      },
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (response: { api_key: ApiKeyDetail }) =>
        response.api_key,
      invalidatesTags: (result, _error) => (result ? ["api_key"] : []),
    }),
    getApiKeys: builder.query<ListResponse<ApiKey>, ApiKeyFilterRequest>({
      query: (q) => {
        return {
          url: `/api/api_apps${toQueryString(q)}`,
          method: "GET",
        };
      },
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (response: { api_keys: ListResponse<ApiKey> }) =>
        response.api_keys,
      providesTags: (result, _error) => (result ? ["api_key"] : []),
    }),
    getApiKey: builder.query<ApiKeyDetail, number>({
      query: (q) => {
        return {
          url: `/api/api_apps/${q}`,
          method: "GET",
        };
      },
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (response: { api_key: ApiKeyDetail }) =>
        response.api_key,
      providesTags: (result, _error) => (result ? ["api_key"] : []),
    }),
    deleteApiKey: builder.mutation<void, number>({
      query: (q) => {
        return {
          url: `/api/api_apps/${q}`,
          method: "DELETE",
        };
      },
      transformErrorResponse: transformAxiosErrorResponse,
      invalidatesTags: (_result, _error) => (!_error ? ["api_key"] : []),
    }),
  }),
});

export const {
  useCreateApiKeyMutation,
  useUpdateApiKeyMutation,
  useGetApiKeysQuery,
  useGetApiKeyQuery,
  useDeleteApiKeyMutation,
} = apiKeyApi;
