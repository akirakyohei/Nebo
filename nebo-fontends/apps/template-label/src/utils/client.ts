import axios, { AxiosRequestConfig } from "axios";
import { isArray } from "lodash-es";
export const client = axios.create();

export const authenticatedFetch = async (request: AxiosRequestConfig<any>) => {
  const result = await client.post("/api/auth/refresh_token", undefined, {
    withCredentials: true,
  });
  if (result.status === 403) {
    window.location.href = "/users/login";
  }
  return request;
};

export type ClientError = {
  status: number;
  data: ClientBodyError;
};
export type ClientBodyError = {
  format: "string" | "map" | "list";
  message: string;
  error?: { [name: string]: string };
  errors?: ErrorMessage[];
};

export type ErrorMessage = {
  message: string;
  fields: string[];
  code: string;
};

export function isClientError(e: any): e is ClientError {
  return (
    typeof e === "object" &&
    "data" in e &&
    typeof e["data"] === "object" &&
    "format" in e["data"]
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const parseErrorBody = (status: any, _data: any): ClientError => {
  let bodyError: ClientBodyError = {
    format: "string",
    message: "Có lỗi xảy ra",
  };
  try {
    if (status == 403) {
      bodyError = { format: "string", message: "Access denied" };
    } else if (status == 401) {
      bodyError = { format: "string", message: "UnAuthorized" };
    } else if (_data.errors && isArray(_data.errors)) {
      const firstKey = _data.errors[0].fields[0];
      const firstMessage = _data.errors[0].message;
      bodyError = {
        format: "list",
        errors: _data.errors,
        message: `${firstKey}: ${firstMessage}`,
      };
    } else if (_data.error) {
      const firstKey = Object.keys(_data.error)[0];
      const firstMessage = _data.error[firstKey];
      bodyError = {
        format: "map",
        error: _data.error,
        message: `${firstKey}: ${firstMessage}`,
      };
    }
  } catch (err) {}
  return {
    status,
    data: bodyError,
  };
};
