import { isEmail, isMobilePhone } from "validator";
import Modal from "../../../../components/Modal";
import { isClientError } from "../../../../utils/client";
import { useNavigate } from "react-router";
import { useToast } from "../../../../components/notification/useToast";
import { useUpdateAccountMutation } from "../../../../data/user.api";
import { UpdateUserRequestModel } from "../../types";
import { Controller, useForm } from "react-hook-form";
import { Stack } from "@mui/material";
import { defaultIfBlank, isBlank } from "../../../../utils/base";
import { PasswordField } from "../../../../components/PasswordField";
import { User } from "../../../../types";
import { TextField } from "../../../../components/TextField";

interface Props {
  open: boolean;
  onClose: () => void;
  user: User;
}
export const UpdateAccountModal = ({ open, onClose, user }: Props) => {
  const navigate = useNavigate();
  const { show: showToast } = useToast();
  const [updateAccount] = useUpdateAccountMutation();

  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<UpdateUserRequestModel>({
    defaultValues: {
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      email: user.email || "",
      phone_number: user.phone_number || "",
      confirm_password: "",
    },
    reValidateMode: "onSubmit",
  });
  const submit = handleSubmit(async (data: UpdateUserRequestModel) => {
    try {
      const result = await updateAccount({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email !== "" ? data.email : undefined,
        phone_number: data.phone_number !== "" ? data.phone_number : undefined,
        confirm_password:
          data.confirm_password !== "" ? data.confirm_password : undefined,
      }).unwrap();
      showToast("Cập nhật tài khoản thành công");
      onClose();
    } catch (ex) {
      if (isClientError(ex)) {
        let error = ex.data.message;
        if (ex.status === 403) error = "Mật khẩu không chính xác";
        if (/Email or password incorrect/.test(error))
          if (/Email already existed/.test(error)) error = "Email đã tồn tại";
        if (/Phone number already existed/.test(error))
          error = "Số điện thoại đã tồn tại";
        showToast(error, { variant: "error" });
      }
    }
  });

  const needConfirmPassword =
    defaultIfBlank(user.phone_number) !==
      defaultIfBlank(watch("phone_number")) ||
    defaultIfBlank(user.email) !== defaultIfBlank(watch("email"));

  return (
    <Modal
      open={open}
      onClose={onClose}
      primaryAction={{
        content: "Lưu",
        loading: isSubmitting,
        onAction: submit,
      }}
      secondaryActions={[
        {
          content: "Hủy",
          disabled: isSubmitting,
          onAction: onClose,
        },
      ]}
    >
      <Modal.Section>
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
            name="email"
            rules={{
              validate: {
                not_blank: (_value) => {
                  if (isBlank(_value) && isBlank(watch("phone_number"))) {
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
                max_length: (_value) => {
                  if (!isBlank(_value) && _value.length > 255)
                    return "Không được vượt quá 255 ký tự";
                },
              },
            }}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field: { ref, ...otherProps } }) => {
              const error = control._formState.errors[otherProps.name]?.message;
              return (
                <TextField
                  label="Email"
                  placeholder="Nhập email"
                  error={error}
                  {...otherProps}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="phone_number"
            rules={{
              validate: {
                not_blank: (_value) => {
                  if (isBlank(_value) && isBlank(watch("email"))) {
                    return "Email hoặc số điện thoại không được để trống";
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
              const error = control._formState.errors[otherProps.name]?.message;
              return (
                <TextField
                  label="Số điện thoại"
                  placeholder="Nhập số điện thoại"
                  error={error}
                  {...otherProps}
                />
              );
            }}
          />
          {needConfirmPassword && (
            <Controller
              control={control}
              name="confirm_password"
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
                    label="Xác nhận mật khẩu"
                    placeholder="Nhập mật khẩu"
                    error={error}
                    {...otherProps}
                  />
                );
              }}
            />
          )}
        </Stack>
      </Modal.Section>
    </Modal>
  );
};
