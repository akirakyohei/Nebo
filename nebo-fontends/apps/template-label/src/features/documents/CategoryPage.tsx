import { Page } from "../../components/Page";
import { ControlPointOutlined } from "@mui/icons-material";
import { useToggle } from "../../utils/useToggle";
import { MediaFileTable } from "./components/media_file/MediaFileTable";
import { MediaFileUploadModal } from "./components/media_file/MediaFileUploadModal";
import { useBaseFilter } from "../../utils/useBaseFilterQuery";
import { CategoryFilterRequest, Category, ListResponse } from "../../types";
import { useGetCategoryData } from "./hooks/useGetCategoryData";
import { CategoryTable } from "./components/category/CategoryTable";
import { CategoryModal } from "./components/category/CategoryModal";
import { CategorySkeleton } from "./components/category/CategorySkeleton";
import { Loading } from "../../components/loading";
import { CategoryFilters } from "./components/category/CatgoryFilters";
import { EmptyStateImage } from "../../components/EmptyStatePage";
export default function CategoryPage() {
  const {
    value: isOpenCreateCategory,
    setTrue: openCreateCategory,
    setFalse: closeCreateCategory,
  } = useToggle(false);

  const { filter, isFilter, onChangeSearchParams, onChangeSearchParamsAll } =
    useBaseFilter<CategoryFilterRequest>();

  const { data, isLoading, isFetching } = useGetCategoryData(filter);
  if (isLoading) return <CategorySkeleton />;
  const isFirstScreen = isFilter === "" && data.metadata.total_element === 0;
  return (
    <Page
      title="Danh mục"
      fullHeight
      fluid
      paddingHeader={2}
      primaryAction={{
        icon: <ControlPointOutlined />,
        content: "Tạo mới",
        onAction: openCreateCategory,
      }}
    >
      {isFetching && <Loading />}
      <CategoryFilters
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
            onAction: openCreateCategory,
          }}
        />
      )}
      {!isFirstScreen && (
        <CategoryTable
          categories={data}
          filter={filter}
          onChangeSearchParams={onChangeSearchParams}
          onChangeSearchParamsAll={onChangeSearchParamsAll}
        />
      )}
      {isOpenCreateCategory && (
        <CategoryModal open onClose={closeCreateCategory} />
      )}
    </Page>
  );
}
