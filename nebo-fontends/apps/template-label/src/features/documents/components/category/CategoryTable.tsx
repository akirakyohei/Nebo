import { Box, Grid, Stack } from "@mui/material";
import {
  Category,
  CategoryFilterRequest,
  FileDataFilterRequest,
  ListResponse,
} from "../../../../types";
import { CategoryCard } from "./CategoryCard";
import { Pagination } from "../../../../components/Pagination";
import { FilterQueryResult } from "../../../../utils/useBaseFilterQuery";

interface Props {
  categories: ListResponse<Category>;
  filter: FilterQueryResult<CategoryFilterRequest>["filter"];
  onChangeSearchParams: FilterQueryResult<CategoryFilterRequest>["onChangeSearchParams"];
  onChangeSearchParamsAll: FilterQueryResult<CategoryFilterRequest>["onChangeSearchParamsAll"];
}
export const CategoryTable = ({
  categories,
  filter,
  onChangeSearchParams,
  onChangeSearchParamsAll,
}: Props) => {
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
          lg: "1fr 1fr 1fr 1fr 1fr",
          xl: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
        }}
        justifyContent={"center"}
        columnGap={3}
        rowGap={3}
        padding={3}
      >
        {categories.data.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </Grid>
      <Stack width={"100%"} justifyContent="center" direction="row">
        <Pagination
          total={categories.metadata.total_element}
          page={categories.metadata.page}
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
};
