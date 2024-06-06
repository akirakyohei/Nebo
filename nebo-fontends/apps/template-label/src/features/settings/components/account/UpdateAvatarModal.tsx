import { useForm } from "react-hook-form";

import { useCallback } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { styled } from "@mui/material/styles";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import { Close, FileUploadOutlined } from "@mui/icons-material";
import { FileDataUploadRequest, User } from "../../../../types";
import { useToast } from "../../../../components/notification/useToast";
import { useUploadFileMutation } from "../../../../data/mediafile.api";
import { isClientError } from "../../../../utils/client";
import Modal from "../../../../components/Modal";
import { stringAvatar } from "../../../../utils/stringAvatar";
import { useUpdateAccountMutation } from "../../../../data/user.api";
import { Buffer } from "buffer";
interface Props {
  open: boolean;
  onClose: () => void;
  user: User;
}

type InputModel = {
  file?: FileDataUploadRequest;
};

export const UpdateAvatarModal = ({ open, onClose, user }: Props) => {
  const { show: showToast } = useToast();
  const [updateAccount] = useUpdateAccountMutation();

  const {
    watch,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm<InputModel>({});
  const submit = handleSubmit(async (data: InputModel) => {
    if (!data.file) return;
    try {
      const res = updateAccount({
        avatar: { ...data.file },
      }).unwrap();
      showToast("Cập nhật thành công");
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

  const onDrop = useCallback(
    (
      _acceptedFiles: File[],
      _fileRejections: FileRejection[],
      _event: DropEvent
    ) => {
      if (_acceptedFiles.length === 0) return;
      const file = _acceptedFiles[0];
      const reader = new FileReader();
      reader.onabort = () =>
        showToast("Có lỗi không thể đọc file", { variant: "error" });
      reader.onerror = () =>
        showToast("Mở file thất bại", { variant: "error" });
      reader.onload = () => {
        if (reader.result === null) {
          showToast("Có lỗi không thể đọc file", { variant: "error" });
          return;
        }
        setValue("file", {
          name: file.name,
          content_type: file.type,
          data:
            typeof reader.result !== "string"
              ? Buffer.from(reader.result).toString("base64")
              : reader.result,
        });
      };
      reader.readAsArrayBuffer(file);
    },
    []
  );

  const { isFocused, isDragAccept, isDragReject, getRootProps, getInputProps } =
    useDropzone({
      accept: { "image/jpeg": [], "image/png": [], "image/jpg": [] },
      maxFiles: 1,
      maxSize: 3145728,
      onDrop,
    });

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Tải ảnh lên"
      primaryAction={{
        content: "Tải lên",
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
          <Container
            {...getRootProps({ isFocused, isDragAccept, isDragReject })}
          >
            <div {...getRootProps()}>
              <input {...getInputProps()} />
            </div>

            <Box width={"100%"}>
              <Stack justifyContent={"center"} alignItems={"center"}>
                <Avatar
                  src={
                    !watch("file")
                      ? user?.avatar_url
                      : URL.createObjectURL(
                          new Blob([Buffer.from(watch("file.data"), "base64")])
                        )
                  }
                  {...stringAvatar(user.first_name, user.last_name, 100)}
                />
                <Typography variant="subtitle2">
                  {isSubmitting
                    ? "Đang tải ảnh lên..."
                    : "Kéo thả ảnh vào đây hoặc nhấn vào để chọn ảnh"}
                </Typography>
              </Stack>
            </Box>
          </Container>
        </Stack>
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
