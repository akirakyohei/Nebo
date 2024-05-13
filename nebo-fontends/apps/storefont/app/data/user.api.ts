import {
  User,
  UserCreateRequest,
  UserLoginRequest,
  UserToken,
} from "app/types";
import { storefontApi, transformAxiosErrorResponse } from "./api";

const userApi = storefontApi.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation<UserToken, UserLoginRequest>({
      query: (q) => {
        return {
          url: `/api/auth/signin`,
          method: "POST",
          data: { user: q },
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
          data: { user: q },
        };
      },
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (response: { user_token: UserToken }) =>
        response.user_token,
    }),
    refreshToken: builder.mutation<UserToken, void>({
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
  useRefreshTokenMutation,
  useLogoutMutation,
} = userApi;
