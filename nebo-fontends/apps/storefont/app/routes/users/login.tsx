import {
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import type { MetaFunction } from "@remix-run/node";
import { LoginCard } from "app/features/users/login/components/LoginCard";
// eslint-disable-next-line import/no-unresolved
import logoImage from "app/assets/img/logo.png";
import backgroundImage from "/app/assets/img/background.jpeg";

export const meta: MetaFunction = () => {
  return [{ title: "Đăng nhập" }];
};

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
