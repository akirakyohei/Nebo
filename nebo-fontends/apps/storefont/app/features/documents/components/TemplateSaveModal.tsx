import { Box, Grid, Stack, TextField } from "@mui/material";
import Modal from "../../../components/Modal";

interface Props {
  onClose: () => void;
}
export const TemplateSaveModal = ({ onClose }: Props) => {
  return (
    <Modal
      open
      onClose={onClose}
      title="Tạo tài liệu từ mẫu"
      primaryAction={{
        content: "Lưu",
        onAction: () => {},
      }}
      secondaryActions={[
        {
          content: "Huỷ",
        },
      ]}
    >
      <Modal.Section>
        <Stack spacing={2}>
          <TextField label="Tên" InputProps={{ sx: { height: "41px" } }} />

          <TextField label="Vị trí" InputProps={{ sx: { height: "41px" } }} />
        </Stack>
      </Modal.Section>
    </Modal>
  );
};
