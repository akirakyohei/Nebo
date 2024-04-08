import { Box, BoxProps } from "@mui/material";
import React from "react";

interface Props {
  children?: React.ReactNode;
  spacing?: "tight" | "loose";
  justifyContent?: BoxProps["justifyContent"];
}
export const ButtonGroup = ({
  children,
  spacing,
  justifyContent = "end",
}: Props) => {
  return (
    <Box
      display={"flex"}
      justifyContent={justifyContent}
      gap={spacing == "loose" ? 4 : 2}
    >
      {children}
    </Box>
  );
};
