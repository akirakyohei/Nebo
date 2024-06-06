import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import Modal from "../../../../components/Modal";
import { useToast } from "../../../../components/notification/useToast";
import { useUploadFileMutation } from "../../../../data/mediafile.api";
import { Category, FileDataUploadRequest } from "../../../../types";
import { isClientError } from "../../../../utils/client";
import { useCallback } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { styled } from "@mui/material/styles";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Close, FileUploadOutlined } from "@mui/icons-material";
import { Buffer } from "buffer";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../../../../data/category.api";
import { TextField } from "../../../../components/TextField";
interface Props {
  category?: Category;
  open: boolean;
  onClose: () => void;
}

type InputModel = {
  name: string;
};

export const CategoryModal = ({ category, open, onClose }: Props) => {
  const isCreate = !category || category.id === 0;
  const { show: showToast } = useToast();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm<InputModel>({
    values: useMemo(() => ({ name: category?.name || "" }), []),
  });
  const submit = handleSubmit(async (data: InputModel) => {
    try {
      if (isCreate) {
        await createCategory({ name: data.name }).unwrap();
        showToast("Tạo danh mục thành công");
      } else {
        await updateCategory({
          id: category.id,
          request: { name: data.name },
        }).unwrap();
        showToast("Update tên mục thành công");
      }
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
      open={open}
      onClose={onClose}
      title={isCreate ? "Tạo danh mục" : "Cập nhật danh mục"}
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
        <Box flex={"1"}>
          <Controller
            control={control}
            name="name"
            render={({ field: { ref, ...otherProps } }) => (
              <TextField label="Tên" sx={{ width: "100%" }} {...otherProps} />
            )}
          />
        </Box>
      </Modal.Section>
    </Modal>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getColor = (props: any) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.disabled) {
    return "#eeeeee";
  }
  return "#2196f3";
};

const Container = styled("div")<{
  isDragAccept?: boolean;
  isDragReject?: boolean;
  isFocused?: boolean;
  disabled?: boolean;
}>((p) => ({
  flex: "1",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: "2px",
  borderRadius: "2px",
  borderColor: `${getColor(p)}`,
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: `${p.disabled ? "#bdbdbd" : p.theme.palette.primary.light}`,
  outline: "none",
  transition: "border 0.24s ease-in-out",
}));
