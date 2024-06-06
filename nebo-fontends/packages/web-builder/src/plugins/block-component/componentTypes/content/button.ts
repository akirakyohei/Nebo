import { TYPES } from "../constants";
import { getAndMergeModels } from "../../utils";
import { resizerNone } from "../sharedConfig";
import { move, logic, parent, clone, remove } from "../../config/toolbarIterms";
import { ComponentManager } from "grapesjs";

export const type = TYPES.button;

export const protectedCss = `
  /* BUTTON COMPONENT */
  *[data-gjs-type="${type}"] {
    display: table;
    border-collapse: separate;
    page-break-inside: avoid;
    box-sizing: border-box;
    text-decoration: none;
  }
`;

export default function buttonType(dc: ComponentManager) {
  const model = getAndMergeModels(dc, [TYPES.template, TYPES.link]);
  const defaults = model.defaults;

  const draggableBlock = `[data-gjs-type=wrapper], [data-gjs-type=gs-columns], [data-gjs-type=${TYPES.column}], [data-gjs-type=${TYPES.gridItem}], [data-gjs-type=${TYPES.column_2}]`;
  const draggable = `[data-gjs-type=gs-columns]:empty, [data-gjs-type=${TYPES.column}], [data-gjs-type=${TYPES.gridItem}], [data-gjs-type=${TYPES.column_2}]`;

  defaults.name = "Button";
  defaults.icon =
    '<i class="gjs-badge__icon fa-sharp fa-light fa-toggle-on"></i>';
  defaults.attributes = {
    ...defaults?.attributes,
    "data-dm-category": "content",
  };
  defaults.draggable = draggableBlock;
  defaults.droppable = false;
  defaults.editable = false;
  defaults.components = '<label data-gjs-type="dm-label">Button</label>';
  defaults.toolbar = [move, parent, logic, clone, remove];
  defaults.unstylable = [
    "transform",
    "checkbox-box-type",
    "checkbox-text-position",
    "checkbox-alignment",
    "scale",
    "invalid-scale",
    "flex",
    "min-width",
    "min-height",
    "max-width",
    "max-height",
    "height",
    "justify-content",
    "flex-wrap",
    "overflow",
    "page-break-inside",
    "vertical-align",
    "parent-align",
  ];
  defaults.resizable = {
    ...resizerNone,
    cr: true,
    cl: true,
    autoHeight: true,
    currentUnit: false,
    minDim: 15,
    unitHeight: "px",
    step: 1,
  };

  model.afterInit = function () {
    this.set({ draggable });
    this.addClass("pt-10 pr-10 pb-10 pl-10 dm-btn");
  };

  const isComponent = function (el: HTMLElement) {
    let result;

    if (el?.classList?.contains("dm-btn")) {
      result = { type, editable: true };
    }

    return result;
  };

  dc.addType(type, { extend: TYPES.link, model, isComponent });
}
