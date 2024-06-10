import { useState } from "react";
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Schema } from "../../schemas/types";
import { useToggle } from "../../useToggle";
import * as HelperUtils from "../../schemas/helpers";
import _ from "lodash/fp";
import Icon from "@mdi/react";
import {
  mdiChevronDown,
  mdiChevronDownBoxOutline,
  mdiChevronUp,
  mdiChevronUpBoxOutline,
  mdiCloseBoxOutline,
  mdiMinus,
  mdiMinusBoxOutline,
  mdiPlusBoxOutline,
} from "@mdi/js";

interface Props {
  schema: Schema;
  schemaKey: string;
  isCollapsed?: boolean;
  onDelete?: () => void;
  onAdd?: () => void;
  onCollapse?: () => void;
  onChangeKey?: (key: string) => void;
  onChange: (schema: Schema) => void;
}

export const SchemaControls = ({
  schema,
  schemaKey,
  isCollapsed,
  onDelete,
  onAdd,
  onCollapse,
  onChangeKey,
  onChange,
}: Props) => {
  const [schemaKeyIn, setSchemaKeyIn] = useState(schemaKey);
  return (
    <Stack direction={"row"} gap={2}>
      <Box>
        <TextField
          label={"Tên"}
          placeholder="Nhập tên"
          disabled={schemaKey === "__root__"}
          value={HelperUtils.getSchemaTitle(schema)}
          onChange={(event) => {
            onChange(HelperUtils.setSchemaTitle(event.target.value, schema));
          }}
          InputLabelProps={{ sx: { top: "-6px" } }}
          InputProps={{
            sx: {
              height: "38px",
              "> input": {
                padding: "0 16px !important",
                height: "100% !important",
              },
              "> input:disabled": {
                background: "#ededed",
              },
            },
          }}
        />
      </Box>
      <Box>
        <Select
          value={HelperUtils.getSchemaType(schema)}
          disabled={schemaKey === "__root__"}
          onChange={(event) => {
            onChange(
              HelperUtils.setSchemaTypeAndRemoveWrongFields(
                event.target.value,
                schema
              )
            );
          }}
          sx={{
            height: "38px",
            "> input": {
              padding: "0 16px !important",
              height: "100% !important",
            },
            "> input:disabled": {
              background: "#ededed",
            },
          }}
        >
          <MenuItem value={"string"}>Chuỗi</MenuItem>
          <MenuItem value={"number"}>Số</MenuItem>
          <MenuItem value={"object"}>Đối tượng</MenuItem>
        </Select>
      </Box>
      {_.isFunction(onChangeKey) ? (
        <TextField
          label="Biến"
          value={schemaKeyIn}
          onChange={(event) => {
            if (/^[A-Za-z0-9_]+$/.test(event.target.value))
              setSchemaKeyIn(event.target.value);
          }}
          onBlur={() => {
            onChangeKey?.(schemaKeyIn);
          }}
          InputLabelProps={{ sx: { top: "-6px" } }}
          InputProps={{
            sx: {
              height: "38px",
              "> input": {
                padding: "0 16px !important",
                height: "100% !important",
              },
            },
          }}
        />
      ) : null}
      <Stack direction={"row"}>
        {_.isFunction(onCollapse) ? (
          <IconButton onClick={onCollapse}>
            <Icon
              path={
                isCollapsed ? mdiChevronDownBoxOutline : mdiChevronUpBoxOutline
              }
              size={1}
            />
          </IconButton>
        ) : null}
        {_.isFunction(onDelete) && (
          <IconButton onClick={onDelete}>
            <Icon path={mdiCloseBoxOutline} size={1} />
          </IconButton>
        )}
        {_.isFunction(onAdd) && (
          <IconButton onClick={onAdd}>
            <Icon path={mdiPlusBoxOutline} size={1} />
          </IconButton>
        )}
      </Stack>
    </Stack>
  );
};
