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
import React, { ReactNode } from "react";
import { isElement } from "lodash-es";

interface Props {
  title?: string | ReactNode;
  children?: React.ReactNode;
  fullHeight?: boolean;
  sx?: SxProps<Theme>;
  fluid?: boolean;
  spacing?: number;
  paddingHeader?: number;
  contentSpacing?: number;
  primaryAction?: ComplexAction | ReactNode;
  secondaryActions?: ComplexAction[];
}

export const Page = ({
  title,
  children,
  fullHeight,
  spacing = 2,
  paddingHeader,
  contentSpacing = 2,
  sx,
  primaryAction,
  secondaryActions,
  fluid = false,
}: Props) => {
  const footerMarkup = filterNonNull<ComplexAction>([
    ...(secondaryActions?.map((item) => ({ ...item, outline: true })) || []),
    primaryAction && !React.isValidElement(primaryAction)
      ? { color: "primary", ...(primaryAction as ComplexAction) }
      : null,
  ]).map((item, index) => <Button key={index} {...item} />);
  return (
    <Box sx={{ padding: spacing }} display={"flex"} justifyContent={"center"}>
      <Box
        flex={1}
        maxWidth={
          !fluid
            ? { xs: "600px", sm: "960px", md: "1280px", lg: "1024px" }
            : undefined
        }
      >
        {(title || footerMarkup.length > 0) && (
          <Box sx={{ paddingBottom: 1 }}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{ paddingRight: paddingHeader, paddingLeft: paddingHeader }}
            >
              {typeof title === "string" ? (
                <Typography variant="h6" fontWeight={"500"}>
                  {title}
                </Typography>
              ) : (
                title
              )}
              <Box>
                {footerMarkup.length > 0 ? (
                  <ButtonGroup>{footerMarkup}</ButtonGroup>
                ) : null}
                {React.isValidElement(primaryAction)
                  ? (primaryAction as ReactNode)
                  : null}
              </Box>
            </Stack>
          </Box>
        )}
        <Paper
          sx={{
            minHeight: fullHeight ? "100vh" : undefined,
            padding: contentSpacing,
            backgroundColor: "transparent",
            boxShadow: "none",
            ...sx,
          }}
        >
          <Box>{children}</Box>
        </Paper>
      </Box>
    </Box>
  );
};
