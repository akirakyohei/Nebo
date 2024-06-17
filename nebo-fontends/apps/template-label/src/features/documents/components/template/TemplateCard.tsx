import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Popover,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { Template, User } from "../../../../types";
import blankThumbImage from "src/assets/img/new-blank-template.png";
import {
  ContentCopyOutlined,
  DeleteOutlineOutlined,
  Edit,
  FormatItalicOutlined,
  ModeEditOutlineOutlined,
  MoreVert,
  RadioButtonCheckedOutlined,
  RadioButtonUncheckedOutlined,
  Share,
  ToggleOffOutlined,
  ToggleOnOutlined,
  Visibility,
} from "@mui/icons-material";
import { useToggle } from "../../../../utils/useToggle";
import React from "react";
import {
  useCreateTemplateMutation,
  useDeleteTemplateMutation,
  useUpdateTemplateMutation,
} from "../../../../data/template.api";
import { ComplexAction } from "../../../../components/types";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { useNavigate } from "react-router";
import { TemplateShareModal } from "./TemplateShareModal";
import { stringAvatar } from "../../../../utils/stringAvatar";
import { getFullName } from "../../../../utils/base";
import { isClientError } from "../../../../utils/client";
import { useToast } from "../../../../components/notification/useToast";
import Modal from "../../../../components/Modal";
import { TemplateUpdateModal } from "./TemplateUpdateModal";

interface Props {
  user?: User;
  template: Template;
  shared?: boolean;
  writePermission?: boolean;
}

