import { Controller, useForm } from "react-hook-form";
import { useToast } from "../../../../components/notification/useToast";
import { Template } from "../../../../types";
import { useMemo } from "react";
import { useUpdateTemplateMutation } from "../../../../data/template.api";
import { isClientError } from "../../../../utils/client";
import { Box, Stack, Typography } from "@mui/material";
import { isBlank } from "../../../../utils/base";
import { TextField } from "../../../../components/TextField";
import { CategoryTemplateSelect } from "../CategoryTemplateSelect";
import { BootstrapTooltip } from "../../../../components/BootstrapTooltip";

interface Props {
  template: Template;
}

type InputModel = {
  name: string;
};

export const TemplateInfoBlock = ({ template }: Props) => {
  const { show: showToast } = useToast();
  const [updateTemplate] = useUpdateTemplateMutation();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<InputModel>({
    values: useMemo(
      () => ({ name: template.name, category_ids: template.category_ids }),
      [template.name, template.category_ids]
    ),
    reValidateMode: "onSubmit",
  });
  const submit = handleSubmit(async (data: InputModel) => {
    if (template.name === data.name) return;
    try {
      const res = updateTemplate({
        id: template.id,
        request: {
          name: data.name,
        },
      });
      showToast("Lưu mẫu thành công");
    } catch (ex) {
      if (isClientError(ex)) {
        let error = ex.data.message;
        if (/Authenticated/.test(error)) {
          showToast("Lưu mẫu thất bại thành công trước đó");
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
            if (_value.length > 255) return "Không được vượt quá 255 ký tự";
          },
        },
      }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render={({ field: { ref, ...otherProps } }) => {
        const error = control._formState.errors[otherProps.name]
          ?.message as any;
        return (
          <BootstrapTooltip
            open={false}
            title={<Typography>{otherProps.value}</Typography>}
          >
            <Box>
              <TextField
                placeholder="Nhập tên"
                error={error}
                variant="filled"
                // fullWidth
                size="small"
                InputProps={{
                  sx: (theme) => ({
                    fontWeight: "bold",
                    fontSize: "2rem",
                    color: theme.palette.primary.light,
                    background: "transparent",
                    border: "0",
                    borderColor: `${theme.palette.primary.light} !important`,
                    "> input": {
                      padding: 0,
                    },

                    "&:hover": {
                      borderColor: `${theme.palette.primary.light} !important`,
                    },
                  }),
                }}
                {...otherProps}
                onBlur={submit}
              />
            </Box>
          </BootstrapTooltip>
        );
      }}
    />
  );
};
