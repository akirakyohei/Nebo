import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { AccountCircleOutlined, KeyOffOutlined } from "@mui/icons-material";
import { LoginRequestModel } from "../types";
import { id } from "date-fns/locale";
import { template } from "lodash-es";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSigninMutation } from "app/data/user.api";
import isEmail from "validator/lib/isEmpty";
import { TextField } from "../../../../components/TextField";
import googleIconImage from "/app/assets/img/google-icon.svg";
import facebookIconImage from "/app/assets/img/facebook-icon.svg";
import { PasswordField } from "../../../../components/PasswordField";

export const LoginCard = () => {
  const [signIn] = useSigninMutation();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginRequestModel>({
    defaultValues: { emailOrPhone: "", password: "" },
  });
  const submit = handleSubmit(async (data: LoginRequestModel) => {
    try {
      const _isEmail = isEmail(data.emailOrPhone);
      const result = await signIn({
        email: _isEmail ? data.emailOrPhone : undefined,
        phone_number: !_isEmail ? data.emailOrPhone : undefined,
        password: data.password,
      }).unwrap();
    } catch (ex) {}
  });

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Stack spacing={4}>
          <Typography variant="h6">Đăng nhập</Typography>
          <Stack spacing={3}>
            <Controller
              control={control}
              name="emailOrPhone"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { ref, ...otherProps } }) => (
                <TextField
                  label="Email hoặc Số điện thoại"
                  placeholder="Nhập Email hoặc số điện thoại"
                  {...otherProps}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleOutlined />
                      </InputAdornment>
                    ),
                  }}
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
            <Button onClick={submit} variant="contained">
              Tiếp theo
            </Button>
          </Stack>
          <Divider>
            <Typography color={"GrayText"}>Đăng nhập với</Typography>
          </Divider>
          <Grid
            width={"100%"}
            container
            gridTemplateColumns={"1fr 1fr"}
            display={"grid"}
            gap={2}
          >
            <Grid item>
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
                fullWidth
              >
                Google
              </Button>
            </Grid>
            <Grid item>
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
                fullWidth
              >
                Facebook
              </Button>
            </Grid>
          </Grid>

          <Typography color={(theme) => theme.palette.grey[500]}>
            Bạn mới biết đến Nebo?{" "}
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
              href="/users/signup"
            >
              Đăng ký
            </Link>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
