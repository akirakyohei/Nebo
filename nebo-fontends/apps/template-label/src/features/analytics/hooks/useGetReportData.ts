import { DateRange } from "../../../components/daterange";
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
  aggregateReport: AggregateReport;
  topUsedPaperTypes: TopUsedPaperType[];
  topUsedTemplates: TopUsedTemplate[];
  usedPaperTypes: UsedPaperTypes;
  usedTemplates: UsedTemplates;
  isLoading: boolean;
  isFetching: boolean;
};

type Props = {
  dateRange: DateRange;
};

export const useGetReportData = ({ dateRange }: Props): Data => {
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
    data: topUsedPaperTypes = [],
    isLoading: isLoadingTopUsedPaper,
    isFetching: isFetchingTopUsedPaper,
  } = useGetTopUsedPaperTypeQuery({
    from_date: dateRange.startDate.toISOString(),
    to_date: dateRange.endDate.toISOString(),
    top: 10,
  });

  const {
    data: topUsedTemplates = [
      {
        total_used: 0,
        template: {
          template_id: 1,
          name: "Trống",
          created_at: "",
          updated_at: "",
        },
      },
    ],
    isLoading: isLoadingTopUsedTemplate,
    isFetching: isFetchingTopUsedTemplate,
  } = useGetTopUsedTemplateQuery({
    from_date: dateRange.startDate.toISOString(),
    to_date: dateRange.endDate.toISOString(),
    top: 10,
  });

  const {
    data: usedPaperTypes = {
      data: [
        {
          total_used: 1,
          date: "",
        },
      ],
      total_element: 0,
      aggregate: 0,
    },
    isLoading: isLoadingUsedPaperType,
    isFetching: isFetchingUsedPaperType,
  } = useGetUsedPaperTypeQuery({
    from_date: dateRange.startDate.toISOString(),
    to_date: dateRange.endDate.toISOString(),
    unit: dateRange.unit,
  });

  const {
    data: usedTemplates = {
      data: [
        {
          total_used: 1,
          date: "",
        },
      ],
      total_element: 0,
      aggregate: 0,
    },
    isLoading: isLoadingUsedTemplate,
    isFetching: isFetchingUsedTemplate,
  } = useGetUsedTemplateQuery({
    from_date: dateRange.startDate.toISOString(),
    to_date: dateRange.endDate.toISOString(),
    unit: dateRange.unit,
  });

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

  console.log(topUsedPaperTypes);
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
