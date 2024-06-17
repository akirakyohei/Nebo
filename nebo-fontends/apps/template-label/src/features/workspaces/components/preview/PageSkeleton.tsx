import { Box, Card, CardContent, Skeleton, Stack } from "@mui/material";

export const PageSkeleton = () => {
  return (
    <Card sx={{ width: "210mm", height: "297mm" }}>
      <CardContent>
        <Stack
          direction={"row"}
          gap={1}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Skeleton variant="rectangular" width={60} height={60} />
          <Box sx={{ flex: 1 }}>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </Box>
        </Stack>

        <Skeleton height={42} />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton height={42} />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton height={42} />
        <Skeleton />
        <Skeleton height={42} />
        <Skeleton />
        <Skeleton height={42} />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton height={42} />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton height={42} />
        <Skeleton />
        <Skeleton height={42} />
        <Skeleton />
        <Skeleton height={42} />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton height={42} />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton height={42} />
        <Skeleton />
        <Skeleton height={42} />
        <Skeleton />
        <Skeleton height={42} />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton height={42} />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton height={42} />
        <Skeleton />
        <Skeleton height={42} />
        <Skeleton />
      </CardContent>
    </Card>
  );
};
