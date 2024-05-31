import {
  ClientError,
  authenticatedFetch,
  parseErrorBody,
} from "../utils/client";
import { User } from "../types";
import {
  BaseQueryFn,
  FetchArgs,
  createApi,
} from "@reduxjs/toolkit/query/react";
import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig } from "axios";
import Cookies from "universal-cookie";
import axiosRetry from "axios-retry";
import { TOKEN_HEADER } from "../constants";

const cookies = new Cookies();
const EXCLUDE_URLS = [
  "/api/auth/signin",
  "/api/auth/signup",
  "/api/auth/refresh_token",
];
axios.interceptors.response.use(
  async (res) => {
    if (res.config.url && EXCLUDE_URLS.includes(res.config.url)) {
      if (res.status === 200) cookies.set(TOKEN_HEADER, true, { path: "/" });
    }
    return res;
  },
  (error) => {
    if (error.config.url && EXCLUDE_URLS.includes(error.config.url)) {
      if (error.response.status === 403)
        cookies.set(TOKEN_HEADER, false, { path: "/" });
    }
  }
);

axiosRetry(axios, {
  retries: 2,
  retryDelay: (retryCount: number) => {
    return retryCount * 1000;
  },
  onRetry: async (_retryCount, _error, requestConfig) => {
    await authenticatedFetch(requestConfig);
  },
});
const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<string | FetchArgs, unknown, unknown> =>
  async (urlOrFetchArgs) => {
    try {
      const config: AxiosRequestConfig = {};
      config.withCredentials = true;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  tagTypes: ["credentials", "template","media_file","category","api_key"],
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
      providesTags: ["credentials"],
    }),
  }),
});

export const { useGetCurrentUserQuery } = storefontApi;
