import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { ListResponse, Template } from "../../../../types";

import blankThumbImage from "src/assets/img/new-blank-template.png";
import { useNavigate } from "react-router";
import { humanFileSize } from "../../../../utils/base";

interface Props {
  templates: ListResponse<Template>;
}
export const RecentTemplateCard = ({ templates }: Props) => {
  if (templates.metadata.total_element === 0)
    return (
      <Card>
        <CardHeader title="Mẫu cập nhật gần đây" />
        <Box padding={3}>
          <Button variant="contained" href="/documents/templates?action=create">
            Bắt đầu tạo mẫu
          </Button>
        </Box>
      </Card>
    );

  return (
    <Card>
      <CardHeader title="Mẫu cập nhật gần đây" />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>Tên mẫu</TableCell>
            <TableCell>Các thành viên</TableCell>
            <TableCell>Kích thước</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {templates.data.map((template) => (
            <TableRow key={template.id}>
              <TableCell width={"50px"}>
                <Box
                  component="img"
                  width="40px"
                  height="40px"
                  src={
                    template?.thumbnail?.url
                      ? `/api/files/data/${template?.thumbnail?.url}`
                      : blankThumbImage
                  }
                  sx={(theme) => ({ boxShadow: theme.shadows[1] })}
                />
              </TableCell>
              <TableCell>
                <Button href={`/documents/templates/${template.id}/preview`}>
                  {template.name}
                </Button>
              </TableCell>
              <TableCell>
                {template.shared_status === "only_you"
                  ? "Chỉ mình bạn"
                  : template.shared_status === "allow_all"
                    ? "Mọi người có thể xem"
                    : "Một nhóm của bạn"}
              </TableCell>
              <TableCell>{`${humanFileSize(template.size).value.toFixed(2)} ${humanFileSize(template.size).unit}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
