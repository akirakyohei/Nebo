import { ClientError, parseErrorBody } from "../utils/client";
import { User } from "../types";
import {
  BaseQueryFn,
  FetchArgs,
  createApi,
} from "@reduxjs/toolkit/query/react";
import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig } from "axios";

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<string | FetchArgs, unknown, unknown> =>
  async (urlOrFetchArgs) => {
    try {
      const config: AxiosRequestConfig = {};
      if (isFetchArgs(urlOrFetchArgs)) {
        config.url = urlOrFetchArgs.url;
        config.method = urlOrFetchArgs.method;
        config.data = urlOrFetchArgs.body;
        config.params = urlOrFetchArgs.params;
        config.headers = urlOrFetchArgs.headers as AxiosHeaders;
      } else {
        config.url = baseUrl + urlOrFetchArgs;
      }
      const result = await axios(config);
      return { data: result.data, meta: { headers: result.headers } };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

function isFetchArgs(arg: string | FetchArgs): arg is FetchArgs {
  return typeof arg === "object";
}

type AxiosResponseError = { status: number; data: any };

export function isAxiosErrorResponse(e: unknown): e is AxiosResponseError {
  return !!e && typeof e === "object" && "status" in e && "data" in e;
}

export function transformAxiosErrorResponse({
  status,
  data,
}: AxiosResponseError): ClientError {
  return parseErrorBody(status, data);
}

export const storefontApi = createApi({
  reducerPath: "storefontApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getCurrentUser: builder.query<User, void>({
      query: () => {
        return {
          url: `/api/users/current_user`,
          method: "GET",
        };
      },
      transformErrorResponse: transformAxiosErrorResponse,
      transformResponse: (response: { user: User }) => response.user,
    }),
  }),
});

export const { useGetCurrentUserQuery } = storefontApi;
