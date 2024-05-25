import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Popover,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { FileDataUpload, Template } from "../../../../types";
import {
  ContentCopyOutlined,
  DeleteOutlineOutlined,
  FormatItalicOutlined,
  InfoOutlined,
  ModeEditOutlineOutlined,
  MoreVert,
  Share,
  ToggleOffOutlined,
  ToggleOnOutlined,
  Visibility,
} from "@mui/icons-material";
import { useToggle } from "../../../../utils/useToggle";
import React from "react";
import { ComplexAction } from "../../../../components/types";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { useNavigate } from "react-router";
import { MediaFileDetailModal } from "./MediaFileDetailModal";

interface Props {
  asset: FileDataUpload;
}

export const MediaFileCard = ({ asset }: Props) => {
  const navigate = useNavigate();
  const {
    value: isOpenDetail,
    setTrue: openDetail,
    setFalse: closeDetail,
  } = useToggle(false);

  const {
    value: isOpenDelete,
    setTrue: openDelete,
    setFalse: closeDelete,
  } = useToggle(false);

  return (
    <Card
      sx={(theme) => ({
        background: "#F2F4FB99",
        "&:hover": { background: "#F2F4FBFF", boxShadow: theme.shadows[4] },
      })}
    >
      <CardActionArea onClick={openDetail}>
        <CardMedia
          component="img"
          height="194"
          image={asset.key}
          alt={asset.file_name}
        />
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            {asset.file_name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <Stack direction={"row"} width={"100%"} justifyContent={"space-around"}>
          <Tooltip title={"Chi tiết"}>
            <Box>
              <IconButton aria-label="detail" onClick={openDetail}>
                <InfoOutlined />
              </IconButton>
            </Box>
          </Tooltip>
          <Divider orientation="vertical" flexItem />
          <Box>
            <Tooltip title={"Xóa"}>
              <IconButton aria-label="trash">
                <DeleteOutlineOutlined />
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>
      </CardActions>
      {isOpenDetail && (
        <MediaFileDetailModal
          open
          asset={asset}
          onClose={closeDetail}
          onDelete={openDelete}
        />
      )}
    </Card>
  );
};
