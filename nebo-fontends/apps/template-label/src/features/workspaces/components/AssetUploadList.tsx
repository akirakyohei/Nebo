import {
  Box,
  Checkbox,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { useCallback } from "react";
import { useSimpleFilters } from "../../../utils/useSimpleFilters";
import { useGetAssetsWithInfiniteQuery } from "../../../data/mediafile.api";
import { FileDataUpload, ListResponse } from "../../../types";
import { TextField } from "../../../components/TextField";
import { getUrlAsset } from "../../../utils/base";
import { Spinner } from "../../../components/Spinner";
import { type AssetFile } from "@repo/web-builder";

interface Props {
  onSelect: (asset: AssetFile, complete?: boolean | undefined) => void;
}

export const AssetUploadList = ({ onSelect }: Props) => {
  const {
    page,
    limit,
    query,
    changeQuery,
    debounceQuery,
    changeDebounceQuery,
    loadMore,
  } = useSimpleFilters(250);

  const {
    data: assets = {
      data: [],
      metadata: { page: 0, limit: limit, total_element: 0 },
    } as ListResponse<FileDataUpload>,
    isLoading: isLoadingTemplates,
    isFetching: isFetchingTemplates,
  } = useGetAssetsWithInfiniteQuery({
    query: debounceQuery,
    limit: limit,
    page: page,
  });

  const optionsMarkup = assets.data.map((item, index) => (
    <Box
      key={index}
      sx={(theme) => ({
        borderRadius: "3px",
        boxShadow: theme.shadows[2],
        position: "relative",
      })}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          ":hover": { cursor: "pointer" },
        }}
      >
        <Box
          component="img"
          className="display-block"
          width={100}
          height={100}
          src={getUrlAsset(`/api/files/data/${item.key}`)}
          onDoubleClick={() =>
            onSelect(
              {
                type: "image",
                src: getUrlAsset(`/api/files/data/${item.key}`),
              },
              true
            )
          }
        />
      </Box>
    </Box>
  ));

  const numberOfPages = Math.ceil(assets.metadata.total_element / limit);
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
          placeholder="Tìm kiếm ảnh"
          onBlur={(event) => changeQuery("")}
        />
        <Box padding={2}>
          {assets.data.length === 0 && (
            <Typography sx={{ padding: 2 }} color={"GrayText"}>
              {query === "" || !query
                ? "Chưa có ảnh nào"
                : "Không tìm thấy ảnh"}
            </Typography>
          )}
          <Box
            sx={{
              ">div >div": {
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                },
                gap: 2,
              },
            }}
          >
            <InfiniteScroll
              dataLength={assets.data.length}
              next={handleLoadMore}
              hasMore={hasMore}
              loader={<Spinner />}
              style={{ maxHeight: "50vh" }}
            >
              {optionsMarkup}
            </InfiniteScroll>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};
