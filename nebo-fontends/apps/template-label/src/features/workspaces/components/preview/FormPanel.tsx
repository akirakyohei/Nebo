import { Box, Button } from "@mui/material";
import { FormBuilder } from "./FormBuilder";
import React, { useEffect, useState } from "react";
import { Schema } from "@repo/web-builder";
import * as HelperUtils from "@repo/web-builder";
import _ from "lodash/fp";

interface Props {
  fieldSchema: Schema;
  data: any;
  handlePreviewWithData: (schema: Schema) => void;
  handleSaveTestData: (schema: Schema) => void;
}

export const FormPanel = ({
  data,
  fieldSchema,
  handleSaveTestData,
  handlePreviewWithData,
}: Props) => {
  const [schema, setSchema] = useState(fieldSchema);
  const joinDataInSchema = (
    _schema: Schema,
    _data: any,
    onChange: (schema: Schema) => void
  ) => {
    if (HelperUtils.isSchemaObject(_schema)) {
      joinDataInSchemaProperties(_schema, _data, (newSchema) => {
        onChange(newSchema);
      });
      return;
    }

    //TODO fill data array
    if (HelperUtils.isSchemaArray(_schema)) {
      //   const data: Record<string, any>[] = HelperUtils.getSchemaField(
      //     "value",
      //     schema
      //   ) as Record<string, any>[];
      return;
    }

    if (HelperUtils.isSchemaDefault(_schema)) {
      onChange(HelperUtils.setSchemaValue(_data, _schema));
      return;
    }
    return;
  };

  const joinDataInSchemaProperties = (
    _schema: Schema,
    _data: any,
    onChange: (schema: Schema) => void
  ) => {
    let newSchema = _schema;
    _.entries(HelperUtils.getSchemaProperties(_schema)).forEach(([key, s]) => {
      joinDataInSchema(s as Schema, _.get(key, _data), (_schema1) => {
        newSchema = HelperUtils.setSchemaProperty(key)(_schema1, newSchema);
      });
    });
    onChange(newSchema);
  };

  useEffect(() => {
    joinDataInSchema(schema, data, (_schema) => setSchema(_schema));
  }, [data]);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          padding: 2,
          display: "flex",
          justifyContent: "center",
          borderBottom: "1px solid var( --gjs-border-color)",
        }}
      >
        Dữ liệu thử nghiệm
      </Box>
      <Box sx={{ flex: "1 1 auto", display: "contents" }}>
        <Box
          sx={{
            padding: 2,
            flex: "1 1 auto",
            height: "100%",
            overflow: "auto",
            position: "relative",
            background: "#FAFAFA",
          }}
        >
          <FormBuilder schema={schema} onChange={setSchema} />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: 2,
          borderTop: "1px solid var( --gjs-border-color)",
          gap: 3,
        }}
      >
        <Button variant="outlined" onClick={() => handleSaveTestData(schema)}>
          Lưu dữ liệu mẫu
        </Button>
        <Button
          variant="contained"
          onClick={() => handlePreviewWithData(schema)}
        >
          Xem trước
        </Button>
      </Box>
    </Box>
  );
};
