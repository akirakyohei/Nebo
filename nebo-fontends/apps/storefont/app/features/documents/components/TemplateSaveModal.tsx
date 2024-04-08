import { Box, Grid, Stack } from "@mui/material";
import Modal from "../../../components/Modal";
import { AutocompleteSelect } from "../../../components/AutocompleteSelect";
import { TextField } from "../../../components/TextField";
import { CategoryTemplateSelect } from "./CategoryTemplateSelect";
import {
  useCreateTemplateMutation,
  useUpdateTemplateMutation,
} from "../../../data/template.api";
import { Template } from "../../../types";
import { Controller, useForm } from "react-hook-form";
import { useMemo } from "react";

interface Props {
  id?: number;
  isCreate?: boolean;
  onClose: () => void;
  template: Template;
}
export const TemplateSaveModal = ({
  id,
  template,
  isCreate,
  onClose,
}: Props) => {
  const [createTemplate] = useCreateTemplateMutation();
  const [updateTemplate] = useUpdateTemplateMutation();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Pick<Template, "category_ids" | "name">>({
    values: useMemo(() => ({ ...template }), [template]),
  });
  const submit = handleSubmit(
    async (data: Pick<Template, "category_ids" | "name">) => {
      if (isCreate) {
        await createTemplate({ ...data, data: template.data }).unwrap();
      } else {
        await updateTemplate({
          id: id || 0,
          request: { ...data, data: template.data },
        }).unwrap();
      }
    }
  );

  return (
    <Modal
      open
      onClose={onClose}
      title="Tạo tài liệu từ mẫu"
      primaryAction={{
        content: "Lưu",
        loading: isSubmitting,
        onAction: submit,
      }}
      secondaryActions={[
        {
          content: "Huỷ",
          disabled: isSubmitting,
          onAction: onClose,
        },
      ]}
    >
      <Modal.Section>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="name"
            render={({ field: { ref, ...otherProps } }) => (
              <TextField label="Tên" {...otherProps} />
            )}
          />
          <Controller
            control={control}
            name="category_ids"
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
        </Stack>
      </Modal.Section>
    </Modal>
  );
};
