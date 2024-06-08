import { CSSProperties, useCallback, useEffect, useMemo } from "react";

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
import { Box } from "@mui/material";

interface Props {
  label?: string;
  values: number[];
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  onChange: (_value: number[]) => void;
  error?: string;
}

export const CategoryTemplateSelect = ({
  label,
  values,
  onChange,
  error,
  width,
  height,
}: Props) => {
  const {
    page,
    limit,
    query,
    changeQuery,
    debounceQuery,
    changeDebounceQuery,
    loadMore,
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

  const numberOfPages = Math.ceil(categories.metadata.total_element / limit);
  const hasMore = page < numberOfPages;

  const handleLoadMore = useCallback(() => {
    if (hasMore) {
      loadMore();
    }
  }, [loadMore, hasMore]);
  useEffect(() => {
    console.log(query);
  }, [query]);
  return (
    <AutocompleteSelect
      values={selectedOptions}
      label={label}
      options={options}
      multiple
      placeholder="Chọn danh mục"
      query={query}
      height={height}
      minWidth={width}
      onBlur={() => {
        changeQuery("");
      }}
      onChangeQuery={changeDebounceQuery}
      loading={isFetchingCategories}
      willLoadMoreResults={hasMore && !isFetchingCategories}
      onLoadMore={handleLoadMore}
      onChange={onChange}
      error={error}
      noOptionText={<Box>Không tìm thấy danh mục nào</Box>}
    />
  );
};
