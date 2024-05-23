import { TemplateFilterRequest } from "../../types";

export type TabType = "default" | "brand" | "shared" | "person";

export type TemplateFilterRequestModel = Omit<
  TemplateFilterRequest,
  "owner"
> & {
  tab?: "shared" | "person";
};
