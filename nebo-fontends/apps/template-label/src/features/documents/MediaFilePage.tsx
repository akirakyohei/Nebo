import { Page } from "../../components/Page";
import { ControlPointOutlined } from "@mui/icons-material";
import { useToggle } from "../../utils/useToggle";
import { MediaFileTable } from "./components/media_file/MediaFileTable";
import { MediaFileUploadModal } from "./components/media_file/MediaFileUploadModal";
import { useBaseFilter } from "../../utils/useBaseFilterQuery";
import { FileDataFilterRequest } from "../../types";
import {
  useGetMetadataQuery,
  useGetMetadatasQuery,
} from "../../data/mediafile.api";
import { useGetMetadatasData } from "./hooks/useGetMetadatasData";

export default function MediaFilePage() {
  const {
    value: isOpenUploadFile,
    setTrue: openUploadFile,
    setFalse: closeUploadFile,
  } = useToggle(false);

  const { filter, isFilter, onChangeSearchParams, onChangeSearchParamsAll } =
    useBaseFilter<FileDataFilterRequest>();

  const { data, isLoading, isFetching } = useGetMetadatasData(filter);

  return (
    <Page
      title="Ảnh tải lên"
      fullHeight
      fluid
      primaryAction={{
        icon: <ControlPointOutlined />,
        content: "Tải ảnh lên",
        onAction: openUploadFile,
      }}
    >
      <MediaFileTable assets={data} />
      {isOpenUploadFile && (
        <MediaFileUploadModal open onClose={closeUploadFile} />
      )}
    </Page>
  );
}
