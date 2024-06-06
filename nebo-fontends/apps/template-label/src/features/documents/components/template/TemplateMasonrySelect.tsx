import { Masonry } from "@mui/lab";
import { Template } from "../../../../types";
import { Spinner } from "../../../../components/Spinner";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { defaultBlankTemplate } from "../../../../constants";
import blankThumbImage from "src/assets/img/new-blank-template.png";
interface Props {
  isLoading?: boolean;
  copyTemplateId?: number;
  templates: Template[];
  onChange: (value: Template) => void;
}

export const TemplateMasonrySelect = ({
  templates,
  isLoading,
  copyTemplateId,
  onChange,
}: Props) => {
  const itemsMarkup = [defaultBlankTemplate, ...templates].map(
    (template, index) => (
      <TemplateItemCard
        key={index}
        copyTemplateId={copyTemplateId}
        template={template}
        onChange={onChange}
      />
    )
  );

  return (
    <Box padding={2}>
      <Masonry columns={{ sx: 1, md: 3, lg: 4 }} spacing={2}>
        {itemsMarkup}
      </Masonry>
      {isLoading && <Spinner />}
    </Box>
  );
};

const TemplateItemCard = ({
  template,
  copyTemplateId,
  onChange,
}: Pick<Props, "copyTemplateId" | "onChange"> & { template: Template }) => {
  const isActive = template.id === copyTemplateId;
  return (
    <Card
      sx={{
        maxWidth: 300,
        borderRadius: 2,
        background: isActive ? "#3A96F2" : undefined,
        color: isActive ? "#ffffff" : undefined,
        "&:hover": { background: "#3A96F2CC", color: "#ffffff" },
      }}
    >
      <CardActionArea
        onClick={() => {
          onChange(template);
        }}
      >
        <CardMedia
          component="img"
          height="150"
          image={
            template?.thumbnail?.url
              ? `/api/files/data/${template?.thumbnail?.url}`
              : blankThumbImage
          }
          alt={template?.thumbnail?.name}
        />
        <CardContent>
          <Typography gutterBottom component="div">
            {template.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
