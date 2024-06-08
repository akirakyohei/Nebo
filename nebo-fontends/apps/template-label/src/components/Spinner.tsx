import { Box, CircularProgress } from "@mui/material";

export const Spinner = () => {
  return (
    <Box display={"flex"}>
      <CircularProgress size={"1.5rem"} color="inherit" />
    </Box>
  );
};
