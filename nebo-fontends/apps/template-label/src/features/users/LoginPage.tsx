import { Grid, Paper } from "@mui/material";
import backgroundImage from "/src/assets/img/background.jpeg";
import { LoginCard } from "./components/LoginCard";

export default function LoginPage() {
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
