import { Box, CircularProgress, Paper, Skeleton } from "@mui/material";

export const LayoutSkeleton = () => {
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Box
        height={"100vh"}
        width="100vw"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    </Box>
  );
};
