import { Card, CardContent, CardHeader, TableRow } from "@mui/material";
import { UsedTemplates } from "../../../types";
import { LineChart } from "@mui/x-charts";
import { addDays, format } from "date-fns";
import { getFormatPatternsByUnit } from "../../../components/daterange";

interface Props {
  usedTemplates: UsedTemplates;
  unit: "hour" | "day" | "month" | "year";
}

export const UsedTemplateCard = ({ usedTemplates, unit }: Props) => {
  const data = usedTemplates.data.map((item) => ({
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
                return `${format(date, getFormatPatternsByUnit(unit))}`;
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
              color: "#2170ff66",
            },
          ]}
          height={500}
        />
      </CardContent>
    </Card>
  );
};
