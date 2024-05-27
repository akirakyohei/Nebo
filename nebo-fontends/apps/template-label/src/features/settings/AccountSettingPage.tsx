import {
  Avatar,
  Box,
  Grid,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Page } from "../../components/Page";
import {
  BorderColorOutlined,
  Edit,
  PublishedWithChanges,
} from "@mui/icons-material";
import { useGetCurrentUserQuery } from "../../data/api";
import { User } from "../../types";
import {
  Data,
  useGetAccountSettingData,
} from "./hooks/useGetAccountSettingData";
import { stringAvatar } from "../../utils/stringAvatar";

export default function IntegrationSettingPage() {
  const {
    currentUser = {
      first_name: "dsk",
      last_name: "dsj",
      id: 0,
      image_url: "",
      email: "",
      phone_number: "",
      permissions: [],
      provider: "local",
      provider_id: "",
    },
    historySessions,
    isLoading,
    isFetching,
  }: Data = useGetAccountSettingData();

  // if (isLoadingCurrentUser || !currentUser) return null;

  return (
    <Page
      title="Tài khoản"
      secondaryActions={[
        {
          icon: <Edit />,
          content: "Sửa",
        },
        {
          icon: <PublishedWithChanges />,
          content: "Đổi mật khẩu",
        },
      ]}
    >
      <Stack gap={3}>
        <Stack>
          <Box>
            <Typography>Thông tin tài khoản</Typography>
          </Box>
          <Box flex={1}>
            <Grid display={"grid"} gridTemplateColumns={"30% auto"}>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems="center"
              >
                <Box
                  sx={{
                    position: "relative",
                    "&:hover": {
                      "&> div:not(:first-of-type)": {
                        display: "flex",
                      },
                    },
                  }}
                >
                  <Avatar
                    src={currentUser.image_url}
                    {...stringAvatar(
                      currentUser.first_name,
                      currentUser.last_name,
                      100
                    )}
                  />
                  <Box
                    sx={{
                      width: "100px",
                      height: "50px",
                      background: "gray",
                      borderBottomLeftRadius: "50px",
                      borderBottomRightRadius: "50px",
                      position: "absolute",
                      opacity: "0.8",
                      color: "#ffffff",
                      bottom: 0,
                      left: 0,
                      cursor: "pointer",
                      display: "none",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography>Sửa</Typography>
                  </Box>
                </Box>
              </Box>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Họ</TableCell>
                    <TableCell>{currentUser.last_name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tên</TableCell>
                    <TableCell>{currentUser.first_name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>{currentUser.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Số điện thoại</TableCell>
                    <TableCell>{currentUser.phone_number}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Box>
        </Stack>

        {historySessions?.data && historySessions?.data?.length > 0 ? (
          <Stack>
            <Box>
              <Typography>Lịch sử đăng nhập</Typography>
            </Box>
            <Box flex={1}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Ip</TableCell>
                    <TableCell>Thiết bị</TableCell>
                    <TableCell>Hệ điều hành</TableCell>
                    <TableCell>Trình duyệt</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {historySessions.data.map((session) => (
                    <TableRow>
                      <TableCell>{session.ip_address}</TableCell>
                      <TableCell>{session.device.model}</TableCell>
                      <TableCell>{session.os.name}</TableCell>
                      <TableCell>{session.browser.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Stack>
        ) : null}
      </Stack>
    </Page>
  );
}
