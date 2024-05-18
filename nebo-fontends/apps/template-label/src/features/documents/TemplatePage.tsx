import { Divider } from "@mui/material";
import { MetaFunction } from "@remix-run/node";

import { useState } from "react";
import { Page } from "../../components/Page";
import { TabOption, Tabs } from "../dashboard/Tabs";
import { useBaseFilter } from "../../utils/useBaseFilterQuery";
import { TemplateFilterRequestModel } from "./types";
import { useGetTemplatesData } from "./hooks/useGetTemplatesData";

const tabs: TabOption[] = [
  { label: "Mẫu nebo", value: "default" },
  { label: "Mẫu thương hiệu", value: "brand" },
  { label: "Mẫu chia sẻ với bạn", value: "share" },
  { label: "Mẫu cá nhân của bạn", value: "person" },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Mẫu template" },
    { name: "description", content: "Danh sachs mẫu" },
  ];
};

export default function TemplatePage() {
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
    <Page title="Mẫu" fullHeight>
      <Tabs
        value={filter.tab || "default"}
        onChange={(_value) => {
          onChangeSearchParamsAll(
            {
              tab: _value !== "default" ? (_value as any) : undefined,
            },
            true
          );
        }}
        items={tabs}
      />
      <Divider />
    </Page>
  );
}
