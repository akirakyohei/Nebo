import { Box, Button, Grid, Stack } from "@mui/material";
import { Template } from "../../../../types";
import { FormBuilder } from "./FormBuilder";
import { Schema } from "@repo/web-builder";
import { ContentPreview } from "./ContentPreview";
import { Toolbar } from "./Toolbar";
import { useState } from "react";
import * as HelperUtils from "@repo/web-builder";
import _ from "lodash/fp";

interface Props {
  template: Template;
}

const defaultSchema: Schema = {
  title: "Gốc",
  type: "object",
  properties: {
    title: {
      type: "string",
      title: "Tiêu đề",
    },
    name: {
      type: "string",
      title: "Tên",
    },
    data: {
      type: "object",
      title: "Dữ liệu",
      properties: {
        name: {
          type: "string",
          title: "Tên",
        },
        age: {
          type: "number",
          title: "Tuổi",
        },
      },
    },
    data1: {
      type: "object",
      title: "Dữ liệu",
      properties: {
        name: {
          type: "string",
          title: "Tên",
        },
        age: {
          type: "number",
          title: "Tuổi",
        },
      },
    },
    data2: {
      type: "object",
      title: "Dữ liệu",
      properties: {
        name: {
          type: "string",
          title: "Tên",
        },
        age: {
          type: "number",
          title: "Tuổi",
        },
      },
    },
    data3: {
      type: "object",
      title: "Dữ liệu",
      properties: {
        name: {
          type: "string",
          title: "Tên",
        },
        age: {
          type: "number",
          title: "Tuổi",
        },
      },
    },
    data4: {
      type: "object",
      title: "Dữ liệu",
      properties: {
        name: {
          type: "string",
          title: "Tên",
        },
        age: {
          type: "number",
          title: "Tuổi",
        },
      },
    },
    data5: {
      type: "object",
      title: "Dữ liệu",
      properties: {
        name: {
          type: "string",
          title: "Tên",
        },
        age: {
          type: "number",
          title: "Tuổi",
        },
        data5: {
          type: "object",
          title: "Dữ liệu",
          properties: {
            name: {
              type: "string",
              title: "Tên",
            },
            age: {
              type: "number",
              title: "Tuổi",
            },
            d: {
              type: "object",
              title: "d",
              properties: {
                d: {
                  type: "object",
                  title: "d",
                  properties: {
                    name: {
                      type: "string",
                      title: "Tên",
                    },
                    age: {
                      type: "number",
                      title: "Tuổi",
                    },
                    d: {
                      type: "object",
                      title: "d",
                      properties: {
                        name: {
                          type: "string",
                          title: "Tên",
                        },
                        age: {
                          type: "number",
                          title: "Tuổi",
                        },
                        d: {
                          type: "object",
                          title: "d",
                          properties: {
                            name: {
                              type: "string",
                              title: "Tên",
                            },
                            age: {
                              type: "number",
                              title: "Tuổi",
                            },
                            d: {
                              type: "object",
                              title: "d",
                              properties: {
                                name: {
                                  type: "string",
                                  title: "Tên",
                                },
                                age: {
                                  type: "number",
                                  title: "Tuổi",
                                },
                                d: {
                                  type: "object",
                                  title: "d",
                                  properties: {
                                    name: {
                                      type: "string",
                                      title: "Tên",
                                    },
                                    age: {
                                      type: "number",
                                      title: "Tuổi",
                                    },
                                    d: {
                                      type: "object",
                                      title: "d",
                                      properties: {
                                        name: {
                                          type: "string",
                                          title: "Tên",
                                        },
                                        age: {
                                          type: "number",
                                          title: "Tuổi",
                                        },
                                        d: {
                                          type: "object",
                                          title: "d",
                                          properties: {
                                            name: {
                                              type: "string",
                                              title: "Tên",
                                            },
                                            age: {
                                              type: "number",
                                              title: "Tuổi",
                                            },
                                            d: {
                                              type: "object",
                                              title: "d",
                                              properties: {
                                                name: {
                                                  type: "string",
                                                  title: "Tên",
                                                },
                                                age: {
                                                  type: "number",
                                                  title: "Tuổi",
                                                },
                                                d: {
                                                  type: "object",
                                                  title: "d",
                                                  properties: {
                                                    name: {
                                                      type: "string",
                                                      title: "Tên",
                                                    },
                                                    age: {
                                                      type: "number",
                                                      title: "Tuổi",
                                                    },
                                                    d: {
                                                      type: "object",
                                                      title: "d",
                                                      properties: {
                                                        name: {
                                                          type: "string",
                                                          title: "Tên",
                                                        },
                                                        age: {
                                                          type: "number",
                                                          title: "Tuổi",
                                                        },
                                                        d: {
                                                          type: "object",
                                                          title: "d",
                                                          properties: {
                                                            name: {
                                                              type: "string",
                                                              title: "Tên",
                                                            },
                                                            age: {
                                                              type: "number",
                                                              title: "Tuổi",
                                                            },
                                                            d: {
                                                              type: "object",
                                                              title: "d",
                                                              properties: {
                                                                name: {
                                                                  type: "string",
                                                                  title: "Tên",
                                                                },
                                                                age: {
                                                                  type: "number",
                                                                  title: "Tuổi",
                                                                },
                                                              },
                                                            },
                                                          },
                                                        },
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    data6: {
      type: "object",
      title: "Dữ liệu",
      properties: {
        name: {
          type: "string",
          title: "Tên",
        },
        age: {
          type: "number",
          title: "Tuổi",
        },
      },
    },
  },
};

const defaultSchema2: Schema = {
  title: "Gốc",
  type: "object",
  properties: {
    title: {
      type: "string",
      title: "Tiêu đề",
    },
    name: {
      type: "string",
      title: "Tên",
    },
  },
};

export const PreviewContainer = ({ template }: Props) => {
  const [schema, setSchema] = useState(defaultSchema);

  const getJsonData = (schema: Schema) => {
    if (HelperUtils.isSchemaObject(schema)) {
      let data: Record<string, any> = {};
      _.entries(schema.properties).forEach(([key, value]) => {
        const _valueField = getJsonData(value);
        data[key] = _valueField;
      });

      if (_.values(data).some((x) => !_.isUndefined(x))) return data;
      return undefined;
    }

    if (HelperUtils.isSchemaArray(schema)) {
      const data: Record<string, any>[] = HelperUtils.getSchemaField(
        "value",
        schema
      ) as Record<string, any>[];
      return data;
    }
    if (HelperUtils.isSchemaDefault(schema)) {
      const data: any = HelperUtils.getSchemaField("value", schema);
      console.log(data);
      return data;
    }
    return undefined;
  };

  const handlePreviewWithData = () => {
    const data = getJsonData(schema);
  };

  return (
    <Grid
      display={"grid"}
      gridTemplateColumns={"25% auto"}
      sx={{ height: "100%" }}
    >
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
          }}
        >
          <Button variant="contained" onClick={handlePreviewWithData}>
            Xem trước
          </Button>
        </Box>
      </Box>

      <Box sx={{ height: "100%", overflow: "auto", position: "relative" }}>
        <ContentPreview />
      </Box>
    </Grid>
  );
};
