import { Grid, Paper } from "@mui/material";
import backgroundImage from "/src/assets/img/background.jpeg";
import { LoginCard } from "./components/LoginCard";
import { useWorkspaceContext } from "../../utils/useWorkspaceContext";
import { Navigate } from "react-router";

export default function LoginPage() {
  const { user } = useWorkspaceContext();

  if (user.id !== 0) {
    return <Navigate to="/documents" replace />;
  }
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100vw",
        height: "100vh",
        background: `url(${backgroundImage})`,
      }}
    >
      <Grid
        container
        width={"100%"}
        height={"100%"}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item md={4}>
          <LoginCard />
        </Grid>
      </Grid>
    </Paper>
  );
}
