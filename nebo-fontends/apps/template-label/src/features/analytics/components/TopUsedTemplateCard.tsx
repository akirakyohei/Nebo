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

interface Props {
  topUsedTemplates: TopUsedTemplate[];
}

export const TopUsedTemplateCard = ({ topUsedTemplates }: Props) => {
  return (
    <Card>
      <Card>
        <CardHeader title={"Top mẫu sử dụng"} sx={{ paddingBottom: 0 }} />
        <CardContent>
          <Table>
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
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Card>
  );
};
