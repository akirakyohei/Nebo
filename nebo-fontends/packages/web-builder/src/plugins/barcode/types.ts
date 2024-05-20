import { ComponentDefinition } from "grapesjs";

export type BarcodeBlockOptions = {
  label: string;
  media?: string;
  category?: string;
  active?: boolean;
  select?: true;
  content: string | ComponentDefinition | (string | ComponentDefinition);
};

export type BarcodePluginOptions = {
  blocks: string[];
  script: string;
  api: string;
  blockBarcode: BarcodeBlockOptions;
  props: (
    a?: ComponentDefinition | (() => ComponentDefinition)
  ) => ComponentDefinition | (() => ComponentDefinition) | undefined;
  component: ComponentDefinition | (() => ComponentDefinition) | undefined;
  formatInfo: string;
};
