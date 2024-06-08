import { Category } from "../../../../types";
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
} from "@mui/material";
import {
  ArrowDownward,
  ArrowUpward,
  SearchOutlined,
} from "@mui/icons-material";
import { CategoryFilterRequest } from "../../../../types";
import { TextField } from "../../../../components/TextField";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  filter: FilterQueryResult<CategoryFilterRequest>["filter"];
  onChangeSearchParams: FilterQueryResult<CategoryFilterRequest>["onChangeSearchParams"];
  onChangeSearchParamsAll: FilterQueryResult<CategoryFilterRequest>["onChangeSearchParamsAll"];
}
export const CategoryFilters = ({
  filter,
  onChangeSearchParams,
  onChangeSearchParamsAll,
}: Props) => {
  const [query, setQuery] = useState(filter.query);

  const handleChangeDebounceQuery = useDebouncedCallback((value: string) => {
    onChangeSearchParams("query", value);
  }, 500);

  const handleChangeQuery = (value: string) => {
    setQuery(value);
    handleChangeDebounceQuery.cancel();
    handleChangeDebounceQuery(value);
  };

  useEffect(() => {
    setQuery(filter.query || "");
  }, [filter]);

  return (
    <Box>
      <Stack
        display={"flex"}
        justifyContent="end"
        direction={"row"}
        sx={{ height: "49px" }}
      >
        <Box
        // sx={(theme) => ({
        //   [theme.breakpoints.down("md")]: {
        //     display: "none",
        //   },
        // })}
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
                value={query || ""}
                onChange={(event) => {
                  handleChangeQuery(event.target.value);
                }}
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
          </Stack>
        </Box>
      </Stack>
      <Divider />
    </Box>
  );
};
