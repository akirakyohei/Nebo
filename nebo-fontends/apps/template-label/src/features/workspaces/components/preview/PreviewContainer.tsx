import { Box, Button, Grid, Stack } from "@mui/material";
import { Template } from "../../../../types";
import { Schema } from "@repo/web-builder";
import { ContentPreview } from "./ContentPreview";
import {
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import * as HelperUtils from "@repo/web-builder";
import _ from "lodash/fp";
import {
  usePreviewTemplateQuery,
  useUpdateTemplateMutation,
  useExportTemplateMutation,
} from "../../../../data/template.api";
import { FormPanel } from "./FormPanel";
import { Loading } from "../../../../components/loading";
import { isClientError } from "../../../../utils/client";
import { useToast } from "../../../../components/notification/useToast";
import { useToggle } from "../../../../utils/useToggle";
import { HtmlPreviewModal } from "./HtmlPreviewModal";
import printJs from "print-js";
import React from "react";

interface Props {
  template: Template;
  loadingTemplate?: boolean;
}

export type PreviewRef = {
  downloadTemplate: () => void;
  printTemplate: () => void;
};

export const PreviewContainer = React.forwardRef(
  ({ template, loadingTemplate }: Props, ref: Ref<PreviewRef>) => {
    const { show: showToast } = useToast();
    const [testData, setTestData] = useState(template.test_data);

    const {
      value: isOpenHtml,
      setTrue: openHtml,
      setFalse: closeHtml,
    } = useToggle(false);
    useEffect(() => {
      setTestData(template.test_data);
    }, [template.test_data]);

    const [updateTemplate] = useUpdateTemplateMutation();
    const [exportTemplate] = useExportTemplateMutation();
    const {
      data: _dataPreview,
      isLoading: isLoadingDataPreview,
      isFetching: isFecthingDataPreview,
    } = usePreviewTemplateQuery(
      {
        html: template.html,
        options: template.options,
        variables: testData,
      },
      { skip: !template.id || loadingTemplate }
    );

    useImperativeHandle(ref, () => ({
      downloadTemplate: () => {
        if (_dataPreview) {
          downloadTemplate();
        }
      },
      printTemplate: async () => {
        if (_dataPreview) {
          printFile(_dataPreview);
        }
      },
    }));

    const downloadTemplate = useCallback(() => {
      exportTemplate({
        id: template.id,
        request: { variables: testData },
      }).unwrap();
      downloadFile(_dataPreview as any, `${template.name}.pdf`);
      showToast("Đang tải xuống...");
    }, []);

    const printFile = async (blob: Blob) => {
      await exportTemplate({
        id: template.id,
        request: { variables: testData },
      }).unwrap();
      printJs(URL.createObjectURL(blob));
    };

    const downloadFile = (blob: Blob, fileName: string) => {
      const link = document.createElement("a");
      // create a blobURI pointing to our Blob
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      // some browser needs the anchor to be in the doc
      document.body.append(link);
      link.click();
      link.remove();
      // in case the Blob uses a lot of memory
      setTimeout(() => URL.revokeObjectURL(link.href), 7000);
    };

    const getJsonData = (schema: Schema) => {
      if (HelperUtils.isSchemaObject(schema)) {
        const data: Record<string, any> = {};
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

    const handlePreviewWithData = (schema: Schema) => {
      const data = getJsonData(schema);
      setTestData(data as any);
    };

    const handleSaveTestData = (schema: Schema) => {
      try {
        const data = getJsonData(schema);
        const res = updateTemplate({
          id: template.id,
          request: {
            test_data: data,
          },
        });
      } catch (ex) {
        if (isClientError(ex)) {
          let error = ex.data.message;
          if (/Authenticated/.test(error)) {
            showToast("Lưu mẫu thất bại thành công trước đó");
            return;
          }

          if (/Email or password incorrect/.test(error))
            error = "Tài khoản không tồn tại hoặc mật khẩu không đúng";
          if (/Phone number or password incorrect/.test(error))
            error = "Tài khoản không tồn tại hoặc mật khẩu không đúng";
          showToast(error, { variant: "error" });
        }
      }
    };

    return (
      <Grid
        display={"grid"}
        gridTemplateColumns={"25% auto"}
        sx={{ height: "100%" }}
      >
        {isFecthingDataPreview && <Loading />}
        <FormPanel
          data={testData}
          fieldSchema={template.field_schema as Schema}
          handlePreviewWithData={handlePreviewWithData}
          handleSaveTestData={handleSaveTestData}
        />
        <Box
          sx={{
            background: "#F2F4FB",
            height: "100%",
            overflow: "auto",
            position: "relative",
          }}
        >
          {!!_dataPreview && (
            <ContentPreview
              openHtml={openHtml}
              file={new File([_dataPreview], `${encodeURI(template.name)}.pdf`)}
            />
          )}
          {isOpenHtml && (
            <HtmlPreviewModal
              open
              onClose={closeHtml}
              template={template}
              testData={testData}
            />
          )}
        </Box>
      </Grid>
    );
  }
);
