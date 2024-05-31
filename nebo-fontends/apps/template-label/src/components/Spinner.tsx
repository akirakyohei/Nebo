import { Box } from "@mui/material";
import barsRotateFadeSpinner from "src/assets/icon/bars-rotate-fade.svg";

export const Spinner = () => {
  return (
    <Box display={"flex"}>
      <Box component={"img"} src={barsRotateFadeSpinner}></Box>
    </Box>
  );
};
