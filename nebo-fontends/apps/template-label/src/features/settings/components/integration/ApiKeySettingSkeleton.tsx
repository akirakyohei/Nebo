import { Skeleton, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { PageSkeleton } from "../../../../components/skeleton/PageSkeleton";
import { Loading } from "../../../../components/loading";
import { range } from "lodash-es";

export const ApiKeySettingSkeleton = () => {
  return (
    <PageSkeleton contentSpacing={0}>
      <Loading />
      <Table>
        <TableBody>
          {range(0, 10).map((i) => (
            <TableRow key={i}>
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
              <TableCell>
                <Skeleton />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </PageSkeleton>
  );
};
