import { Box, Grid, Stack } from "@mui/material";
import { Page } from "../../components/Page";
import { Data, useGetDashboardData } from "./hooks/useGetDashboardData";
import { AggregateReportCard } from "../analytics/components/AggregateReportCard";

export default function AnalyticPage() {
  const {
    aggregateReport = {
      total_data: 0,
      total_template: 0,
      total_used_template: 0,
    },
  }: Data = useGetDashboardData();
  return (
    <Page>
      <Stack gap={4}>
        <Grid>
          <AggregateReportCard aggregate={aggregateReport} />
        </Grid>
      </Stack>
    </Page>
  );
}
