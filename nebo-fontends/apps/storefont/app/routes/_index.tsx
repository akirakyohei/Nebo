import { Block } from "@mui/icons-material";
import { Button } from "@mui/material";
import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Nebo" }];
};

export default function Index() {
  return (
    <div>
      Home Page
      <Button href="/users/login"> Đăng nhập</Button>
    </div>
  );
}
