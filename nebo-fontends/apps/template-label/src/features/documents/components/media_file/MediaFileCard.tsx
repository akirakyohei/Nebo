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
import { useDeleteFileMutation } from "../../../../data/mediafile.api";
import { useToast } from "../../../../components/notification/useToast";
import { isClientError } from "../../../../utils/client";
import Modal from "../../../../components/Modal";

interface Props {
  asset: FileDataUpload;
}

export const MediaFileCard = ({ asset }: Props) => {
  const { show: showToast } = useToast();
  const navigate = useNavigate();
  const {
    value: isOpenDetail,
    setTrue: openDetail,
    setFalse: closeDetail,
  } = useToggle(false);

  const {
    value: isOpenConfirmDelete,
    setTrue: openConfirmDelete,
    setFalse: closeConfirmDelete,
  } = useToggle(false);

  const [deleteFile, { isLoading: isLoadingDelete }] = useDeleteFileMutation();

  const handleDeleteFile = async () => {
    try {
      const result = await deleteFile(asset.id).unwrap();
      showToast("Xóa tệp ảnh thành công");
      closeConfirmDelete();
    } catch (ex) {
      if (isClientError(ex)) {
        let error = ex.data.message;
        if (/Email already existed/.test(error)) error = "Email đã tồn tại";
        if (/Phone number already existed/.test(error))
          error = "Số điện thoại đã tồn tại";
        showToast(error, { variant: "error" });
      }
    }
  };

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
          alt={asset.name}
        />
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            {asset.name}
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
              <IconButton aria-label="trash" onClick={openConfirmDelete}>
                <DeleteOutlineOutlined />
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>
      </CardActions>
      {isOpenDetail && (
        <MediaFileDetailModal open asset={asset} onClose={closeDetail} />
      )}
      {isOpenConfirmDelete && (
        <Modal
          open
          onClose={closeConfirmDelete}
          title="Xóa ảnh tải lên"
          primaryAction={{
            content: "Xóa",
            loading: isLoadingDelete,
            onAction: handleDeleteFile,
            color: "error",
          }}
          secondaryActions={[
            {
              content: "Hủy",
              disabled: isLoadingDelete,
              onAction: closeConfirmDelete,
              color: "error",
            },
          ]}
        >
          <Modal.Section>
            <Typography>Thao tác này sẽ xóa vĩnh viễn ảnh</Typography>
          </Modal.Section>
        </Modal>
      )}
    </Card>
  );
};
