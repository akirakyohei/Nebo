import { Box, Grid, Stack } from "@mui/material";
import { Page } from "../../components/Page";
import { AggregateReportCard } from "./components/AggregateReportCard";
import { Data, useGetReportData } from "./hooks/useGetReportData";
import { TopUsedPaperTypeCard } from "./components/TopUsedPaperTypeCard";
import { TopUsedTemplateCard } from "./components/TopUsedTemplateCard";
import { UsedPaperTypeCard } from "./components/UsedPaperTypeCard";
import { UsedTemplateCard } from "./components/UsedTemplateCard";

export default function AnalyticPage() {
  const {
    aggregateReport = {
      total_data: 0,
      total_template: 0,
      total_used_template: 0,
    },
    topUsedPaperTypes = [
      {
        paper_type: {
          paper_type_id: 0,
          name: "Tùy chỉnh",
          width: null,
          height: null,
          unit_of_width: null,
          unit_of_height: null,
          description: null,
        },
        total_used: 0,
      },
    ],
    topUsedTemplates = [
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
    usedPaperTypes = {
      data: [
        {
          total_used: 1,
          date: "",
        },
      ],
      metadata: {
        total_element: 0,
        page: 1,
        limit: 10,
      },
      aggregate: 0,
    },
    usedTemplates = {
      data: [
        {
          total_used: 1,
          date: "",
        },
      ],
      metadata: {
        total_element: 0,
        page: 1,
        limit: 10,
      },
      aggregate: 0,
    },
  }: Data = useGetReportData();
  return (
    <Page title="Phân tích">
      <Stack gap={4}>
        <Grid>
          <AggregateReportCard aggregate={aggregateReport} />
        </Grid>
        <Grid
          flex={"1 1 auto"}
          display={"grid"}
          width={"100%"}
          gridTemplateColumns={{ md: "1fr 1fr", sm: "1fr" }}
          rowGap={4}
          columnGap={4}
        >
          <TopUsedPaperTypeCard topUsedPaperTypes={topUsedPaperTypes} />
          <TopUsedTemplateCard topUsedTemplates={topUsedTemplates} />
          <UsedPaperTypeCard usedPaperTypes={usedPaperTypes} />
          <UsedTemplateCard usedTemplates={usedTemplates} />
        </Grid>
      </Stack>
    </Page>
  );
}
