import { Box, Grid, Paper } from "@mui/material";
import type { MetaFunction } from "@remix-run/node";
import backgroundImage from "/app/assets/img/background.jpeg";
import { SignupCard } from "../../features/users/signup/components/SignupCard";

export const meta: MetaFunction = () => {
  return [{ title: "Đăng ký" }];
};

export default function LoginPage() {
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
