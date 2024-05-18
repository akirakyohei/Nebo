import { Button } from "@mui/material";
import { Page } from "../../components/Page";
import { useWorkspaceContext } from "../../utils/useWorkspaceContext";
import { Navigate } from "react-router";

export default function DashboardPage() {
  const workspace = useWorkspaceContext();
  if (workspace.user.id > 0) return <Navigate to={"/documents"} />;
  return (
    <Page title="Tổng quan">
      <div>
        Home Page
        <Button href="/users/login"> Đăng nhập</Button>
      </div>
    </Page>
  );
}
