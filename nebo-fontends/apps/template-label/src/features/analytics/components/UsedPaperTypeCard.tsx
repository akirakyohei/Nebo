import { Card, CardContent, CardHeader, TableRow } from "@mui/material";
import { UsedPaperTypes } from "../../../types";
import { LineChart } from "@mui/x-charts";
import { addDays, format } from "date-fns";
import { getFormatPatternsByUnit } from "../../../components/daterange";

interface Props {
  usedPaperTypes: UsedPaperTypes;
  unit: "hour" | "day" | "month" | "year";
}

export const UsedPaperTypeCard = ({ usedPaperTypes, unit }: Props) => {
  const data = usedPaperTypes.data.map((item) => ({
    date: item.date,
    time: new Date(item.date).getTime(),
    total_used: item.total_used,
  }));

  return (
    <Card>
      <CardHeader title={"Lịch sử dụng khổ giấy"} sx={{ paddingBottom: 0 }} />
      <CardContent>
        <LineChart
          dataset={data}
          xAxis={[
            {
              scaleType: "time",
              dataKey: "time",
              valueFormatter: (value, _context) => {
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
