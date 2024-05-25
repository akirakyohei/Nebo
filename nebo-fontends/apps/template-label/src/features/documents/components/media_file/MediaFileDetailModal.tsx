import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  Table,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import Modal from "../../../../components/Modal";
import { FileDataUpload } from "../../../../types";
import { format } from "date-fns";

interface Props {
  open: boolean;
  onClose: () => void;
  asset: FileDataUpload;
  onDelete: () => void;
}

export const MediaFileDetailModal = ({
  open,
  onClose,
  asset,
  onDelete,
}: Props) => {
  return (
    <Modal open={open} onClose={onClose} title={asset.file_name} size="xl">
      <Modal.Section>
        <Grid display={"grid"} gridTemplateColumns={"auto 50%"}>
          <Box component={"img"} src={asset.key} alt={asset.file_name}></Box>
          <Box display={"flex"} gap={2}>
            <Divider orientation="vertical" />
            <Stack>
              <Box>
                <Typography variant="h6">Chi tiết</Typography>
              </Box>
              <Box flex={1}>
                <Stack justifyContent={"space-between"} height={"100%"}>
                  <Table>
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
                        {format(asset.updated_at, "dd/MM/yyyy HHL:mm:ss")}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Ngày tạo</TableCell>
                      <TableCell>
                        {format(asset.created_at, "dd/MM/yyyy HHL:mm:ss")}
                      </TableCell>
                    </TableRow>
                  </Table>
                  <Box>
                    <Stack direction={"row"} gap={2}>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={onDelete}
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
        </Grid>
      </Modal.Section>
    </Modal>
  );
};
