import { Box, Skeleton, Stack } from "@mui/material";
import { range } from "lodash-es";

interface Props {
  line?: number;
  width?: number;
}

export const BodyTextSkeleton = ({ line = 4, width }: Props) => {
  return (
    <Box>
      <Stack gap={1}>
        {range(0, line).map((i) => (
          <Skeleton width={width} />
        ))}
      </Stack>
    </Box>
  );
};
