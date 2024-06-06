import { TYPES, MAX_GRID } from "../constants";
import { getAndMergeModels } from "../../utils";
import { resizerNone } from "../sharedConfig";
import {
  ComponentManager,
  Editor,
  RectDim,
  ResizerUpdateTargetOptions,
} from "grapesjs";

export const type = TYPES.row_2;

export const protectedCss = `
  /* ROW 2 COMPONENT */
  [data-gjs-type="${type}"]{
    display: table;
    vertical-align: top;
    border-collapse: separate;
    border-spacing: 0;
    table-layout: fixed;
    width: 100%;
    font-family: inherit;
    color: inherit;
  }

  [data-gs-type="columns"] {
    font-family: inherit;
    color: inherit;
  }
`;

export const oldGridSize = 24;

const sizeClassOldStylesMap: any = {};
for (let i = 0; i < oldGridSize; i++) {
  sizeClassOldStylesMap[i + 1] = (100 / oldGridSize) * (i + 1);
}

export default function rowType(
  dc: ComponentManager,
  { editor }: { editor: Editor }
) {
  const model = getAndMergeModels(dc, [TYPES.template, "gs-row"]);
  const defaults = model.defaults || {};

  defaults.icon = '<i class="gjs-badge__icon fa-kit fa-row"></i>';
  defaults.attributes = {
    ...defaults.attributes,
    "data-dm-category": "layout",
  };
  defaults.traits = [
    {
      name: "rowHeight",
      label: "Height",
      type: "better-number",
      placeholder: "auto",
      changeProp: true,
    },
  ];
  defaults.borderCollapse = false;
  defaults.draggable = `[data-gjs-type="wrapper"], [data-gjs-type="${TYPES.column_2}"], [data-gjs-type=gs-columns]`;
  defaults.droppable = `[data-gjs-type="${TYPES.column_2}"], [data-gjs-type="${TYPES.dynamic_column}"]`;
  defaults.components = [
    {
      type: "gs-columns",
    },
  ];
  defaults.stylable = [
    "height",
    "padding",
    "break-inside",
    "vertical-align",
    "page-break-inside",
    "font-family",
    "font-size",
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
  defaults.unstylable = [
    "height",
    "width",
    "flex",
    "min-width",
    "max-width",
    "max-height",
    "min-height",
    "margin",
    "justify-content",
    "transform",
    "checkbox-box-type",
    "checkbox-text-position",
    "checkbox-alignment",
    "scale",
    "invalid-scale",
  ];
  const updateTarget = function (
    el: HTMLElement,
    rect: RectDim,
    { store, config }: ResizerUpdateTargetOptions
  ) {
    const tr = el?.firstChild;
    if (!tr || (tr as any).getAttribute("data-gs-type") !== "columns") return;
    const elStyle = (tr as any).style;
    elStyle[config?.keyHeight || ""] = rect.h + (config?.unitHeight || "");
    if (store) {
      (el as any).__gjsv.model.set("rowHeight", rect.h);
    }
  };
  defaults.resizable = {
    ...resizerNone,
    bc: true,
    keyHeight: "height",
    autoHeight: true,
    keepAutoHeight: true,
    currentUnit: false,
    minDim: 15,
    unitHeight: "px",
    step: 1,
    updateTarget: updateTarget,
  };

  model.init = function () {
    this.on("change:rowHeight", this.updateRowHeight);
    this.initRowHeight();
    this.approximateColumns();
  };

  model.updateRowHeight = function () {
    const h = this.get("rowHeight");
    const tr = this.components().first();
    if (!tr) return;
    if (!h || h === "auto") {
      if (tr.view) tr.view.el.style.height = "auto";
      tr.addStyle({ height: "auto" });
      return;
    }
    tr.addStyle({ height: parseInt(h) + "px" });
  };

  model.initRowHeight = function () {
    const tr = this.components().first();
    if (!tr) return;
    const h = tr.getStyle()["height"] || "auto" || this.view?.el.offsetHeight;
    this.set("rowHeight", parseInt(h));
  };

  model.approximateColumns = function approximateColumns() {
    const components = this.components();
    const columnsWrapper = components?.models && components.models[0];

    if (columnsWrapper) {
      const columns = columnsWrapper.components();
      if (columns) {
        const columnsSum = columns.models.reduce(
          (partialSum: number, column: any) =>
            partialSum + parseInt(column?.getColumns?.() || 1),
          0
        );

        if (columnsSum <= oldGridSize) {
          let totalCols = 0;
          columns.each((column: any) => {
            const percent = sizeClassOldStylesMap[column?.getColumns?.()];
            const newPercent = Math.floor(percent) || 1;
            column?.setColumns?.(newPercent);
            totalCols += newPercent;
          });

          let remainder = MAX_GRID - totalCols;
          columns.each((column: any) => {
            const cols = parseInt(column.getColumns?.() || 1);
            if (remainder === 0 || cols === 1) {
              // Do nothing
            } else if (remainder > 0) {
              column?.setColumns?.(cols + 1);
              remainder -= 1;
            } else {
              column?.setColumns?.(cols - 1);
              remainder += 1;
            }
          });
        }
      }
    }
  };

  dc.addType(type, { model });
}
