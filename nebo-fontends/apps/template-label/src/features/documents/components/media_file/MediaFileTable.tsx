import { Box, Grid } from "@mui/material";
import {
  CategoryByGroup,
  FileDataUpload,
  ListResponse,
  Template,
} from "../../../../types";
import { MediaFileCard } from "./MediaFileCard";

interface Props {
  mode?: "list" | "icons";
  assets: ListResponse<FileDataUpload>;
  // filter: FilterQueryResult<TemplateFilterRequestModel>["filter"];
  // onChangeParams: FilterQueryResult<TemplateFilterRequestModel>["onChangeSearchParams"];
}
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
        {assets.data.map((file, index) => (
          <MediaFileCard key={index} asset={file} />
        ))}
      </Grid>
      // </Box>
    );
  }
};
