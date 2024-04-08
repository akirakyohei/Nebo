import { PageFilterRequest } from "./common";

export type Template = {
  id: number;
  name: string;
  width: number;
  height: number;
  data: any;
  category_ids: number[];
  params?: object;
  size: number;
  createdOn: string;
  updatedOn: string;
};

export type TemplateResponse = {
  template: Template;
};
export type TemplateFilterRequest = PageFilterRequest & {
  query?: string;
  category_ids?: number[];
  type?: string;
  owner?: boolean;
};

export type TemplateRequest = {
  name: string;
  width: number;
  height: number;
  data: object;
  category_ids: number[];
  params?: object;
};
