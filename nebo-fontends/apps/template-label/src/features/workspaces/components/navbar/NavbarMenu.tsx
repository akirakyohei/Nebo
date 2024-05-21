// import { Button, ButtonGroup, NavLink, Stack } from "react-bootstrap";
import { useState } from "react";
import documentImg from "/src/assets/document.svg";
import { Button, ButtonGroup, Link, Stack } from "@mui/material";

interface Props {
  isDesigning: boolean;
  onChangeMode: (desgining: boolean) => void;
}

export const NavbarMenu = ({ isDesigning, onChangeMode }: Props) => {
  const onToggle = (_value: boolean) => {
    onChangeMode(_value);
  };

  return (
    <Stack
      direction={"row"}
      width={"100%"}
      spacing={2}
      justifyContent={"space-between"}
      className="border"
      padding={2}
    >
      <Stack direction={"row"} paddingLeft={3}>
        <Link href="/" underline="none">
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <i
              className="fa fa-chevron-left text-primary"
              aria-hidden="true"
            ></i>
            <img src={documentImg} width={"42"} height={"42"} />
          </Stack>
        </Link>
      </Stack>
      <div>
        <ButtonGroup>
          <Button
            variant={isDesigning ? "contained" : "outlined"}
            disabled={isDesigning}
            color="primary"
            onClick={() => onToggle(true)}
            sx={(theme) => {
              if (isDesigning)
                return {
                  background: `${theme.palette.primary.light} !important`,
                  color: `${theme.palette.common.white} !important`,
                };
              return {};
            }}
          >
            Thiết kế
          </Button>
          <Button
            variant={!isDesigning ? "contained" : "outlined"}
            disabled={!isDesigning}
            color="primary"
            onClick={() => onToggle(false)}
            sx={(theme) => {
              if (!isDesigning)
                return {
                  background: `${theme.palette.primary.light} !important`,
                  color: `${theme.palette.common.white} !important`,
                };
              return {};
            }}
          >
            Xem thử
          </Button>
        </ButtonGroup>
      </div>
      <div></div>
    </Stack>
  );
};
