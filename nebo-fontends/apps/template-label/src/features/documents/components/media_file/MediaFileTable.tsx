import { Box, Grid } from "@mui/material";
import { CategoryByGroup, FileDataUpload, Template } from "../../../../types";
import { FilterQueryResult } from "../../../../utils/useBaseFilterQuery";
import { TemplateFilterRequestModel } from "../../types";
import { Masonry } from "@mui/lab";
import { defaultBlankTemplate, defaultFileUpload } from "../../../../constants";
import { MediaFileCard } from "./MediaFileCard";

interface Props {
  mode?: "list" | "icons";
  assets: FileDataUpload[];
  // filter: FilterQueryResult<TemplateFilterRequestModel>["filter"];
  // onChangeParams: FilterQueryResult<TemplateFilterRequestModel>["onChangeSearchParams"];
}

const defaultTemplates = [
  defaultFileUpload,
  defaultFileUpload,
  defaultFileUpload,
  defaultFileUpload,
  defaultFileUpload,
  defaultFileUpload,
  defaultFileUpload,
  defaultFileUpload,
  defaultFileUpload,
  defaultFileUpload,
  defaultFileUpload,
  defaultFileUpload,
  defaultFileUpload,
  defaultFileUpload,
  defaultFileUpload,
  defaultFileUpload,
  defaultFileUpload,
  defaultFileUpload,
  defaultFileUpload,
  defaultFileUpload,
  defaultFileUpload,
  defaultFileUpload,
  defaultFileUpload,
  defaultFileUpload,
  defaultFileUpload,
  defaultFileUpload,
  defaultFileUpload,
  defaultFileUpload,
];
export const MediaFileTable = ({ assets, mode = "icons" }: Props) => {
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
        {defaultTemplates.map((template, index) => (
          <MediaFileCard key={index} asset={template} />
        ))}
      </Grid>
      // </Box>
    );
  }
};
