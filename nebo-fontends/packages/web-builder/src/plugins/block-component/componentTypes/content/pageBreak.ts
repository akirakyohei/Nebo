import { ComponentManager, Editor } from "grapesjs";
import { TYPES } from "../constants";

export const type = TYPES.pageBreak;

export const protectedCss = `
  /* PAGE BREAK COMPONENT */
  [data-gjs-type="${type}"]{
    page-break-after:always;
    position:relative;
  }
`;

export default function pageBreakType(
  dc: ComponentManager,
  { editor }: { editor: Editor }
) {
  const model = {
    defaults: {
      name: "Page Break",
      icon: '<i class="gjs-badge__icon fa-kit fa-dm-page-break-2"></i>',
      tagName: "div",
      selectable: true,
      attributes: { "data-dm-category": "content" },
      draggable: `[data-gjs-type="wrapper"], [data-gjs-type=gjs-columns], [data-gjs-type=${TYPES.column}], [data-gjs-type=${TYPES.gridItem}], [data-gjs-type=${TYPES.column_2}]`,
      droppable: false,
      resizable: false,
      stylable: [],
      traits: [],
    },
  };

  dc.addType(type, { extend: TYPES.template, model });
}
