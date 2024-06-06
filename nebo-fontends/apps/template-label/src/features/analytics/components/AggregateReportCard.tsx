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
      color: "#6200EA",
    },
    {
      title: "Tổng số mẫu",
      content: aggregate.total_data,
      icon: <Newspaper fontSize="large" />,
      color: "#FFB300",
    },
    {
      title: "Số lượt dùng mẫu",
      content: aggregate.total_data,
      icon: <LocalPrintshop fontSize="large" />,
      color: "#9C27B0",
    },
  ];
  return (
    <Box sx={{ padding: 0, background: "transparent" }}>
      <Box>
        <Grid
          container
          width={"100%"}
          display={"grid"}
          gridTemplateColumns={{ md: "1fr 1fr 1fr", sm: "1fr" }}
          columnGap={4}
          rowGap={1}
          sx={{ background: "transparent" }}
        >
          {data.map((item, index) => (
            <Box key={index} flex={1}>
              <ItemCard {...item} />
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
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
    <Stack
      direction={"row"}
      alignItems={"center"}
      height={"100%"}
      sx={(theme) => ({
        background: color,
        borderRadius: "5px",
        boxShadow: theme.shadows[3],
      })}
      padding={1}
    >
      <Stack
        flex={1}
        sx={{ color: "#FFFFFF" }}
        height={"100%"}
        justifyContent={"space-between"}
      >
        <Typography textAlign={"center"} variant="h5">
          {title}
        </Typography>
        <Typography variant="h3" textAlign={"center"}>
          {content}
        </Typography>
      </Stack>
      <Box>
        <Box
          padding={2}
          height={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            background: "#fff",
            opacity: 0.4,
            color: color,
            borderRadius: "50%",
          }}
        >
          {icon}
        </Box>
      </Box>
    </Stack>
  );
};
