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
import {
  Box,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { ContentCopyOutlined } from "@mui/icons-material";
import {
  useGetTemplateAppPermissionQuery,
  useShareTemplateAppPermissionMutation,
} from "../../../../data/template_permission.api";
import { Spinner } from "../../../../components/Spinner";
import { Loading } from "../../../../components/loading";
import { TemplateSelect } from "./TemplateSelect";

interface Props {
  open: boolean;
  onClose: () => void;
  apiKeyId?: number;
}

type InputModel = {
  name: string;
  template_ids?: number[] | null;
  share_mode?: "all" | "many_allow";
};

export const ApiKeyManageModal = ({ open, onClose, apiKeyId }: Props) => {
  const isCreate = !apiKeyId;
  const [accessToken, setAccessToken] = useState<string>("");
  const { show: showToast } = useToast();
  const {
    data: apiKey,
    isLoading: isLoadingApiKey,
    isFetching: isFetchingApiKey,
  } = useGetApiKeyQuery(apiKeyId || 0, { skip: !apiKeyId });
  const {
    data: appPermission,
    isLoading: isLoadingAppPermission,
    isFetching: isFetchingAppPermission,
  } = useGetTemplateAppPermissionQuery(apiKeyId || 0, {
    skip: !apiKeyId,
  });
  const [createApiKey] = useCreateApiKeyMutation();
  const [updateApiKey] = useUpdateApiKeyMutation();
  const [shareAppPermission] = useShareTemplateAppPermissionMutation();

  useEffect(() => {
    if (apiKey?.access_token && apiKey?.access_token !== "") {
      setAccessToken(apiKey.access_token);
    }
  }, [apiKey?.access_token]);

  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting, dirtyFields },
  } = useForm<InputModel>({
    values: useMemo(
      () => ({
        name: apiKey?.name || "",
        share_mode: appPermission?.template_ids === null ? "all" : "many_allow",
        template_ids: appPermission?.template_ids || [],
      }),
      [apiKey?.name, appPermission?.template_ids]
    ),
    reValidateMode: "onSubmit",
  });
  const submit = handleSubmit(async (data: InputModel) => {
    try {
      let apiAppId = 0;
      if (isCreate) {
        const res = await createApiKey({ name: data.name });
        apiAppId = res?.data?.id || 0;
        showToast("Tạo api key thành công");
      } else {
        const res = await updateApiKey({
          id: apiKeyId,
          request: { name: data.name },
        });
        apiAppId = apiKeyId;
        showToast("Cập nhật api key thành công");
      }
      if (dirtyFields.share_mode || dirtyFields.template_ids) {
        await shareAppPermission({
          app_id: apiAppId,
          template_ids:
            data.share_mode == "all" ? null : data.template_ids || [],
        }).unwrap();
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

  const isLoading = isLoadingApiKey || isLoadingAppPermission;
  const isFetching = isFetchingApiKey || isFetchingAppPermission;

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="lg"
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
      {isFetching && <Loading />}
      {isLoading && (
        <Modal.Section>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "10rem",
            }}
          >
            <Spinner />
          </Box>
        </Modal.Section>
      )}
      {!isLoading && (
        <Modal.Section>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Stack gap={2} paddingTop={2.5}>
                {!isCreate || accessToken === "" ? (
                  <>
                    <Typography color={(theme) => theme.palette.grey[600]}>
                      Gợi ý: Sử dụng tên của ứng dụng hoặc dịch vụ mà bạn đang
                      muốn kết nối
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
            </Grid>
            <Grid item xs={6}>
              <Controller
                control={control}
                name={"share_mode"}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    name="radio-buttons-group"
                    onChange={(event) => {
                      field.onChange(event.target.value);
                    }}
                  >
                    <FormControlLabel
                      value="all"
                      control={<Radio />}
                      label="Tất cả"
                    />
                    <FormControlLabel
                      value="many_allow"
                      control={<Radio />}
                      label="Tùy chỉnh"
                    />
                  </RadioGroup>
                )}
              />
              {watch("share_mode") === "many_allow" && (
                <Controller
                  control={control}
                  name={"template_ids"}
                  render={({ field }) => (
                    <TemplateSelect
                      values={field.value || []}
                      onChange={field.onChange}
                    />
                  )}
                />
              )}
            </Grid>
          </Grid>
        </Modal.Section>
      )}
    </Modal>
  );
};
