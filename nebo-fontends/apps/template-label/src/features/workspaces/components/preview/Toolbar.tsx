import {
  Add,
  Forward10,
  PlusOneOutlined,
  Remove,
  Replay10,
} from "@mui/icons-material";
import { Box, IconButton, Stack } from "@mui/material";
import { ComplexAction } from "../../../../components/types";

interface Props {
  zoom: number;
  setZoom: (zoom: number) => void;
  rotate: number;
  setRotate: (route: number) => void;
}

export const Toolbar = ({
  zoom,
  setZoom,
  rotate: rotate,
  setRotate: setRotate,
}: Props) => {
  const btnGroups: Omit<ComplexAction, "content">[] = [
    {
      disabled: zoom > 3,
      icon: <Add />,
      onAction: () => {
        setZoom(zoom + 0.1);
      },
    },
    {
      icon: <Remove />,
      disabled: zoom < 0.3,
      onAction: () => {
        setZoom(zoom - 0.1);
      },
    },
  ];
  return (
    <Box>
      <Stack gap={2}>
        {btnGroups.map((btn, index) => (
          <IconButton
            key={index}
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
        ))}
      </Stack>
    </Box>
  );
};
