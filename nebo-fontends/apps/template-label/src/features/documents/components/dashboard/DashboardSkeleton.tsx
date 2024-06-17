import { Card, CardContent, Grid, Skeleton, Stack } from "@mui/material";
import { PageSkeleton } from "../../../../components/skeleton/PageSkeleton";

export const DashboardSkeleton = () => {
  return (
    <PageSkeleton contentSpacing={0}>
      <Stack gap={4}>
        <Grid width="100%">
          <Grid
            container
            width={"100%"}
            display={"grid"}
            gridTemplateColumns={{ md: "1fr 1fr 1fr", sm: "1fr" }}
            columnGap={4}
            rowGap={1}
            sx={{ background: "transparent", height: 150 }}
          >
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </Grid>
        </Grid>
        <Grid
          flex={"1 1 auto"}
          display={"grid"}
          width={"100%"}
          //   gridTemplateColumns={{ md: "1fr 1fr", sm: "1fr" }}
          rowGap={4}
          columnGap={4}
        >
          <Card>
            <CardContent>
              <Skeleton height={40} variant="text" />
              <Skeleton height={150} />
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Skeleton height={40} variant="text" />
              <Skeleton height={150} />
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Skeleton height={40} variant="text" />
              <Skeleton height={150} />
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Skeleton height={40} variant="text" />
              <Skeleton height={150} />
            </CardContent>
          </Card>
        </Grid>
      </Stack>
    </PageSkeleton>
  );
};