export const TemplateCard = ({
  user,
  template,
  writePermission = true,
  shared,
}: Props) => {
  const { show: showToast } = useToast();
  const navigate = useNavigate();
  const {
    value: isOpenShare,
    setTrue: openShare,
    setFalse: closeShare,
  } = useToggle(false);
  const {
    value: isOpenConfirmDelete,
    setTrue: openConfirmDelete,
    setFalse: closeConfirmDelete,
  } = useToggle(false);
  const {
    value: isOpenUpdateTemplate,
    setTrue: openUpdateTemplate,
    setFalse: closeUpdateTemplate,
  } = useToggle(false);
  const {
    value: isOpenActive,
    setTrue: openActive,
    setFalse: closeActive,
  } = useToggle(false);
  const [createTemplate, { isLoading: isLoadingCreateTemplate }] =
    useCreateTemplateMutation();
  const [deleteTemplate, { isLoading: isLoadingDelete }] =
    useDeleteTemplateMutation();
  const [updateTemplate, { isLoading: isLoadingUpdateTemplate }] =
    useUpdateTemplateMutation();

  const handleCopy = async (data: Template) => {
    try {
      const res = await createTemplate({
        ...data,
      }).unwrap();
      navigate(`/documents/templates/${res.id}`);
      showToast("Sao chép mẫu thành công");
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

  const handleDeleteTemplate = async () => {
    try {
      const result = await deleteTemplate(template.id).unwrap();
      showToast("Xóa mẫu thành công");
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

  const handleActiveTemplate = () => {
    try {
      const res = updateTemplate({
        id: template.id,
        request: {
          active: !template.active,
        },
      });
      showToast("Lưu mẫu thành công");
      closeActive();
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

  const tools: ComplexAction[] = [
    {
      icon: <ModeEditOutlineOutlined fontSize="small" />,
      content: "Sửa",
      disabled: !writePermission,
      onAction: () => navigate(`/documents/templates/${template.id}`),
    },
    {
      icon: <FormatItalicOutlined fontSize="small" />,
      content: "Sửa tên",
      disabled: !writePermission,
      onAction: openUpdateTemplate,
    },
    {
      icon: template.active ? (
        <ToggleOffOutlined fontSize="small" />
      ) : (
        <ToggleOnOutlined fontSize="small" />
      ),
      disabled: shared,
      content: template.active ? "Vô hiệu hóa" : "Kích hoạt",
      onAction: openActive,
    },
    {
      icon: <ContentCopyOutlined fontSize="small" />,
      content: "Sao chép",
      onAction: () => {
        handleCopy(template);
      },
    },
    {
      icon: <DeleteOutlineOutlined fontSize="small" />,
      content: "Xóa",
      disabled: shared,
      onAction: openConfirmDelete,
    },
  ];

  return (
    <Card
      sx={(theme) => ({
        background: "#F2F4FB99",
        "&:hover": { background: "#F2F4FBFF", boxShadow: theme.shadows[4] },
      })}
    >
      <CardHeader
        avatar={
          user ? (
            <Avatar
              sizes="small"
              src={
                user.avatar_url
                  ? user.avatar_url.startsWith("http")
                    ? user.avatar_url
                    : `/api/files/data/${user.avatar_url}`
                  : undefined
              }
              {...stringAvatar(user.first_name, user.last_name, 40)}
            />
          ) : undefined
        }
        action={
          <PopupState
            variant="popover"
            popupId={`popup-popover-${template.id}`}
          >
            {(popupState) => (
              <div>
                <IconButton
                  aria-label="settings"
                  {...bindTrigger(popupState)}
                  sx={{ background: popupState.isOpen ? "#aacc" : undefined }}
                >
                  <MoreVert />
                </IconButton>
                <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <Stack padding={1}>
                    {tools.map((tool, index) => (
                      <ToolTemplate
                        key={index}
                        {...tool}
                        onClose={popupState.close}
                      />
                    ))}
                  </Stack>
                </Popover>
              </div>
            )}
          </PopupState>
        }
        title={getFullName({ ...user })}
        subheader={user?.email}
      />
      <CardActionArea
        onClick={() => {
          navigate(
            `/documents/templates/${template.id}${template.active && writePermission ? "" : "/preview"}`
          );
        }}
      >
        <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
          <CardMedia
            component="img"
            height="194"
            image={
              template?.thumbnail?.url
                ? `/api/files/data/${template?.thumbnail?.url}`
                : blankThumbImage
            }
            alt={template?.thumbnail?.name}
            sx={(theme) => ({
              width: "auto",
            })}
          />
        </Box>
        <CardContent sx={{ display: "flex", gap: 1 }}>
          <Box>
            {template.active ? (
              <RadioButtonCheckedOutlined color="info" />
            ) : (
              <RadioButtonUncheckedOutlined color="secondary" />
            )}
          </Box>
          <Typography variant="body1" color="text.secondary">
            {template.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        {!shared && (
          <Tooltip title={"Chia sẻ"}>
            <IconButton aria-label="share" onClick={openShare}>
              <Share />
            </IconButton>
          </Tooltip>
        )}

        <Tooltip title={"Xem trước"}>
          <IconButton
            aria-label="share"
            onClick={() =>
              navigate(`/documents/templates/${template.id}/preview`)
            }
          >
            <Visibility />
          </IconButton>
        </Tooltip>
      </CardActions>
      {isOpenShare && (
        <TemplateShareModal onClose={closeShare} template={template} />
      )}
      {isOpenUpdateTemplate && (
        <TemplateUpdateModal
          onClose={closeUpdateTemplate}
          template={template}
        />
      )}
      {isOpenActive && (
        <Modal
          open
          onClose={closeActive}
          title={template?.active ? "Loại trừ mẫu" : "Kích hoạt mẫu"}
          primaryAction={{
            content: "Tiếp tục",
            loading: isLoadingUpdateTemplate,
            onAction: handleActiveTemplate,
          }}
          secondaryActions={[
            {
              content: "Hủy",
              disabled: isLoadingUpdateTemplate,
              onAction: closeActive,
            },
          ]}
        >
          <Modal.Section>
            <Typography>
              {template?.active
                ? "Thao tác này loại trừ mẫu, không thể chỉnh sửa"
                : "Thao tác này sẽ kích hoạt mẫu, có thể chỉnh sửa"}
            </Typography>
          </Modal.Section>
        </Modal>
      )}
      {isOpenConfirmDelete && (
        <Modal
          open
          onClose={closeConfirmDelete}
          title="Xóa mẫu"
          primaryAction={{
            content: "Xóa",
            loading: isLoadingDelete,
            onAction: handleDeleteTemplate,
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
            <Typography>Thao tác này sẽ xóa vĩnh vĩnh viễn mẫu</Typography>
          </Modal.Section>
        </Modal>
      )}
    </Card>
  );
};

const ToolTemplate = ({
  ...props
}: ComplexAction & { onClose: () => void }) => {
  return (
    <Box
      onClick={() => {
        props.onAction?.();
        props.onClose?.();
      }}
      sx={(theme) => ({
        "&:hover": {
          background: theme.palette.grey[100],
          borderRadius: 1,
          cursor: props.disabled ? undefined : "pointer",
        },
        background: props.disabled ? "#fafafafa" : undefined,
      })}
    >
      <Stack display={"flex"} direction={"row"} gap={2} padding={1}>
        {props.icon}
        <Typography variant="body1">{props.content}</Typography>
      </Stack>
    </Box>
  );
};
