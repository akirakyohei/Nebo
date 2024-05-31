import { Box, Grid } from "@mui/material";
import { CategoryByGroup, ListResponse, Template } from "../../../../types";
import { FilterQueryResult } from "../../../../utils/useBaseFilterQuery";
import { TemplateFilterRequestModel } from "../../types";
import { Masonry } from "@mui/lab";
import { TemplateCard } from "./TemplateCard";
import { defaultBlankTemplate } from "../../../../constants";

interface Props {
  mode?: "list" | "icons";
  templates: ListResponse<Template>;
  // filter: FilterQueryResult<TemplateFilterRequestModel>["filter"];
  // onChangeParams: FilterQueryResult<TemplateFilterRequestModel>["onChangeSearchParams"];
}

export const TemplateTable = ({ templates, mode = "icons" }: Props) => {
  if (mode === "icons") {
    return (
      // <Box maxWidth={"100%"}>
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
        {templates.data.map((template, index) => (
          <TemplateCard key={index} template={template} />
        ))}
      </Grid>
      // </Box>
    );
  }
};
