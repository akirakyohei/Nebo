import {
  Box,
  Divider,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import { useState } from "react";
import { Page } from "../../components/Page";
import { TabOption, Tabs } from "../../components/Tabs";
import { useBaseFilter } from "../../utils/useBaseFilterQuery";
import { TemplateFilterRequestModel } from "./types";
import { useGetTemplatesData } from "./hooks/useGetTemplatesData";
import {
  ArrowDownward,
  ArrowUpward,
  ControlPointOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { CategoryTemplateSelect } from "../workspaces/components/CategoryTemplateSelect";
import { last } from "lodash-es";
import { TemplateFilters } from "./components/template/TemplateFilters";
import { useToggle } from "../../utils/useToggle";
import { TemplateAddModal } from "./components/template/TemplateAddModal";
import { TemplateTable } from "./components/template/TemplateTable";

export default function TemplatePage() {
  const {
    value: isOpenCreateTemplate,
    setTrue: openCreateTemplate,
    setFalse: closeCreateTemplate,
  } = useToggle(false);

  const {
    filter,
    isFilter,
    onChangeSearchParams,
    onChangeSearchParamsAll,
    onRemoveSearchParams,
  } = useBaseFilter<TemplateFilterRequestModel>({
    keyIsListFilter: ["category_ids"],
  });

  const { categoryByGroups, templates, isLoading, isFetching } =
    useGetTemplatesData({ ...filter });

  return (
    <Page
      title="Mẫu"
      fullHeight
      primaryAction={{
        icon: <ControlPointOutlined />,
        content: "Thêm mẫu mới",
        onAction: openCreateTemplate,
      }}
    >
      <TemplateFilters
        filter={filter}
        onChangeSearchParams={onChangeSearchParams}
        onChangeSearchParamsAll={onChangeSearchParamsAll}
      />
      <TemplateTable templates={templates.data} />
      {isOpenCreateTemplate && (
        <TemplateAddModal onClose={closeCreateTemplate} />
      )}
    </Page>
  );
}
