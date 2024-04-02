import { Category, CategoryByGroup } from "../../../types";
import { TemplateFilterRequestModel } from "./types";
import { FilterQueryResult } from "../../../utils/useBaseFilterQuery";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { getCategory } from "./utils/templates";
import { TagFilterList, TagOption } from "../../../components/TagFilterList";

interface Props {
  title: string;
  filter: FilterQueryResult<TemplateFilterRequestModel>["filter"];
  categoryByGroups: CategoryByGroup[];
  onChangeParams: FilterQueryResult<TemplateFilterRequestModel>["onChangeSearchParams"];
}
export const TemplateHeader = ({
  title,
  filter,
  categoryByGroups,
  onChangeParams,
}: Props) => {
  const tagOptions: TagOption[] =
    filter.category_ids
      ?.map((categoryId) => getCategory(categoryId, categoryByGroups))
      .filter((a) => a !== undefined)
      .map(
        (category) =>
          ({
            label: category?.name,
            onRemove: () => {
              onChangeParams(
                "category_ids",
                filter.category_ids?.filter((item) => item !== category?.id)
              );
            },
          }) as TagOption
      ) || [];

  return (
    <Box>
      <Box>
        <Grid container justifyContent={"space-between"}>
          <Grid item>
            <Typography fontWeight={500}>{title}</Typography>
          </Grid>
          <Grid item>
            <Button onClick={() => {}}>Tạo mẫu thương hiệu</Button>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      {tagOptions.length > 0 && (
        <Box>
          <TagFilterList tags={tagOptions} limit={5} />
        </Box>
      )}
    </Box>
  );
};
