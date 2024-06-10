import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import { Schema } from "../../schemas/types";
import { Box, Stack } from "@mui/material";
import {
  isSchemaArray,
  isSchemaDefault,
  isSchemaObject,
} from "../../schemas/helpers";
import React from "react";
import _ from "lodash/fp";
import Icon from "@mdi/react";
import { mdiContentCopy, mdiCopyright } from "@mdi/js";

interface Props {
  schema: Schema;
  showToast?: (value: string, option?: { isError?: boolean }) => void;
}

export const VariableList = ({ schema, showToast }: Props) => {
  return (
    <Box sx={{ padding: 1 }}>
      <SimpleTreeView>
        <VariableItem
          schemaKey="__root__"
          schema={schema}
          showToast={showToast}
        />
      </SimpleTreeView>
    </Box>
  );
};

interface VariableItemProps {
  schema: Schema;
  schemaKey: string;
  rootVariable?: string;
  showToast?: (value: string, option?: { isError?: boolean }) => void;
}

export const VariableItem = ({
  schemaKey,
  schema,
  showToast,
  rootVariable = "",
}: VariableItemProps) => {
  if (isSchemaObject(schema)) {
    const childrenItems: React.ReactNode[] = _.entries(schema.properties).map(
      ([key, value], index) => {
        return (
          <VariableItem
            key={index}
            schemaKey={key}
            schema={value}
            rootVariable={[rootVariable, schemaKey]
              .filter((a) => a !== "" && a !== `__root__`)
              .join(".")}
          />
        );
      }
    );

    if (schemaKey === "__root__") {
      return <>{childrenItems}</>;
    }
    return (
      <>
        <TreeItem
          itemId={schemaKey}
          label={
            <VariableLabel
              showToast={showToast}
              rootVariable={rootVariable}
              schemaKey={schemaKey}
            />
          }
          ContentProps={{
            style: {
              border: "1px solid #8CBAE8",
              marginTop: 4,
              marginBottom: 4,
            },
          }}
        >
          {childrenItems}
        </TreeItem>
      </>
    );
  }
  if (isSchemaArray(schema)) {
    if (schemaKey !== "__root__")
      return (
        <TreeItem
          itemId={schemaKey}
          label={
            <VariableLabel rootVariable={rootVariable} schemaKey={schemaKey} />
          }
          ContentProps={{
            style: {
              border: "1px solid #8CBAE8",
              marginTop: 4,
              marginBottom: 4,
            },
          }}
        >
          <VariableItem
            rootVariable=""
            schemaKey={"_"}
            schema={schema.items as Schema}
          />
        </TreeItem>
      );
  }
  if (isSchemaDefault(schema)) {
    if (schemaKey !== "__root__")
      return (
        <TreeItem
          itemId={schemaKey}
          label={
            <VariableLabel rootVariable={rootVariable} schemaKey={schemaKey} />
          }
          ContentProps={{
            style: {
              border: "1px solid #8CBAE8",
              color: "#4C5569",
              marginTop: 4,
              marginBottom: 4,
            },
          }}
        />
      );
  }
  return null;
};

export const VariableLabel = ({
  schemaKey,
  rootVariable = "",
  showToast,
}: {
  schemaKey: string;
  rootVariable?: string;
  showToast?: (value: string, option?: { isError?: boolean }) => void;
}) => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      minWidth={"100%"}
      onClick={() => {
        navigator.clipboard.writeText(
          `{{${[rootVariable, schemaKey].filter((a) => a !== "").join(".")}}}`
        );
        showToast?.("Sao chép thành công");
      }}
    >
      <Box>{schemaKey}</Box>
      <Icon path={mdiContentCopy} size={0.7} />
    </Stack>
  );
};
