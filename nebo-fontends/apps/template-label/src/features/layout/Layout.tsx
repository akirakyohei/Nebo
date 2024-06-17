import { Outlet, useParams } from "react-router";
import { Suspense, useEffect, useState } from "react";
import { LayoutSkeleton } from "./LayoutSkeleton";
import { Box } from "@mui/material";

export const Layout = () => {
  return (
    <Box minWidth={"100vw"} minHeight={"100vh"}>
      <Suspense fallback={<LayoutSkeleton></LayoutSkeleton>}>
        <Outlet />
      </Suspense>
    </Box>
  );
};

export default Layout;
