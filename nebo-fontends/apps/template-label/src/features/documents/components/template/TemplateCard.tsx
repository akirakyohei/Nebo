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

import { Template } from "../../../../types";
import { red } from "@mui/material/colors";
import {
  ContentCopyOutlined,
  DeleteOutlineOutlined,
  Edit,
  FormatItalicOutlined,
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

interface Props {
  template: Template;
}

export const TemplateCard = ({ template }: Props) => {
  const navigate = useNavigate();

  const tools: ComplexAction[] = [
    {
      icon: <ModeEditOutlineOutlined fontSize="small" />,
      content: "Sửa",
      onAction: () => navigate(`/workspaces/${template.id}`),
    },
    {
      icon: <FormatItalicOutlined fontSize="small" />,
      content: "Sửa tên",
    },
    {
      icon: template.is_active ? (
        <ToggleOffOutlined fontSize="small" />
      ) : (
        <ToggleOnOutlined fontSize="small" />
      ),
      content: template.is_active ? "Vô hiệu hóa" : "Kích hoạt",
    },
    {
      icon: <ContentCopyOutlined fontSize="small" />,
      content: "Sao chép",
      onAction: () => {},
    },
    {
      icon: <DeleteOutlineOutlined fontSize="small" />,
      content: "Xóa",
      onAction: () => {},
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
        // avatar={
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //     R
        //   </Avatar>
        // }
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
        // title="Shrimp and Chorizo Paella"
        // subheader="September 14, 2016"
      />
      <CardActionArea
        onClick={() => {
          navigate(`/workspaces/${template.id}`);
        }}
      >
        <CardMedia
          component="img"
          height="194"
          image={template.thumbnail.url}
          alt={template.thumbnail.name}
        />
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            {template.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <Tooltip title={"Chia sẻ"}>
          <IconButton aria-label="share">
            <Share />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Xem trước"}>
          <IconButton aria-label="share">
            <Visibility />
          </IconButton>
        </Tooltip>
      </CardActions>
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
          cursor: "pointer",
        },
      })}
    >
      <Stack display={"flex"} direction={"row"} gap={2} padding={1}>
        {props.icon}
        <Typography variant="body1">{props.content}</Typography>
      </Stack>
    </Box>
  );
};
