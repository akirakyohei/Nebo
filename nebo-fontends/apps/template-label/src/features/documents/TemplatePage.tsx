import { Page } from "../../components/Page";
import { useBaseFilter } from "../../utils/useBaseFilterQuery";
import { TemplateFilterRequestModel } from "./types";
import { Box, Grid } from "@mui/material";
import { useGetTemplatesData } from "./hooks/useGetTemplatesData";
import { ControlPointOutlined } from "@mui/icons-material";
import { TemplateFilters } from "./components/template/TemplateFilters";
import { useToggle } from "../../utils/useToggle";
import { TemplateAddModal } from "./components/template/TemplateAddModal";
import { TemplateTable } from "./components/template/TemplateTable";
import { TemplateSkeleton } from "./components/template/TemplateSkeleton";
import { Loading } from "../../components/loading";
import { EmptyStateImage } from "../../components/EmptyStatePage";
import { useSearchParams } from "react-router-dom";

export default function TemplatePage() {
  const [params] = useSearchParams();
  const {
    value: isOpenCreateTemplate,
    setTrue: openCreateTemplate,
    setFalse: closeCreateTemplate,
  } = useToggle(params.get("action") === "create");

  const { filter, isFilter, onChangeSearchParams, onChangeSearchParamsAll } =
    useBaseFilter<TemplateFilterRequestModel>({
      keyIsListFilter: ["category_ids"],
      excludeCheckFilter: ["tab"],
    });

  const { users, templates, templateUserPermissions, isLoading, isFetching } =
    useGetTemplatesData({
      ...filter,
    });

  if (isLoading) return <TemplateSkeleton />;

  const isFirstScreen =
    isFilter === "" && templates.metadata.total_element === 0;
  return (
    <Page
      title="Mẫu"
      // fullHeight
      // fluid
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
        <Grid container>
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
        </Grid>
      )}
      {!isFirstScreen && (
        <TemplateTable
          users={users}
          templates={templates}
          templateUserPermissions={templateUserPermissions}
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
