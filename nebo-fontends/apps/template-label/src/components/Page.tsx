import { Box, Paper, SxProps, Theme, Typography } from "@mui/material";

interface Props {
  title?: string;
  children?: React.ReactNode;
  fullHeight?: boolean;
  sx?: SxProps<Theme>;
  fluid?: boolean;
  spacing?: number;
}

export const Page = ({
  title,
  children,
  fullHeight,
  spacing = 2,
  sx,
}: Props) => {
  return (
    <Paper
      sx={{
        padding: spacing,
        minHeight: fullHeight ? "100vh" : undefined,
        ...sx,
      }}
    >
      {title && (
        <Box sx={{ marginLeft: 1 }}>
          <Typography variant="h6" fontWeight={"500"}>
            {title}
          </Typography>
        </Box>
      )}
      <Box>{children}</Box>
    </Paper>
  );
};
