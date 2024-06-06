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
import { LoadingButton } from "@mui/lab";
import { PasswordField } from "../../../components/PasswordField";
import googleIconImage from "/src/assets/img/google-icon.svg";
import facebookIconImage from "/src/assets/img/facebook-icon.svg";
import loginViewImage from "/src/assets/img/login-view.svg";
import { TextField } from "../../../components/TextField";
import { useSignupMutation } from "../../../data/user.api";
import { Controller, useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import { useToast } from "../../../components/notification/useToast";
import { isClientError } from "../../../utils/client";
import { isBlank } from "../../../utils/base";
import { isMobilePhone } from "validator";
import { SignupRequestModel } from "../types";
import { useNavigate } from "react-router";

export const SignupCard = () => {
  const navigate = useNavigate();
  const { show: showToast } = useToast();
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
    reValidateMode: "onSubmit",
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
      showToast("Tạo tài khoản thành công");
      navigate("/documents");
    } catch (ex) {
      if (isClientError(ex)) {
        let error = ex.data.message;
        if (/Email already existed/.test(error)) error = "Email đã tồn tại";
        if (/Phone number already existed/.test(error))
          error = "Số điện thoại đã tồn tại";
        showToast(error, { variant: "error" });
      }
    }
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
                    rules={{
                      validate: {
                        max_length: (_value) => {
                          if (!isBlank(_value) && _value.length > 50)
                            return "Họ không được vượt quá 50 ký tự";
                        },
                      },
                    }}
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    render={({ field: { ref, ...otherProps } }) => {
                      const error =
                        control._formState.errors[otherProps.name]?.message;
                      return (
                        <TextField
                          label="Họ"
                          InputLabelProps={{ shrink: true }}
                          placeholder="Nhập họ"
                          error={error}
                          {...otherProps}
                        />
                      );
                    }}
                  />
                  <Controller
                    control={control}
                    name="first_name"
                    rules={{
                      validate: {
                        not_blank: (_value) => {
                          if (isBlank(_value)) {
                            return "Tên không được để trống";
                          }
                        },
                        max_length: (_value) => {
                          if (!isBlank(_value) && _value.length > 50)
                            return "Tên không được vượt quá 50 ký tự";
                        },
                      },
                    }}
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    render={({ field: { ref, ...otherProps } }) => {
                      const error =
                        control._formState.errors[otherProps.name]?.message;
                      return (
                        <TextField
                          label="Tên"
                          InputLabelProps={{ shrink: true }}
                          placeholder="Nhập tên"
                          error={error}
                          {...otherProps}
                        />
                      );
                    }}
                  />
                </Stack>

                <Controller
                  control={control}
                  name="email_or_phone"
                  rules={{
                    validate: {
                      not_blank: (_value) => {
                        if (isBlank(_value)) {
                          return "Email hoặc số điện thoại không được để trống";
                        }
                      },
                      email: (_value) => {
                        if (
                          !isBlank(_value) &&
                          /.*[a-zA-Z].*/.test(_value) &&
                          !isEmail(_value)
                        ) {
                          return "Email không đúng định dạng";
                        }
                      },
                      phone: (_value) => {
                        if (
                          !isBlank(_value) &&
                          !/[a-zA-Z]/.test(_value) &&
                          !isMobilePhone(_value)
                        ) {
                          return "Số điện thoại không đúng định dạng";
                        }
                      },
                      max_length: (_value) => {
                        if (!isBlank(_value) && _value.length > 255)
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
                      password: (_value) => {
                        if (!/^.*[A-Z]{1}.*/.test(_value)) {
                          return "Mật khẩu phải có ít nhất 1 chữ hoa";
                        }
                        if (!/^.*[a-zA-Z]{3}.*/.test(_value)) {
                          return "Mật khẩu phải có ít nhất 3 chữ cái";
                        }
                        if (!/^.*[0-9]{1}.*/.test(_value)) {
                          return "Mật khẩu phải có ít nhất 1 chữ số";
                        }
                        if (!/^.*[!@#$%^&*]{1}.*/.test(_value)) {
                          return "Mật khẩu phải có ít nhất 1 ký tự đặc biệt";
                        }
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
                  variant="contained"
                  loading={isSubmitting}
                  onClick={submit}
                >
                  Đăng ký
                </LoadingButton>
              </Stack>
              <Divider>
                <Typography color={"GrayText"}>HOẶC</Typography>
              </Divider>
              <Stack spacing={2}>
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
                >
                  Google
                </Button>
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
