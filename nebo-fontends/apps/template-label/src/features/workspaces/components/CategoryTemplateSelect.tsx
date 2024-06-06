import { CSSProperties, useMemo } from "react";

import { Option } from "../../../components/types";
import {
  useGetCategoriesQuery,
  useGetCategoriesWithInfiniteQuery,
} from "../../../data/category.api";
import { Category, ListResponse } from "../../../types";
import { useSimpleFilters } from "../../../utils/useSimpleFilters";
import { useSimpleFiltersQuery } from "../../../utils/useSimpleFiltersQuery";
import { Height } from "@mui/icons-material";
import AutocompleteSelect from "../../../components/AutocompleteSelect2";
import { toString } from "lodash-es";

interface Props {
  label?: string;
  values: number[];
  height?: CSSProperties["height"];
  onChange: (_value: number[]) => void;
  error?: string;
}

export const CategoryTemplateSelect = ({
  label,
  values,
  onChange,
  error,
  height,
}: Props) => {
  const {
    page,
    limit,
    query,
    changeQuery,
    debounceQuery,
    changeDebounceQuery,
  } = useSimpleFilters(20);

  const {
    data: selected = {
      data: [],
      metadata: { total_element: 0, limit: 250, page: 1 },
    },
  } = useGetCategoriesQuery({
    limit: 250,
    page: 1,
    ids: values,
  });

  const {
    data: categories = {
      data: [],
      metadata: { page: 0, limit: limit, total_element: 0 },
    } as ListResponse<Category>,
    isLoading: isLoadingCategories,
    isFetching: isFetchingCategories,
  } = useGetCategoriesWithInfiniteQuery({
    query: debounceQuery,
    limit: limit,
    page: page,
  });

  const options: Option[] = categories.data.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const selectedOptions: Option<number>[] = useMemo(
    () =>
      selected.data
        .filter((a) =>
          values.some((v) =>
            typeof v === "string" ? v === toString(a.id) : v === a.id
          )
        )
        .map((a) => ({
          value: a.id,
          label: a.name,
        })),
    [selected.data, values]
  );
  return (
    <AutocompleteSelect
      values={selectedOptions}
      label={label}
      options={options}
      multiple
      placeholder="Chọn danh mục"
      query={query}
      height={height}
      minWidth={"150px"}
      onChangeQuery={changeDebounceQuery}
      loading={isFetchingCategories}
      onChange={onChange}
      error={error}
    />
  );
};
