import { Box, Grid, Typography } from "@mui/material";
import { ListResponse, Template } from "../../../../types";
import { TemplateItemCard } from "./TemplateItemCard";

interface Props {
  templates: ListResponse<Template>;
}

export const DefaultTemplateCard = ({ templates }: Props) => {
  return (
    <Box maxWidth={"100%"}>
      <Typography
        variant="h5"
        fontWeight={"500"}
        paddingBottom={2}
        sx={{ textDecoration: "underline" }}
      >
        Mẫu tùy chọn
      </Typography>
      <Grid
        container
        display={"grid"}
        width={"100%"}
        gridTemplateColumns={{
          xs: "1fr",
          sm: "1fr 1fr",
          md: "1fr 1fr 1fr",
          lg: "1fr 1fr 1fr 1fr 1fr",
        }}
        justifyContent={"center"}
        columnGap={3}
        rowGap={3}
      >
        {templates.data.map((template, index) => {
          return <TemplateItemCard key={index} template={template} />;
        })}
      </Grid>
    </Box>
  );
};
