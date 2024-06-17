import { Box, Button, Stack } from "@mui/material";
import { Page } from "../../../components/Page";
import notFoundImage from "src/assets/img/not-found-main-bg.svg";
import notFound2Image from "src/assets/img/not-found-second-bg.svg";

export default function NotFoundPage() {
  return (
    <Page>
      <Stack justifyContent={"center"} alignItems={"center"}>
        <Box component={"img"} src={notFoundImage} width={"50vh"}></Box>
        <h1>Không tìm thấy trang</h1>
        <Button variant="contained" href="/">
          Back to Home
        </Button>
      </Stack>
    </Page>
  );
}
