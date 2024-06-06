import { TYPES } from "../constants";
import { getAndMergeModels } from "../../utils";
import { ComponentManager } from "grapesjs";

export const type = TYPES.column_2;

export const protectedCss = `
/* COLUMN 2 COMPONENT */
[data-gjs-type="${type}"]{
  display: table-cell;
  font-family: inherit;
  color: inherit;
  overflow: hidden;
  box-sizing: border-box;
}

td[data-gjs-type="${type}"][data-gs-type="column"]{
  vertical-align: top;
}
`;

export default function columnType(dc: ComponentManager, options: any) {
  const model = getAndMergeModels(dc, [TYPES.template, "gs-column"]);
  const defaults = model.defaults;

  defaults.icon = '<i class="gjs-badge__icon fa-kit fa-column"></i>';
  defaults.traits = [
    {
      label: "Width(%)",
      name: "width",
      type: "number",
      placeholder: "100",
      min: 1,
      step: 1,
      max: 100,
      changeProp: true,
    },
  ];
  defaults.attributes = {
    ...defaults?.attributes,
    "data-dm-category": "layout",
  };
  defaults.draggable = `[data-gs-type="columns"]`;
  defaults.droppable = `[data-gjs-type=${TYPES.qrcode}], [data-gjs-type=${TYPES.barcode}], [data-gjs-type=${TYPES.button}], [data-gjs-type=dm-text], [data-gjs-type=${TYPES.checkbox}], [data-gjs-type=${TYPES.text}], [data-gjs-type=${TYPES.token}], [data-gjs-type=${TYPES.image}], [data-gjs-type=${TYPES.row_2}], [data-gjs-type=${TYPES.dynamic_row}], [data-gjs-type=${TYPES.verticalSpacer}], [data-gjs-type=${TYPES.pageBreak}]`;
  defaults.stylable = [
    "padding",
    "break-inside",
    "vertical-align",
    "page-break-inside",
    "overflow",
    "font-family",
    "font-size",
    "font-style",
    "color",
    "font-weight",
    "text-align",

    "background-color",
    "background-image",
    "background-size",
    "background-position",
    "background-repeat",

    "better-borders",
    "border-width",
    "border-color",

    "border-radius",
    "border-top-left-radius",
    "border-top-right-radius",
    "border-bottom-left-radius",
    "border-bottom-right-radius",
  ];

  dc.addType(type, { extend: "gs-column", model });
}
