import { Card, CardContent, CardHeader, TableRow } from "@mui/material";
import { UsedTemplates } from "../../../types";
import { LineChart } from "@mui/x-charts";
import { addDays, formatDate } from "date-fns";

interface Props {
  usedTemplates: UsedTemplates;
}

const defaultP: Props["usedTemplates"] = {
  data: [
    { date: new Date().toISOString(), total_used: 2 },
    { date: addDays(new Date(), 1).toISOString(), total_used: 2 },
    { date: addDays(new Date(), 2).toISOString(), total_used: 2 },
    { date: addDays(new Date(), 3).toISOString(), total_used: 2 },
    { date: addDays(new Date(), 4).toISOString(), total_used: 2 },
    { date: addDays(new Date(), 5).toISOString(), total_used: 2 },
    { date: addDays(new Date(), 6).toISOString(), total_used: 2 },
    { date: addDays(new Date(), 7).toISOString(), total_used: 2 },
    { date: addDays(new Date(), 8).toISOString(), total_used: 2 },
    { date: addDays(new Date(), 9).toISOString(), total_used: 2 },
    { date: addDays(new Date(), 10).toISOString(), total_used: 2 },
  ],
  aggregate: 9,
  metadata: {
    total_element: 0,
    page: 1,
    limit: 10,
  },
};

export const UsedTemplateCard = ({ usedTemplates: usedPaperTypes }: Props) => {
  const data = defaultP.data.map((item) => ({
    date: item.date,
    time: new Date(item.date).getTime(),
    total_used: item.total_used,
  }));

  return (
    <Card>
      <CardHeader title={"Lịch sử dụng mẫu"} sx={{ paddingBottom: 0 }} />
      <CardContent>
        <LineChart
          dataset={data}
          xAxis={[
            {
              scaleType: "time",
              dataKey: "time",
              valueFormatter: (value, context) => {
                const date = new Date(value);
                return `${formatDate(date, "dd-MM-yyyy")}`;
              },
            },
          ]}
          series={[
            {
              dataKey: "total_used",
              valueFormatter: (value: number | null) => {
                return `${value}`;
              },
              area: true,
            },
          ]}
          height={500}
        />
      </CardContent>
    </Card>
  );
};
