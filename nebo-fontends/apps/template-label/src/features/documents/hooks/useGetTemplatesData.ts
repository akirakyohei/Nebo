import { useGetCategoryByGroupQuery } from "../../../data/category.api";
import { useGetTemplatesQuery } from "../../../data/template.api";
import { TemplateFilterRequestModel } from "../types";

export const useGetTemplatesData = (filter: TemplateFilterRequestModel) => {
  const {
    data: categoryByGroups = [],
    isLoading: isLoadingCategoryByGroup,
    isFetching: isFetchingCategoryByGroup,
  } = useGetCategoryByGroupQuery(
    { owner: filter?.tab === "brand" },
    {
      skip: !["brand", "default"].includes((filter?.tab as any) || "default"),
    }
  );

  const {
    data: templates = [],
    isLoading: isLoadingTemplate,
    isFetching: isFetchingTemplate,
  } = useGetTemplatesQuery({
    ...filter,
    owner: filter?.tab !== "brand",
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
