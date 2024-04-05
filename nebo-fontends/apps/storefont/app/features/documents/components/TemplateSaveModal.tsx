import { Box, Grid, Stack, TextField } from "@mui/material";
import Modal from "../../../components/Modal";
import { AutocompleteSelect } from "../../../components/AutocompleteSelect";

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

          <AutocompleteSelect
            label="Vị trí"
            values={[]}
            options={[]}
            onChange={function (_values: (string | number)[]): void {
              throw new Error("Function not implemented.");
            }}
          />
          {/* <TextField label="Vị trí" InputProps={{ sx: { height: "41px" } }} /> */}
        </Stack>
      </Modal.Section>
    </Modal>
  );
};
