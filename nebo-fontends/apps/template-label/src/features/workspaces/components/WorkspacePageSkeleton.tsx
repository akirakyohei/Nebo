import { Skeleton, Grid } from "@mui/material";
import { Page } from "../../../components/Page";
import { PageSkeleton } from "../../../components/skeleton/PageSkeleton";

export const WorkspacePageSkeleton = () => {
  return (
    <PageSkeleton fluid title={false} action={false}>
      <Skeleton
        sx={{ height: "60px", marginBottom: 1 }}
        animation="wave"
        variant="rectangular"
      />
      <Grid container>
        <Grid item xs={3} paddingRight={1}>
          <Skeleton
            sx={{ height: "calc(100vh - 70px)" }}
            animation="wave"
            variant="rectangular"
          />
        </Grid>
        <Grid item xs={6}>
          <Skeleton
            sx={{ height: "calc(100vh - 70px)" }}
            animation="wave"
            variant="rectangular"
          />
        </Grid>
        <Grid item xs={3} paddingLeft={1}>
          <Skeleton
            sx={{ height: "calc(100vh - 70px)" }}
            animation="wave"
            variant="rectangular"
          />
        </Grid>
      </Grid>
    </PageSkeleton>
  );
};
