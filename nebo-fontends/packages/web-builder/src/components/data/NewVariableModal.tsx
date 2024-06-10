import { useState } from "react";
import { Schema } from "../../schemas/types";
import { SchemaCreator } from "./SchemaCreator";
import Modal from "../modal/Modal";
import { Box, Divider } from "@mui/material";

interface Props {
  onClose: () => void;
  schema: Schema;
  onChange: (schema: Schema) => void;
}

export const NewVariableModal = ({
  schema: schemaData,
  onChange,
  onClose,
}: Props) => {
  const [schema, setSchema] = useState(schemaData);
  return (
    <Modal
      open
      onClose={onClose}
      title={"Biến"}
      size="lg"
      primaryAction={{
        content: "Lưu",
        onAction: () => {
          onChange(schema);
          onClose();
        },
      }}
      secondaryActions={[
        {
          content: "Hủy",
          onAction: onClose,
        },
      ]}
    >
      <Divider />
      <Modal.Section>
        <Box
          sx={{
            minHeight: "50vh",
            maxHeight: "60vh",
            overflow: "auto",
            paddingTop: 2,
          }}
        >
          <SchemaCreator schema={schema} onChange={setSchema} />
        </Box>
      </Modal.Section>
    </Modal>
  );
};
