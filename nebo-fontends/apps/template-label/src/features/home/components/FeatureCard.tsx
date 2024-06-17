import {
  BubbleChart,
  Cable,
  Cached,
  Compress,
  Computer,
  Share,
} from "@mui/icons-material";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

export const FeatureCard = () => {
  const contents: {
    title: string;
    icon?: ReactNode;
    color?: string;
    description: string;
  }[] = [
    {
      title: "Mẫu có thể tùy chỉnh",
      icon: <BubbleChart />,
      color: "#D2C9EF",
      description:
        "Tạo, lưu các mẫu tùy chỉnh của riêng bạn hoặc chọn các tùy chọn được tạo sẵn chia sẻ cho bạn.",
    },
    {
      title: "Tạo nội dung tự động",
      icon: <Cached />,
      color: "#E06572",
      description:
        "Các mẫu tích hợp trình phân tích cú pháp handlebars. Điều này cho phép dễ dàng tùy chỉnh các mẫu cho nu cầu cụ thể của bạn.",
    },
    {
      title: "Quản lý tài sản",
      icon: <Computer />,
      color: "#51B595",
      description:
        "Trải nghiệm sự tiện lợi của việc tổ chức và lưu trữ tài sản của bạn ở một nơi với trình quản lý tài sản thân thiện với người dùng.",
    },
    {
      title: "Tích hợp",
      icon: <Cable />,
      color: "#FF9A17",
      description:
        "Kết nối và tích hợp với các ứng dụng của bạn, khai thác toàn bộ tiềm năng của quy trình làm việc của bạn.",
    },
    {
      title: "Chia sẻ",
      icon: <Share />,
      color: "#4086F7",
      description:
        " Chia sẻ mẫu, tài liệu cho nhóm của bạn hoặc với mọi người, sử dụng các mẫu mà bạn được chia sẻ.",
    },
    {
      title: "Tạo các mẫu có thể tái sử dụng",
      icon: <Compress />,
      color: "#F49DCF",
      description:
        "Chuyển đổi bất kỳ tài liệu nào thành mẫu có thể sử dụng lại và quên đi việc nhập lại cùng một dữ liệu.",
    },
  ];

  return (
    <Box>
      <Grid
        container
        display={"grid"}
        width={"100%"}
        gridTemplateColumns={{
          xs: "1fr",
          sm: "1fr 1fr",
          md: "1fr 1fr 1fr",
        }}
        justifyContent={"center"}
        columnGap={3}
        rowGap={5}
      >
        {contents.map((item, index) => (
          <Box key={index}>
            <Stack
              direction="row"
              gap={1}
              paddingBottom={2}
              alignItems={"center"}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  width: "45px",
                  height: "45px",
                  background: `${item.color}44`,
                  opacity: 0.6,
                  ">svg": {
                    color: item.color,
                  },
                }}
              >
                {item.icon}
              </Box>
              <Typography fontWeight={"600"} variant="h5">
                {item.title}
              </Typography>
            </Stack>
            <Typography>{item.description}</Typography>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};
