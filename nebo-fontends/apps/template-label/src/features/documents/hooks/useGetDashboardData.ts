import { useGetCategoriesQuery } from "../../../data/category.api";
import { useGetAggregateReportQuery } from "../../../data/report.api";
import { useGetTemplatesQuery } from "../../../data/template.api";
import {
  AggregateReport,
  Category,
  ListResponse,
  Template,
} from "../../../types";

export type Data = {
  aggregateReport: AggregateReport;
  templates: ListResponse<Template>;
  defaultTemplates: ListResponse<Template>;
  sharedTemplates: ListResponse<Template>;
  categories: ListResponse<Category>;
  isLoading: boolean;
  isFetching: boolean;
};

export const useGetDashboardData = (): Data => {
  const {
    data: aggregateReport = {
      total_data: 0,
      total_template: 0,
      total_used_template: 0,
    },
    isLoading: isLoadingAggregateReport,
    isFetching: isFetchingAggregateReport,
  } = useGetAggregateReportQuery();

  const {
    data: templates = {
      data: [],
      metadata: { total_element: 0, limit: 20, page: 1 },
    },
    isLoading: isLoadingTemplate,
    isFetching: isFetchingTemplate,
  } = useGetTemplatesQuery({
    limit: 10,
    page: 1,
    owner: true,
  });

  const {
    data: defaultTemplates = {
      data: [],
      metadata: { total_element: 1, limit: 10, page: 1 },
    },
    isLoading: isLoadingDefaultTemplates,
    isFetching: isFetchingDefaultTemplates,
  } = useGetTemplatesQuery({
    limit: 250,
    owner: false,
  });

  const {
    data: sharedTemplates = {
      data: [],
      metadata: { total_element: 1, limit: 10, page: 1 },
    },
    isLoading: isLoadingSharedTemplates,
    isFetching: isFetchingSharedTemplates,
  } = useGetTemplatesQuery({
    limit: 10,
    shared: true,
  });

  const {
    data: categories = {
      data: [],
      metadata: { total_element: 0, page: 1, limit: 10 },
    } as ListResponse<Category>,
    isLoading: isLoadingCategories,
    isFetching: isFetchingCategories,
  } = useGetCategoriesQuery({ limit: 10 });

  const isLoading =
    isLoadingAggregateReport ||
    isLoadingTemplate ||
    isLoadingDefaultTemplates ||
    isLoadingSharedTemplates ||
    isLoadingCategories;

  const isFetching =
    isFetchingAggregateReport ||
    isFetchingTemplate ||
    isFetchingDefaultTemplates ||
    isFetchingSharedTemplates ||
    isFetchingCategories;
  return {
    aggregateReport,
    templates,
    defaultTemplates,
    sharedTemplates,
    categories,
    isLoading,
    isFetching,
  };
};
