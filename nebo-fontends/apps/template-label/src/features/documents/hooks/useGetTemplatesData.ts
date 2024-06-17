import { defaultBlankTemplate } from "../../../constants";
import { useGetTemplatesQuery } from "../../../data/template.api";
import { useEvaluateTemplateUserPermissionsQuery } from "../../../data/template_permission.api";
import { useGetUsersQuery } from "../../../data/user.api";
import { Template } from "../../../types";
import { TemplateFilterRequestModel } from "../types";

export const useGetTemplatesData = (filter: TemplateFilterRequestModel) => {
  const {
    data: templates = {
      data: [defaultBlankTemplate] as Template[],
      metadata: { total_element: 1, limit: filter.limit || 20, page: 1 },
    },
    isLoading: isLoadingTemplate,
    isFetching: isFetchingTemplate,
  } = useGetTemplatesQuery({
    ...filter,
    limit: filter.limit || 20,
    owner: true,
    shared: filter.tab === "shared",
  });

  const templateIds = templates.data.map((a) => a.id);

  const {
    data: templateUserPermissions = [],
    isLoading: isLoadingTemplateUserPermissions,
    isFetching: isFetchingTemplateUserPermissions,
  } = useEvaluateTemplateUserPermissionsQuery(templateIds, {
    skip: filter.tab !== "shared" || templateIds.length === 0,
  });

  const userIds = templates.data.map((a) => a.user_id);
  const {
    data: users,
    isLoading: isLoadingUser,
    isFetching: isFetchingUser,
  } = useGetUsersQuery(
    { ids: userIds, limit: 250, page: 1 },
    { skip: userIds.length === 0 || filter.tab !== "shared" }
  );

  const isLoading =
    isLoadingTemplate || isLoadingTemplateUserPermissions || isLoadingUser;
  const isFetching =
    isFetchingTemplate || isFetchingTemplateUserPermissions || isFetchingUser;
  return {
    users: users?.data || [],
    templates,
    templateUserPermissions,
    isLoading,
    isFetching,
  };
};
