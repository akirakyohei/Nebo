import { storefontApi, transformAxiosErrorResponse } from "./api";
import {
  Category,
  ListResponse,
  CategoryByGroup,
  CategoryByGroupFilterRequest,
  CategoryFilterRequest,
} from "../types";
import { toQueryString } from "../utils/url";

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
    getCategoriesWithInfinite: builder.query<
      ListResponse<Category>,
      CategoryFilterRequest
    >({
      query: (q) => `/admin/products/search_vendors.json${toQueryString(q)}`,
      serializeQueryArgs: ({ queryArgs }) => {
        const { page, ...rest } = queryArgs;
        return rest;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (!arg.page || arg.page === 1) {
          return newItems;
        } else {
          currentCache.data.push(...newItems.data);
          currentCache.metadata = newItems.metadata;
          return currentCache;
        }
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
      transformResponse: (response: { categories: ListResponse<Category> }) =>
        response.categories,
    }),
  }),
});

export const { useGetCategoryByGroupQuery, useGetCategoriesWithInfiniteQuery } =
  categoryApi;
