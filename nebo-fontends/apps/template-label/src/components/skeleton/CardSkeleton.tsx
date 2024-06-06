import { Box, Card, CardContent, Skeleton, Stack } from "@mui/material";

interface Props {
  width?: number;
}

export const CardSkeleton = ({ width }: Props) => {
  return (
    <Card sx={{ width: width }}>
      <CardContent>
        <Stack gap={1}>
          <Stack direction={"row"} gap={1}>
            <Skeleton
              width={50}
              height={50}
              sx={{ marginTop: 1 }}
              variant="circular"
            />

            <Box sx={{ flex: 1 }}>
              <Skeleton height={40} />
              <Skeleton />
            </Box>
          </Stack>
          <Skeleton />
          <Skeleton height={40} />
          <Skeleton />
          <Skeleton />
          <Skeleton height={40} />
          <Skeleton />
        </Stack>
      </CardContent>
    </Card>
  );
};
