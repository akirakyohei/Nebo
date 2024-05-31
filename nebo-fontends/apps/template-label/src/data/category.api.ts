import { storefontApi, transformAxiosErrorResponse } from "./api";
import {
  Category,
  ListResponse,
  CategoryByGroup,
  CategoryByGroupFilterRequest,
  CategoryFilterRequest,
  CategoryRequest,
} from "../types";
import { toQueryString } from "../utils/url";

const categoryApi = storefontApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation<Category, CategoryRequest>({
      query: (q) => {
        return {
          url: `/api/categories`,
          method: "POST",
          body: { category: q },
        };
      },
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (response: { category: Category }) =>
        response.category,
      invalidatesTags: (result, _error) => (result ? ["category"] : []),
    }),
    updateCategory: builder.mutation<
      Category,
      { id: number; request: CategoryRequest }
    >({
      query: (q) => {
        return {
          url: `/api/categories/${q.id}`,
          method: "PUT",
          body: { category: q.request },
        };
      },
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (response: { category: Category }) =>
        response.category,
      invalidatesTags: (result, _error) => (result ? ["category"] : []),
    }),
    getCategoryByGroup: builder.query<
      CategoryByGroup[],
      CategoryByGroupFilterRequest
    >({
      query: (q) => `/api/categories/by_groups${!q.owner ? "/default" : ""}`,
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (res: { category_by_groups: CategoryByGroup[] }) =>
        res.category_by_groups,
    }),
    getCategoriesWithInfinite: builder.query<
      ListResponse<Category>,
      CategoryFilterRequest
    >({
      query: (q) => `/api/categories${toQueryString(q)}`,
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
    deleteCategory: builder.mutation<void, number>({
      query: (q) => {
        return {
          url: `/api/categories/${q}`,
          method: "DELETE",
        };
      },
      transformErrorResponse: transformAxiosErrorResponse,
      invalidatesTags: (_result, _error) => (!_error ? ["category"] : []),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryByGroupQuery,
  useGetCategoriesWithInfiniteQuery,
} = categoryApi;
