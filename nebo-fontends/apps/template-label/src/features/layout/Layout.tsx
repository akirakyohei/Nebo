import { Outlet } from "react-router";
import { useGetCurrentUserQuery } from "../../data/api";
import { useEffect, useState } from "react";
import { LayoutSkeleton } from "./LayoutSkeleton";
import Cookies from "universal-cookie";
import { TOKEN_HEADER } from "../../constants";
import { useRefreshTokenQuery } from "../../data/user.api";
import { Box } from "@mui/material";

const cookies = new Cookies();
export const Layout = () => {
  const [isFirstLoading, setIsFirstLoading] = useState(false);
  const { data: user, isLoading: isLoadingUser } = useGetCurrentUserQuery(
    undefined,
    {
      skip: !cookies.get(TOKEN_HEADER),
    }
  );
  const {} = useRefreshTokenQuery(undefined, {
    skip: !cookies.get(TOKEN_HEADER),
    pollingInterval: 180000,
  });
  useEffect(() => {
    if (isLoadingUser && !isFirstLoading) {
      setIsFirstLoading(true);
    }
  }, [isLoadingUser]);

  if (isFirstLoading && isLoadingUser) return <LayoutSkeleton />;
  return (
    <Box minWidth={"100vw"} minHeight={"100vh"}>
      <Outlet />
    </Box>
  );
};

export default Layout;
