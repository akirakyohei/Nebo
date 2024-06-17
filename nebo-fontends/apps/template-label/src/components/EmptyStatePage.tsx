import React, { ReactNode } from "react";
import { ComplexAction } from "./types";
import { Page } from "./Page";
import { filterNonNull } from "../utils/base";
import { isElement } from "lodash-es";
import { Box, ButtonGroup, Stack, Typography } from "@mui/material";
import defaultEmptyStateImage from "/src/assets/img/empty-state.svg";
import { Button } from "./Button";
interface Props {
  title: string;
  description?: string;
  image?: string;
  primaryAction?: ComplexAction | ReactNode;
  secondaryActions?: ComplexAction[];
}

export const EmptyStateImage = ({
  title,
  description,
  image,
  primaryAction,
  secondaryActions,
}: Props) => {
  const footerMarkup = filterNonNull<ComplexAction>([
    ...(secondaryActions?.map((item) => ({ ...item, outline: true })) || []),
    primaryAction && !React.isValidElement(primaryAction)
      ? { color: "primary", ...(primaryAction as ComplexAction) }
      : null,
  ]).map((item, index) => <Button key={index} {...item} />);
  return (
    <Box
      sx={{
        width: "100%",
        height: "70%",
        paddingTop: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack justifyContent={"center"} alignItems={"center"}>
        <Box
          component={"img"}
          maxWidth={"200px"}
          src={image || defaultEmptyStateImage}
        ></Box>
        <Box>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            {title}
          </Typography>
          {!!description && (
            <Typography
              variant="body2"
              color={(theme) => theme.palette.grey[400]}
              sx={{ textAlign: "center" }}
            >
              {description}
            </Typography>
          )}
        </Box>
        {footerMarkup ? (
          <Box>
            <ButtonGroup>{footerMarkup}</ButtonGroup>
          </Box>
        ) : null}
        {isElement(primaryAction) ? (primaryAction as ReactNode) : null}
      </Stack>
    </Box>
  );
};
