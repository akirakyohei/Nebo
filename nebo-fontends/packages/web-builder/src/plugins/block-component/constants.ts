export const componentTypes = {
  template: "dm-template",
  divider: "dm-divider",
  text: "dm-text",
  image: "dm-image",
  column: "dm-column",
  row: "dm-row",
  section: "dm-section",
  pageBreak: "dm-page-break",
  verticalSpacer: "dm-vertical-spacer",
};

export const componentUpdateActions = {
  addComponent: "add-component",
  removeComponent: "remove-component",
  cloneComponent: "clone-component",
  moveComponent: "move-component",
};

export const BLOCK_CATEGORIES = {
  layout: "Layout",
  content: "Content",
};

const consts = { componentTypes, componentUpdateActions, BLOCK_CATEGORIES };

export default consts;
