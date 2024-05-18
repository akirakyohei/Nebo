import {
  ListResponse,
  Template,
  TemplateFilterRequest,
  TemplateRequest,
  TemplateResponse,
} from "../types";
import { storefontApi, transformAxiosErrorResponse } from "./api";
import { toQueryString } from "../utils/url";

const templateApi = storefontApi.injectEndpoints({
  endpoints: (builder) => ({
    getTemplates: builder.query<ListResponse<Template>, TemplateFilterRequest>({
      query: (q) =>
        `/api/templates${!q.owner ? "/default" : ""}${toQueryString(q)}`,
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (res: { templates: ListResponse<Template> }) =>
        res.templates,
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
    }),
    getTemplate: builder.query<Template, number>({
      query: (q) => `/api/templates/${q}`,
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (res: TemplateResponse) => res.template,
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
    }),
    deleteTemplate: builder.mutation<void, number>({
      query: (q) => {
        return {
          url: `/api/templates/${q}`,
          method: "DELETE",
        };
      },
      transformErrorResponse: transformAxiosErrorResponse,
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
} = templateApi;
