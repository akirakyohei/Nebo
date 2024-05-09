import { Block } from "@mui/icons-material";
import { Button } from "@mui/material";
import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export default function Index() {
  return <Outlet />;
}
