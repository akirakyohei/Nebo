export type FieldSchema = {
  type?: "string" | "object" | "array" | "any";
  properties?: { [key: string]: unknown };
  items?: FieldSchema[];
  required?: string[];
  [key: string]: unknown;
};

export type BarhandlesSchema = {
  _type: "string" | "object" | "array" | "any";
  _optional: boolean;
  [key: string]: unknown;
};
