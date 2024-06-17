import { Box, Grid, Stack } from "@mui/material";
import {
  EvaluateTemplatePermission,
  ListResponse,
  Template,
  User,
} from "../../../../types";
import { FilterQueryResult } from "../../../../utils/useBaseFilterQuery";
import { TemplateFilterRequestModel } from "../../types";
import { Masonry } from "@mui/lab";
import { TemplateCard } from "./TemplateCard";
import { defaultBlankTemplate } from "../../../../constants";
import { Pagination } from "../../../../components/Pagination";
import { EmptyStateImage } from "../../../../components/EmptyStatePage";

interface Props {
  mode?: "list" | "icons";
  templates: ListResponse<Template>;
  users: User[];
  templateUserPermissions: EvaluateTemplatePermission[];
  filter?: FilterQueryResult<TemplateFilterRequestModel>["filter"];
  onChangeSearchParams: FilterQueryResult<TemplateFilterRequestModel>["onChangeSearchParams"];
  onChangeSearchParamsAll: FilterQueryResult<TemplateFilterRequestModel>["onChangeSearchParamsAll"];
}

export const TemplateTable = ({
  users,
  templates,
  templateUserPermissions,
  mode = "icons",
  filter,
  onChangeSearchParams,
  onChangeSearchParamsAll,
}: Props) => {
  if (templates.metadata.total_element === 0)
    return (
      <Grid container>
        <EmptyStateImage
          title="Không tim thấy kết quả nào"
          description="Hãy thử với tìm kiếm khác"
          secondaryActions={[
            {
              content: "Tìm kiếm tất cả",
              url: "/documents/templates",
            },
          ]}
        />
      </Grid>
    );

  if (mode === "icons") {
    return (
      <Box maxWidth={"100%"}>
        <Grid
          container
          display={"grid"}
          width={"100%"}
          gridTemplateColumns={{
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
            lg: "1fr 1fr 1fr 1fr ",
          }}
          justifyContent={"center"}
          columnGap={3}
          rowGap={3}
          padding={3}
        >
          {templates.data.map((template, index) => {
            const hasWritePermission =
              filter?.tab !== "shared"
                ? true
                : templateUserPermissions
                    .find((a) => a.template_id === template.id)
                    ?.permissions.includes("write");
            const user = users.find((a) => a.id === template.user_id);
            return (
              <TemplateCard
                user={user}
                key={index}
                shared={filter?.tab === "shared"}
                writePermission={hasWritePermission}
                template={template}
              />
            );
          })}
        </Grid>

        <Stack width={"100%"} justifyContent="center" direction="row">
          <Pagination
            total={templates.metadata.total_element}
            page={templates.metadata.page}
            limit={filter?.limit || 20}
            onChangePage={(value) => {
              onChangeSearchParams("page", value);
            }}
            onChangePerPage={(value) => {
              onChangeSearchParamsAll({ page: 1, limit: value });
            }}
          />
        </Stack>
      </Box>
    );
  }
};
