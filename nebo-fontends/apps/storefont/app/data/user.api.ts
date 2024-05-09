import { UserLoginRequest } from "app/types";
import { storefontApi, transformAxiosErrorResponse } from "./api";
import { toQueryString } from "app/utils/url";

const userApi = storefontApi.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation<UserLoginRequest>,
  }),
});

export const {} = templateApi;
