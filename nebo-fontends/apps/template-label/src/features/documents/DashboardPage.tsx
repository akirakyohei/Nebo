import { Box, Grid, Stack } from "@mui/material";
import { Page } from "../../components/Page";
import { Data, useGetDashboardData } from "./hooks/useGetDashboardData";
import { AggregateReportCard } from "../analytics/components/AggregateReportCard";
import { DefaultTemplateCard } from "./components/dashboard/DefaultTemplateCard";
import { SharedTemplateCard } from "./components/dashboard/SharedTemplateCard";
import { RecentTemplateCard } from "./components/dashboard/RecentTemplateCard";
import { CategoryCard } from "./components/dashboard/CategoryCard";
import { DashboardSkeleton } from "./components/dashboard/DashboardSkeleton";
import { Loading } from "../../components/loading";

export default function AnalyticPage() {
  const {
    aggregateReport,
    templates,
    defaultTemplates,
    sharedTemplates,
    categories,
    isLoading,
    isFetching,
  }: Data = useGetDashboardData();
  if (isLoading) return <DashboardSkeleton />;

  return (
    <Page>
      <Stack gap={4}>
        {isFetching && <Loading />}
        <Grid>
          <AggregateReportCard aggregate={aggregateReport} />
        </Grid>
        <CategoryCard categories={categories} />
        <RecentTemplateCard templates={templates} />
        <DefaultTemplateCard templates={defaultTemplates} />
        <SharedTemplateCard templates={sharedTemplates} />
      </Stack>
    </Page>
  );
}
