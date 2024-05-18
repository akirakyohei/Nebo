import { Box, Grid, Paper } from "@mui/material";
import backgroundImage from "/src/assets/img/background.jpeg";
import { SignupCard } from "./components/SignupCard";

export default function SignupPage() {
  return (
    <Paper
      elevation={0}
      sx={() => {
        return {
          width: "100vw",
          height: "100vh",
          background: `url(${backgroundImage})`,
        };
      }}
    >
      <Grid
        container
        width={"100%"}
        height={"100%"}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item md={8}>
          <Grid justifyContent={"center"}>
            <Grid item xs={12}>
              <SignupCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
