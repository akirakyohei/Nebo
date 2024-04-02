import { TemplateFilterRequest } from "app/types";

export type TabType = "default" | "brand" | "shared" | "person";

export type TemplateFilterRequestModel = Omit<
  TemplateFilterRequest,
  "owner"
> & {
  tab?: "brand" | "shared" | "person";
};
