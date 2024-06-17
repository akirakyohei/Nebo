import { mdiFileArrowUpDownOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { Box, Stack, Typography, styled } from "@mui/material";
import { useCallback, useState } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { FileUploadData } from "../../types/template";
import { Buffer } from "buffer";
interface Props {
  showToast: (value: string, option?: { isError?: boolean }) => void;
  uploadFile: (file: FileUploadData) => Promise<void>;
}

export const UploadImage = ({ showToast, uploadFile }: Props) => {
  const [fileInput, setFileInput] = useState<FileUploadData | null>(null);
  const [isUploadFile, setIsUploadFile] = useState(false);

  const onDrop = useCallback(
    (
      _acceptedFiles: File[],
      _fileRejections: FileRejection[],
      _event: DropEvent
    ) => {
      if (_acceptedFiles.length === 0) return;
      const file = _acceptedFiles[0];
      const reader = new FileReader();
      if (!file) return;
      reader.onabort = () =>
        showToast("Có lỗi không thể đọc file", { isError: true });
      reader.onerror = () => showToast("Mở file thất bại", { isError: true });
      reader.onload = () => {
        if (reader.result === null) {
          showToast("Có lỗi không thể đọc file", { isError: true });
          return;
        }
        const _file = {
          name: file.name,
          content_type: file.type,

          data:
            typeof reader.result !== "string"
              ? Buffer.from(reader.result).toString("base64")
              : reader.result,
        };
        setFileInput(_file);
        setIsUploadFile(true);
        uploadFile(_file).finally(() => {
          setFileInput(null);
          setIsUploadFile(false);
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
      disabled: !!fileInput,
    });

  return (
    <Container
      {...getRootProps({ isFocused, isDragAccept, isDragReject })}
      disabled={!!fileInput}
      sx={{
        height: "100%",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        ":hover": {
          borderColor: "#2196f366",
          backgroundColor: "#f8f8f8",
          cursor: "pointer",
        },
      }}
    >
      <div {...getRootProps()}>
        <input {...getInputProps()} />
      </div>

      <Box width={"100%"}>
        <Stack justifyContent={"center"} alignItems={"center"}>
          <Icon path={mdiFileArrowUpDownOutline} size={"40px"} />
          <Typography variant="subtitle2">
            {isUploadFile
              ? "Đang tải ảnh lên..."
              : "Kéo thả ảnh vào đây hoặc nhấn vào để chọn ảnh"}
          </Typography>
        </Stack>
      </Box>
    </Container>
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
  borderRadius: "5px",
  borderColor: `${getColor(p)}`,
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: `${p.disabled ? "#bdbdbd" : p.theme.palette.primary.light}`,
  outline: "none",
  transition: "border 0.24s ease-in-out",
}));
