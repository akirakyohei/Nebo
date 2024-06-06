import { TYPES } from "../constants";
import { getAndMergeModels } from "../../utils";
import {
  ComponentDefinition,
  ComponentManager,
  ComponentModelDefinition,
} from "grapesjs";

export const type = TYPES.image;

export const protectedCss = `
  /* IMAGE COMPONENT */
  *[data-gjs-type="${type}"], 
  *[data-gjs-type="${TYPES.barcode}"], 
  *[data-gjs-type="${TYPES.qrcode}"] { 
    display: flex;
    box-sizing: border-box;
    width: auto;
    height: auto;
    max-width: 100%;
    page-break-inside: avoid;
  }
`;

export default function imageType(dc: ComponentManager) {
  const model = getAndMergeModels(dc, [TYPES.template, "image"]);
  const defaults = model.defaults as ComponentDefinition;

  const draggableBlock = `[data-gjs-type=wrapper], [data-gjs-type=gs-columns], [data-gjs-type=${TYPES.column}], [data-gjs-type=${TYPES.gridItem}], [data-gjs-type=${TYPES.column_2}]`;
  const draggable = `[data-gjs-type=gs-columns]:empty, [data-gjs-type=${TYPES.column}], [data-gjs-type=${TYPES.gridItem}], [data-gjs-type=${TYPES.column_2}]`;

  defaults.name = "Image";
  defaults.icon = '<i class="gjs-badge__icon dm-icon dm-image"></i>';
  defaults.activeOnRender = true;
  defaults.attributes = {
    ...defaults?.attributes,
    "data-dm-category": "content",
  };
  defaults.traits = [];
  defaults.draggable = draggableBlock;
  defaults.droppable = false;
  defaults.stylable = [
    "width",
    "max-width",
    "height",
    "max-height",
    "align-self",
    "margin",
    "float",

    "better-borders",
    "border-color",
    "border-width",
    "border-style",

    "border-radius",
    "border-top-left-radius",
    "border-top-right-radius",
    "border-bottom-right-radius",
    "border-bottom-left-radius",
  ];

  model.mapAlignment = function () {
    const style = this.getStyle()["align-self"];
    style &&
      this.addStyle({
        margin:
          style === "center"
            ? "0 auto 0 auto"
            : style === "flex-end"
              ? "0 0 0 auto"
              : "0 auto 0 0",
      });
  };

  model.bump = function () {
    this.mapAlignment();
  };

  model.init = function () {
    this.set({ draggable });
    this.addClass("mw-100pc");
  };

  dc.addType(type, { extend: "image", model });
}
