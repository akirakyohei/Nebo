import { PageFilterRequest } from "./common";
import { FileDataUploadResponse } from "./mediafile";

export type MarginOption = {
  bottom: string;
  left: string;
  right: string;
  top: string;
};

export type TemplateOptions = {
  format: string;
  height: string;
  width: string;
  landscape: boolean;
  margin: MarginOption;
};

export type Template = {
  id: number;
  user_id: number;
  name: string;
  category_ids: number[];
  paper_type_id: number;
  assets: string[];
  components: any;
  css: string;
  styles: any;
  field_schema?: object;
  html: string;
  testData?: { [key: string]: string };
  shared_status?: string;
  active: boolean;
  trashed: boolean;
  options: TemplateOptions;
  thumbnail: FileDataUploadResponse | null;
  size: number;
  created_at: string;
  updated_at: string;
};

export type TemplateResponse = {
  template: Template;
};
export type TemplateFilterRequest = PageFilterRequest & {
  query?: string;
  category_ids?: number[];
  type?: string;
  owner?: boolean;
  active?: string;
  shared?: boolean;
  sort_direction?: string;
  sort_by?: string;
};

export type TemplateRequest = {
  name: string;
  category_ids: number[];
  paper_type_id: number;
  assets: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components: any;
  css: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  styles: any;
  field_schema?: object;
  html: string;
  test_data?: { [key: string]: string };
  active: boolean;
  trashed: boolean;
  options: TemplateOptions;
};
