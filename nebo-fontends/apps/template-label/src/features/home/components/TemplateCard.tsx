import { Box, Grid, Button } from "@mui/material";
import { Template } from "../../../types";
import { TemplateItemCard } from "./TemplateItemCard";
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";

export const TemplateCard = ({ templates }: { templates: Template[] }) => {
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
        }}
        justifyContent={"center"}
        columnGap={3}
        rowGap={3}
        padding={3}
      >
        {templates.map((template, index) => {
          return <TemplateItemCard key={index} template={template} />;
        })}
      </Grid>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Button endIcon={<KeyboardDoubleArrowRight />} href="/users/signup">
          Xem thêm
        </Button>
      </Box>
    </Box>
  );
};
