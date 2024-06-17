import {
  User,
  UserChangePasswordRequest,
  UserCreateRequest,
  UserLoginRequest,
  UserToken,
  UserUpdateRequest,
  ListResponse,
  UserFilterRequest,
  UserWithUserPermission,
  TemplateUserPermission,
} from "../types";
import { storefontApi, transformAxiosErrorResponse } from "./api";
import { toQueryString } from "../utils/url";
import { client } from "../utils/client";
import Cookies from "universal-cookie";
export const userApi = storefontApi.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation<UserToken, UserLoginRequest>({
      query: (q) => {
        return {
          url: `/api/auth/signin`,
          method: "POST",
          body: { user: q },
          credentials: "include",
        };
      },
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (response: { user_token: UserToken }) =>
        response.user_token,
    }),
    signup: builder.mutation<UserToken, UserCreateRequest>({
      query: (q) => {
        return {
          url: `/api/auth/signup`,
          method: "POST",
          body: { user: q },
        };
      },
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (response: { user_token: UserToken }) =>
        response.user_token,
    }),
    logout: builder.mutation<void, void>({
      query: () => {
        return {
          url: `/api/auth/logout`,
          method: "POST",
        };
      },
      transformErrorResponse: transformAxiosErrorResponse,
      invalidatesTags: ["credentials"],
    }),
    updateAccount: builder.mutation<User, UserUpdateRequest>({
      query: (q) => {
        return {
          url: `/api/users/current_user`,
          method: "POST",
          body: { user: q },
        };
      },
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (response: { user: User }) => response.user,
      invalidatesTags: (result, _error) =>
        result ? ["user", "credentials"] : [],
    }),
    changePassword: builder.mutation<User, UserChangePasswordRequest>({
      query: (q) => {
        return {
          url: `/api/users/change_password`,
          method: "POST",
          body: { user: q },
        };
      },
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (response: { user: User }) => response.user,
      invalidatesTags: (result, _error) =>
        result ? ["user", "credentials"] : [],
    }),
    getUsers: builder.query<ListResponse<User>, UserFilterRequest>({
      query: (q) => `/api/users${toQueryString(q)}`,
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (res: { users: ListResponse<User> }) => res.users,
      providesTags: (result, _error) => (result ? ["user"] : []),
    }),
    getUsersWithInfinite: builder.query<ListResponse<User>, UserFilterRequest>({
      query: (q) => `/api/users${toQueryString(q)}`,
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
      transformResponse: (response: { users: ListResponse<User> }) =>
        response.users,
      providesTags: (result, _error) => (result ? ["user"] : []),
    }),
    getUsersWithUserPermissionWithInfinite: builder.query<
      ListResponse<UserWithUserPermission>,
      UserFilterRequest & {
        templateId: number;
      }
    >({
      queryFn: async (arg, _baseApi, _extraOptions, _baseQuery) => {
        const {
          data: { users },
        } = await client.request<{ users: ListResponse<User> }>({
          url: `/api/users${toQueryString(arg)}`,
        });

        const sharedUserIds = users.data.map((user) => user.id);

        const {
          data: { template_user_permissions },
        } = await client.request<{
          template_user_permissions: ListResponse<TemplateUserPermission>;
        }>({
          url: `/api/templates/${arg.templateId}/permissions${toQueryString({ limit: 250, page: 1, shared_user_ids: sharedUserIds })}`,
        });
        const data: UserWithUserPermission[] = users.data.map((user) => {
          const userPermission = template_user_permissions.data.find(
            (a) => a.shared_user_id === user.id
          );
          return { ...user, user_permission: userPermission };
        });
        return { data: { data: data, metadata: users.metadata } };
      },
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
      providesTags: (result, _error) => (result ? ["user"] : []),
    }),
  }),
});

export const {
  useSigninMutation,
  useSignupMutation,
  useLogoutMutation,
  useUpdateAccountMutation,
  useChangePasswordMutation,
  useGetUsersQuery,
  useGetUsersWithInfiniteQuery,
  useGetUsersWithUserPermissionWithInfiniteQuery,
} = userApi;
