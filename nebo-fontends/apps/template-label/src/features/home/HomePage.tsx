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
import { OverviewCard } from "./components/OverviewCard";
import { FeatureCard } from "./components/FeatureCard";
import { useGetHomeData } from "./hooks/useGetHomeData";
import { TemplateCard } from "./components/TemplateCard";

export default function DashboardPage() {
  const workspace = useWorkspaceContext();

  const { templates } = useGetHomeData();
  if (workspace.user.id > 0) return <Navigate to={"/documents"} />;
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Page contentSpacing={0} fluid>
        <NavbarMenu />
        <Toolbar />
        <Box sx={{ background: "#9dd0ff" }}>
          <Container>
            <Box sx={{ paddingY: 6 }}>
              <OverviewCard />
            </Box>
          </Container>
        </Box>
        <Box sx={{ paddingY: 6 }}>
          <Container>
            <Box sx={{ my: 2 }}>
              <FeatureCard />
            </Box>
          </Container>
        </Box>
        <Box sx={{ paddingY: 6, background: "#9dd0ff" }}>
          <Container>
            <Box sx={{ my: 2 }}>
              <TemplateCard templates={templates.data} />
            </Box>
          </Container>
        </Box>
      </Page>
    </Box>
  );
}
