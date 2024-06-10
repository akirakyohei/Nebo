import { useState } from "react";
import { mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { Box, Button } from "@mui/material";
import { defaultSchema } from "../schemas/constants";
import { useToggle } from "../useToggle";
import { NewVariableModal } from "./data/NewVariableModal";
import { VariableList } from "./data/VariableList";

interface Props {
  showToast?: (value: string, option?: { isError?: boolean }) => void;
}
export const DataManager = ({ showToast }: Props) => {
  const {
    value: isOpenEditorSchema,
    setTrue: openEditorSchema,
    setFalse: closeEditorSchema,
  } = useToggle(false);
  const [schema, setSchema] = useState(defaultSchema);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          padding: 2,
          background: "var(--gjs-primary-color)",
          color: "var(--gjs-font-color)",
          borderBottom: "1px solid var( --gjs-border-color)",
        }}
      >
        <Button
          variant="outlined"
          fullWidth
          onClick={openEditorSchema}
          startIcon={
            <Box>
              <Icon path={mdiPlus} size={1} />
            </Box>
          }
        >
          Thêm biến
        </Button>
      </Box>
      <VariableList showToast={showToast} schema={schema} />
      {isOpenEditorSchema && (
        <NewVariableModal
          schema={schema}
          onChange={setSchema}
          onClose={closeEditorSchema}
        />
      )}
    </Box>
  );
};
