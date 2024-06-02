import { ComponentDefinition } from "grapesjs";

export type QrcodeBlockOptions = {
  label: string;
  media?: string;
  category?: string;
  active?: boolean;
  select?: true;
  content: string | ComponentDefinition | (string | ComponentDefinition);
};

export type QrcodePluginOptions = {
  blocks: string[];
  script: string;
  api: string;
  blockQrcode: QrcodeBlockOptions;
  props: (
    a?: ComponentDefinition | (() => ComponentDefinition)
  ) => ComponentDefinition | (() => ComponentDefinition) | undefined;
  component: ComponentDefinition | (() => ComponentDefinition) | undefined;
};
