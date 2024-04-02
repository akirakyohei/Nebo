import { CategoryByGroup, CategoryByGroupFilterRequest } from "app/types";
import { storefontApi, transformAxiosErrorResponse } from "./api";

const categoryApi = storefontApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategoryByGroup: builder.query<
      CategoryByGroup[],
      CategoryByGroupFilterRequest
    >({
      query: (q) =>
        `/api/categories/by_groups${!q.owner ? "/default" : undefined}`,
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (res: { category_by_groups: CategoryByGroup[] }) =>
        res.category_by_groups,
    }),
  }),
});

export const { useGetCategoryByGroupQuery } = categoryApi;
