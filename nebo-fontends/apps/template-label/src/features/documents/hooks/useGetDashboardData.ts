import { useGetAggregateReportQuery } from "../../../data/report.api";
import { useGetTemplatesQuery } from "../../../data/template.api";
import { AggregateReport, ListResponse, Template } from "../../../types";

export type Data = {
  aggregateReport?: AggregateReport;
  templates: ListResponse<Template>;
  isLoading: boolean;
  isFetching: boolean;
};

export const useGetDashboardData = (): Data => {
  const {
    data: aggregateReport,
    isLoading: isLoadingAggregateReport,
    isFetching: isFetchingAggregateReport,
  } = useGetAggregateReportQuery();

  const {
    data: templates = {
      data: [] as Template[],
      metadata: { total_element: 0, limit: 20, page: 1 },
    },
    isLoading: isLoadingTemplate,
    isFetching: isFetchingTemplate,
  } = useGetTemplatesQuery({
    limit: 10,
    page: 1,
    owner: true,
  });

  const isLoading = isLoadingAggregateReport || isLoadingTemplate;

  const isFetching = isFetchingAggregateReport || isFetchingTemplate;
  return {
    aggregateReport,
    templates,
    isLoading,
    isFetching,
  };
};
