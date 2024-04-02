import { useHydrated } from "remix-utils/use-hydrated";
import { WebBuilder } from "../../../features/documents/grapesjs.client.js";
import { Outlet } from "@remix-run/react";

export default function Index() {
  return <Outlet />;
}
