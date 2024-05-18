import {
  AggregateReport,
  HistorySession,
  HistorySessionFilterRequest,
  ListResponse,
  TimeFileRequest,
  TopTimeRequest,
  TopUsedPaperType,
  TopUsedTemplate,
  UsedPaperTypes,
  UsedTemplates,
} from "app/types";
import { storefontApi, transformAxiosErrorResponse } from "./api";
import { toQueryString } from "app/utils/url";

const reportApi = storefontApi.injectEndpoints({
  endpoints: (builder) => ({
    getAggregateReport: builder.query<AggregateReport, void>({
      query: () => `/api/reports`,
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (res: { aggregate_report: AggregateReport }) =>
        res.aggregate_report,
    }),
    getHistorySession: builder.query<
      ListResponse<HistorySession>,
      HistorySessionFilterRequest
    >({
      query: (q) => `/api/reports/sessions${toQueryString(q)}`,
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (res: ListResponse<HistorySession>) => res,
    }),
    getTopUsedPaperType: builder.query<TopUsedPaperType[], TopTimeRequest>({
      query: (q) => `/api/reports/top_used_paper_type${toQueryString(q)}`,
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (res: { top_used_paper_types: TopUsedPaperType[] }) =>
        res.top_used_paper_types,
    }),
    getTopUsedTemplate: builder.query<TopUsedTemplate[], TopTimeRequest>({
      query: (q) => `/api/reports/top_used_template${toQueryString(q)}`,
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (res: { top_used_templates: TopUsedTemplate[] }) =>
        res.top_used_templates,
    }),
    getUsedTemplate: builder.query<UsedTemplates, TimeFileRequest>({
      query: (q) => `/api/reports/used_template${toQueryString(q)}`,
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (res: UsedTemplates) => res,
    }),
    getUsedPaperType: builder.query<UsedPaperTypes, TimeFileRequest>({
      query: (q) => `/api/reports/used_paper_type${toQueryString(q)}`,
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (res: UsedPaperTypes) => res,
    }),
  }),
});

export const {
  useGetAggregateReportQuery,
  useGetHistorySessionQuery,
  useGetTopUsedPaperTypeQuery,
  useGetTopUsedTemplateQuery,
  useGetUsedPaperTypeQuery,
  useGetUsedTemplateQuery,
} = reportApi;
