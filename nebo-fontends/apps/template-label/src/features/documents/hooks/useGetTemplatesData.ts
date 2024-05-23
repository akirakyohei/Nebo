import { useGetCategoryByGroupQuery } from "../../../data/category.api";
import { useGetTemplatesQuery } from "../../../data/template.api";
import { Template } from "../../../types";
import { TemplateFilterRequestModel } from "../types";

export const useGetTemplatesData = (filter: TemplateFilterRequestModel) => {
  const {
    data: categoryByGroups = [],
    isLoading: isLoadingCategoryByGroup,
    isFetching: isFetchingCategoryByGroup,
  } = useGetCategoryByGroupQuery(
    { owner: true },
    {
      skip: !["brand", "default"].includes((filter?.tab as any) || "default"),
    }
  );

  const {
    data: templates = {
      data: [] as Template[],
      metadata: { total_element: 0, limit: filter.limit, page: 1 },
    },
    isLoading: isLoadingTemplate,
    isFetching: isFetchingTemplate,
  } = useGetTemplatesQuery({
    ...filter,
    owner: true,
  });

  const isLoading = isLoadingCategoryByGroup || isLoadingTemplate;
  const isFetching = isFetchingCategoryByGroup || isFetchingTemplate;
  return {
    categoryByGroups,
    templates,
    isLoading,
    isFetching,
  };
};
