import { Box } from "@mui/material";
import React from "react";

interface Props {
  children?: React.ReactNode;
  spacing?: "tight" | "loose";
}
export const ButtonGroup = ({ children, spacing }: Props) => {
  return (
    <Box display={"flex"} padding={spacing == "loose" ? 4 : 2}>
      {children}
    </Box>
  );
};
