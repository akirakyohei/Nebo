import { Schema } from "@repo/web-builder";
import { Box } from "@mui/material";
import { title } from "process";
import { useState } from "react";
import { FormSchemaControls } from "./FormSchemaControls";
import * as HelperUtils from "@repo/web-builder";
import _ from "lodash";

interface Props {
  schema: Schema;
  schemaKey?: string;
  onChange?: (schema: Schema) => void;
}

export const FormBuilder = ({
  schema,
  schemaKey = "__root__",
  onChange = _.noop,
}: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(schemaKey === "__root__");
  return (
    <>
      <Box>
        <FormSchemaControls
          schema={schema}
          schemaKey={schemaKey}
          isCollapsed={isCollapsed}
          onCollapse={
            schemaKey !== "__root__" && HelperUtils.isSchemaObject(schema)
              ? () => setIsCollapsed((prev) => !prev)
              : undefined
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
  onChange: (key: string, schema: Schema) => void;
}

const SchemaObjectProperties = ({ schema, onChange }: ObjectProps) => {
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
                <FormBuilder
                  key={key}
                  schema={s as Schema}
                  schemaKey={key}
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
