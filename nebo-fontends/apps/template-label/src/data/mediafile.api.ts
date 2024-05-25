import { FileDataUpload, FileDataUploadRequest } from "src/types";
import { storefontApi, transformAxiosErrorResponse } from "./api";

const mediafileApi = storefontApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<FileDataUpload, FileDataUploadRequest>({
      query: (q) => {
        return { url: `/api/files`, method: "POST", body: { file: q } };
      },
      transformResponse: (response: { file: FileDataUpload }) => response.file,
      transformErrorResponse: transformAxiosErrorResponse,
    }),
    getMetadata: builder.query<FileDataUpload, number>({
      query: (q) => `/api/files/${q}`,
      transformResponse: (response: { file: FileDataUpload }) => response.file,
      transformErrorResponse: transformAxiosErrorResponse,
    }),
    deleteFile: builder.mutation<void, number>({
      query: (q) => {
        return { url: `/api/files/${q}`, method: "DELETE" };
      },
      transformErrorResponse: transformAxiosErrorResponse,
    }),
  }),
});

export const {
  useUploadFileMutation,
  useGetMetadataQuery,
  useDeleteFileMutation,
} = mediafileApi;
