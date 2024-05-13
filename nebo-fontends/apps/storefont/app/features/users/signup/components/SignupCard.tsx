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
  Typography,
} from "@mui/material";
import { PasswordField } from "../../../../components/PasswordField";
import googleIconImage from "/app/assets/img/google-icon.svg";
import facebookIconImage from "/app/assets/img/facebook-icon.svg";
import loginViewImage from "/app/assets/img/login-view.svg";
import { TextField } from "../../../../components/TextField";
import { useSignupMutation } from "../../../../data/user.api";
import { Controller, useForm } from "react-hook-form";
import { SignupRequestModel } from "../types";
import isEmail from "validator/lib/isEmail";

export const SignupCard = () => {
  const [signUp] = useSignupMutation();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignupRequestModel>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email_or_phone: "",
      password: "",
    },
  });
  const submit = handleSubmit(async (data: SignupRequestModel) => {
    try {
      const _isEmail = isEmail(data.email_or_phone);
      const result = await signUp({
        first_name: data.first_name,
        last_name: data.last_name,
        email: _isEmail ? data.email_or_phone : undefined,
        phone_number: !_isEmail ? data.email_or_phone : undefined,
        password: data.password,
      }).unwrap();
    } catch (ex) {}
  });

  return (
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
                  <Controller
                    control={control}
                    name="last_name"
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    render={({ field: { ref, ...otherProps } }) => (
                      <TextField
                        label="Họ"
                        InputLabelProps={{ shrink: true }}
                        placeholder="Nhập họ"
                        {...otherProps}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="first_name"
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    render={({ field: { ref, ...otherProps } }) => (
                      <TextField
                        label="Tên"
                        InputLabelProps={{ shrink: true }}
                        placeholder="Nhập tên"
                        {...otherProps}
                      />
                    )}
                  />
                </Stack>

                <Controller
                  control={control}
                  name="email_or_phone"
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  render={({ field: { ref, ...otherProps } }) => (
                    <TextField
                      label="Email hoặc số điện thoại"
                      placeholder="Nhập email hoặc số điện thoại"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircleOutlined />
                          </InputAdornment>
                        ),
                      }}
                      {...otherProps}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="password"
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  render={({ field: { ref, ...otherProps } }) => (
                    <PasswordField
                      label="Mật khẩu"
                      placeholder="Nhập mật khẩu"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <KeyOffOutlined />
                          </InputAdornment>
                        ),
                      }}
                      {...otherProps}
                    />
                  )}
                />
                <Button variant="contained" onClick={submit}>
                  Đăng ký
                </Button>
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
                  href="/users/login"
                >
                  Đăng nhập
                </Link>
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
