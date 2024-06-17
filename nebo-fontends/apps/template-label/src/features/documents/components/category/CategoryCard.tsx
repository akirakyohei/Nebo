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
import { Category, FileDataUpload } from "../../../../types";
import { DeleteOutlineOutlined, EditOutlined } from "@mui/icons-material";
import { useToggle } from "../../../../utils/useToggle";
import { useNavigate } from "react-router";
import { stringToColor } from "../../../../utils/stringAvatar";
import {
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "../../../../data/category.api";
import { CategoryModal } from "./CategoryModal";
import { useToast } from "../../../../components/notification/useToast";
import { isClientError } from "../../../../utils/client";
import Modal from "../../../../components/Modal";

interface Props {
  category: Category;
}

export const CategoryCard = ({ category }: Props) => {
  const navigate = useNavigate();
  const { show: showToast } = useToast();
  const { value: isOpenEdit, toggle: toggleEdit } = useToggle(false);
  const {
    value: isOpenConfirmDelete,
    toggle: toggleConfirmDelete,
    setFalse: closeConfirmDelete,
  } = useToggle(false);
  const [deleteCategory, { isLoading: isLoadingDelete }] =
    useDeleteCategoryMutation();

  const handleDelete = async () => {
    try {
      await deleteCategory(category.id).unwrap();
      showToast("Tạo thành công");
      closeConfirmDelete();
    } catch (ex) {
      if (isClientError(ex)) {
        let error = ex.data.message;
        if (/Authenticated/.test(error)) {
          showToast("Lưu mẫu thất bại thành công trước đó");
          return;
        }

        if (/Email or password incorrect/.test(error))
          error = "Tài khoản không tồn tại hoặc mật khẩu không đúng";
        if (/Phone number or password incorrect/.test(error))
          error = "Tài khoản không tồn tại hoặc mật khẩu không đúng";
        showToast(error, { variant: "error" });
      }
    }
  };

  return (
    <Card
      sx={(theme) => ({
        background: "#fafafa",
        "&:hover": { opacity: 0.8, boxShadow: theme.shadows[4] },
        height: "200px",
        display: "flex",
        flexDirection: "column",
      })}
    >
      <CardActionArea
        href={`/documents/templates?category_ids=${category.id}`}
        sx={{ flex: 1 }}
      >
        <Tooltip
          title={category.name}
          arrow
          placement="right"
          sx={{
            fontSize: "2rem",
          }}
          PopperProps={{ sx: { "&>div": { fontSize: "1rem" } } }}
        >
          <CardContent
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                wordBreak: "break-word",
                overflow: "hidden",
                whiteSpace: "nowrap",
                width: "100%",
                textOverflow: "ellipsis",
                textAlign: "center",
                justifyContent: "center",
                lineClamp: 2,
                WebkitLineClamp: 2,
                webkitBoxOrient: "vertical",
              }}
            >
              {category.name}
            </Typography>
          </CardContent>
        </Tooltip>
      </CardActionArea>
      <Divider />
      <CardActions disableSpacing>
        <Stack direction={"row"} width={"100%"} justifyContent={"space-around"}>
          <Tooltip title={"Sửa"}>
            <Box>
              <IconButton aria-label="detail" onClick={toggleEdit}>
                <EditOutlined />
              </IconButton>
            </Box>
          </Tooltip>
          <Divider orientation="vertical" flexItem />
          <Box>
            <Tooltip title={"Xóa"}>
              <IconButton aria-label="trash" onClick={toggleConfirmDelete}>
                <DeleteOutlineOutlined />
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>
      </CardActions>
      {isOpenConfirmDelete && (
        <Modal
          open
          onClose={closeConfirmDelete}
          title="Xóa danh mục"
          primaryAction={{
            content: "Xóa",
            loading: isLoadingDelete,
            onAction: handleDelete,
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
            <Typography>Thao tác này sẽ xóa vĩnh vĩnh viễn danh mục</Typography>
          </Modal.Section>
        </Modal>
      )}
      {isOpenEdit && (
        <CategoryModal category={category} open onClose={toggleEdit} />
      )}
    </Card>
  );
};
