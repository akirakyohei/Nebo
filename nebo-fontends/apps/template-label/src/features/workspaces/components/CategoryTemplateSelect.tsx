import { CSSProperties } from "react";
import { AutocompleteSelect } from "../../../components/AutocompleteSelect";
import { Option } from "../../../components/types";
import { useGetCategoriesWithInfiniteQuery } from "../../../data/category.api";
import { Category, ListResponse } from "../../../types";
import { useSimpleFilters } from "../../../utils/useSimpleFilters";
import { useSimpleFiltersQuery } from "../../../utils/useSimpleFiltersQuery";
import { Height } from "@mui/icons-material";

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

  return (
    <AutocompleteSelect
      values={values}
      label={label}
      options={options}
      multiple
      placeholder="Chọn loại"
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
