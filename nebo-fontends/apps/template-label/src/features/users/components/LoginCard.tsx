import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import {
  AccountCircleOutlined,
  ArrowBackIosNewOutlined,
  KeyOffOutlined,
} from "@mui/icons-material";
import { LoginRequestModel } from "../types";
import { Controller, useForm } from "react-hook-form";
import { TextField } from "../../../components/TextField";
import googleIconImage from "/src/assets/img/google-icon.svg";
import facebookIconImage from "/src/assets/img/facebook-icon.svg";
import { PasswordField } from "../../../components/PasswordField";
import { useSigninMutation } from "../../../data/user.api";
import { useToast } from "../../../components/notification/useToast";
import { isClientError } from "../../../utils/client";
import { LoadingButton } from "@mui/lab";
import { isBlank } from "../../../utils/base";
import { isEmail, isMobilePhone } from "validator";
import { useNavigate } from "react-router-dom";
import { store } from "../../../store/store";
import {
  storefontApi,
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
} from "../../../data/api";

export const LoginCard = () => {
  const navigate = useNavigate();
  const { show: showToast } = useToast();
  const [signIn] = useSigninMutation();
  const [triggerGetCurrentUser] = useLazyGetCurrentUserQuery();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginRequestModel>({
    defaultValues: { emailOrPhone: "", password: "" },
    reValidateMode: "onSubmit",
  });
  const submit = handleSubmit(async (data: LoginRequestModel) => {
    try {
      const _isEmail = isEmail(data.emailOrPhone);
      const _result = await signIn({
        email: _isEmail ? data.emailOrPhone : undefined,
        phone_number: !_isEmail ? data.emailOrPhone : undefined,
        password: data.password,
      }).unwrap();
      showToast("Đăng nhập tài khoản thành công");
      storefontApi.util.invalidateTags(["credentials"]);
      await triggerGetCurrentUser();
    } catch (ex) {
      if (isClientError(ex)) {
        let error = ex.data.message;
        if (/Authenticated/.test(error)) {
          showToast("Đăng nhập tài khoản thành công trước đó");
          await triggerGetCurrentUser();
          return;
        }

        if (/Email or password incorrect/.test(error))
          error = "Tài khoản không tồn tại hoặc mật khẩu không đúng";
        if (/Phone number or password incorrect/.test(error))
          error = "Tài khoản không tồn tại hoặc mật khẩu không đúng";
        showToast(error, { variant: "error" });
      }
    }
  });

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Stack spacing={4}>
          <Stack direction={"row"} gap={2} alignContent={"center"}>
            <IconButton
              sx={{
                borderRadius: "5px",
              }}
              href="/"
            >
              <ArrowBackIosNewOutlined />
            </IconButton>
            <Typography variant="h6" alignSelf={"center"}>
              Đăng nhập
            </Typography>
          </Stack>
          <Stack spacing={3}>
            <Controller
              control={control}
              name="emailOrPhone"
              rules={{
                validate: {
                  not_blank: (_value) => {
                    if (isBlank(_value)) {
                      return "Email hoặc số điện thoại không được để trống";
                    }
                  },
                  email: (_value) => {
                    if (/.*[a-zA-Z].*/.test(_value) && !isEmail(_value)) {
                      return "Email không đúng định dạng";
                    }
                  },
                  phone: (_value) => {
                    if (!/[a-zA-Z]/.test(_value) && !isMobilePhone(_value)) {
                      return "Số điện thoại không đúng định dạng";
                    }
                  },
                  max_length: (_value) => {
                    if (_value.length > 255)
                      return "Không được vượt quá 255 ký tự";
                  },
                },
              }}
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { ref, ...otherProps } }) => {
                const error =
                  control._formState.errors[otherProps.name]?.message;
                return (
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
                    error={error}
                    {...otherProps}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="password"
              rules={{
                validate: {
                  not_blank: (_value) => {
                    if (isBlank(_value)) {
                      return "Mật khẩu không được để trống";
                    }
                  },
                  min_length: (_value) => {
                    if (!isBlank(_value) && _value.length < 6)
                      return "Mật khẩu ít nhất 6 ký tự";
                  },
                  max_length: (_value) => {
                    if (!isBlank(_value) && _value.length > 30)
                      return "Mật khẩu không được vượt quá 30 ký tự";
                  },
                },
              }}
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { ref, ...otherProps } }) => {
                const error =
                  control._formState.errors[otherProps.name]?.message;
                return (
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
                    error={error}
                    {...otherProps}
                  />
                );
              }}
            />
            <LoadingButton
              onClick={submit}
              loading={isSubmitting}
              variant="contained"
            >
              Tiếp theo
            </LoadingButton>
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
                href="/api/auth/oauth2/google?redirect_uri=http://nebo.com/documents"
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
                href="/api/auth/oauth2/facebook?redirect_uri=http://nebo.com/documents"
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
