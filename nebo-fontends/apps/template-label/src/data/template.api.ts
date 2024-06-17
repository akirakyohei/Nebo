import {
  ListResponse,
  Template,
  TemplateExportRequest,
  TemplateFilterRequest,
  TemplatePreviewRequest,
  TemplateRequest,
  TemplateResponse,
} from "../types";
import { storefontApi, transformAxiosErrorResponse } from "./api";
import { toQueryString } from "../utils/url";
import { client } from "../utils/client";

const templateApi = storefontApi.injectEndpoints({
  endpoints: (builder) => ({
    getTemplates: builder.query<ListResponse<Template>, TemplateFilterRequest>({
      query: (q) =>
        `/api/templates${!q.owner ? "/default" : ""}${toQueryString(q)}`,
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (res: { templates: ListResponse<Template> }) =>
        res.templates,
      providesTags: (result, _error) => (result ? ["template"] : []),
    }),
    getTemplatesWithInfinite: builder.query<
      ListResponse<Template>,
      TemplateFilterRequest
    >({
      query: (q) =>
        `/api/templates${!q.owner ? "/default" : ""}${toQueryString(q)}`,
      serializeQueryArgs: ({ queryArgs }) => {
        const { page, ...rest } = queryArgs;
        return rest;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (!arg.page || arg.page === 1) {
          return newItems;
        } else {
          currentCache.data.push(...newItems.data);
          currentCache.metadata = newItems.metadata;
          return currentCache;
        }
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
      transformResponse: (response: { templates: ListResponse<Template> }) =>
        response.templates,
      providesTags: (result, _error) => (result ? ["template"] : []),
    }),
    getTemplate: builder.query<Template, number>({
      query: (q) => `/api/templates/${q}`,
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (res: TemplateResponse) => res.template,
      providesTags: (result, _error) => (result ? ["template"] : []),
    }),
    createTemplate: builder.mutation<Template, Partial<TemplateRequest>>({
      query: (q) => {
        return {
          url: `/api/templates`,
          body: { template: q },
          method: "POST",
        };
      },
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (res: TemplateResponse) => res.template,
      invalidatesTags: (_result, _error) => (!_error ? ["template"] : []),
    }),
    updateTemplate: builder.mutation<
      Template,
      { id: number; request: Partial<TemplateRequest> }
    >({
      query: (q) => {
        return {
          url: `/api/templates/${q.id}`,
          body: { template: q.request },
          method: "PUT",
        };
      },
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (res: TemplateResponse) => res.template,
      invalidatesTags: (result, _error) => (result ? ["template"] : []),
    }),
    deleteTemplate: builder.mutation<void, number>({
      query: (q) => {
        return {
          url: `/api/templates/${q}`,
          method: "DELETE",
        };
      },
      transformErrorResponse: transformAxiosErrorResponse,
      invalidatesTags: (_result, _error) => (!_error ? ["template"] : []),
    }),
    previewTemplate: builder.query<Blob, TemplatePreviewRequest>({
      queryFn: async (_da, _queryApi, _extraOptions, fetchWithBQ) => {
        const {
          data: { data },
        } = await client.request<{ data: Blob }>({
          url: "/api/templates/preview",
          method: "POST",
          data: {
            template_preview: { ..._da, format: "pdf" },
          },
          responseType: "blob",
          transformResponse: (data) => {
            return { data };
          },
        });
        return { data };
      },
    }),
    previewTemplateToHtml: builder.query<string, TemplatePreviewRequest>({
      queryFn: async (_da, _queryApi, _extraOptions, _fetchWithBQ) => {
        const {
          data: { html },
        } = await client.request<{ html: string }>({
          url: "/api/templates/preview",
          method: "POST",
          data: {
            template_preview: { ..._da, format: "html" },
          },
        });
        return { data: html };
      },
    }),
    exportTemplate: builder.mutation<
      Blob,
      { id: number; request: TemplateExportRequest }
    >({
      queryFn: async (_da, _queryApi, _extraOptions, _fetchWithBQ) => {
        const {
          data: { data },
        } = await client.request<{ data: Blob }>({
          url: `/api/templates/${_da.id}/export`,
          method: "POST",
          data: {
            template_export: { ..._da.request, format: "pdf" },
          },
          responseType: "blob",
          transformResponse: (data) => {
            return { data };
          },
        });
        return { data };
      },
    }),
    exportTemplateToHtml: builder.mutation<
      string,
      { id: number; request: TemplateExportRequest }
    >({
      queryFn: async (_da, _queryApi, _extraOptions, fetchWithBQ) => {
        const {
          data: { html },
        } = await client.request<{ html: string }>({
          url: `/api/templates/${_da.id}/export`,
          method: "POST",
          data: {
            template_export: { ..._da.request, format: "html" },
          },
        });
        return { data: html };
      },
    }),
  }),
});

export const {
  useGetTemplatesQuery,
  useGetTemplatesWithInfiniteQuery,
  useGetTemplateQuery,
  useCreateTemplateMutation,
  useUpdateTemplateMutation,
  useDeleteTemplateMutation,
  usePreviewTemplateQuery,
  usePreviewTemplateToHtmlQuery,
  useLazyPreviewTemplateQuery,
  useExportTemplateMutation,
  useExportTemplateToHtmlMutation,
} = templateApi;
