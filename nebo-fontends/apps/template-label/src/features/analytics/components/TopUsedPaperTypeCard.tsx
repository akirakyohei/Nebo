import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { TopUsedPaperType } from "../../../types";
interface Props {
  topUsedPaperTypes: TopUsedPaperType[];
}

export const TopUsedPaperTypeCard = ({ topUsedPaperTypes }: Props) => {
  return (
    <Card>
      <CardHeader title={"Top loại giấy sử dụng"} sx={{ paddingBottom: 0 }} />
      <CardContent>
        <Table>
          <TableHead>
            <TableRow sx={{ background: "#fafafb" }}>
              <TableCell>Loại giấy</TableCell>
              <TableCell align="right">Số lượng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topUsedPaperTypes.map((topUsedPaperType) => (
              <TableRow key={topUsedPaperType.paper_type.paper_type_id}>
                <TableCell>{topUsedPaperType.paper_type.name}</TableCell>
                <TableCell align="right">
                  {topUsedPaperType.total_used}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
