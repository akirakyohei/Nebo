import {
  FileDataFilterRequest,
  FileDataUpload,
  FileDataUploadRequest,
  ListResponse,
} from "../types";
import { toQueryString } from "../utils/url";
import { storefontApi, transformAxiosErrorResponse } from "./api";

const mediafileApi = storefontApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<FileDataUpload, FileDataUploadRequest>({
      query: (q) => {
        return { url: `/api/files`, method: "POST", body: { file: q } };
      },
      transformResponse: (response: { file: FileDataUpload }) => response.file,
      transformErrorResponse: transformAxiosErrorResponse,
      invalidatesTags: (result, _error) => (result ? ["media_file"] : []),
    }),
    getMetadatas: builder.query<
      ListResponse<FileDataUpload>,
      FileDataFilterRequest
    >({
      query: (q) => `/api/files/metadata${toQueryString(q)}`,
      transformResponse: (response: { files: ListResponse<FileDataUpload> }) =>
        response.files,
      transformErrorResponse: transformAxiosErrorResponse,
      providesTags: (result, _error) => (result ? ["media_file"] : []),
    }),
    getAssetsWithInfinite: builder.query<
      ListResponse<FileDataUpload>,
      FileDataFilterRequest
    >({
      query: (q) => `/api/files/metadata${toQueryString(q)}`,
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
      transformResponse: (response: { files: ListResponse<FileDataUpload> }) =>
        response.files,
      providesTags: (result, _error) => (result ? ["media_file"] : []),
    }),
    getMetadata: builder.query<FileDataUpload, number>({
      query: (q) => `/api/files/${q}`,
      transformResponse: (response: { file: FileDataUpload }) => response.file,
      transformErrorResponse: transformAxiosErrorResponse,
      providesTags: (result, _error) => (result ? ["media_file"] : []),
    }),
    deleteFile: builder.mutation<void, number>({
      query: (q) => {
        return { url: `/api/files/${q}`, method: "DELETE" };
      },
      transformErrorResponse: transformAxiosErrorResponse,
      invalidatesTags: (_result, _error) => (!_error ? ["media_file"] : []),
    }),
  }),
});

export const {
  useUploadFileMutation,
  useGetMetadataQuery,
  useGetMetadatasQuery,
  useDeleteFileMutation,
  useGetAssetsWithInfiniteQuery,
} = mediafileApi;
