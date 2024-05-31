import { Controller, useForm } from "react-hook-form";
import Modal from "../../../../components/Modal";
import { isClientError } from "../../../../utils/client";
import { useToast } from "../../../../components/notification/useToast";
import {
  useCreateApiKeyMutation,
  useGetApiKeyQuery,
  useUpdateApiKeyMutation,
} from "../../../../data/api_key.api";
import { useEffect, useMemo, useState } from "react";
import { isBlank } from "../../../../utils/base";
import { TextField } from "../../../../components/TextField";
import { IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import { ContentCopyOutlined } from "@mui/icons-material";

interface Props {
  open: boolean;
  onClose: () => void;
  apiKeyId?: number;
}

type InputModel = {
  name: string;
};

export const ApiKeyManageModal = ({ open, onClose, apiKeyId }: Props) => {
  const isCreate = !apiKeyId;
  const [accessToken, setAccessToken] = useState<string>("");
  const { show: showToast } = useToast();
  const {
    data: apiKey,
    isLoading,
    isFetching,
  } = useGetApiKeyQuery(apiKeyId || 0, { skip: !apiKeyId });
  const [createApiKey] = useCreateApiKeyMutation();
  const [updateApiKey] = useUpdateApiKeyMutation();

  useEffect(() => {
    if (apiKey?.access_token && apiKey?.access_token !== "") {
      setAccessToken(apiKey.access_token);
    }
  }, [apiKey?.access_token]);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<InputModel>({
    values: useMemo(() => ({ name: apiKey?.name || "" }), [apiKey]),
    reValidateMode: "onSubmit",
  });
  const submit = handleSubmit(async (data: InputModel) => {
    try {
      if (isCreate) {
        const res = await createApiKey({ name: data.name });
        showToast("Tạo api key thành công");
      } else {
        const res = await updateApiKey({
          id: apiKeyId,
          request: { name: data.name },
        });
        showToast("Cập nhật api key thành công");
      }

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
      title={isCreate ? "Tạo Api key mới" : "Api key"}
      primaryAction={{
        content: isCreate ? "Tạo" : "Lưu",
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
        <Stack gap={2}>
          {!isCreate || accessToken === "" ? (
            <>
              <Typography color={(theme) => theme.palette.grey[600]}>
                Gợi ý: Sử dụng tên của ứng dụng hoặc dịch vụ mà bạn đang muốn
                kết nối
              </Typography>
              <Controller
                control={control}
                name="name"
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
                      placeholder="Nhập tên api key"
                      error={error}
                      {...otherProps}
                    />
                  );
                }}
              />
            </>
          ) : null}

          {accessToken !== "" ? (
            <>
              <Typography color={(theme) => theme.palette.grey[600]}>
                Sao chép api key bên dưới và lưu trữ ở nơi an toàn.
              </Typography>
              <TextField
                value={accessToken}
                InputProps={{
                  readOnly: true,
                  sx: (theme) => ({
                    background: "#E6F9FF",
                    height: "41px",
                  }),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          navigator.clipboard.writeText(accessToken).then(
                            () => {
                              showToast("Sao chép thành công");
                            },
                            () => {
                              showToast("Sao chép thất bại");
                            }
                          );
                        }}
                      >
                        <ContentCopyOutlined />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </>
          ) : null}
        </Stack>
      </Modal.Section>
    </Modal>
  );
};
