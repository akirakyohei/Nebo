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
  onClose: () => void;
}

export const TemplateAddModal = ({ onClose }: Props) => {
  const { show: showToast } = useToast();
  const [createTemplate] = useCreateTemplateMutation();
  const { page, limit } = useSimpleFilters();
  const {
    data: templates = {
      data: [],
      metadata: { total_element: 0, page: 1, limit: limit },
    },
    isLoading: isLoadingTemplates,
    isFetching: isFetchingTemplates,
  } = useGetTemplatesWithInfiniteQuery({ page, limit });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<{ template: Template }>({
    defaultValues: { template: { ...defaultBlankTemplate, id: -1 } },
  });
  const submit = handleSubmit(async (data: { template: Template }) => {
    try {
      const res = createTemplate({
        ...data.template,
      });
      showToast("Tạo mẫu thành công");
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
      title="Tạo mẫu"
      primaryAction={{
        content: "Tạo",
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

        <Box sx={{ overflow: "auto", height: "50vh", background: "#FAFAFA" }}>
          <Controller
            control={control}
            name={"template"}
            render={({ field: { ref, ...otherProps } }) => (
              <TemplateMasonrySelect
                isLoading={isFetchingTemplates}
                templates={templates.data}
                copyTemplateId={otherProps.value.id}
                onChange={(_value) => otherProps.onChange(_value)}
              />
            )}
          />
        </Box>
      </Modal.Section>
    </Modal>
  );
};
