import { Category, CategoryByGroup } from "../../../../types";
import { TemplateFilterRequestModel } from "../../types";
import { FilterQueryResult } from "../../../../utils/useBaseFilterQuery";
import {
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { getCategory } from "../../utils/templates";
import { TagFilterList, TagOption } from "../../../../components/TagFilterList";
import { TabOption, Tabs } from "../../../../components/Tabs";
import {
  ArrowDownward,
  ArrowUpward,
  SearchOutlined,
} from "@mui/icons-material";
import { TextField } from "../../../../components/TextField";
import { CategoryTemplateSelect } from "../../../workspaces/components/CategoryTemplateSelect";

const tabs: TabOption[] = [
  { label: "Mẫu cá nhân", value: "person" },
  { label: "Mẫu chia sẻ với bạn", value: "share" },
];

const sorts: { value: string; label: string; icon: React.ReactNode }[] = [
  {
    value: "name,desc",
    label: "Tên",
    icon: <ArrowDownward />,
  },
  {
    value: "name,asc",
    label: "Tên",
    icon: <ArrowUpward />,
  },
  {
    value: "created_at,desc",
    label: "Ngày tạo",
    icon: <ArrowDownward />,
  },
  {
    value: "created_at,asc",
    label: "Ngày tạo",
    icon: <ArrowUpward />,
  },
  {
    value: "updated_at,desc",
    label: "Ngày cập nhật",
    icon: <ArrowDownward />,
  },
  {
    value: "updated_at,desc",
    label: "Ngày cập nhật",
    icon: <ArrowUpward />,
  },
];

const statuses: { value: string; label: string }[] = [
  {
    value: "all",
    label: "Tất cả",
  },
  {
    value: "active",
    label: "Hoạt động",
  },
  { value: "inactive", label: "Ngừng hoạt động" },
];

interface Props {
  filter: FilterQueryResult<TemplateFilterRequestModel>["filter"];
  onChangeSearchParams: FilterQueryResult<TemplateFilterRequestModel>["onChangeSearchParams"];
  onChangeSearchParamsAll: FilterQueryResult<TemplateFilterRequestModel>["onChangeSearchParamsAll"];
}
export const TemplateFilters = ({
  filter,
  onChangeSearchParams,
  onChangeSearchParamsAll,
}: Props) => {
  return (
    <Box>
      <Stack
        display={"flex"}
        justifyContent={"space-between"}
        direction={"row"}
      >
        <Box>
          <Tabs
            value={filter.tab || "person"}
            onChange={(_value) => {
              onChangeSearchParamsAll(
                {
                  tab: _value !== "person" ? (_value as any) : undefined,
                },
                true
              );
            }}
            items={tabs}
          />
        </Box>
        <Box
          sx={(theme) => ({
            [theme.breakpoints.down("md")]: {
              display: "none",
            },
          })}
        >
          <Stack direction={"row"} gap={3}>
            <Box
              sx={(theme) => ({
                maxWidth: "400px",
                height: "fit-content",
                borderRadius: "3px",
                boxShadow: theme.shadows[3],
              })}
            >
              <TextField
                variant="outlined"
                placeholder={`Tìm kiếm`}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchOutlined />
                    </InputAdornment>
                  ),
                  sx: (theme) => ({
                    height: "38px",
                    background: theme.palette.background.paper,
                  }),
                }}
              />
            </Box>
            <Box
              sx={(theme) => ({
                height: "fit-content",
                borderRadius: "3px",
                boxShadow: theme.shadows[3],
              })}
            >
              <CategoryTemplateSelect
                height={"38px"}
                values={filter.category_ids || []}
                onChange={(_values) => {
                  onChangeSearchParams("category_ids", _values);
                }}
              />
            </Box>
            <Box
              sx={(theme) => ({
                height: "fit-content",
                borderRadius: "3px",
                boxShadow: theme.shadows[3],
              })}
            >
              <Select
                value={
                  `${filter.sort_by || "created_at"},${filter.sort_direction || "desc"}` as string
                }
                onChange={(_value) => {
                  onChangeSearchParamsAll({
                    sort_by: _value.target.value.split(",")[0],
                    sort_direction: _value.target.value.split(",")[1],
                  });
                }}
                IconComponent={() => null}
                sx={{
                  paddingRight: 0,
                  height: "38px",
                  "> div": { paddingRight: "4px !important", paddingLeft: 2 },
                }}
              >
                {sorts.map((sort, index) => (
                  <MenuItem key={index} value={sort.value}>
                    <Stack
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      gap={1}
                      direction={"row"}
                      width={"100%"}
                    >
                      <Box>{sort.label}</Box>
                      <Box display={"flex"}>{sort.icon}</Box>
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box
              sx={(theme) => ({
                height: "fit-content",
                borderRadius: "3px",
                boxShadow: theme.shadows[3],
              })}
            >
              <Select
                value={
                  filter.is_active !== undefined
                    ? filter.is_active === "true"
                      ? "active"
                      : "inactive"
                    : "all"
                }
                onChange={(_value) => {
                  onChangeSearchParams(
                    "is_active",
                    _value.target.value === "all"
                      ? undefined
                      : _value.target.value === "active"
                        ? "true"
                        : "false"
                  );
                }}
                sx={{ padding: 0, height: "38px" }}
              >
                {statuses.map((status, index) => (
                  <MenuItem key={index} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Stack>
        </Box>
      </Stack>

      <Divider />
    </Box>
  );
};