import { Chip, styled } from "@mui/material";
import { useState } from "react";

interface Props {
  tags: string[];
  limit?: number;
  onRemove?: (_value: string) => void;
}

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export const TagList = ({ tags, limit, onRemove }: Props) => {
  const [size, setSize] = useState(limit != undefined ? limit : tags.length);
  const isRollup = limit && size < tags.length;
  const tagsMarkup = tags
    .slice(0, size)
    .map((tag, index) => (
      <Chip key={index} color="info" label={tag} onDelete={onRemove} />
    ));

  return (
    <ListItem>
      {tagsMarkup}
      {isRollup && (
        <Chip
          color="info"
          sx={{ color: "HighlightText" }}
          label={`+${tags.length - limit}`}
          onClick={() => {
            setSize(tags.length);
          }}
        />
      )}
    </ListItem>
  );
};
