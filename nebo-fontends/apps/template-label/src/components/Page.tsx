import {
  Box,
  ButtonGroup,
  Paper,
  Stack,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { ComplexAction } from "./types";
import { filterNonNull } from "../utils/base";
import { Button } from "./Button";

interface Props {
  title?: string;
  children?: React.ReactNode;
  fullHeight?: boolean;
  sx?: SxProps<Theme>;
  fluid?: boolean;
  spacing?: number;
  contentSpacing?: number;
  primaryAction?: ComplexAction;
  secondaryActions?: ComplexAction[];
}

export const Page = ({
  title,
  children,
  fullHeight,
  spacing = 2,
  contentSpacing = 2,
  sx,
  primaryAction,
  secondaryActions,
}: Props) => {
  const footerMarkup = filterNonNull<ComplexAction>([
    ...(secondaryActions?.map((item) => ({ ...item, outline: true })) || []),
    primaryAction ? { color: "primary", ...primaryAction } : null,
  ]).map((item, index) => <Button key={index} {...item} />);
  return (
    <Box sx={{ padding: spacing }}>
      {(title || footerMarkup.length > 0) && (
        <Box sx={{ marginLeft: 1, paddingBottom: 1 }}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h6" fontWeight={"500"}>
              {title}
            </Typography>
            <Box>
              {footerMarkup ? <ButtonGroup>{footerMarkup}</ButtonGroup> : null}
            </Box>
          </Stack>
        </Box>
      )}
      <Paper
        sx={{
          minHeight: fullHeight ? "100vh" : undefined,
          padding: contentSpacing,
          ...sx,
        }}
      >
        <Box>{children}</Box>
      </Paper>
    </Box>
  );
};
