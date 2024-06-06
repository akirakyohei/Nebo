import { Grid, Skeleton, useMediaQuery } from "@mui/material";
import { CardSkeleton } from "../../../../components/skeleton/CardSkeleton";
import { PageSkeleton } from "../../../../components/skeleton/PageSkeleton";
import { Loading } from "../../../../components/loading";
import { range } from "lodash-es";
import { useTheme } from "@mui/material/styles";
import { useMemo } from "react";

export const CategorySkeleton = () => {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const xlUp = useMediaQuery(theme.breakpoints.up("xl"));
  const totalCard = useMemo(() => {
    if (xlUp) return 14;
    if (lgUp) return 10;
    if (mdUp) return 6;
    if (smUp) return 4;
    return 1;
  }, [xlUp, lgUp, mdUp, smUp]);
  return (
    <PageSkeleton>
      <Loading />
      <Skeleton height={45} />
      <Grid
        container
        display={"grid"}
        width={"100%"}
        gridTemplateColumns={{
          xs: "1fr",
          sm: "1fr 1fr",
          md: "1fr 1fr 1fr",
          lg: "1fr 1fr 1fr 1fr 1fr",
          xl: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
        }}
        justifyContent={"center"}
        columnGap={3}
        rowGap={3}
        padding={3}
      >
        {range(0, totalCard).map((i) => (
          <CardSkeleton key={i} />
        ))}
      </Grid>
    </PageSkeleton>
  );
};
