import { CircleRounded } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";

export const OverviewCard = () => {
  return (
    <Stack alignItems={"center"}>
      <Stack alignItems={"center"}>
        <Typography variant="h6" color="#248585">
          Tạo mẫu tài liệu tự động
        </Typography>
        <Typography variant="h5" color="#248585">
          Nâng cao thương hiệu cho doanh nghiệp
        </Typography>
      </Stack>
      <Stack alignItems={"center"} paddingY={3}>
        <Typography variant="h2" color="#0012e9">
          Chia sẻ nội dung của bạn
        </Typography>

        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          direction={"row"}
          gap={2}
        >
          <Typography variant="h2" color="blue">
            Tiết kiệm thời gian
          </Typography>
          <CircleRounded color="primary" />
          <Typography variant="h2" color="blue">
            Lưu sáng tạo của bạn
          </Typography>
        </Stack>
      </Stack>
      <Box paddingBottom={2}>
        <Typography>
          Tập trung vào dịch vụ thay vì các quy trình dựa trên giấy tờ. Tăng tốc
          chu kỳ phát triển, giảm lỗi tài liệu và làm hài lòng nhân viên và
          khách hàng
        </Typography>
      </Box>
      <Stack direction={"row"} gap={3}>
        <Button variant="contained" href="/users/signup">
          Đăng ký miễn phí
        </Button>
        <Button
          variant="outlined"
          href="/users/login"
          sx={{ background: "#eaf2f9" }}
        >
          Đăng nhập tài khoản
        </Button>
      </Stack>
    </Stack>
  );
};
