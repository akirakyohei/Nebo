import {
  AggregateReport,
  HistorySession,
  HistorySessionFilterRequest,
  ListResponse,
  TimeFilterRequest,
  TopTimeRequest,
  TopUsedPaperType,
  TopUsedTemplate,
  UsedPaperTypes,
  UsedTemplates,
} from "../types";
import { storefontApi, transformAxiosErrorResponse } from "./api";
import { toQueryString } from "../utils/url";

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
      transformResponse: (res: TopUsedPaperType[]) => res,
    }),
    getTopUsedTemplate: builder.query<TopUsedTemplate[], TopTimeRequest>({
      query: (q) => `/api/reports/top_used_template${toQueryString(q)}`,
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (res: TopUsedTemplate[]) => res,
    }),
    getUsedTemplate: builder.query<UsedTemplates, TimeFilterRequest>({
      query: (q) => `/api/reports/used_template${toQueryString(q)}`,
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (res: { used_templates: UsedTemplates }) =>
        res.used_templates,
    }),
    getUsedPaperType: builder.query<UsedPaperTypes, TimeFilterRequest>({
      query: (q) => `/api/reports/used_paper_type${toQueryString(q)}`,
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (res: { used_paper_types: UsedPaperTypes }) =>
        res.used_paper_types,
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
