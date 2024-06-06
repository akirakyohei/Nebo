import { Skeleton } from "@mui/material";
import { Page } from "../../../components/Page";
import { PageSkeleton } from "../../../components/skeleton/PageSkeleton";

export const WorkspacePageSkeleton = () => {
  return (
    <PageSkeleton>
      <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
    </PageSkeleton>
  );
};
