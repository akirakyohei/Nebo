import { TopUsedTemplate } from "../../../types";
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
import { range } from "lodash";

interface Props {
  topUsedTemplates: TopUsedTemplate[];
}

export const TopUsedTemplateCard = ({ topUsedTemplates }: Props) => {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardHeader title={"Top mẫu sử dụng"} sx={{ paddingBottom: 0 }} />
      <CardContent sx={{ flex: "1 1 auto" }}>
        <Table sx={{ height: "100%" }}>
          <TableHead>
            <TableRow sx={{ background: "#fafafb" }}>
              <TableCell>Loại giấy</TableCell>
              <TableCell align="right">Số lượng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topUsedTemplates.map((topUsedTemplate) => (
              <TableRow key={topUsedTemplate.template.template_id}>
                <TableCell>{topUsedTemplate.template.name}</TableCell>
                <TableCell align="right">
                  {topUsedTemplate.total_used}
                </TableCell>
              </TableRow>
            ))}
            {range(0, 10 - topUsedTemplates.length).map((i) => (
              <TableRow key={i}>
                <TableCell> ---</TableCell>
                <TableCell align="right">---</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
