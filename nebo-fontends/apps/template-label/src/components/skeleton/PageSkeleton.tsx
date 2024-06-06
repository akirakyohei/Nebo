import React from "react";
import { Page } from "../Page";
import { Skeleton } from "@mui/material";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  title?: boolean;
  fluid?: boolean;
  action?: boolean;
}
export const PageSkeleton = ({ children }: Props) => {
  return (
    <Page
      fluid
      fullHeight
      title={<Skeleton width={100} height={45} />}
      primaryAction={<Skeleton width={100} height={45} />}
    >
      {children}
    </Page>
  );
};
