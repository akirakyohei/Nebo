import { Box } from "@mui/material";
import { CategoryByGroup, Template } from "../../../../types";
import { FilterQueryResult } from "../../../../utils/useBaseFilterQuery";
import { TemplateFilterRequestModel } from "../../types";
import { Masonry } from "@mui/lab";
import { TemplateCard } from "./TemplateCard";
import { defaultBlankTemplate } from "../../../../constants";

interface Props {
  mode?: "list" | "icons";
  templates: Template[];
  filter: FilterQueryResult<TemplateFilterRequestModel>["filter"];
  onChangeParams: FilterQueryResult<TemplateFilterRequestModel>["onChangeSearchParams"];
}

const defaultTemplates = [
  defaultBlankTemplate,
  defaultBlankTemplate,
  defaultBlankTemplate,
  defaultBlankTemplate,
  defaultBlankTemplate,
  defaultBlankTemplate,
  defaultBlankTemplate,
  defaultBlankTemplate,
  defaultBlankTemplate,
  defaultBlankTemplate,
  defaultBlankTemplate,
  defaultBlankTemplate,
  defaultBlankTemplate,
  defaultBlankTemplate,
  defaultBlankTemplate,
  defaultBlankTemplate,
  defaultBlankTemplate,
  defaultBlankTemplate,
  defaultBlankTemplate,
  defaultBlankTemplate,
  defaultBlankTemplate,
  defaultBlankTemplate,
  defaultBlankTemplate,
  defaultBlankTemplate,
  defaultBlankTemplate,
  defaultBlankTemplate,
];
export const TemplateTable = ({ templates, mode = "icons" }: Props) => {
  if (mode === "icons") {
    return (
      <Box>
        <Masonry
          columns={{ sx: 1, md: "3", lg: 4 }}
          sx={{ minHeight: 829 }}
          spacing={2}
        >
          {defaultTemplates.map((template, index) => (
            <TemplateCard key={index} template={template} />
          ))}
        </Masonry>
      </Box>
    );
  }
};
