import { Page } from "../../components/Page";
import { ControlPointOutlined } from "@mui/icons-material";
import { useToggle } from "../../utils/useToggle";
import { MediaFileTable } from "./components/media_file/MediaFileTable";
import { MediaFileUploadModal } from "./components/media_file/MediaFileUploadModal";

export default function MediaFilePage() {
  const {
    value: isOpenUploadFile,
    setTrue: openUploadFile,
    setFalse: closeUploadFile,
  } = useToggle(false);

  return (
    <Page
      title="Ảnh tải lên"
      fullHeight
      primaryAction={{
        icon: <ControlPointOutlined />,
        content: "Tải ảnh lên",
        onAction: openUploadFile,
      }}
    >
      <MediaFileTable assets={[]} />
      {!isOpenUploadFile && (
        <MediaFileUploadModal open onClose={closeUploadFile} />
      )}
    </Page>
  );
}
