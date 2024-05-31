import { Page } from "../../components/Page";
import { KeyOutlined } from "@mui/icons-material";
import { useToggle } from "../../utils/useToggle";
import { ApiKeyTable } from "./components/integration/ApiKeyTable";
import { useGetApiKeysQuery } from "../../data/api_key.api";
import { ApiKeyFilterRequest } from "../../types";
import { useBaseFilter } from "../../utils/useBaseFilterQuery";
import { ApiKeyManageModal } from "./components/integration/ApiKeyManageModal";
import { Box } from "@mui/material";

export default function MediaFilePage() {
  const {
    value: isOpenUploadFile,
    setTrue: openUploadFile,
    setFalse: closeUploadFile,
  } = useToggle(false);

  const {
    filter,
    isFilter,
    onChangeSearchParams,
    onChangeSearchParamsAll,
    onRemoveSearchParams,
  } = useBaseFilter<ApiKeyFilterRequest>();
  const {
    data: apiKeys = {
      data: [
      ],
      metadata: {
        page: 1,
        limit: 20,
        total_element: 0,
      },
    },
    isLoading,
    isFetching,
  } = useGetApiKeysQuery({
    limit: filter.limit,
    page: filter.page,
  });

  return (
    <Page
      title="Tích hợp"
      fullHeight
      contentSpacing={0}
      primaryAction={{
        icon: <KeyOutlined />,
        content: "Tạo api",
        onAction: openUploadFile,
      }}
    >
      <Box sx={{ paddingLeft: 2, paddingRight: 2 }}>
        <ApiKeyTable apiKeys={apiKeys} />
        {isOpenUploadFile && (
          <ApiKeyManageModal open onClose={closeUploadFile} apiKeyId={0} />
        )}
      </Box>
    </Page>
  );
}
