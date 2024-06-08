import { defaultBlankTemplate } from "../../../constants";
import { useGetTemplatesQuery } from "../../../data/template.api";
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

  const isLoading = isLoadingTemplate;
  const isFetching = isFetchingTemplate;
  return {
    templates,
    isLoading,
    isFetching,
  };
};
