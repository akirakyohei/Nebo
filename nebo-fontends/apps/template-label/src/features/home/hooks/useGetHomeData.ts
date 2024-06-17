import { defaultBlankTemplate } from "../../../constants";
import { useGetTemplatesQuery } from "../../../data/template.api";
import { Template } from "../../../types";

export const useGetHomeData = () => {
  const {
    data: templates = {
      data: [defaultBlankTemplate] as Template[],
      metadata: { total_element: 1, limit: 10, page: 1 },
    },
    isLoading: isLoading,
    isFetching: isFetching,
  } = useGetTemplatesQuery({
    limit: 10,
    owner: false,
  });

  return {
    templates,
    isLoading,
    isFetching,
  };
};
