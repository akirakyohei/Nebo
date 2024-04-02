import { Box, Modal, TextField } from "@mui/material";

interface Props {
  onClose: () => void;
}
export const TemplateSaveModal = ({ onClose }: Props) => {
  return (
    <Modal open onClose={onClose}>
      <Box>
        <Box>Lưu</Box>
        <Box>
          <TextField />
        </Box>
        <Box>Vị trí</Box>
        <Box>
          <TextField />
        </Box>
      </Box>
    </Modal>
  );
};
