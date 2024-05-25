import {
  useGetAggregateReportQuery,
  useGetTopUsedPaperTypeQuery,
  useGetTopUsedTemplateQuery,
  useGetUsedPaperTypeQuery,
  useGetUsedTemplateQuery,
} from "../../../data/report.api";
import {
  AggregateReport,
  TopUsedPaperType,
  TopUsedTemplate,
  UsedPaperTypes,
  UsedTemplates,
} from "../../../types";

export type Data = {
  aggregateReport?: AggregateReport;
  topUsedPaperTypes?: TopUsedPaperType[];
  topUsedTemplates?: TopUsedTemplate[];
  usedPaperTypes?: UsedPaperTypes;
  usedTemplates?: UsedTemplates;
  isLoading: boolean;
  isFetching: boolean;
};

export const useGetReportData = (): Data => {
  const {
    data: aggregateReport,
    isLoading: isLoadingAggregateReport,
    isFetching: isFetchingAggregateReport,
  } = useGetAggregateReportQuery();

  const {
    data: topUsedPaperTypes,
    isLoading: isLoadingTopUsedPaper,
    isFetching: isFetchingTopUsedPaper,
  } = useGetTopUsedPaperTypeQuery({});

  const {
    data: topUsedTemplates,
    isLoading: isLoadingTopUsedTemplate,
    isFetching: isFetchingTopUsedTemplate,
  } = useGetTopUsedTemplateQuery({});

  const {
    data: usedPaperTypes,
    isLoading: isLoadingUsedPaperType,
    isFetching: isFetchingUsedPaperType,
  } = useGetUsedPaperTypeQuery({});

  const {
    data: usedTemplates,
    isLoading: isLoadingUsedTemplate,
    isFetching: isFetchingUsedTemplate,
  } = useGetUsedTemplateQuery({});

  const isLoading =
    isLoadingAggregateReport ||
    isLoadingTopUsedPaper ||
    isLoadingTopUsedTemplate ||
    isLoadingUsedPaperType ||
    isLoadingUsedTemplate;

  const isFetching =
    isFetchingAggregateReport ||
    isFetchingTopUsedPaper ||
    isFetchingTopUsedTemplate ||
    isFetchingUsedPaperType ||
    isFetchingUsedTemplate;
  return {
    aggregateReport,
    topUsedPaperTypes,
    topUsedTemplates,
    usedPaperTypes,
    usedTemplates,
    isLoading,
    isFetching,
  };
};
