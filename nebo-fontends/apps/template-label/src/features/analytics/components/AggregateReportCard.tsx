import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { AggregateReport } from "../../../types";
import { ReactNode } from "react";
import { title } from "process";
import { LocalPrintshop, Newspaper, PermMedia } from "@mui/icons-material";

interface Props {
  aggregate: AggregateReport;
}
export const AggregateReportCard = ({ aggregate }: Props) => {
  const data: ItemCardProps[] = [
    {
      title: "Lưu trữ",
      content: aggregate.total_data,
      icon: <PermMedia fontSize="large" />,
      color: "#fa3729",
    },
    {
      title: "Tổng số mẫu",
      content: aggregate.total_data,
      icon: <Newspaper fontSize="large" />,
      color: "#FF5739",
    },
    {
      title: "Số lượt dùng mẫu",
      content: aggregate.total_data,
      icon: <LocalPrintshop fontSize="large" />,
      color: "#FF5739",
    },
  ];
  return (
    <Card sx={{ padding: 0 }}>
      <CardContent sx={{ padding: "0 !important" }}>
        <Box>
          <Grid
            container
            width={"100%"}
            display={"flex"}
            // display={"grid"}
            // gridTemplateColumns={"1fr 1fr 1fr"}
          >
            {data.map((item, index) => (
              <>
                {index !== 0 ? (
                  <Divider orientation="vertical" flexItem></Divider>
                ) : null}
                <Box flex={1}>
                  <ItemCard {...item} />
                </Box>
              </>
            ))}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

interface ItemCardProps {
  icon: ReactNode;
  title: string;
  content: ReactNode;
  color: string;
}
const ItemCard = ({ icon, title, content, color }: ItemCardProps) => {
  return (
    <Stack direction={"row"} alignItems={"center"} height={"100%"}>
      <Box
        padding={2}
        height={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ background: "#557aff", color: "#d2d8e7" }}
      >
        {icon}
      </Box>
      <Stack
        flex={1}
        sx={{ background: color, color: "#FFFFFF" }}
        height={"100%"}
        justifyContent={"space-between"}
      >
        <Typography textAlign={"center"} variant="h4">
          {title}
        </Typography>
        <Typography variant="h3" textAlign={"center"}>
          {content}
        </Typography>
      </Stack>
    </Stack>
  );
};
