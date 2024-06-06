import { useGetCategoriesQuery } from "../../../data/category.api";
import { CategoryFilterRequest, Category, ListResponse } from "../../../types";

export type Data = {
  data: ListResponse<Category>;
  isLoading?: boolean;
  isFetching?: boolean;
};

export const useGetCategoryData = (filter: CategoryFilterRequest): Data => {
  const {
    data: fileMetadatas = {
      data: [],
      metadata: { total_element: 0, page: 1, limit: filter.limit || 20 },
    } as ListResponse<Category>,
    isLoading,
    isFetching,
  } = useGetCategoriesQuery({ ...filter, limit: filter.limit || 20 });

  return {
    isLoading,
    isFetching,
    data: fileMetadatas,
  };
};
