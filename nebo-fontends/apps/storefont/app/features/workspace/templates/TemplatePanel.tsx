import { Box } from "@mui/material";
import { CategoryByGroup, Template } from "../../../types";
import { TemplateHeader } from "./TemplateHeader";
import { FilterQueryResult } from "../../../utils/useBaseFilterQuery";
import { TemplateFilterRequestModel } from "./types";

interface Props {
  title: string;
  templates: Template[];
  categoryByGroups: CategoryByGroup[];
  filter: FilterQueryResult<TemplateFilterRequestModel>["filter"];
  onChangeParams: FilterQueryResult<TemplateFilterRequestModel>["onChangeSearchParams"];
}
export const TemplatePanel = ({
  templates,
  title,
  filter,
  categoryByGroups,
  onChangeParams,
}: Props) => {
  return (
    <Box>
      <TemplateHeader
        title={title}
        filter={filter}
        categoryByGroups={categoryByGroups}
        onChangeParams={onChangeParams}
      />

      
    </Box>
  );
};
