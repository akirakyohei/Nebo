import { Schema } from "@repo/web-builder";
import * as HelperUtils from "@repo/web-builder";
import { TextField } from "../../../../components/TextField";
import { Box, Icon, IconButton, Stack, Typography } from "@mui/material";
import _ from "lodash/fp";
import {
  ArrowDropDownOutlined,
  ArrowDropUpOutlined,
  ArrowUpwardOutlined,
  ExpandLess,
  ExpandLessOutlined,
  ExpandMoreOutlined,
} from "@mui/icons-material";
interface Props {
  schema: Schema;
  schemaKey: string;
  isCollapsed?: boolean;
  onCollapse?: () => void;
  onChange: (schema: Schema) => void;
}

export const FormSchemaControls = ({
  schema,
  schemaKey,
  onChange,
  isCollapsed,
  onCollapse,
}: Props) => {
  const typeSchema = HelperUtils.getSchemaType(schema);

  if (typeSchema === "string")
    return (
      <TextField
        value={HelperUtils.getSchemaField("value", schema)}
        label={HelperUtils.getSchemaTitle(schema)}
        onChange={(event) => {
          onChange(HelperUtils.setSchemaValue(event.target.value, schema));
        }}
        InputProps={{ sx: { height: "38px", background: "#fff" } }}
      />
    );
  if (typeSchema === "number")
    return (
      <TextField
        value={HelperUtils.getSchemaField("value", schema)}
        label={HelperUtils.getSchemaTitle(schema)}
        onChange={(event) => {
          const _value = Number(event.target.value) || 0;
          if (
            event.target.value === "0-" &&
            HelperUtils.getSchemaField("value", schema) === 0
          ) {
            onChange(HelperUtils.setSchemaValue("-", schema));
            return;
          }
          if (event.target.value.endsWith(".")) {
            if (
              event.target.value.split("").filter((a) => a === ".").length === 1
            ) {
              onChange(HelperUtils.setSchemaValue(event.target.value, schema));
              return;
            } else {
              return;
            }
          }
          onChange(HelperUtils.setSchemaValue(_value, schema));
        }}
        size="small"
        fullWidth
        sx={{ background: "var(--gjs-primary-color)", width: "227px" }}
        InputProps={{
          sx: { height: "38px", background: "#fff" },
          endAdornment: (
            <Stack width={"24px"}>
              <IconButton
                size="small"
                sx={{ padding: 0, height: "16px", width: "16px" }}
                onClick={() => {
                  const _value =
                    Number(HelperUtils.getSchemaField("value", schema)) || 0;
                  const v = `${_value + 1}`;
                  onChange(HelperUtils.setSchemaValue(v, schema));
                }}
              >
                <ArrowDropUpOutlined />
              </IconButton>

              <IconButton
                size="small"
                sx={{ padding: 0, height: "16px", width: "16px" }}
                onClick={() => {
                  const _value =
                    Number(HelperUtils.getSchemaField("value", schema)) || 0;
                  const v = `${_value - 1}`;
                  onChange(HelperUtils.setSchemaValue(v, schema));
                }}
              >
                <ArrowDropDownOutlined />
              </IconButton>
            </Stack>
          ),
        }}
      />
    );

  return (
    <Box sx={{ display: "flex" }}>
      <Stack
        gap={2}
        direction={"row"}
        justifyContent={"start"}
        alignItems={"center"}
        sx={{
          border: "1px solid #000",
          padding: 0.5,
          borderRadius: "5px",
          background: "#f5f5f5",
        }}
      >
        <Typography>{HelperUtils.getSchemaTitle(schema)}</Typography>{" "}
        {_.isFunction(onCollapse) && (
          <IconButton
            onClick={onCollapse}
            size="small"
            sx={{
              width: "16px",
              height: "16px",
              border: "1px solid #000",
              borderRadius: "3px",
            }}
          >
            {isCollapsed ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
          </IconButton>
        )}
      </Stack>
    </Box>
  );
  return null;
};
