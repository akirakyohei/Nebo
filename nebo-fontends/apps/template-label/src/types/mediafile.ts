import { PageFilterRequest } from "./common";

export type FileDataUpload = {
  id: number;
  file_name: string;
  key: string;
  extension: string;
  size: number;
  created_at: string;
  updated_at: string;
};

export type FileDataUploadRequest = {
  name: string;
  content_type: string;
  data: string;
};

export type FileDataUploadResponse = {
  name?: string;
  extension: string;
  url: string;
  updated_at: string;
};

export type FileDataFilterRequest = PageFilterRequest & {
  query?: string;
};
