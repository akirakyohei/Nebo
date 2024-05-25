import { NumberLiteralType } from "typescript";
import { ListResponse, PageFilterRequest } from "./common";

export type HistorySession = {
  id: number;
  ip_address: string;
  user_agent: string;
  created_on: string;
};

export type HistorySessionFilterRequest = PageFilterRequest & {};

export type AggregateReport = {
  total_data: number;
  total_template: number;
  total_used_template: number;
};

export type ReportPaperType = {
  paper_type_id: number;
  name: string;
  width: number | null;
  height: number | null;
  unit_of_width: string | null;
  unit_of_height: string | null;
  description: string | null;
};

export type ReportTemplate = {
  template_id: number;
  name: string;
  created_on: string;
  updated_on: string;
};

export type TopUsedPaperType = {
  total_used: number;
  paper_type: ReportPaperType;
};

export type TopUsedTemplate = {
  total_used: number;
  template: ReportTemplate;
};

export type UsedPaperType = {
  total_used: number;
  date: string;
};

export type UsedPaperTypes = ListResponse<UsedPaperType> & {
  aggregate: number;
};

export type UsedTemplate = {
  total_used: number;
  date: string;
};

export type UsedTemplates = ListResponse<UsedTemplate> & {
  aggregate: number;
};

export type TimeRequest = {
  unit?: "hour" | "day" | "month" | "year";
  from_date?: string;
  to_date?: string;
};

export type TopTimeRequest = TimeRequest & {
  top?: number;
};

export type TimeFileRequest = TimeRequest & PageFilterRequest & {};
