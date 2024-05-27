import { useForm } from "react-hook-form";
import Modal from "../../../../components/Modal";
import { useToast } from "../../../../components/notification/useToast";
import { useUploadFileMutation } from "../../../../data/mediafile.api";
import { FileDataUploadRequest } from "../../../../types";
import { isClientError } from "../../../../utils/client";
import { useCallback } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { styled } from "@mui/material/styles";
import { Box, Stack, Typography } from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
}

type InputModel = {
  file?: FileDataUploadRequest;
};

export const MediaFileUploadModal = ({ open, onClose }: Props) => {
  const { show: showToast } = useToast();
  const [uploadFile] = useUploadFileMutation();

  const {
    watch,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm<InputModel>({});
  const submit = handleSubmit(async (data: InputModel) => {
    if (!data.file) return;
    try {
      const res = uploadFile({
        ...data.file,
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
              ? reader.result
              : new TextEncoder().encode(reader.result),
        });
      };
      reader.readAsArrayBuffer(file);
    },
    []
  );

  const {
    acceptedFiles,
    isFocused,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: { "image/jpeg": [], "image/png": [], "image/jpg": [] },
    maxFiles: 1,
    maxSize: 3145728,
    onDrop,
  });

  const fileMarkup = watch("file") ? (
    <Box sx={(theme) => ({ border: "1px solid #acabbb", padding: 1 })}>
      <Stack direction="row" gap={1} alignItems={"center"}>
        <Box
          component={"img"}
          height={"40px"}
          width={"40px"}
          boxShadow={(theme) => theme.shadows[3]}
          src={URL.createObjectURL(new Blob([watch("file.data")]))}
        ></Box>
        <Box flex="1">
          <Typography>{watch("file.name")}</Typography>
        </Box>
      </Stack>
    </Box>
  ) : null;

  return (
    <Modal open={open} onClose={onClose} title="Tải ảnh lên">
      <Modal.Section>
        <Container {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
          </div>

          <Box width={"100%"}>
            <p>Dropzone without keyboard events</p>
            <em>(SPACE/ENTER and focus events are disabled)</em>
            <ul>{fileMarkup}</ul>
          </Box>
        </Container>
      </Modal.Section>
    </Modal>
  );
};

const getColor = (props: any) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isFocused) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const Container = styled("div")({
  flex: "1",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: "2px",
  borderRadius: "2px",
  borderColor: `${(p: any) => getColor(p)}`,
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border 0.24s ease-in-out",
});
