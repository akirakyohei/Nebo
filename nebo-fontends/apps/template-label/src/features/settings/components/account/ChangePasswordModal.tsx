import { isEmail, isMobilePhone } from "validator";
import Modal from "../../../../components/Modal";
import { isClientError } from "../../../../utils/client";
import { useNavigate } from "react-router";
import { useToast } from "../../../../components/notification/useToast";
import {
  useSignupMutation,
  useUpdateAccountMutation,
} from "../../../../data/user.api";
import {
  ChangePasswordRequestModel,
  UpdateUserRequestModel,
} from "../../types";
import { Controller, useForm } from "react-hook-form";
import { InputAdornment, Stack, TextField } from "@mui/material";
import { isBlank } from "../../../../utils/base";
import { AccountCircleOutlined, KeyOffOutlined } from "@mui/icons-material";
import { PasswordField } from "../../../../components/PasswordField";
import { User } from "../../../../types";

interface Props {
  open: boolean;
  onClose: () => void;
  user: User;
}
export const ChangePasswordModal = ({ open, onClose, user }: Props) => {
  const navigate = useNavigate();
  const { show: showToast } = useToast();
  const [updateAccount] = useUpdateAccountMutation();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = useForm<ChangePasswordRequestModel>({
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_new_password: "",
    },
    reValidateMode: "onSubmit",
  });
  const submit = handleSubmit(async (data: ChangePasswordRequestModel) => {
    try {
      const result = await updateAccount({
        password: data.new_password,
        confirm_password:
          data.old_password !== "" ? data.old_password : undefined,
      }).unwrap();
      showToast("Cập nhật mật khẩu thành công");
      onClose();
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
          <Controller
            control={control}
            name="old_password"
            rules={{
              validate: {
                not_blank: (_value) => {
                  if (isBlank(_value)) {
                    return "Mật khẩu cũ không được để trống";
                  }
                },
                min_length: (_value) => {
                  if (!isBlank(_value) && _value.length < 6)
                    return "Mật khẩu cũ ít nhất 6 ký tự";
                },
                max_length: (_value) => {
                  if (!isBlank(_value) && _value.length > 30)
                    return "Mật khẩu cũ không được vượt quá 30 ký tự";
                },
              },
            }}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field: { ref, ...otherProps } }) => {
              const error = control._formState.errors[otherProps.name]
                ?.message as any;
              return (
                <PasswordField
                  label="Mật khẩu cũ"
                  placeholder="Nhập mật khẩu cũ"
                  error={error}
                  {...otherProps}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="new_password"
            rules={{
              validate: {
                not_blank: (_value) => {
                  if (isBlank(_value)) {
                    return "Mật khẩu mới không được để trống";
                  }
                },
                min_length: (_value) => {
                  if (!isBlank(_value) && _value.length < 6)
                    return "Mật khẩu mới ít nhất 6 ký tự";
                },
                max_length: (_value) => {
                  if (!isBlank(_value) && _value.length > 30)
                    return "Mật khẩu mới không được vượt quá 30 ký tự";
                },
                password: (_value) => {
                  if (!/^.*[A-Z]{1}.*/.test(_value)) {
                    return "Mật khẩu mới phải có ít nhất 1 chữ hoa";
                  }
                  if (!/^.*[a-zA-Z]{3}.*/.test(_value)) {
                    return "Mật khẩu mới phải có ít nhất 3 chữ cái";
                  }
                  if (!/^.*[0-9]{1}.*/.test(_value)) {
                    return "Mật khẩu mới phải có ít nhất 1 chữ số";
                  }
                  if (!/^.*[!@#$%^&*]{1}.*/.test(_value)) {
                    return "Mật khẩu mới phải có ít nhất 1 ký tự đặc biệt";
                  }
                },
              },
            }}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field: { ref, ...otherProps } }) => {
              const error = control._formState.errors[otherProps.name]
                ?.message as any;
              return (
                <PasswordField
                  label="Mật khẩu mới"
                  placeholder="Nhập mật khẩu mới"
                  error={error}
                  {...otherProps}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="confirm_new_password"
            rules={{
              validate: {
                not_blank: (_value) => {
                  if (isBlank(_value)) {
                    return "Mật khẩu không được để trống";
                  }
                },
                compare: (_value) => {
                  if (watch("new_password") !== _value)
                    return "Nhập lại mật khẩu không khớp";
                },
              },
            }}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field: { ref, ...otherProps } }) => {
              const error = control._formState.errors[otherProps.name]
                ?.message as any;
              return (
                <PasswordField
                  label="Nhập lại mật khẩu"
                  placeholder="Nhập mật khẩu"
                  error={error}
                  {...otherProps}
                />
              );
            }}
          />
        </Stack>
      </Modal.Section>
    </Modal>
  );
};
