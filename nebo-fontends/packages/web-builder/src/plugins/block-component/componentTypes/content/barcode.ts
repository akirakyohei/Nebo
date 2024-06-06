import { TYPES } from "../constants";
import { getAndMergeModels } from "../../utils";
import { listenTraits, formatName } from "./checkbox";
import { ComponentManager } from "grapesjs";

export const type = TYPES.barcode;

export const protectedCss = `
  /* BARCODE COMPONENT */
  *[data-gjs-type="${type}"] {
    object-fit: contain;
  }
`;

export default function barcodeType(dc: ComponentManager, opts: any) {
  const model = getAndMergeModels(dc, [TYPES.template, type, "barcode"]);
  const defaults = model.defaults;

  const draggableBlock = `[data-gjs-type=wrapper], [data-gjs-type=gs-columns], [data-gjs-type=${TYPES.column}], [data-gjs-type=${TYPES.gridItem}], [data-gjs-type=${TYPES.column_2}]`;
  const draggable = `[data-gjs-type=gs-columns]:empty, [data-gjs-type=${TYPES.column}], [data-gjs-type=${TYPES.gridItem}], [data-gjs-type=${TYPES.column_2}]`;

  defaults.name = "Barcode";
  defaults.icon = '<i class="gjs-badge__icon fa-regular fa-barcode"></i>';
  defaults.attributes = {
    ...defaults?.attributes,
    "data-dm-category": "content",
    "data-value": "static",
  };
  defaults.draggable = draggableBlock;
  defaults.stylable = [
    "max-width",
    "max-height",
    "align-self",
    "margin",
    "background-color",
    "border-width",
    "border-color",
    "border-style",
    "padding",
    "padding-top",
    "padding-right",
    "padding-bottom",
    "padding-left",
    "better-borders",
    // 'transform',

    "border-radius",
    "border-top-left-radius",
    "border-top-right-radius",
    "border-bottom-right-radius",
    "border-bottom-left-radius",
  ];

  model.initTraits = function () {
    const tr = this.get("traits");
    const code = tr.find((t: any) => t.name === "code");
    if (code) {
      code.parent = "data-value=static";
      code.placeholder = "12234...";
    }
    !tr.find((t: any) => t.name === "placeholder") &&
      tr.unshift({
        name: "placeholder",
        label: "Example Value",
        parent: "data-value=variable",
        placeholder: "1234...",
        type: "info-text",
        info: "This value will be used only in the designer. Will use default value for given format if none is provided.",
        changeProp: true,
      });
    !tr.find((t: any) => t.name === "varName") &&
      tr.unshift({
        name: "varName",
        label: "Variable Name",
        parent: "data-value=variable",
        placeholder: "e.g. var",
        type: "error-text",
        changeProp: true,
      });
    !tr.find((t: any) => t.name === "data-value") &&
      tr.unshift({
        name: "data-value",
        type: "switch",
        valueTrue: "variable",
        valueFalse: "static",
        label: "Variable",
      });
    this.set("traits", tr);
  };

  model.afterInit = function () {
    listenTraits(this);
    this.on(
      "change:attributes:data-value change:varName change:placeholder",
      this.generateBarcodeImage
    );
    this.set({ draggable });
  };

  model.generateBarcodeImage = function () {
    const params = new URLSearchParams({
      height: this.get("height"),
      width: this.get("width"),
      fontSize: this.get("fontSize"),
      lineColor: this.get("lineColor"),
      displayValue: this.get("displayValue"),
      format: this.get("format"),
      textMargin: this.get("textMargin"),
      textAlign: this.get("textAlign"),
      textPosition: this.get("textPosition"),
      rotation: this.get("rotation"),
      placeholder: this.get("placeholder") || "123456789012",
    });
    const value = this.getAttributes()["data-value"];
    const varName = this.get("varName");
    const code =
      value !== "static" && varName
        ? `{{${formatName(varName)}}}`
        : this.get("code");
    this.set({
      src: `${opts.api}/barcodes?code=${code}&${params.toString()}`,
    });
  };

  dc.addType(type, { extend: "barcode", model });
}
