import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import blankThumbImage from "src/assets/img/new-blank-template.png";
import { FileDataUpload } from "../../../../types";
import { DeleteOutlineOutlined, InfoOutlined } from "@mui/icons-material";
import { useToggle } from "../../../../utils/useToggle";
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
          src={`/api/files/data/${asset.key}`}
          onError={(event) => {
            event.currentTarget.src = blankThumbImage;
          }}
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
        <MediaFileDetailModal open asset={asset} onClose={closeDetail} />
      )}
    </Card>
  );
};
