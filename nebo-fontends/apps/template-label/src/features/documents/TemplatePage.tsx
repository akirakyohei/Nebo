import { Page } from "../../components/Page";
import { useBaseFilter } from "../../utils/useBaseFilterQuery";
import { TemplateFilterRequestModel } from "./types";
import { useGetTemplatesData } from "./hooks/useGetTemplatesData";
import { ControlPointOutlined } from "@mui/icons-material";
import { TemplateFilters } from "./components/template/TemplateFilters";
import { useToggle } from "../../utils/useToggle";
import { TemplateAddModal } from "./components/template/TemplateAddModal";
import { TemplateTable } from "./components/template/TemplateTable";
import { TemplateSkeleton } from "./components/template/TemplateSkeleton";
import { Loading } from "../../components/loading";
import { EmptyStateImage } from "../../components/EmptyStatePage";

export default function TemplatePage() {
  const {
    value: isOpenCreateTemplate,
    setTrue: openCreateTemplate,
    setFalse: closeCreateTemplate,
  } = useToggle(false);

  const { filter, isFilter, onChangeSearchParams, onChangeSearchParamsAll } =
    useBaseFilter<TemplateFilterRequestModel>({
      keyIsListFilter: ["category_ids"],
      excludeCheckFilter: ["tab"],
    });

  const { templates, isLoading, isFetching } = useGetTemplatesData({
    ...filter,
  });

  if (isLoading) return <TemplateSkeleton />;

  const isFirstScreen =
    isFilter === "" && templates.metadata.total_element === 0;
  return (
    <Page
      title="Mẫu"
      // fullHeight
      fluid
      paddingHeader={2}
      primaryAction={{
        icon: <ControlPointOutlined />,
        content: "Thêm mẫu mới",
        onAction: openCreateTemplate,
      }}
    >
      {isFetching && <Loading />}
      <TemplateFilters
        filter={filter}
        onChangeSearchParams={onChangeSearchParams}
        onChangeSearchParamsAll={onChangeSearchParamsAll}
      />
      {isFirstScreen && (
        <EmptyStateImage
          title={
            filter.tab !== "shared"
              ? "Bạn chưa có mẫu nào"
              : "Bạn chưa được chia sẻ mẫu nào"
          }
          description="Hãy bắt đầu bằng cách tạo mẫu mới hoặc xem các mẫu chia sẻ với bạn"
          primaryAction={{
            content: "Tạo mẫu mới",
            icon: <ControlPointOutlined />,
            onAction: openCreateTemplate,
          }}
        />
      )}
      {!isFirstScreen && (
        <TemplateTable
          templates={templates}
          filter={filter}
          onChangeSearchParams={onChangeSearchParams}
          onChangeSearchParamsAll={onChangeSearchParamsAll}
        />
      )}
      {isOpenCreateTemplate && (
        <TemplateAddModal onClose={closeCreateTemplate} />
      )}
    </Page>
  );
}
