import { Outlet, useParams } from "react-router";
import { useGetCurrentUserQuery } from "../../data/api";
import { ReactNode, Suspense, useEffect, useState } from "react";
import { LayoutSkeleton } from "./LayoutSkeleton";
import Cookies from "universal-cookie";
import { TOKEN_HEADER } from "../../constants";
import { useRefreshTokenQuery } from "../../data/api";
import { Box } from "@mui/material";

const cookies = new Cookies();
interface Props {
  children: ReactNode | ReactNode[];
}
export const AuthProvider = ({ children }: Props) => {
  const urlParams = new URLSearchParams(window.location.search);
  const [isFirstLoading, setIsFirstLoading] = useState(false);

  const {
    data: result,
    isLoading: isLoadingRefresh,
    isFetching: isFetchingRefresh,
  } = useRefreshTokenQuery(undefined, {
    skip: !cookies.get(TOKEN_HEADER) && !urlParams.get("token"),
    pollingInterval: 180000,
  });
  const {
    data: user,
    isLoading: isLoadingUser,
    isFetching: isFetchingUser,
  } = useGetCurrentUserQuery(undefined, {
    skip: !result,
  });
  useEffect(() => {
    if (isLoadingUser && !isFirstLoading) {
      setIsFirstLoading(true);
    }
  }, [isLoadingUser]);

  if (
    // isFirstLoading &&
    isLoadingUser ||
    isFetchingUser ||
    isLoadingRefresh ||
    isFetchingRefresh
  )
    return <LayoutSkeleton />;
  return (
    <Box minWidth={"100vw"} minHeight={"100vh"}>
      <Suspense fallback={<LayoutSkeleton></LayoutSkeleton>}>
        {children}
      </Suspense>
    </Box>
  );
};

export default AuthProvider;
