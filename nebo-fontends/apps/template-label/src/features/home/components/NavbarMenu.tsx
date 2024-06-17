import {
  AppBar,
  Box,
  Container,
  Grid,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import React from "react";
// import logoImage from "/src/assets/img/logo.png";
import documentImg from "/src/assets/document.svg";
import { ButtonGroup } from "../../../components/ButonGroup";
import { Button } from "../../../components/Button";
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export const NavbarMenu = (props: { window?: () => Window }) => {
  return (
    <ElevationScroll {...props}>
      <Container>
        <Grid container>
          <AppBar sx={{ background: "#fff", color: "#4147ffe3" }}>
            <Toolbar>
              <Stack
                direction="row"
                justifyContent={"space-around"}
                alignItems={"center"}
                width="100%"
              >
                <Stack direction="row" gap={2} alignItems={"center"}>
                  <Box
                    component="img"
                    src={documentImg}
                    alt="logo"
                    width="100px"
                    sx={{ width: "42px", height: "42px" }}
                  />
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: `"Poetsen One", sans-serif`,
                      fontWeight: 400,
                      fontStyle: "normal",
                    }}
                  >
                    Nebo
                  </Typography>
                </Stack>
                <Typography variant="h6" component="div">
                  <ButtonGroup>
                    <Button
                      outline
                      content="Đăng ký"
                      url="/users/signup"
                    ></Button>
                    <Button content="Đăng nhập" url="/users/login"></Button>
                  </ButtonGroup>
                </Typography>
              </Stack>
            </Toolbar>
          </AppBar>
        </Grid>
      </Container>
    </ElevationScroll>
  );
};
