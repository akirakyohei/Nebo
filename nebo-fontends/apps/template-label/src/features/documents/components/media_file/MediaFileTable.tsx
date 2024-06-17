import { Box, Grid, Stack } from "@mui/material";
import {
  FileDataFilterRequest,
  FileDataUpload,
  ListResponse,
  Template,
} from "../../../../types";
import { MediaFileCard } from "./MediaFileCard";
import { Pagination } from "../../../../components/Pagination";
import { FilterQueryResult } from "../../../../utils/useBaseFilterQuery";
import { EmptyStateImage } from "../../../../components/EmptyStatePage";

interface Props {
  mode?: "list" | "icons";
  assets: ListResponse<FileDataUpload>;
  filter: FilterQueryResult<FileDataFilterRequest>["filter"];
  onChangeSearchParams: FilterQueryResult<FileDataFilterRequest>["onChangeSearchParams"];
  onChangeSearchParamsAll: FilterQueryResult<FileDataFilterRequest>["onChangeSearchParamsAll"];
}
export const MediaFileTable = ({
  assets,
  mode = "icons",
  filter,
  onChangeSearchParams,
  onChangeSearchParamsAll,
}: Props) => {
  if (assets.metadata.total_element === 0)
    return (
      <EmptyStateImage
        title="Không tim thấy kết quả nào"
        description="Hãy thử với tìm kiếm khác"
        secondaryActions={[
          {
            content: "Tìm kiếm tất cả",
            url: "/documents/assets",
          },
        ]}
      />
    );

  if (mode === "icons") {
    return (
      <Box maxWidth={"100%"}>
        <Grid
          container
          display={"grid"}
          width={"100%"}
          gridTemplateColumns={{
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
            lg: "1fr 1fr 1fr 1fr",
          }}
          justifyContent={"center"}
          columnGap={3}
          rowGap={3}
          padding={3}
        >
          {assets.data.map((file, index) => (
            <MediaFileCard key={index} asset={file} />
          ))}
        </Grid>
        <Stack width={"100%"} justifyContent="center" direction="row">
          <Pagination
            total={assets.metadata.total_element}
            page={assets.metadata.page}
            limit={filter?.limit || 20}
            onChangePage={(value) => {
              onChangeSearchParams("page", value);
            }}
            onChangePerPage={(value) => {
              onChangeSearchParamsAll({ page: 1, limit: value });
            }}
          />
        </Stack>
      </Box>
    );
  }
};
