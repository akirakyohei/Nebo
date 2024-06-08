import { Page } from "../../components/Page";
import { ControlPointOutlined } from "@mui/icons-material";
import { useToggle } from "../../utils/useToggle";
import { MediaFileTable } from "./components/media_file/MediaFileTable";
import { MediaFileUploadModal } from "./components/media_file/MediaFileUploadModal";
import { useBaseFilter } from "../../utils/useBaseFilterQuery";
import { FileDataFilterRequest } from "../../types";
import { useGetMetadatasData } from "./hooks/useGetMetadatasData";
import { Loading } from "../../components/loading";
import { MediaFileFilters } from "./components/media_file/MediaFileFilters";
import { MediaFileSkeleton } from "./components/media_file/MediaFileSkeleton";
import { EmptyStateImage } from "../../components/EmptyStatePage";

export default function MediaFilePage() {
  const {
    value: isOpenUploadFile,
    setTrue: openUploadFile,
    setFalse: closeUploadFile,
  } = useToggle(false);

  const { filter, isFilter, onChangeSearchParams, onChangeSearchParamsAll } =
    useBaseFilter<FileDataFilterRequest>();

  const { data, isLoading, isFetching } = useGetMetadatasData(filter);
  if (isLoading) return <MediaFileSkeleton />;
  const isFirstScreen = isFilter === "" && data.metadata.total_element === 0;
  return (
    <Page
      title="Ảnh tải lên"
      fullHeight
      fluid
      paddingHeader={2}
      primaryAction={{
        icon: <ControlPointOutlined />,
        content: "Tải ảnh lên",
        onAction: openUploadFile,
      }}
    >
      {isFetching && <Loading />}
      <MediaFileFilters
        filter={filter}
        onChangeSearchParams={onChangeSearchParams}
        onChangeSearchParamsAll={onChangeSearchParamsAll}
      />
      {isFirstScreen && (
        <EmptyStateImage
          title={"Bạn chưa có file ảnh nào tải lên"}
          description="Hãy bắt đầu bằng cách tải ảnh lên"
          primaryAction={{
            content: "Tải ảnh lên",
            icon: <ControlPointOutlined />,
            onAction: openUploadFile,
          }}
        />
      )}
      {!isFirstScreen && (
        <MediaFileTable
          assets={data}
          filter={filter}
          onChangeSearchParams={onChangeSearchParams}
          onChangeSearchParamsAll={onChangeSearchParamsAll}
        />
      )}

      {isOpenUploadFile && (
        <MediaFileUploadModal open onClose={closeUploadFile} />
      )}
    </Page>
  );
}
