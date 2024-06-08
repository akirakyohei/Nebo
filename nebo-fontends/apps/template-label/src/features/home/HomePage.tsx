import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import { Page } from "../../components/Page";
import { useWorkspaceContext } from "../../utils/useWorkspaceContext";
import { Navigate } from "react-router";
import React from "react";
import { NavbarMenu } from "./components/NavbarMenu";

export default function DashboardPage() {
  const workspace = useWorkspaceContext();
  if (workspace.user.id > 0) return <Navigate to={"/documents"} />;
  return (
    <Box sx={{ background: "#9dd0ff", minHeight: "100vh" }}>
      <Page fluid>
        <NavbarMenu />
        <Toolbar />
        <Container>
          <Box sx={{ my: 2 }}>
            {[...new Array(12)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
              )
              .join("\n")}
          </Box>
        </Container>
      </Page>
    </Box>
  );
}
