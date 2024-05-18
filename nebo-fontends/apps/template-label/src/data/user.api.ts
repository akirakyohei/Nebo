import { UserCreateRequest, UserLoginRequest, UserToken } from "../types";
import { storefontApi, transformAxiosErrorResponse } from "./api";

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
    refreshToken: builder.query<UserToken, void>({
      query: () => {
        return {
          url: `/api/auth/refresh_token`,
          method: "POST",
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
    }),
  }),
});

export const {
  useSigninMutation,
  useSignupMutation,
  useRefreshTokenQuery,
  useLogoutMutation,
} = userApi;
