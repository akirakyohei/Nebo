import { Chip, styled } from "@mui/material";
import { useState } from "react";

export type TagOption = {
  label: string;
  onRemove?: (_value: string) => void;
};

interface Props {
  tags: TagOption[];
  limit?: number;
}

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export const TagFilterList = ({ tags, limit }: Props) => {
  const [size, setSize] = useState(limit != undefined ? limit : tags.length);
  const isRollup = limit && size < tags.length;
  const tagsMarkup = tags
    .slice(0, size)
    .map((tag, index) => (
      <Chip
        key={index}
        color="info"
        label={tag.label}
        onDelete={tag.onRemove}
      />
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
