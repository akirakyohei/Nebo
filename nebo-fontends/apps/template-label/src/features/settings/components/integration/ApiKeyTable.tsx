import {
  Box,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { ApiKey, ListResponse } from "../../../../types";
import { Delete, DeleteOutline } from "@mui/icons-material";
import { useDeleteApiKeyMutation } from "../../../../data/api_key.api";
import { useToggle } from "../../../../utils/useToggle";
import { useToast } from "../../../../components/notification/useToast";
import { isClientError } from "../../../../utils/client";
import Modal from "../../../../components/Modal";
import { ApiKeyManageModal } from "./ApiKeyManageModal";

interface Props {
  apiKeys: ListResponse<ApiKey>;
}

export const ApiKeyTable = ({ apiKeys }: Props) => {
  return (
    <Box>
      <Table>
        <TableBody>
          {apiKeys.data.map((apiKey, index) => (
            <ApiKeyRow key={index} apiKey={apiKey} />
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

interface ApiKeyRowProps {
  apiKey: ApiKey;
}

const ApiKeyRow = ({ apiKey }: ApiKeyRowProps) => {
  const { show: showToast } = useToast();
  const {
    value: isOpenEditApiKey,
    setTrue: openEditApiKey,
    setFalse: closeEditApiKey,
  } = useToggle(false);
  const {
    value: isOpenConfirmDelete,
    setTrue: openConfirmDelete,
    setFalse: closeConfirmDelete,
  } = useToggle(false);

  const [deleteApiKey, { isLoading: isLoadingDelete }] =
    useDeleteApiKeyMutation();

  const submit = async () => {
    try {
      const result = await deleteApiKey(apiKey.id).unwrap();
      showToast("Xóa api key thành công");
      closeConfirmDelete();
    } catch (ex) {
      if (isClientError(ex)) {
        let error = ex.data.message;
        if (/Email already existed/.test(error)) error = "Email đã tồn tại";
        if (/Phone number already existed/.test(error))
          error = "Số điện thoại đã tồn tại";
        showToast(error, { variant: "error" });
      }
    }
  };

  return (
    <>
      <TableRow
        sx={(theme) => ({
          "&:hover": {
            background: "#E6F9FF",
          },
        })}
      >
        <TableCell onClick={openEditApiKey}>
          <Stack direction={"row"} gap={2}>
            <Box
              sx={(theme) => ({
                border: `1px solid ${theme.palette.grey[300]}`,
                background: theme.palette.grey[100],
                color: theme.palette.grey[500],
                paddingLeft: 1,
                paddingRight: 1,
                borderRadius: "5px",
              })}
            >
              <Typography component={"span"} sx={{ height: "30px" }} flex={1}>
                {apiKey.prefix}...
              </Typography>
            </Box>
            <Typography>{apiKey.name}</Typography>
          </Stack>
        </TableCell>
        <TableCell width={"100px"} align="right">
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              openConfirmDelete();
            }}
          >
            <DeleteOutline />
          </IconButton>
        </TableCell>
      </TableRow>
      {isOpenEditApiKey && (
        <ApiKeyManageModal
          open
          onClose={closeEditApiKey}
          apiKeyId={apiKey.id}
        />
      )}
      {isOpenConfirmDelete && (
        <Modal
          open
          onClose={closeConfirmDelete}
          title="Xóa Api Key"
          primaryAction={{
            content: "Xóa",
            loading: isLoadingDelete,
            onAction: submit,
            color: "error",
          }}
          secondaryActions={[
            {
              content: "Hủy",
              disabled: isLoadingDelete,
              onAction: closeConfirmDelete,
              color: "error",
            },
          ]}
        >
          <Modal.Section>
            <Typography>
              Thao tác này sẽ xóa, không thể tiếp tục sử dụng khóa này.
            </Typography>
          </Modal.Section>
        </Modal>
      )}
    </>
  );
};
