import {
  Box,
  Divider,
  Grid,
  Slide,
  Stack,
  useScrollTrigger,
} from "@mui/material";
import Modal from "../../../../components/Modal";
import { TextField } from "../../../../components/TextField";
import { CategoryTemplateSelect } from "../../../workspaces/components/CategoryTemplateSelect";
import {
  useCreateTemplateMutation,
  useGetTemplatesWithInfiniteQuery,
  useUpdateTemplateMutation,
} from "../../../../data/template.api";
import { Template, TemplateRequest } from "../../../../types";
import { Controller, useForm } from "react-hook-form";
import { useMemo } from "react";
import { defaultBlankTemplate } from "../../../../constants";
import { useToast } from "../../../../components/notification/useToast";
import { isClientError } from "../../../../utils/client";
import { useSimpleFilters } from "../../../../utils/useSimpleFilters";
import { TemplateMasonrySelect } from "./TemplateMasonrySelect";

interface Props {
  template: Template;
  onClose: () => void;
}

export const TemplateUpdateModal = ({ template, onClose }: Props) => {
  const { show: showToast } = useToast();
  const [updateTemplate] = useUpdateTemplateMutation();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<{ template: Template }>({
    values: useMemo(() => ({ template: { ...template, id: -1 } }), []),
  });
  const submit = handleSubmit(async (data: { template: Template }) => {
    try {
      const res = await updateTemplate({
        id: template.id,
        request: {
          name: data.template.name,
          category_ids: data.template.category_ids,
        },
      }).unwrap();
      showToast("Tạo mẫu thành công");
      onClose();
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
    <Modal
      open
      size="lg"
      onClose={onClose}
      title="Cập nhật mẫu"
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
        <Stack spacing={2} padding={2} direction={"row"} width={"100%"}>
          <Box flex={"1"}>
            <Controller
              control={control}
              name="template.name"
              render={({ field: { ref, ...otherProps } }) => (
                <TextField label="Tên" sx={{ width: "100%" }} {...otherProps} />
              )}
            />
          </Box>
          <Box flex={"1"}>
            <Controller
              control={control}
              name="template.category_ids"
              render={({ field: { value, onChange, ref, ...otherProps } }) => (
                <CategoryTemplateSelect
                  label="Danh mục"
                  {...otherProps}
                  values={value}
                  onChange={(_values: number[]) => {
                    onChange(_values);
                  }}
                />
              )}
            />
          </Box>
        </Stack>
      </Modal.Section>
    </Modal>
  );
};
