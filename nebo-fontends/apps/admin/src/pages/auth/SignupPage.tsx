import { AccountCircleOutlined, KeyOffOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { PasswordField } from "../../components/PasswordField";
import loginViewImage from "src/assets/login-view.svg";
import googleIconImage from "src/assets/google-icon.svg";
import facebookIconImage from "src/assets/facebook-icon.svg";
import backgroundImage from "src/assets/background.jpeg";

export default function SignUpPage() {
  return (
    <Paper
      elevation={0}
      sx={() => {
        return {
          width: "100vw",
          height: "100vh",
          background: `url(${backgroundImage})`,
        };
      }}
    >
      <Grid2
        container
        width={"100%"}
        height={"100%"}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item md={8}>
          <Card sx={{ width: "100%" }}>
            <CardContent>
              <Grid container columns={12} spacing={2}>
                <Grid
                  sx={(theme) => {
                    return {
                      [theme.breakpoints.down("md")]: {
                        display: "none",
                      },
                    };
                  }}
                  item
                  xs={12}
                  md={4}
                  lg={5}
                >
                  <Box
                    component={"img"}
                    width="100%"
                    height="100%"
                    maxHeight={"80vh"}
                    alt="Login"
                    src={loginViewImage}
                    sx={{ objectFit: "cover" }}
                  />
                </Grid>
                <Grid
                  container
                  item
                  justifyContent={"center"}
                  alignItems={"center"}
                  xs={12}
                  md={8}
                  lg={7}
                >
                  <Stack spacing={3}>
                    <Typography variant="h6">Đăng ký</Typography>
                    <Stack spacing={3}>
                      <Stack direction={"row"} spacing={3}>
                        <TextField placeholder="Họ" variant="standard" />
                        <TextField placeholder="Tên" variant="standard" />
                      </Stack>
                      <TextField
                        placeholder="Email hoặc số điện thoại"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircleOutlined />
                            </InputAdornment>
                          ),
                        }}
                        variant="standard"
                      />
                      <PasswordField
                        placeholder="Mật khẩu"
                        startAdornment={
                          <InputAdornment position="start">
                            <KeyOffOutlined />
                          </InputAdornment>
                        }
                      />
                      <Button variant="contained"> Đăng ký </Button>
                    </Stack>
                    <Divider>
                      <Typography color={"GrayText"}>HOẶC</Typography>
                    </Divider>
                    <Stack spacing={2}>
                      <Button
                        variant="outlined"
                        startIcon={
                          <Box
                            component="img"
                            width={24}
                            height={24}
                            src={googleIconImage}
                          />
                        }
                      >
                        Google
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={
                          <Box
                            component="img"
                            width={24}
                            height={24}
                            src={facebookIconImage}
                          />
                        }
                      >
                        Facebook
                      </Button>
                    </Stack>
                    <Typography color={(theme) => theme.palette.grey[500]}>
                      Bạn đã có tài khoản?{" "}
                      <Link
                        component={"a"}
                        color={(theme) => theme.palette.primary.main}
                        underline="none"
                        sx={() => {
                          return {
                            ":hover": {
                              cursor: "pointer",
                              textDecoration: "underline",
                            },
                          };
                        }}
                        href="/signin"
                      >
                        Đăng nhập
                      </Link>
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid2>
    </Paper>
  );
}
