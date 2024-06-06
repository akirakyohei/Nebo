import { Outlet, useParams } from "react-router";
import { useGetCurrentUserQuery } from "../../data/api";
import { Suspense, useEffect, useState } from "react";
import { LayoutSkeleton } from "./LayoutSkeleton";
import Cookies from "universal-cookie";
import { TOKEN_HEADER } from "../../constants";
import { useRefreshTokenQuery } from "../../data/user.api";
import { Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const cookies = new Cookies();
export const Layout = () => {
  const [isFirstLoading, setIsFirstLoading] = useState(false);
  const [params] = useSearchParams();
  const { data: result } = useRefreshTokenQuery(undefined, {
    skip: !cookies.get(TOKEN_HEADER) && !params.get("refresh_token"),
    pollingInterval: 180000,
  });
  const { data: user, isLoading: isLoadingUser } = useGetCurrentUserQuery(
    undefined,
    {
      skip: !result,
    }
  );
  useEffect(() => {
    if (isLoadingUser && !isFirstLoading) {
      setIsFirstLoading(true);
    }
  }, [isLoadingUser]);

  if (isFirstLoading && isLoadingUser) return <LayoutSkeleton />;
  return (
    <Box minWidth={"100vw"} minHeight={"100vh"}>
      <Suspense fallback={<LayoutSkeleton></LayoutSkeleton>}>
        <Outlet />
      </Suspense>
    </Box>
  );
};

export default Layout;
