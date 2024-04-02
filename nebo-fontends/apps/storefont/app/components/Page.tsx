import { Box, Paper, SxProps, Theme, Typography } from "@mui/material";

interface Props {
  title: string;
  children?: React.ReactNode;
  fullHeight?: boolean;
  sx?: SxProps<Theme>;
}

export const Page = ({ title, children, fullHeight, sx }: Props) => {
  return (
    <Paper
      sx={{ padding: 2, minHeight: fullHeight ? "100vh" : undefined, ...sx }}
    >
      <Box sx={{ marginLeft: 1 }}>
        <Typography variant="h6" fontWeight={"500"}>
          {title}
        </Typography>
      </Box>
      <Box>{children}</Box>
    </Paper>
  );
};
