import { Box, Container, Grid, Paper, Stack } from "@mui/material";
import type { MetaFunction } from "@remix-run/node";
// eslint-disable-next-line import/no-unresolved
import logoImage from "app/assets/img/logo.png";
import { Controller, useForm } from "react-hook-form";

export const meta: MetaFunction = () => {
  return [{ title: "Đăng nhập" }];
};

export default function LoginPage() {
  return (
    <Paper>
      <Container maxWidth="sm">
        <Stack>
          <Box>
            <Box
              component={"img"}
              src={logoImage}
              sx={{ width: "60px", height: "60px" }}
            />
          </Box>
          <Box>
            <Grid container>
              <Grid item xs={8}>
                <LoginCard />
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Container>
    </Paper>
  );
}
