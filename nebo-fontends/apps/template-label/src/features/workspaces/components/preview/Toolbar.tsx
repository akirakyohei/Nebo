import {
  Add,
  Forward10,
  Html,
  PlusOneOutlined,
  Remove,
  Replay10,
} from "@mui/icons-material";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import { ComplexAction } from "../../../../components/types";

interface Props {
  zoom: number;
  setZoom: (zoom: number) => void;
  rotate: number;
  setRotate: (route: number) => void;
  openHtml: () => void;
}

export const Toolbar = ({
  zoom,
  setZoom,
  openHtml,
  rotate: rotate,
  setRotate: setRotate,
}: Props) => {
  const btnGroups: ComplexAction[] = [
    {
      disabled: zoom > 3,
      icon: <Add />,
      onAction: () => {
        setZoom(zoom + 0.1);
      },
      content: "phóng to",
    },
    {
      icon: <Remove />,
      disabled: zoom < 0.3,
      onAction: () => {
        setZoom(zoom - 0.1);
      },
      content: "thu nhỏ",
    },
    {
      icon: <Html />,
      onAction: openHtml,
      content: "xem html",
    },
  ];
  return (
    <Box>
      <Stack gap={2}>
        {btnGroups.map((btn, index) => (
          <Tooltip key={index} title={btn.content} placement="left">
            <IconButton
              disabled={btn.disabled}
              onClick={btn.onAction}
              sx={(theme) => ({
                borderRadius: "5px",
                background: "#fff",
                boxShadow: theme.shadows[1],
              })}
            >
              <Box sx={{ display: "flex" }}>{btn.icon}</Box>
            </IconButton>
          </Tooltip>
        ))}
      </Stack>
    </Box>
  );
};
