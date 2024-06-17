import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import blankThumbImage from "src/assets/img/new-blank-template.png";
import Modal from "../../../../components/Modal";
import { FileDataUpload } from "../../../../types";
import { format } from "date-fns";
import { useDeleteFileMutation } from "../../../../data/mediafile.api";
import { useToast } from "../../../../components/notification/useToast";
import { isClientError } from "../../../../utils/client";
import { useToggle } from "../../../../utils/useToggle";

interface Props {
  open: boolean;
  onClose: () => void;
  asset: FileDataUpload;
}

export const MediaFileDetailModal = ({ open, onClose, asset }: Props) => {
  const {
    value: isOpenConfirmDelete,
    setTrue: openConfirmDelete,
    setFalse: closeConfirmDelete,
  } = useToggle(false);

  const { show: showToast } = useToast();
  const [deleteFileData, { isLoading: isLoadingDelete }] =
    useDeleteFileMutation();

  const handleDeleteFile = async () => {
    try {
      const res = await deleteFileData(asset.id).unwrap();
      showToast("Xóa ảnh thành công");
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
  };

  return (
    <Modal open={open} onClose={onClose} title={asset.file_name} size="xl">
      <Modal.Section>
        <Grid
          display={"grid"}
          gridTemplateColumns={"auto 45%"}
          justifyItems={"center"}
          minHeight={"60vh"}
        >
          <Box
            display={"flex"}
            justifyItems={"center"}
            justifyContent={"center"}
          >
            <Box
              component={"img"}
              maxWidth={"90%"}
              maxHeight={"90%"}
              src={`/api/files/data/${asset.key}`}
              onError={(event) => {
                event.currentTarget.src = blankThumbImage;
              }}
              alt={asset.file_name}
            ></Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              borderLeft: "1px solid rgba(224, 224, 224, 1)",
              paddingLeft: 3,
            }}
          >
            <Box display={"flex"} gap={2} height={"100%"}>
              <Stack>
                <Box>
                  <Typography variant="h6">Chi tiết</Typography>
                </Box>
                <Box flex={1}>
                  <Stack justifyContent={"space-between"} height={"100%"}>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>Tên</TableCell>
                          <TableCell>{asset.file_name}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Loại</TableCell>
                          <TableCell>{asset.extension}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Cập nhật lần cuối</TableCell>
                          <TableCell>
                            {format(
                              new Date(asset.updated_at),
                              "dd/MM/yyyy HHL:mm:ss"
                            )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Ngày tạo</TableCell>
                          <TableCell>
                            {format(
                              new Date(asset.created_at),
                              "dd/MM/yyyy HHL:mm:ss"
                            )}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <Box>
                      <Stack direction={"row"} gap={2}>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={openConfirmDelete}
                        >
                          Xóa
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={onClose}
                        >
                          Đóng
                        </Button>
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Modal.Section>

      {isOpenConfirmDelete && (
        <Modal
          open
          onClose={closeConfirmDelete}
          title="Xóa ảnh tải lên"
          primaryAction={{
            content: "Xóa",
            loading: isLoadingDelete,
            onAction: handleDeleteFile,
            color: "error",
          }}
          secondaryActions={[
            {
              content: "Hủy",
              disabled: isLoadingDelete,
              onAction: onClose,
              color: "error",
            },
          ]}
        >
          <Modal.Section>
            <Typography>Thao tác này sẽ xóa vĩnh vĩnh viễn ảnh</Typography>
          </Modal.Section>
        </Modal>
      )}
    </Modal>
  );
};
