import { Box, TextField } from "@mui/material";
import Modal from "../../../components/Modal";

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
