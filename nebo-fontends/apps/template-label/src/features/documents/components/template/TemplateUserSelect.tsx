import { CSSProperties, useMemo } from "react";

import { Option } from "../../../../components/types";

import { useSimpleFilters } from "../../../../utils/useSimpleFilters";
import AutocompleteSelect from "../../../../components/AutocompleteSelect2";
import { toString } from "lodash-es";
import { Avatar, Box, Stack } from "@mui/material";
import { useGetUsersWithUserPermissionWithInfiniteQuery } from "../../../../data/user.api";
import {
  ListResponse,
  Template,
  UserWithUserPermission,
} from "../../../../types";
import { getFullName } from "../../../../utils/base";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { stringAvatar } from "../../../../utils/stringAvatar";
import { useWorkspaceContext } from "../../../../utils/useWorkspaceContext";

interface Props {
  label?: string;
  template?: Template;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  onChange: (_value: UserWithUserPermission) => void;
  error?: string;
}

export const TemplateUserSelect = ({
  label,
  template,
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
  const { user: currentUser } = useWorkspaceContext();
  const {
    data: templateUsers = {
      data: [],
      metadata: { page: 0, limit: limit, total_element: 0 },
    } as ListResponse<UserWithUserPermission>,
    isLoading: isLoadingTemplateUsers,
    isFetching: isFetchingTemplateUsers,
  } = useGetUsersWithUserPermissionWithInfiniteQuery(
    {
      templateId: template?.id || 0,
      query: debounceQuery,
      limit: limit,
      page: page,
    },
    { skip: !template?.id }
  );

  const options: Option[] = templateUsers.data.map((item) => ({
    value: item.id,
    label: getFullName({ ...item }),
    renderInput: (
      <Box
        onClick={(event) => {
          if (item.id === currentUser.id) return;
          event.preventDefault();
          onChange(item);
        }}
      >
        <Stack direction="row" gap={1} alignItems={"center"}>
          <Avatar
            sizes="small"
            src={
              item.avatar_url
                ? item.avatar_url.startsWith("http")
                  ? item.avatar_url
                  : `/api/files/data/${item.avatar_url}`
                : undefined
            }
            {...stringAvatar(item.first_name, item.last_name, 40)}
          />
          <Box>
            <Box>{getFullName({ ...item })}</Box>
            <Box>{item.email}</Box>
          </Box>
        </Stack>
      </Box>
    ),
  }));

  return (
    <AutocompleteSelect
      values={[]}
      label={label}
      options={options}
      placeholder="Chia sẻ cho email hoặc số điện thoại"
      query={query}
      height={height}
      minWidth={width}
      onChangeQuery={changeDebounceQuery}
      onBlur={() => changeQuery("")}
      loading={isFetchingTemplateUsers}
      onChange={(value) => {
        const v = templateUsers.data.find((c) => c.id == value[0]);
        if (v) {
          if (v.id === currentUser.id) return;
          onChange(v);
        }
      }}
      error={error}
      noOptionText={<Box>Không tìm thấy tài khoản</Box>}
    />
  );
};
