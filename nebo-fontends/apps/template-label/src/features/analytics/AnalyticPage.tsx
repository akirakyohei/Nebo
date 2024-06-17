import { Box, Grid, Stack } from "@mui/material";
import { Page } from "../../components/Page";
import { AggregateReportCard } from "./components/AggregateReportCard";
import { Data, useGetReportData } from "./hooks/useGetReportData";
import { TopUsedPaperTypeCard } from "./components/TopUsedPaperTypeCard";
import { TopUsedTemplateCard } from "./components/TopUsedTemplateCard";
import { UsedPaperTypeCard } from "./components/UsedPaperTypeCard";
import { UsedTemplateCard } from "./components/UsedTemplateCard";
import { Loading } from "../../components/loading";
import { AnalyticsReportSkeleton } from "./components/AnalyticsReportSkeleton";
import { DateTimeSelect } from "../../components/daterange/DateTimeSelect";
import { endOfDay, isBefore, startOfDay } from "date-fns";
import { useNavigate, useSearchParams } from "react-router-dom";
import { transformDateRange } from "../../components/daterange";

export default function AnalyticPage() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const startDate =
    params.get("from_date") !== null
      ? new Date(params.get("from_date") || "")
      : startOfDay(new Date());
  const endDate =
    params.get("to_date") !== null
      ? new Date(params.get("to_date") || "")
      : endOfDay(new Date());
  const daterange = transformDateRange(startDate, endDate);
  const {
    aggregateReport,
    topUsedPaperTypes,
    topUsedTemplates,
    usedPaperTypes,
    usedTemplates,
    isLoading,
    isFetching,
  }: Data = useGetReportData({
    dateRange: daterange,
  });

  if (isLoading) return <AnalyticsReportSkeleton />;

  return (
    <Page title="Phân tích" contentSpacing={0}>
      {isFetching && <Loading />}
      <Stack gap={4}>
        <Grid>
          <AggregateReportCard aggregate={aggregateReport} />
        </Grid>
        <Grid>
          <DateTimeSelect
            startDate={startDate}
            endDate={endDate}
            onChange={(value) => {
              const copyParams = params;
              params.set("from_date", value.startDate.toISOString());
              params.set("to_date", value.endDate.toISOString());
              setParams(copyParams);
            }}
          />
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
          <UsedPaperTypeCard
            usedPaperTypes={usedPaperTypes}
            unit={daterange.unit}
          />
          <UsedTemplateCard
            usedTemplates={usedTemplates}
            unit={daterange.unit}
          />
        </Grid>
      </Stack>
    </Page>
  );
}
