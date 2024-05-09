import { Stack, TextField } from "@mui/material";
import { LoginRequestModel } from "../types";
import { id } from "date-fns/locale";
import { template } from "lodash-es";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

export const LoginCard = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginRequestModel>({
    defaultValues: { emailOrPhone: "", password: "" },
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
    <Stack spacing={2}>
      <Controller
        control={control}
        name="name"
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        render={({ field: { ref, ...otherProps } }) => (
          <TextField label="Tên" {...otherProps} />
        )}
      />
      <Controller
        control={control}
        name="name"
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        render={({ field: { ref, ...otherProps } }) => (
          <TextField label="Tên" {...otherProps} />
        )}
      />
    </Stack>
  );
};
