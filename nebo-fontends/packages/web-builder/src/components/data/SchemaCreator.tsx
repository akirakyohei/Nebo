import { useState } from "react";
import { Box } from "@mui/material";
import { Schema } from "../../schemas/types";
import { SchemaControls } from "./SchemaControls";
import * as HelperUtils from "../../schemas/helpers";
import _ from "lodash/fp";

interface Props {
  schema: Schema;
  schemaKey?: string;
  onChangeKey?: (value: string) => void;
  onDelete?: (key: string) => void;
  onChange?: (schema: Schema) => void;
}

export const SchemaCreator = ({
  schema,
  onChangeKey = _.noop,
  onChange = _.noop,
  onDelete = _.noop,
  schemaKey = "__root__",
}: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(schemaKey === "__root__");
  return (
    <>
      <Box>
        <SchemaControls
          schema={schema}
          schemaKey={schemaKey}
          isCollapsed={isCollapsed}
          onChangeKey={schemaKey !== "__root__" ? onChangeKey : undefined}
          onAdd={
            HelperUtils.isSchemaObject(schema)
              ? () => onChange(HelperUtils.addSchemaProperty(schema))
              : undefined
          }
          onCollapse={
            schemaKey !== "__root__" && HelperUtils.isSchemaObject(schema)
              ? () => setIsCollapsed((prev) => !prev)
              : undefined
          }
          onDelete={
            schemaKey !== "__root__" ? () => onDelete(schemaKey) : undefined
          }
          onChange={onChange}
        />
      </Box>
      {isCollapsed && (
        <Box>
          {HelperUtils.isSchemaObject(schema) &&
            HelperUtils.hasSchemaProperties(schema) && (
              <Box>
                <SchemaObjectProperties
                  schema={schema}
                  onChangeKey={(oldKey, newKey) => {
                    onChange(
                      HelperUtils.renameSchemaProperty(oldKey, newKey, schema)
                    );
                  }}
                  onDelete={(key) =>
                    onChange(HelperUtils.deleteSchemaProperty(key)(schema))
                  }
                  onChange={(key, s) => {
                    onChange(HelperUtils.setSchemaProperty(key)(s, schema));
                  }}
                />
              </Box>
            )}
        </Box>
      )}
    </>
  );
};

interface ObjectProps {
  schema: Schema;
  onDelete: (key: string) => void;
  onChangeKey: (oldKey: string, newKey: string) => void;
  onChange: (key: string, schema: Schema) => void;
}

const SchemaObjectProperties = ({
  schema,
  onChangeKey,
  onDelete,
  onChange,
}: ObjectProps) => {
  return (
    <Box
      component={"ul"}
      sx={{ listStyleType: "none", paddingLeft: 0, paddingTop: 0 }}
    >
      {_.entries(HelperUtils.getSchemaProperties(schema)).map(
        ([key, s], index) => (
          <Box component={"li"} key={index}>
            <Box
              sx={{
                display: "inline-flex",
                position: "relative",

                ":before": {
                  content: `" "`,
                  borderLeft: "1px solid #D3D3D3",
                  borderBottom: "1px solid #D3D3D3",
                  width: "1rem",
                  height: "23px",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                ":after":
                  _.entries(HelperUtils.getSchemaProperties(schema)).length !==
                  index + 1
                    ? {
                        content: `" "`,
                        borderLeft: "1px solid #D3D3D3",
                        width: "1rem",
                        height: "calc(100% - 23px)",
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                      }
                    : undefined,
              }}
            >
              <Box
                sx={{
                  paddingLeft: "1.2rem",
                  paddingTop: 0.7,
                  paddingBottom: 0.5,
                }}
              >
                <SchemaCreator
                  key={key}
                  schema={s as Schema}
                  schemaKey={key}
                  onDelete={() => onDelete(key)}
                  onChangeKey={(newKey) => onChangeKey(key, newKey)}
                  onChange={(newSchema) => onChange(key, newSchema)}
                />
              </Box>
            </Box>
          </Box>
        )
      )}
    </Box>
  );
};
