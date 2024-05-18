import { Paper, Skeleton } from "@mui/material";

export const LayoutSkeleton = () => {
  return (
    <Paper>
      <Skeleton
        sx={{ bgcolor: "grey.900" }}
        variant="rectangular"
        width={"100vw"}
        height={"100vh"}
      />
    </Paper>
  );
};
