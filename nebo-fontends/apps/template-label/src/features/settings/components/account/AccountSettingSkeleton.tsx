import {
  Box,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { PageSkeleton } from "../../../../components/skeleton/PageSkeleton";
import { Loading } from "../../../../components/loading";

export const AccountSettingSkeleton = () => {
  return (
    <PageSkeleton contentSpacing={0}>
      <Loading />
      <Card>
        <CardContent>
          <Stack gap={3}>
            <Stack>
              <Box>
                <Skeleton />
              </Box>
              <Box flex={1}>
                <Grid display={"grid"} gridTemplateColumns={"30% auto"}>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems="center"
                  >
                    <Box
                      sx={{
                        position: "relative",
                        "&:hover": {
                          "&> div:not(:first-of-type)": {
                            display: "flex",
                          },
                        },
                      }}
                    >
                      <Skeleton
                        variant="circular"
                        width="100px"
                        height="100px"
                      />
                    </Box>
                  </Box>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Box>
            </Stack>
            <Stack>
              <Box>
                <Skeleton />
              </Box>
              <Box flex={1}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </PageSkeleton>
  );
};
