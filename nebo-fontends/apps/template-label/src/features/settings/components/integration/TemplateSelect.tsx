import { Box, Checkbox, Stack, Tooltip, Typography } from "@mui/material";
import { TextField } from "../../../../components/TextField";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetTemplatesWithInfiniteQuery } from "../../../../data/template.api";
import { ListResponse, Template } from "../../../../types";
import { useSimpleFilters } from "../../../../utils/useSimpleFilters";
import { Option } from "../../../../components/types";
import { useCallback } from "react";
import { Spinner } from "../../../../components/Spinner";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import blankThumbImage from "src/assets/img/new-blank-template.png";
interface Props {
  values: number[];
  onChange: (values: number[]) => void;
}

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

export const TemplateSelect = ({ values, onChange }: Props) => {
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
    data: templates = {
      data: [],
      metadata: { page: 0, limit: limit, total_element: 0 },
    } as ListResponse<Template>,
    isLoading: isLoadingTemplates,
    isFetching: isFetchingTemplates,
  } = useGetTemplatesWithInfiniteQuery({
    query: debounceQuery,
    owner: true,
    limit: limit,
    page: page,
  });

  const options: (Option & { template: Template })[] = templates.data.map(
    (item) => ({
      value: item.id,
      label: item.name,
      template: item,
    })
  );

  const isSelected = (value: number) => {
    return (values || []).findIndex((item) => item === value) > -1;
  };

  const numberOfPages = Math.ceil(templates.metadata.total_element / limit);
  const hasMore = page < numberOfPages;

  const handleLoadMore = useCallback(() => {
    if (hasMore) {
      loadMore();
    }
  }, [loadMore, hasMore]);

  return (
    <Box>
      <Stack gap={1}>
        <TextField
          value={query}
          onChange={(event) => {
            changeDebounceQuery(event.target.value);
          }}
          placeholder="Tìm kiếm mẫu"
          onBlur={(event) => changeQuery("")}
        />
        <Box
          sx={{
            maxHeight: "50vh",
            display: "flex",
            overflow: "auto",
            background: "#F5F5F5",
            "> div": {
              flex: "1 1 auto",
            },
          }}
        >
          <InfiniteScroll
            dataLength={templates.data.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={<Spinner />}
          >
            {options.map((option) => (
              <Box
                key={option.value}
                sx={{
                  paddingLeft: "0 !important",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  paddingTop: 1,
                  paddingBottom: 1,
                  backgroundColor: isSelected(option.value)
                    ? "#abca"
                    : undefined,
                  ":hover": {
                    cursor: "pointer",
                    backgroundColor: "#abcb",
                  },
                  ":not(last-of-type)": {
                    borderBottom: "1px solid #abcb",
                  },
                }}
                onChange={() => {
                  if (!isSelected(option.value))
                    onChange([option.value, ...(values || [])]);
                  else {
                    onChange([
                      ...(values || []).filter((a) => a === option.value),
                    ]);
                  }
                }}
              >
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={isSelected(option.value)}
                />
                <Stack direction={"row"} gap={1} alignItems={"center"}>
                  <Box
                    component={"img"}
                    src={
                      option.template?.thumbnail?.url
                        ? `/api/files/data/${option.template?.thumbnail?.url}`
                        : blankThumbImage
                    }
                    width={"38px"}
                    height={"38px"}
                  />
                  <Tooltip title={option.label} placement="right">
                    <Typography>{option.label}</Typography>
                  </Tooltip>
                </Stack>
              </Box>
            ))}
          </InfiniteScroll>
        </Box>
      </Stack>
    </Box>
  );
};
