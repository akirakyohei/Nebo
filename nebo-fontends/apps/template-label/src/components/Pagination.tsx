import {
  MenuItem,
  Pagination as PaginationMUI,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { ChangeEvent, useMemo } from "react";

interface Props {
  total: number;
  page: number;
  limit: number;
  onChangePage: (value: number) => void;
  onChangePerPage: (value: number) => void;
}

export const Pagination = ({
  total,
  page,
  limit,
  onChangePage,
  onChangePerPage,
}: Props) => {
  const totalPage = useMemo(() => Math.ceil(total / limit), [limit, total]);

  const handleChangePage = (_event: ChangeEvent<unknown>, newPage: number) => {
    onChangePage(newPage);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent<number>) => {
    onChangePerPage(Number(event.target.value) || 20);
  };

  const options = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ];

  return (
    <Stack direction="row" gap={2}>
      <Select
        value={limit}
        onChange={handleChangeRowsPerPage}
        sx={{ "&> div": { paddingTop: 0, paddingBottom: 0 } }}
      >
        {options.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      <PaginationMUI
        count={totalPage}
        page={page}
        onChange={handleChangePage}
        shape="rounded"
        variant="outlined"
      />
    </Stack>
  );
};
