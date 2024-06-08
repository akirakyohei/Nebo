import { CSSProperties, useMemo } from "react";

import { Option } from "../../../../components/types";

import { useSimpleFilters } from "../../../../utils/useSimpleFilters";
import AutocompleteSelect from "../../../../components/AutocompleteSelect2";
import { toString } from "lodash-es";
import { Box } from "@mui/material";
import { useGetUsersWithUserPermissionWithInfiniteQuery } from "../../../../data/user.api";
import { ListResponse, UserWithUserPermission } from "../../../../types";
import { getFullName } from "../../../../utils/base";

interface Props {
  label?: string;
  values: UserWithUserPermission[];
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  onChange: (_value: number[]) => void;
  error?: string;
}

export const TemplateUserSelect = ({
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
  } = useSimpleFilters(20);

  const {
    data: categories = {
      data: [],
      metadata: { page: 0, limit: limit, total_element: 0 },
    } as ListResponse<UserWithUserPermission>,
    isLoading: isLoadingCategories,
    isFetching: isFetchingCategories,
  } = useGetUsersWithUserPermissionWithInfiniteQuery({
    templateId: 1,
    query: debounceQuery,
    limit: limit,
    page: page,
  });

  const options: Option[] = categories.data.map((item) => ({
    value: item.id,
    label: getFullName({ ...item }),
  }));

  const selectedOptions: Option<number>[] = useMemo(
    () =>
      values.map((a) => ({
        value: a.id,
        label: getFullName({ ...a }),
      })),
    [values]
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
      minWidth={width}
      onChangeQuery={changeDebounceQuery}
      loading={isFetchingCategories}
      onChange={onChange}
      error={error}
      noOptionText={<Box>Không tìm thấy danh mục nào</Box>}
    />
  );
};
