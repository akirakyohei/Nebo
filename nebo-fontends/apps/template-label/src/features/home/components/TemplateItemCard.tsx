import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";

import blankThumbImage from "src/assets/img/new-blank-template.png";
import { useNavigate } from "react-router";
import { Template } from "../../../types";

interface Props {
  template: Template;
}

export const TemplateItemCard = ({ template }: Props) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={(theme) => ({
        background: "#F2F4FB99",
        "&:hover": { background: "#F2F4FBFF", boxShadow: theme.shadows[4] },
      })}
    >
      <CardHeader
      // avatar={
      //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
      //     R
      //   </Avatar>
      // }
      // title="Shrimp and Chorizo Paella"
      // subheader="September 14, 2016"
      />
      <CardActionArea href={`/documents/templates/${template.id}/preview`}>
        <CardMedia
          component="img"
          height="194"
          image={
            template?.thumbnail?.url
              ? `/api/files/data/${template?.thumbnail?.url}`
              : blankThumbImage
          }
          alt={template?.thumbnail?.name}
        />
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            {template.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
