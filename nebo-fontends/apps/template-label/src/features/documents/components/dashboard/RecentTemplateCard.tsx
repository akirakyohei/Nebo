import {
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { ListResponse, Template } from "../../../../types";

interface Props {
  templates: ListResponse<Template>;
}
export const RecentTemplateCard = ({ templates }: Props) => {
  return (
    <Card>
      <CardHeader title="Mẫu cập nhật gần đây" />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tên mẫu</TableCell>
            <TableCell>Các thành viên</TableCell>
            <TableCell>Kích thước</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {templates.data.map((template) => (
            <TableRow key={template.id}>
              <TableCell>{template.name}</TableCell>
              <TableCell>{template.shared_status}</TableCell>
              <TableCell>{template.size}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
