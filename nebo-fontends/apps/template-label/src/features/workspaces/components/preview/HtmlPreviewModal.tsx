import { Box, TextareaAutosize } from "@mui/material";
import { usePreviewTemplateToHtmlQuery } from "../../../../data/template.api";
import { Template } from "../../../../types";
import { Spinner } from "../../../../components/Spinner";
import Modal from "../../../../components/Modal";
import prettify from "html-prettify";
import { head } from "lodash-es";
import { useToast } from "../../../../components/notification/useToast";

interface Props {
  template: Template;
  open: boolean;
  onClose: () => void;
  testData: any;
}

export const HtmlPreviewModal = ({
  template,
  open,
  onClose,
  testData,
}: Props) => {
  const { show: showToast } = useToast();
  const {
    data: _dataPreview,
    isLoading: isLoadingDataPreview,
    isFetching: isFecthingDataPreview,
  } = usePreviewTemplateToHtmlQuery({
    html: template.html,
    options: template.options,
    variables: testData,
  });
  const isLoading = isLoadingDataPreview || isFecthingDataPreview;
  return (
    <Modal
      open={open}
      size="lg"
      onClose={onClose}
      secondaryActions={[
        { content: "Đóng", onAction: onClose, color: "secondary" },
        {
          content: "Sao chép",
          onAction: () => {
            navigator.clipboard.writeText(prettify(_dataPreview || ""));
            showToast("Sao chép thành công");
          },
        },
      ]}
    >
      <Box
        sx={{
          height: "50vh",
          overflow: "auto",
          wordBreak: "break-word",
          whiteSpace: "pre",
          background: "#fafafa",
          "> textarea": {
            border: "none",
          },
        }}
      >
        {isLoading && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner />
          </Box>
        )}
        {!isLoading && (
          <TextareaAutosize
            value={prettify(_dataPreview || "")}
            readOnly
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              background: "#fafafa",
            }}
          />
        )}
      </Box>
    </Modal>
  );
};
