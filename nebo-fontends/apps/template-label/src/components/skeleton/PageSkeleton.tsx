import React from "react";
import { Page } from "../Page";
import { Skeleton } from "@mui/material";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  title?: boolean;
  fluid?: boolean;
  action?: boolean;
  contentSpacing?: number;
}
export const PageSkeleton = ({
  children,
  fluid,
  contentSpacing,
  title = true,
  action = true,
}: Props) => {
  return (
    <Page
      fluid={fluid}
      fullHeight
      contentSpacing={contentSpacing}
      title={title && <Skeleton width={100} height={45} />}
      primaryAction={action && <Skeleton width={100} height={45} />}
    >
      {children}
    </Page>
  );
};
