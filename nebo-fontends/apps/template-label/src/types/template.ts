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
  is_landscape: boolean;
  margin: MarginOption;
};

export type Template = {
  id: number;
  user_id: number;
  name: string;
  category_ids: number[];
  paper_id: number;
  assets: string[];
  components: any;
  css: string;
  styles: any;
  field_schema?: object;
  html: string;
  testData?: { [key: string]: string };
  is_active: boolean;
  is_trashed: boolean;
  options: TemplateOptions;
  thumbnail: FileDataUploadResponse;
  size: number;
  created_on: string;
  updated_on: string;
};

export type TemplateResponse = {
  template: Template;
};
export type TemplateFilterRequest = PageFilterRequest & {
  query?: string;
  category_ids?: number[];
  type?: string;
  owner?: boolean;
  is_active?: string;
  sort_direction?: string;
  sort_by?: string;
};

export type TemplateRequest = {
  name: string;
  category_ids: number[];
  paper_id: number;
  assets: string[];
  components: any;
  css: string;
  styles: any;
  field_schema?: object;
  html: string;
  testData?: { [key: string]: string };
  is_active: boolean;
  is_trashed: boolean;
  options: TemplateOptions;
  thumbnail: FileDataUploadResponse;
  size: number;
  created_on: string;
  updated_on: string;
};
